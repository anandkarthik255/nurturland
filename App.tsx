import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProblemSolution from './components/ProblemSolution';
import Ecosystem from './components/Ecosystem';
import Values from './components/Values';
import Impact from './components/Impact';
import Pricing from './components/Pricing';
import JoinUs from './components/JoinUs';
import Dashboard from './components/Dashboard';
import BellaChat from './components/BellaChat';
import LearningModule from './components/LearningModule';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [view, setView] = useState<'landing' | 'app' | 'module'>('landing');
  const [activeModuleData, setActiveModuleData] = useState<any>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const enterApp = () => {
    setView('app');
    window.scrollTo(0, 0);
  };

  const startModule = (module: any) => {
    setActiveModuleData(module);
    setView('module');
  };

  const closeModule = (results?: any) => {
    // In a real app, we'd save results here
    setView('app');
  };

  return (
    <div className="font-sans antialiased text-slate-800 bg-white selection:bg-nurtur-green selection:text-nurtur-dark min-h-screen">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar onAction={enterApp} />
            <main>
              <Hero onAction={enterApp} />
              <About />
              <ProblemSolution />
              <Ecosystem />
              <Values />
              <Impact />
              <Pricing />
            </main>
            <JoinUs />
          </motion.div>
        ) : view === 'app' ? (
          <motion.div 
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard onExit={() => setView('landing')} onStartModule={startModule} />
          </motion.div>
        ) : (
          <motion.div
            key="module"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <LearningModule moduleData={activeModuleData} onClose={closeModule} />
          </motion.div>
        )}
      </AnimatePresence>
      {view !== 'module' && <BellaChat />}
    </div>
  );
};

export default App;