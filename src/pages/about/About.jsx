import React from 'react';
import { Award, Target, Users, Landmark, Sparkles, Quote } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* 1. Header Section - Solid & Corporate */}
      <section className="bg-blue-800 text-white py-16 md:py-24 px-6 text-center border-b-4 border-blue-600">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wide">
            About Our Legacy
          </h1>
          <p className="text-blue-200 text-sm md:text-base font-medium">
            Connecting the past, present, and future of Vishwakarma Government Engineering College since 1994.
          </p>
        </div>
      </section>

      {/* 2. History & Mission - Standard Grid Layout */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Text Content */}
          <div className="bg-white p-8 border border-gray-200 shadow-sm h-full">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 uppercase border-b border-gray-200 pb-3">
              Our Journey Since 1994
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Vishwakarma Government Engineering College (VGEC), established in 1994 by the Government of Gujarat, is one of the prominent engineering institutes located in Chandkheda, Ahmedabad.
              </p>
              <p>
                The Alumni Association aims to connect former students with the institute and provide a platform for networking, mentorship, and collaboration between alumni and current students.
              </p>
              <p>
                Over the years, VGEC has produced graduates working across various industries including IT, core engineering, and startups. The alumni network continues to grow and plays an important role in guiding current students towards successful careers.
              </p>
            </div>
          </div>

          {/* Stats Grid - Boxy & Clean */}
          <div className="grid grid-cols-2 gap-4 h-full">
            <StatBox icon={<Landmark size={24}/>} count="1994" label="Established" />
            <StatBox icon={<Users size={24}/>} count="Govt. of Gujarat" label="Founded By" />
            <StatBox icon={<Target size={24}/>} count="Chandkheda" label="Location" />
            <StatBox icon={<Award size={24}/>} count="Engineering Institute" label="Type" />
          </div>

        </div>
      </section>

      {/* 3. Core Values - Simple Cards */}
      <section className="py-12 bg-white border-t border-gray-200 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">What Drives Us</h2>
            <div className="h-1 w-16 bg-blue-700 mx-auto mt-3"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard 
              icon={<Target size={28} className="text-blue-700" />} 
              title="Our Mission" 
              desc="To build a strong connection between alumni and students by enabling knowledge sharing, mentorship, and career guidance."
            />
            <ValueCard 
              icon={<Award size={28} className="text-blue-700" />} 
              title="Excellence" 
              desc="Promoting technical innovation and professional growth through regular webinars, workshops, and annual reunions."
            />
            <ValueCard 
              icon={<Sparkles size={28} className="text-blue-700" />} 
              title="Community" 
              desc="Strengthening the bond among alumni globally and providing a support system for career advancement and networking."
            />
          </div>
        </div>
      </section>

      {/* 4. Quote Section - Traditional Blockquote */}
      <section className="py-16 bg-gray-100 border-t border-gray-200 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Quote size={40} className="text-gray-300 mx-auto mb-4" />
          <blockquote className="text-lg md:text-xl font-semibold text-gray-700 leading-relaxed italic mb-6">
            "The strength of the institute lies in the success of its students. We don't just build engineers; we build a legacy."
          </blockquote>
          <div className="inline-block border-t border-gray-300 pt-4">
            <span className="font-bold text-blue-900 uppercase text-xs tracking-wider">
              — VGEC Alumni Association
            </span>
          </div>
        </div>
      </section>
      
    </div>
  );
};

// --- Helper Components (Standard HTML-like structure) ---

const StatBox = ({ icon, count, label }) => (
  <div className="bg-white p-6 border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center">
    <div className="text-blue-800 mb-3">{icon}</div>
    <div className="font-bold text-lg text-gray-800 mb-1 leading-tight">{count}</div>
    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</div>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <div className="bg-gray-50 p-8 border border-gray-200 flex flex-col items-start">
    <div className="mb-4 bg-white p-3 border border-gray-200 shadow-sm inline-block">
      {icon}
    </div>
    <h3 className="text-lg font-bold uppercase text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      {desc}
    </p>
  </div>
);

export default About;