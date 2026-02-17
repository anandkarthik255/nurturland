import React from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { Frown, CheckCircle2, Split, Merge } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <>
      <Section id="problem" dark className="rounded-t-[3rem] mt-[-2rem]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block p-3 bg-red-500/20 rounded-xl mb-6">
                <Split className="text-red-400" size={32}/>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              The Problem:<br/> 
              <span className="text-red-400">A Fragmented Ecosystem</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Families currently navigate disconnected tools. Teachers recommend aids, parents search unsurely, and therapists have no visibility. This leads to exhausted families, misaligned professionals, and children falling through the cracks.
            </p>
            
            <div className="space-y-4">
                {[
                    "Learning platforms lack adaptability",
                    "Therapy progress tracked in silos",
                    "Assistive products lack expert guidance",
                    "Caregiver burnout from isolation"
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-red-100/80">
                        <Frown size={20} />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
          </motion.div>

          <div className="relative h-[500px] hidden md:block">
             <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-sm p-8 border border-white/10 flex flex-col justify-center items-center text-center">
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                    <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center border border-white/5">School</div>
                    <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center border border-white/5">Home</div>
                    <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center border border-white/5">Therapy</div>
                    <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center border border-white/5">Community</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">Disconnected</div>
                </div>
             </div>
          </div>
        </div>
      </Section>

      <Section className="bg-nurtur-light">
        <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative h-[400px] order-2 md:order-1">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center border-2 border-green-100"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-48 h-48 bg-nurtur-green/10 rounded-full flex items-center justify-center"
                        >
                             <div className="w-32 h-32 bg-nurtur-green text-white rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-lg z-10">
                                The Child
                             </div>
                        </motion.div>
                    </div>
                    {/* Orbiting Elements */}
                    <div className="absolute top-8 left-8 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-nurtur-dark">Parents</div>
                    <div className="absolute top-8 right-8 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-nurtur-dark">Educators</div>
                    <div className="absolute bottom-8 left-8 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-nurtur-dark">Therapists</div>
                    <div className="absolute bottom-8 right-8 bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-nurtur-dark">Tools</div>
                </motion.div>
             </div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
            >
                <div className="inline-block p-3 bg-green-100 rounded-xl mb-6">
                    <Merge className="text-nurtur-green" size={32}/>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight text-nurtur-dark">
                The Solution:<br/> 
                <span className="text-nurtur-green">Unified Coordinated Care</span>
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                NurturLand replaces disconnected tools with one coordinated system centered on the child. Clarity, continuity, and consistency are the new norm.
                </p>
                
                <ul className="space-y-4">
                    {[
                        "Shared foundation for families & pros",
                        "Data-driven insights across environments",
                        "Holistic care: Education + Therapy + Tools",
                        "Accessibility is foundational, not an add-on"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                            <CheckCircle2 className="text-nurtur-green shrink-0" size={20} />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
      </Section>
    </>
  );
};

export default ProblemSolution;