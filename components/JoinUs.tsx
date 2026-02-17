import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const JoinUs = () => {
  const partners = [
    "TechBee (Business Consultants)",
    "Buzzified (Marketing)",
    "Jasa Horizons (Education)",
    "SS Intacts (HR Consultants)"
  ];

  return (
    <footer id="join" className="bg-nurtur-dark text-white pt-24 pb-12 rounded-t-[4rem] relative overflow-hidden">
        
        {/* Partners Marquee */}
        <div className="mb-20 overflow-hidden opacity-50">
            <div className="flex w-[200%]">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-16 whitespace-nowrap"
                >
                    {[...partners, ...partners, ...partners].map((p, i) => (
                        <span key={i} className="text-xl font-medium tracking-wider">{p}</span>
                    ))}
                </motion.div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16">
            <div>
                <h2 className="font-serif text-5xl md:text-7xl mb-8">Join the <br/><span className="text-nurtur-green">Mission.</span></h2>
                <p className="text-lg text-gray-300 mb-8 max-w-md">
                    Inclusion becomes real when people take the next step. Collaborate to strengthen the inclusive care ecosystem.
                </p>
                
                <a 
                    href="mailto:info.nurturland@gmail.com" 
                    className="inline-flex items-center gap-3 bg-white text-nurtur-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-nurtur-green hover:text-white transition-all"
                >
                    <Mail /> info.nurturland@gmail.com
                </a>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <h3 className="text-2xl font-serif mb-4">For Partners & Investors</h3>
                <p className="text-gray-400 mb-6">Explore partnership & investing opportunities to build infrastructure for inclusion.</p>
                <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-full bg-nurtur-green flex items-center justify-center">
                        <ArrowUpRight className="text-nurtur-dark" />
                     </div>
                     <div>
                        <p className="font-bold">Contact Us Today</p>
                        <p className="text-sm text-gray-400">Let's build together.</p>
                     </div>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2026 NurturLand. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
        </div>
    </footer>
  );
};

export default JoinUs;