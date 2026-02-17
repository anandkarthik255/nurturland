import React from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { BrainCircuit, ShoppingBag, HeartHandshake, ArrowRight } from 'lucide-react';

const Ecosystem = () => {
  const pillars = [
    {
      id: 1,
      title: "Adaptive Learning System",
      icon: <BrainCircuit size={40} className="text-white" />,
      desc: "Personalized learning paths aligned with IEPs. Multisensory content, gamified lessons, and real-time difficulty adjustment.",
      features: ["Data-Driven Insights", "Visual & Auditory", "WCAG Compliant"],
      gradient: "from-blue-400 to-blue-600",
      shadow: "shadow-blue-200"
    },
    {
      id: 2,
      title: "Therapist-Verified Marketplace",
      icon: <ShoppingBag size={40} className="text-white" />,
      desc: "Every product reviewed by licensed therapists. Intelligent filters by goal, condition, and learning stage.",
      features: ["Safety Verified", "Expert Guidance", "Age Appropriate"],
      gradient: "from-green-400 to-green-600",
      shadow: "shadow-green-200"
    },
    {
      id: 3,
      title: "Community & Care Collaboration",
      icon: <HeartHandshake size={40} className="text-white" />,
      desc: "Shared progress dashboards and secure messaging. Reduces isolation and strengthens professional continuity.",
      features: ["Shared Goals", "Secure Messaging", "Real-time Notes"],
      gradient: "from-orange-400 to-orange-600",
      shadow: "shadow-orange-200"
    }
  ];

  return (
    <Section id="ecosystem">
      <div className="text-center mb-16">
        <h2 className="text-nurtur-green font-bold tracking-widest uppercase text-sm mb-2">03. The Ecosystem</h2>
        <h3 className="font-serif text-4xl md:text-5xl text-nurtur-dark">Three Interconnected Pillars</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.id}
            whileHover={{ y: -10 }}
            className="relative group h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
            <div className="relative h-full bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg mb-6`}>
                {pillar.icon}
              </div>
              
              <h4 className="font-serif text-2xl font-bold text-slate-800 mb-4">{pillar.title}</h4>
              <p className="text-slate-600 mb-6 flex-grow">{pillar.desc}</p>
              
              <div className="space-y-3 mb-8">
                {pillar.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${pillar.gradient}`}></div>
                    {feat}
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 font-bold text-nurtur-dark group-hover:translate-x-2 transition-transform mt-auto">
                Learn More <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Ecosystem;