import React from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';

const Values = () => {
  const values = [
    "Inclusivity", "Empathy", "Integrity", "Innovation", "Collaboration"
  ];

  return (
    <div className="py-20 bg-nurtur-dark overflow-hidden relative">
      {/* Moving text background */}
      <div className="absolute top-0 left-0 w-full opacity-5 pointer-events-none overflow-hidden whitespace-nowrap leading-none">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="text-[200px] font-bold text-white uppercase"
        >
          Values Values Values Values
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-nurtur-green font-bold tracking-widest uppercase text-sm mb-2">04. Culture</h2>
                <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Mission-Led & Accountable</h3>
                <p className="text-gray-300 text-lg">
                    Our culture is built for long-term impact. We believe inclusion should not depend on effort, privilege, or luck. It should be built into the systems we create.
                </p>
            </div>
            <div className="flex flex-wrap gap-4">
                {values.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1, backgroundColor: '#4ade80', color: '#000' }}
                        className="px-6 py-3 border border-white/20 rounded-full text-white font-medium cursor-default transition-colors"
                    >
                        {val}
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Values;