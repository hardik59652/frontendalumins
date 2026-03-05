import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, Landmark, Sparkles, Quote } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Header Section - Dynamic & Responsive */}
      <section className="relative bg-[#1e40af] text-white py-16 md:py-28 px-6 text-center overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <Landmark size={400} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-tight">
            About Our <span className="text-blue-300">Legacy</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-base md:text-xl font-medium italic opacity-90">
            Connecting the past, present, and future of Vishwakarma Government Engineering College since 1994.
          </p>
        </motion.div>
      </section>

      {/* 2. History & Mission - Responsive Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 border-l-8 border-blue-600 pl-4 uppercase tracking-tight leading-none">
              Our Journey <br /> <span className="text-blue-600 italic">Since 1994</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-lg font-medium">
              <p>
                Established in 1994 by the Government of Gujarat, VGEC (Chandkheda) has been a beacon of technical excellence. The Alumni Association was formed to foster a lifelong bond between the institute and its graduates.
              </p>
              <p>
                With over 25,000 alumni spread across the globe—from Silicon Valley to Ahmedabad—our network is one of the strongest engineering communities in the state.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid - Optimized for Mobile (2x2) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-blue-50 rounded-[2.5rem] p-6 md:p-10 grid grid-cols-2 gap-4 shadow-inner"
          >
            <StatBox icon={<Landmark size={28} />} count="30+" label="Years of Excellence" />
            <StatBox icon={<Users size={28} />} count="25K+" label="Global Members" />
            <StatBox icon={<Target size={28} />} count="500+" label="Mentors" />
            <StatBox icon={<Award size={28} />} count="15+" label="Chapters" />
          </motion.div>
        </div>
      </section>

      {/* 3. Core Values - Responsive Cards */}
      <section className="py-20 bg-gray-50 px-6 rounded-[3rem] md:rounded-none mx-2 md:mx-0">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">What Drives Us</h2>
          <div className="h-1.5 w-16 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <ValueCard 
            icon={<Target size={32} />} 
            title="Our Mission" 
            desc="To create a platform where alumni can mentor current students, share industry knowledge, and contribute to the college's development."
          />
          <ValueCard 
            icon={<Award size={32} />} 
            title="Excellence" 
            desc="Promoting technical innovation and professional growth through regular webinars, workshops, and annual reunions."
          />
          <ValueCard 
            icon={<Sparkles size={32} />} 
            title="Community" 
            desc="Strengthening the bond among alumni globally and providing a support system for career advancement and networking."
          />
        </div>
      </section>

      {/* 4. Quote Section - Centered & Bold */}
      <section className="py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-5">
            <Quote size={120} className="text-blue-900" />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <blockquote className="text-xl md:text-3xl font-black text-gray-800 leading-tight italic uppercase tracking-tight">
            "The strength of the institute lies in the success of its students. We don't just build engineers; we build a legacy."
          </blockquote>
          <div className="mt-8 flex flex-col items-center">
            <div className="h-1 w-12 bg-blue-600 mb-4 rounded-full"></div>
            <span className="font-black text-blue-800 uppercase tracking-widest text-sm">— Principal, VGEC</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// --- Helper Components ---

const StatBox = ({ icon, count, label }) => (
  <div className="bg-white p-5 md:p-8 rounded-[2rem] shadow-sm text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow group">
    <div className="text-blue-600 mb-2 group-hover:scale-110 transition-transform">{icon}</div>
    <div className="font-black text-xl md:text-3xl text-gray-900">{count}</div>
    <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1 leading-tight">{label}</div>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-10 rounded-[2.5rem] shadow-sm border-b-8 border-blue-600 text-center md:text-left group"
  >
    <div className="text-blue-600 mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">{icon}</div>
    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-gray-900">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed italic text-sm md:text-base">
      {desc}
    </p>
  </motion.div>
);

export default About;