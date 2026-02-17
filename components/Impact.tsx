import React from 'react';
import Section from './ui/Section';

const Impact = () => {
  return (
    <Section id="impact">
       <div className="bg-nurtur-light rounded-[3rem] p-12 md:p-24 text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-nurtur-dark mb-12">The Impact We're Building</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-green-200 -z-0"></div>

             <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl border-b-4 border-nurtur-green">
                <div className="text-5xl font-bold text-nurtur-green mb-2">Time</div>
                <p className="text-slate-600 font-medium">Reduced coordination time for families</p>
             </div>
             
             <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl border-b-4 border-nurtur-green transform md:-translate-y-8">
                <div className="text-5xl font-bold text-nurtur-green mb-2">Trust</div>
                <p className="text-slate-600 font-medium">Stronger alignment across care teams</p>
             </div>

             <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl border-b-4 border-nurtur-green">
                <div className="text-5xl font-bold text-nurtur-green mb-2">Grow</div>
                <p className="text-slate-600 font-medium">Improved learner engagement & outcomes</p>
             </div>
          </div>

          <div className="mt-16">
            <p className="font-serif text-2xl text-nurtur-dark max-w-2xl mx-auto">
                "NurturLand is not an experiment; it is lived insight, shaped by empathy and real-world challenges."
            </p>
          </div>
       </div>
    </Section>
  );
};

export default Impact;