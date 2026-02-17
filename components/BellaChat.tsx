import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const BellaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bella'; text: string }[]>([
    { role: 'bella', text: "Hi! I'm Bella, your guide to NurturLand. 🌿 How can I help you support Leo's sensory journey today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are Bella, the helpful AI guide for NurturLand (the "Infrastructure for Inclusion"). 
                             Your goal is to support parents and caregivers of children with neurodivergence/developmental differences. 
                             Tone: Empathetic, highly knowledgeable about sensory integration (OT/SLP terminology), warm, and "Gen Z" friendly (use occasional emojis like 🌿, ✨, 🧠). 
                             Specific Knowledge:
                             - Visual/Auditory/Tactile/Proprioceptive/Vestibular sensory systems.
                             - The "Vasudhaiva Kutumbakam" philosophy (The World is One Family).
                             - Be supportive, never judgmental. Provide practical sensory hacks.`,
          temperature: 0.8,
        }
      });

      const bellaText = response.text || "I'm having a quiet moment! Could you rephrase that? 🌿";
      setMessages(prev => [...prev, { role: 'bella', text: bellaText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bella', text: "Neural pathways are a bit busy! Give me a second... ✨" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[550px]"
          >
            {/* Header */}
            <div className="bg-nurtur-dark p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center p-1 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/bottts/svg?seed=bella&backgroundColor=4ade80" alt="Bella" className="w-full h-full scale-125" />
                </div>
                <div>
                  <h3 className="font-serif font-bold leading-none text-lg">Bella</h3>
                  <p className="text-[10px] text-green-300 flex items-center gap-1 mt-1 font-bold tracking-widest uppercase">
                    <Sparkles size={8} /> Inclusion Guide
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Feed */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-nurtur-dark text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-200 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                    <Loader2 className="animate-spin text-nurtur-green" size={18} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
               <div className="relative">
                 <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Bella anything..."
                  className="w-full pl-6 pr-14 py-4 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-nurtur-green border-none"
                 />
                 <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-nurtur-dark text-white rounded-full flex items-center justify-center hover:bg-nurtur-green transition-all disabled:opacity-50 shadow-md"
                 >
                    <Send size={16} />
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-nurtur-dark text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-nurtur-green opacity-0 group-hover:opacity-10 transition-opacity"></div>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">1</span>
        )}
      </motion.button>
    </div>
  );
};

export default BellaChat;