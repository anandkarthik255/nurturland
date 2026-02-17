import React from 'react';
import Section from './ui/Section';

const Pricing = () => {
  return (
    <Section className="bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-nurtur-green font-bold tracking-widest uppercase text-sm mb-2">Access</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-nurtur-dark">Accessible Pricing by Design</h3>
            <p className="mt-4 text-slate-600">Intentional design to be accessible across income levels while remaining sustainable.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-8 rounded-tr-[3rem] rounded-bl-[3rem] border border-green-100">
                <h4 className="font-serif text-2xl font-bold text-nurtur-dark mb-2">For Families</h4>
                <ul className="space-y-2 text-slate-700">
                    <li>• Flexible pricing tiers based on usage</li>
                    <li>• Subsidized access for financial assistance</li>
                    <li>• Free foundational access available</li>
                </ul>
            </div>
            <div className="bg-orange-50 p-8 rounded-tl-[3rem] rounded-br-[3rem] border border-orange-100">
                <h4 className="font-serif text-2xl font-bold text-nurtur-dark mb-2">For Institutions</h4>
                <ul className="space-y-2 text-slate-700">
                    <li>• Licensing plans for schools & therapy centers</li>
                    <li>• Centralized learner management</li>
                    <li>• Compliance-ready deployment</li>
                </ul>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;