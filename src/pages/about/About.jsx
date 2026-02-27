import React from 'react';
import { Award, Target, Users, Landmark } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <section className="bg-[#1e40af] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
          About Our Legacy
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100 text-lg">
          Connecting the past, present, and future of Vishwakarma Government Engineering College.
        </p>
      </section>

      {/* 2. History & Mission */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
              Our Journey Since 1994
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Established in 1994 by the Government of Gujarat, VGEC (Chandkheda) has been a beacon of technical excellence. The Alumni Association was formed to foster a lifelong bond between the institute and its graduates.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With over 25,000 alumni spread across the globe—from Silicon Valley to Ahmedabad—our network is one of the strongest engineering communities in the state.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Landmark className="mx-auto text-blue-600 mb-2" size={32} />
              <div className="font-bold text-xl">30+</div>
              <div className="text-xs text-gray-500 uppercase">Years of Excellence</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Users className="mx-auto text-blue-600 mb-2" size={32} />
              <div className="font-bold text-xl">25K+</div>
              <div className="text-xs text-gray-500 uppercase">Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">What Drives Us</h2>
          <p className="text-gray-500 mt-2">The pillars of VGEC Alumni Association</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm border-b-4 border-blue-500">
            <Target className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              To create a platform where alumni can mentor current students, share industry knowledge, and contribute to the college's development.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-sm border-b-4 border-blue-500">
            <Award className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Excellence</h3>
            <p className="text-gray-600 text-sm">
              Promoting technical innovation and professional growth through regular webinars, workshops, and annual reunions.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-sm border-b-4 border-blue-500">
            <Users className="text-blue-600 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Community</h3>
            <p className="text-gray-600 text-sm">
              Strengthening the bond among alumni globally and providing a support system for career advancement and networking.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Quote Section */}
      <section className="py-24 text-center px-6">
        <div className="max-w-4xl mx-auto italic text-2xl md:text-3xl text-gray-700 leading-relaxed font-serif">
          "The strength of the institute lies in the success of its students. We don't just build engineers; we build a legacy."
        </div>
        <div className="mt-6 font-bold text-blue-800 uppercase tracking-widest">— Principal, VGEC</div>
      </section>
    </div>
  );
};

export default About;