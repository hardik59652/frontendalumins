import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Bell, Settings, Award, MessageSquare, ChevronRight, Star } from 'lucide-react';

const AlumniDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans text-gray-900">
      
      {/* Header Banner */}
      <div className="bg-[#1e40af] h-32 md:h-48 w-full relative">
        <div className="absolute -bottom-12 left-6 md:left-12 flex items-end gap-4">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[2rem] border-4 border-white shadow-xl flex items-center justify-center text-blue-600 font-black text-4xl">
            Y
          </div>
          <div className="mb-2">
            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 md:text-white">Yash Patel</h1>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 md:text-blue-100">Class of 2024 • IT Dept</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Stats & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Profile Strength</h3>
            <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
              <div className="bg-blue-600 h-2 w-[85%] rounded-full"></div>
            </div>
            <p className="text-[10px] font-bold text-blue-600 uppercase">85% Completed</p>
          </div>

          <div className="bg-white overflow-hidden rounded-[2rem] shadow-sm border border-gray-100">
            <div className="p-6 space-y-4">
              <DashboardLink icon={<User size={18}/>} label="My Profile" />
              <DashboardLink icon={<Briefcase size={18}/>} label="Job Applications" />
              <DashboardLink icon={<MessageSquare size={18}/>} label="Messages" />
              <DashboardLink icon={<Settings size={18}/>} label="Account Settings" />
            </div>
          </div>
        </div>

        {/* Right: Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <Star className="absolute -right-4 -top-4 w-24 h-24 opacity-10 rotate-12" />
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Welcome Back, Yash!</h2>
            <p className="text-blue-100 text-sm opacity-80 italic">Check out the latest job openings from your seniors today.</p>
          </div>

          {/* Recent Activity / Jobs */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest ml-2">Recommended for you</h3>
            {[1, 2].map((item) => (
              <div key={item} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex justify-between items-center hover:shadow-lg transition-all group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-sm">Frontend Developer</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Google • Bangalore</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600 transition-all" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const DashboardLink = ({ icon, label }) => (
  <button className="flex items-center justify-between w-full group">
    <div className="flex items-center gap-3">
      <span className="text-gray-400 group-hover:text-blue-600 transition-colors">{icon}</span>
      <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{label}</span>
    </div>
    <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
  </button>
);

export default AlumniDashboard;