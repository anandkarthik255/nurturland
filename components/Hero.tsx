import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onAction?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAction }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-green-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-green-100">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-xs md:text-sm font-bold tracking-wide text-nurtur-dark uppercase">
              Vasudhaiva Kutumbakam
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-nurtur-dark">
            The World Is <br/>
            <span className="text-nurtur-green italic">One Family.</span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            Building connected systems that support children with developmental differences in how they learn, grow, and thrive.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAction}
              className="px-8 py-4 bg-nurtur-dark text-white rounded-2xl font-bold shadow-xl shadow-green-900/10 flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#ecosystem"
              className="px-8 py-4 bg-white text-nurtur-dark border-2 border-green-100 rounded-2xl font-bold hover:border-nurtur-green transition-colors"
            >
              Explore Ecosystem
            </motion.a>
          </div>
        </motion.div>

        {/* Visual Content - Bella and Children */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-200 to-yellow-200 rounded-full blur-3xl opacity-40"></div>
          
          <div className="relative grid grid-cols-2 gap-4">
             <motion.img 
              whileHover={{ y: -10 }}
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&h=500&q=80" 
              alt="Happy children" 
              className="rounded-[2rem] shadow-2xl object-cover h-64 w-full md:h-80 md:mt-12"
            />
             <motion.div 
               whileHover={{ y: -10 }}
               className="relative"
             >
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&h=500&q=80" 
                  alt="Inclusive learning" 
                  className="rounded-[2rem] shadow-2xl object-cover h-64 w-full md:h-80"
                />
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border-b-4 border-nurtur-green max-w-[150px]"
                >
                  <p className="font-serif text-nurtur-dark text-lg leading-none mb-1">Hi, I'm Bella!</p>
                  <p className="text-xs text-slate-500">Your guide to inclusion.</p>
                </motion.div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;