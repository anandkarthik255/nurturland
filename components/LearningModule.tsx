import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle, ArrowRight, Brain, Zap, Loader2, Volume2, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface OptionMetadata {
  label: string;
  visualHint?: string; // Hex color or Image Keyword
  type: 'color' | 'image' | 'text' | 'mixed';
}

interface ActivityTask {
  question: string;
  instruction: string;
  options: OptionMetadata[];
  correctAnswer: string;
  visualType: 'color' | 'image' | 'text' | 'mixed';
}

interface LearningModuleProps {
  moduleData: any;
  onClose: (results?: any) => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ moduleData, onClose }) => {
  const [currentTask, setCurrentTask] = useState<ActivityTask | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Adaptive mastery logic: starts at 1, moves to 2 after consistent success
  const correctCount = history.filter(h => h.isCorrect).length;
  const masteryLevel = correctCount < 3 ? 1 : 2;

  const generateNextTask = async (performanceData?: any) => {
    setIsLoading(true);
    setFeedback(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Targeting a child with developmental differences. Focus: ${moduleData?.title || 'General Sensory'}.
        Current Mastery Level: ${masteryLevel}. 
        Session History Summary: ${JSON.stringify(history.slice(-3))}.
        
        STRICT GUIDELINES:
        - Level 1: DO NOT MIX modalities. Ask ONLY for a color (e.g., 'Touch the Red one') or ONLY for a letter (e.g., 'Find the letter B'). 
        - Level 2: You can MIX modalities (e.g., 'Find the RED letter A').
        - For color or mixed types, provide 'visualHint' as a hex code.
        - For image types, provide 'visualHint' as a simple keyword for image search.
        
        Return ONLY a JSON object:
        {
          "question": "The task text",
          "instruction": "Short guidance for the parent",
          "visualType": "color" | "image" | "text" | "mixed",
          "options": [
            { "label": "Label for the child", "visualHint": "#HEX_OR_KEYWORD", "type": "color" | "image" | "text" | "mixed" }
          ],
          "correctAnswer": "The label of the correct option"
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const text = response.text || "{}";
      const jsonStr = text.replace(/```json|```/g, '').trim();
      const task = JSON.parse(jsonStr);
      setCurrentTask(task);
    } catch (err) {
      console.error("Adaptive Engine Error:", err);
      // Fallback to simple color task
      setCurrentTask({
        question: "Touch the Green Box",
        instruction: "Let's find the color of the grass!",
        visualType: 'color',
        options: [
          { label: "Red", visualHint: "#ef4444", type: "color" },
          { label: "Blue", visualHint: "#3b82f6", type: "color" },
          { label: "Green", visualHint: "#22c55e", type: "color" }
        ],
        correctAnswer: "Green"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateNextTask();
  }, []);

  const handleChoice = (option: OptionMetadata) => {
    if (feedback !== null) return; // Prevent double tapping

    const isCorrect = option.label === currentTask?.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    const result = {
      task: currentTask?.question,
      choice: option.label,
      isCorrect,
      time: Date.now()
    };
    
    setHistory(prev => [...prev, result]);

    setTimeout(() => {
      if (isCorrect) {
        setSessionProgress(prev => Math.min(prev + 20, 100));
        if (sessionProgress < 80) {
          generateNextTask(result);
        }
      } else {
        setFeedback(null);
      }
    }, 2000);
  };

  const getContrastColor = (hex: string) => {
    if (!hex || hex.length < 7) return 'text-nurtur-dark';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'text-black/80' : 'text-white';
  };

  const renderOptionContent = (option: OptionMetadata) => {
    if (option.type === 'color') {
      return (
        <div 
          className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] shadow-inner border-4 border-white/20"
          style={{ backgroundColor: option.visualHint }}
        />
      );
    }
    
    if (option.type === 'mixed') {
      return (
        <div 
          className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: option.visualHint }}
        >
          <span className={`text-6xl md:text-8xl lg:text-9xl font-bold font-serif select-none ${getContrastColor(option.visualHint || '')}`}>
            {option.label}
          </span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      );
    }

    if (option.type === 'image') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="w-full h-[75%] rounded-[2rem] overflow-hidden bg-slate-100 shadow-inner">
            <img 
              src={`https://loremflickr.com/400/400/${encodeURIComponent(option.visualHint || option.label)}?random=${option.label}`}
              className="w-full h-full object-cover"
              alt={option.label}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${option.label}&background=random`;
              }}
            />
          </div>
          <span className="text-xl md:text-2xl font-bold text-nurtur-dark uppercase tracking-wide">{option.label}</span>
        </div>
      );
    }

    return (
      <div className="bg-slate-50 w-full h-full flex items-center justify-center rounded-[2rem]">
        <span className="text-4xl md:text-6xl font-serif text-nurtur-dark">{option.label}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-50 flex flex-col font-sans select-none overflow-hidden h-screen">
      {/* Header */}
      <div className="shrink-0 p-4 md:p-8 flex items-center justify-between bg-white/50 backdrop-blur-md z-10 border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-nurtur-dark text-white rounded-2xl md:rounded-3xl flex items-center justify-center p-2 shadow-lg">
             <Brain size={24} className="md:size-8" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-nurtur-dark truncate max-w-[150px] md:max-w-none">
              {moduleData?.title || "Focus Session"}
            </h2>
            <div className="flex gap-1 md:gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((s, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 md:h-2 w-6 md:w-8 rounded-full transition-all duration-500 ${
                    i * 20 < sessionProgress ? 'bg-nurtur-green shadow-sm shadow-green-200' : 'bg-slate-200'
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>
        <button 
          onClick={() => onClose(history)}
          className="p-3 md:p-4 bg-white border border-slate-200 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
        >
          <X size={20} className="md:size-6" />
        </button>
      </div>

      {/* Main Stage */}
      <main className="flex-grow overflow-y-auto px-4 py-6 md:p-6 custom-scrollbar">
        <div className="min-h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center space-y-4 py-20"
              >
                 <div className="relative inline-block">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="w-20 h-20 md:w-24 md:h-24 border-4 border-dashed border-nurtur-green rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Sparkles className="text-nurtur-green animate-pulse md:size-8" size={28} />
                    </div>
                 </div>
                 <p className="font-serif text-lg md:text-xl text-slate-400">
                   {masteryLevel > 1 ? "Upping the challenge! ✨" : "Setting up the world... 🌿"}
                 </p>
              </motion.div>
            ) : sessionProgress >= 100 ? (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-xl py-12"
              >
                 <div className="w-32 h-32 md:w-40 md:h-40 bg-nurtur-green text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <CheckCircle size={60} className="md:size-20" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-serif text-nurtur-dark mb-4">Great Job, Leo!</h1>
                 <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">You finished your session for today. You were amazing!</p>
                 <button 
                  onClick={() => onClose(history)}
                  className="px-8 py-4 md:px-12 md:py-5 bg-nurtur-dark text-white rounded-2xl md:rounded-[2rem] font-bold text-lg md:text-xl flex items-center gap-4 mx-auto hover:bg-nurtur-green transition-all shadow-xl"
                 >
                   Back to Dashboard <ArrowRight />
                 </button>
              </motion.div>
            ) : (
              <motion.div 
                key="task"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-5xl space-y-8 md:space-y-12 py-8"
              >
                {/* Question Area */}
                <div className="text-center space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white border border-slate-200 rounded-full shadow-sm text-nurtur-dark font-bold text-sm md:text-base">
                    <Volume2 size={16} className="text-nurtur-green md:size-5" />
                    {currentTask?.instruction}
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-nurtur-dark tracking-tight leading-tight px-4">
                    {currentTask?.question}
                  </h1>
                </div>

                {/* Interaction Area */}
                <div className={`grid gap-4 md:gap-8 px-2 md:px-10 ${
                  currentTask?.options.length === 2 ? 'grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-3'
                }`}>
                  {currentTask?.options.map((opt, i) => (
                    <motion.button
                      key={opt.label + i}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChoice(opt)}
                      className={`min-h-[200px] md:h-80 lg:h-96 rounded-[2.5rem] md:rounded-[4.5rem] p-4 md:p-6 border-4 transition-all shadow-xl flex items-center justify-center relative overflow-hidden group
                        ${feedback === 'correct' && opt.label === currentTask.correctAnswer ? 'bg-white border-nurtur-green shadow-green-200 ring-8 ring-green-100' : 
                          feedback === 'incorrect' && opt.label === currentTask.correctAnswer ? 'border-nurtur-green/30' :
                          'bg-white text-nurtur-dark border-slate-100 hover:border-nurtur-green hover:shadow-2xl'}`}
                    >
                      {renderOptionContent(opt)}
                      
                      {/* Success Feedback Overlay */}
                      <AnimatePresence>
                        {feedback === 'correct' && opt.label === currentTask.correctAnswer && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-nurtur-green/20 backdrop-blur-[2px]"
                          >
                            <div className="bg-white rounded-full p-4 md:p-6 shadow-2xl">
                               <CheckCircle className="text-nurtur-green w-12 h-12 md:w-20 md:h-20" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>

                {/* Bella Guidance */}
                <div className="flex justify-center pb-8">
                   <div className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-200 shadow-lg max-w-lg mx-4">
                      <img 
                        src="https://api.dicebear.com/7.x/bottts/svg?seed=bella&backgroundColor=4ade80" 
                        className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl shrink-0" 
                        alt="Bella" 
                      />
                      <p className="font-serif text-lg md:text-xl text-nurtur-dark leading-snug">
                        {feedback === 'correct' ? "You're getting so good at this! 🌟" : 
                         feedback === 'incorrect' ? "Try again, I believe in you! ✨" :
                         masteryLevel > 1 ? "Wow, you're on a roll! Level 2 unlocked." : "Can you find the right one for me?"}
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Ambient background blur */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-nurtur-green/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-blue-400/5 blur-[150px] -z-10 pointer-events-none" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LearningModule;