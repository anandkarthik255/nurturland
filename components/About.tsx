import React from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { Globe, Users, Target, Rocket } from 'lucide-react';

const About = () => {
  const cards = [
    {
      title: "Who",
      icon: <Users className="text-blue-500" />,
      content: "Children aged 2-18 with developmental differences.",
      color: "bg-blue-50 border-blue-100"
    },
    {
      title: "Where",
      icon: <Globe className="text-green-500" />,
      content: "India-first mindset, designed for global scalability.",
      color: "bg-green-50 border-green-100"
    },
    {
      title: "Why",
      icon: <Target className="text-red-500" />,
      content: "Built from lived experience to solve fragmented care.",
      color: "bg-red-50 border-red-100"
    },
    {
      title: "Status",
      icon: <Rocket className="text-purple-500" />,
      content: "Launching 2026 with pilot programs underway.",
      color: "bg-purple-50 border-purple-100"
    }
  ];

  return (
    <Section id="about">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-nurtur-green font-bold tracking-widest uppercase text-sm mb-2">01. About NurturLand</h2>
        <h3 className="font-serif text-4xl md:text-5xl text-nurtur-dark mb-6">Purpose-Driven Inclusion</h3>
        <p className="text-lg text-slate-600">
          NurturLand transforms how children with special needs learn, grow, and thrive by bringing together adaptive learning, curated products, and collaborative care into one unified system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`p-8 rounded-3xl border-2 ${card.color} transition-all duration-300`}
          >
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-4">
              {card.icon}
            </div>
            <h4 className="font-serif text-xl font-bold text-slate-800 mb-2">{card.title}</h4>
            <p className="text-slate-600">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default About;