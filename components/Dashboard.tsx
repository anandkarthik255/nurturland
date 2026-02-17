
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingBag, 
  Users2, 
  Bell, 
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  Plus,
  Activity,
  Zap,
  Ear,
  Eye,
  Hand,
  Wind,
  Brain,
  Sparkles,
  ChevronRight,
  MessageSquareQuote,
  Star,
  Send,
  Menu,
  X
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface DashboardProps {
  onExit: () => void;
  onStartModule: (module: any) => void;
}

interface ActivityLog {
  id: string;
  date: string;
  category: string;
  observation: string;
  intensity: 'low' | 'medium' | 'high';
}

interface SensoryPathItem {
  title: string;
  type: string;
  duration: string;
  reason: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onExit, onStartModule }) => {
  const [activeTab, setActiveTab] = useState<'learning' | 'shop' | 'community' | 'profile'>('learning');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: '1', date: 'Today, 10:00 AM', category: 'Auditory', observation: 'Covered ears during vacuuming', intensity: 'high' },
    { id: '2', date: 'Today, 11:30 AM', category: 'Tactile', observation: 'Sought deep pressure with blankets', intensity: 'medium' }
  ]);
  const [isLogging, setIsLogging] = useState(false);
  const [newLog, setNewLog] = useState({ category: 'Visual', observation: '', intensity: 'medium' as any });
  const [aiPath, setAiPath] = useState<SensoryPathItem[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePersonalizedPath = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const recentLogsStr = logs.map(l => `${l.category}: ${l.observation}`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on these recent sensory observations for a child: [${recentLogsStr}]. 
                  Generate a 3-step "Personalized Sensory Learning Path". 
                  Return ONLY a JSON array of objects with keys: title, type (e.g. 'Vestibular', 'Visual'), duration (e.g. '15 mins'), reason (why this helps specifically based on the logs).`,
      });

      const text = response.text || "[]";
      const jsonStr = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      setAiPath(parsed);
    } catch (error) {
      console.error("AI Path Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addLog = () => {
    if (!newLog.observation) return;
    const log: ActivityLog = {
      id: Date.now().toString(),
      date: 'Just now',
      ...newLog
    };
    setLogs([log, ...logs]);
    setNewLog({ category: 'Visual', observation: '', intensity: 'medium' });
    setIsLogging(false);
  };

  const navItems = [
    { id: 'learning', label: 'Learning Path', icon: Zap },
    { id: 'profile', label: 'Sensory Profile', icon: Activity },
    { id: 'shop', label: 'Marketplace', icon: ShoppingBag },
    { id: 'community', label: 'Care Circle', icon: Users2 },
  ];

  const sensoryStats = [
    { label: 'Visual', value: 75, icon: Eye, color: 'bg-blue-400' },
    { label: 'Auditory', value: 40, icon: Ear, color: 'bg-red-400' },
    { label: 'Tactile', value: 85, icon: Hand, color: 'bg-green-400' },
    { label: 'Proprioceptive', value: 60, icon: Brain, color: 'bg-purple-400' },
    { label: 'Vestibular', value: 30, icon: Wind, color: 'bg-orange-400' },
  ];

  const handleNavClick = (id: any) => {
    setActiveTab(id);
    setIsSidebarOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans relative overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-nurtur-dark/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} 
        md:translate-x-0 md:static md:h-screen md:shadow-none
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-nurtur-green text-white p-2 rounded-xl">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-serif font-bold text-2xl text-nurtur-dark">Nurtur</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-nurtur-dark"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-nurtur-dark text-white shadow-lg' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            Exit Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 pb-24 w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-3 bg-white border border-slate-200 rounded-2xl text-nurtur-dark shadow-sm"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-nurtur-dark">Leo's Journey</h1>
              <p className="text-slate-500 font-medium text-sm md:text-base">Infrastructure for Inclusion</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <button 
              onClick={() => setIsLogging(true)}
              className="flex-grow md:flex-none px-6 py-2.5 bg-nurtur-green text-nurtur-dark rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Log Activity</span><span className="sm:hidden">Log</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-nurtur-green/20 border-2 border-nurtur-green overflow-hidden shrink-0">
               <img src="https://i.pravatar.cc/100?u=sarah" alt="User" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* 1. LEARNING PATH VIEW */}
          {activeTab === 'learning' && (
            <motion.div 
              key="learning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-r from-nurtur-dark to-green-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-serif mb-4 italic text-green-400">Next Sensory Breakthrough</h2>
                  <p className="text-green-100 text-sm md:text-lg mb-8 leading-relaxed">
                    Bridge the gap between daily observations and clinical progress. Our AI generates a specific sensory roadmap based on Leo's recent activity.
                  </p>
                  <button 
                    onClick={generatePersonalizedPath}
                    disabled={isGenerating}
                    className="w-full md:w-auto bg-white text-nurtur-dark px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-nurtur-green transition-all disabled:opacity-50"
                  >
                    {isGenerating ? <Clock className="animate-spin" /> : <Sparkles size={20} className="text-nurtur-green" />}
                    {aiPath ? 'Regenerate Daily Path' : 'Generate Personalized Path'}
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-nurtur-green/10 blur-[100px] rounded-full"></div>
              </div>

              {aiPath ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aiPath.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 hover:border-nurtur-green transition-all shadow-sm group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-50 rounded-2xl text-nurtur-green font-bold text-xs uppercase group-hover:bg-nurtur-green group-hover:text-white transition-colors">
                          Step 0{i+1}
                        </div>
                        <span className="text-xs font-bold text-slate-400">{item.duration}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mb-2 text-nurtur-dark">{item.title}</h3>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 italic">"{item.reason}"</p>
                      <button 
                        onClick={() => onStartModule(item)}
                        className="w-full py-3 bg-slate-50 text-nurtur-dark rounded-xl font-bold text-sm hover:bg-nurtur-green hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        Start Module <ChevronRight size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <Zap className="text-slate-200 mb-4" size={48} />
                    <p className="text-slate-400 font-medium">No path generated for today yet.</p>
                  </div>
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-200">
                    <h3 className="text-lg md:text-xl font-serif mb-4">Bella's Pick of the Day</h3>
                    <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-4 bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" alt="Learning" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-sm md:text-base">Multisensory Alphabets</h4>
                    <p className="text-xs md:text-sm text-slate-500">Focus: Literacy & Tactile stimulation</p>
                    <button 
                      onClick={() => onStartModule({ title: "Multisensory Alphabets", type: "Visual/Tactile" })}
                      className="w-full mt-4 py-3 bg-nurtur-dark text-white rounded-xl font-bold text-sm"
                    >
                      Quick Start
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 2. SENSORY PROFILE VIEW */}
          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                 <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm">
                    <h2 className="text-lg md:text-xl font-bold mb-8 flex items-center gap-2">
                      <Activity className="text-nurtur-green" /> Sensory Balance Radar
                    </h2>
                    <div className="space-y-6">
                       {sensoryStats.map((stat, i) => {
                         const Icon = stat.icon;
                         return (
                           <div key={i} className="space-y-2">
                              <div className="flex justify-between items-center text-xs md:text-sm">
                                 <span className="font-bold flex items-center gap-2 text-slate-700">
                                    <Icon size={16} className="text-slate-400" /> {stat.label}
                                 </span>
                                 <span className="text-slate-400 font-bold">{stat.value}%</span>
                              </div>
                              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full ${stat.color} rounded-full`}
                                 />
                              </div>
                           </div>
                         );
                       })}
                    </div>
                 </div>

                 <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-200">
                   <h2 className="text-lg md:text-xl font-bold mb-6">Activity Timeline</h2>
                   <div className="space-y-4">
                     {logs.map(log => (
                       <div key={log.id} className="p-4 md:p-5 bg-slate-50 rounded-2xl flex items-start gap-4 border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                          <div className={`p-2 rounded-lg ${log.intensity === 'high' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} shrink-0`}>
                             <Activity size={16} />
                          </div>
                          <div className="flex-grow min-w-0">
                             <div className="flex justify-between items-start mb-1 gap-2">
                                <span className="font-bold text-sm text-slate-800 truncate">{log.category}</span>
                                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase shrink-0">{log.date}</span>
                             </div>
                             <p className="text-xs md:text-sm text-slate-600 leading-relaxed break-words">{log.observation}</p>
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-nurtur-light p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-green-100">
                    <div className="flex items-center gap-3 mb-4">
                       <MessageSquareQuote className="text-nurtur-green shrink-0" />
                       <h3 className="font-bold text-nurtur-dark text-lg">Bella's Insight</h3>
                    </div>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">
                      "I've noticed a pattern: Leo's <b>Tactile seeking</b> increases after high <b>Auditory</b> stress. This means he uses deep pressure to self-regulate. Focus on proprioceptive 'heavy work' tasks today."
                    </p>
                    <div className="bg-white p-3 rounded-2xl text-[9px] md:text-[10px] font-bold text-nurtur-dark text-center shadow-sm uppercase tracking-wider">
                       Updated 5 mins ago
                    </div>
                 </div>

                 <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-200">
                    <h3 className="font-bold mb-4 text-slate-400 uppercase text-[10px] md:text-xs tracking-widest">Growth Targets</h3>
                    <div className="space-y-3">
                       {['Independent Dressing', 'Verbal Greeting', 'Transitions'].map((goal, i) => (
                         <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <CheckCircle2 size={16} className="text-nurtur-green shrink-0" />
                            <span className="text-xs md:text-sm font-semibold text-slate-700">{goal}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* 3. MARKETPLACE VIEW */}
          {activeTab === 'shop' && (
            <motion.div 
              key="shop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl md:text-2xl font-serif text-nurtur-dark">Therapist-Verified Tools</h2>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-full overflow-x-auto max-w-full">
                   {["All", "Sensory", "Speech", "Mobility"].map(tag => (
                     <button key={tag} className="px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-bold hover:bg-white transition-all whitespace-nowrap">{tag}</button>
                   ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {[
                   { name: "Weighted Lap Pad", price: "$45", rating: 4.8, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80" },
                   { name: "Visual Timer Pro", price: "$29", rating: 4.9, img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400&q=80" },
                   { name: "AAC Comms Cards", price: "$18", rating: 4.7, img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
                   { name: "Compression Vest", price: "$65", rating: 5.0, img: "https://images.unsplash.com/photo-1591033594798-33227a05780d?auto=format&fit=crop&w=400&q=80" },
                 ].map((product, i) => (
                   <div key={i} className="bg-white rounded-[2rem] border border-slate-200 p-4 hover:shadow-xl transition-all group">
                      <div className="aspect-square rounded-[1.5rem] bg-slate-100 mb-4 overflow-hidden relative">
                         <img src={product.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm">
                            <Star size={10} className="text-yellow-500 fill-yellow-500" /> {product.rating}
                         </div>
                      </div>
                      <h3 className="font-bold text-slate-800 mb-1 text-sm md:text-base">{product.name}</h3>
                      <div className="flex items-center justify-between mt-4">
                         <span className="text-nurtur-dark font-black text-base md:text-lg">{product.price}</span>
                         <button className="p-2 bg-nurtur-dark text-white rounded-xl hover:bg-nurtur-green transition-colors">
                            <Plus size={18} />
                         </button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                         <CheckCircle2 size={12} className="text-blue-500" />
                         <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-tighter">Therapist Verified</span>
                      </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}

          {/* 4. CARE CIRCLE VIEW */}
          {activeTab === 'community' && (
            <motion.div 
              key="community"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8 gap-4">
                   <h2 className="text-xl md:text-2xl font-serif text-nurtur-dark flex items-center gap-3">
                      <Users2 className="text-nurtur-green shrink-0" /> Team Collaboration
                   </h2>
                   <div className="flex -space-x-2 shrink-0">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500 border-2 border-white ring-1 ring-slate-100"></div>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500 border-2 border-white ring-1 ring-slate-100"></div>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-500 border-2 border-white ring-1 ring-slate-100"></div>
                   </div>
                </div>

                <div className="space-y-8">
                   {[
                     { user: "Dr. Maya (Therapist)", text: "Leo had a breakthrough with eye contact today! He focused for 10 seconds during the visual block session.", time: "2h ago", color: "bg-blue-500" },
                     { user: "Sarah (Parent)", text: "That's amazing! He slept much better after the sensory play. Thank you for the tips.", time: "4h ago", color: "bg-green-500" },
                     { user: "Mr. James (Teacher)", text: "Updated his IEP goals in the shared portal. Let's discuss during our sync next Tuesday.", time: "1d ago", color: "bg-orange-500" },
                   ].map((post, i) => (
                     <div key={i} className="flex gap-3 md:gap-4">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${post.color} shrink-0 flex items-center justify-center text-white font-bold text-[10px] md:text-xs`}>
                           {post.user.charAt(0)}
                        </div>
                        <div className="flex-grow min-w-0">
                           <div className="flex justify-between items-center mb-1 gap-2">
                              <span className="font-bold text-xs md:text-sm text-slate-800 truncate">{post.user}</span>
                              <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase shrink-0">{post.time}</span>
                           </div>
                           <div className="bg-slate-50 p-4 md:p-5 rounded-2xl md:rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
                              <p className="text-xs md:text-sm text-slate-600 leading-relaxed break-words">{post.text}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                   <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-nurtur-green shrink-0 overflow-hidden shadow-inner">
                        <img src="https://i.pravatar.cc/100?u=sarah" alt="Me" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow relative">
                        <input 
                          type="text" 
                          placeholder="Share an update..." 
                          className="w-full bg-slate-50 rounded-2xl pl-5 md:pl-6 pr-12 md:pr-14 py-3 md:py-4 border-none focus:ring-2 focus:ring-nurtur-green text-xs md:text-sm"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-nurtur-dark text-white rounded-full flex items-center justify-center hover:bg-nurtur-green transition-all shadow-md">
                           <Send size={14} />
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL: LOG ACTIVITY */}
        <AnimatePresence>
           {isLogging && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-nurtur-dark/40 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white w-full max-w-md rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl"
                >
                   <h2 className="text-2xl md:text-3xl font-serif mb-6 md:mb-8 text-nurtur-dark">Log Activity</h2>
                   <div className="space-y-6">
                      <div>
                         <label className="block text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Category</label>
                         <div className="grid grid-cols-3 gap-2">
                            {['Visual', 'Auditory', 'Tactile', 'Vestibular', 'Motor'].map(cat => (
                              <button 
                                key={cat}
                                onClick={() => setNewLog({...newLog, category: cat})}
                                className={`py-2 md:py-3 text-[9px] md:text-[10px] font-bold rounded-xl md:rounded-2xl transition-all ${newLog.category === cat ? 'bg-nurtur-dark text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                              >
                                {cat}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div>
                         <label className="block text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Observation</label>
                         <textarea 
                           placeholder="Describe the moment..."
                           value={newLog.observation}
                           onChange={(e) => setNewLog({...newLog, observation: e.target.value})}
                           className="w-full bg-slate-50 border-none rounded-2xl md:rounded-3xl p-4 md:p-5 text-xs md:text-sm focus:ring-2 focus:ring-nurtur-green h-28 md:h-32"
                         />
                      </div>
                      <div className="flex gap-3 md:gap-4 pt-4">
                         <button 
                           onClick={() => setIsLogging(false)}
                           className="flex-grow py-3 md:py-4 bg-slate-100 text-slate-500 rounded-xl md:rounded-2xl font-bold hover:bg-slate-200 transition-all text-sm"
                         >
                           Cancel
                         </button>
                         <button 
                           onClick={addLog}
                           className="flex-grow py-3 md:py-4 bg-nurtur-dark text-white rounded-xl md:rounded-2xl font-bold hover:bg-nurtur-green transition-all shadow-xl shadow-green-900/10 text-sm"
                         >
                           Save Log
                         </button>
                      </div>
                   </div>
                </motion.div>
             </div>
           )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
