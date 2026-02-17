import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, id, className = "", dark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden ${dark ? 'bg-nurtur-dark text-white' : 'bg-white text-nurtur-text'} ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
      
      {/* Decorative Background Blobs */}
      {!dark && (
        <>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 -z-0 pointer-events-none mix-blend-multiply" 
          />
           <motion.div 
            animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50 -z-0 pointer-events-none mix-blend-multiply" 
          />
        </>
      )}
    </section>
  );
};

export default Section;