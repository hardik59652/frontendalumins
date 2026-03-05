import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, HandHelping, Calendar, BookOpen, 
  MessageSquare, Heart, GraduationCap, X, CheckCircle 
} from 'lucide-react';

const GivingBackPage = () => {
  const [activeForm, setActiveForm] = useState(null);

  const mentorDomains = [
    "Software Development", "Data Science & AI", "Core Engineering", 
    "Higher Studies (GRE/GATE)", "Civil Services / UPSC", "Entrepreneurship"
  ];

  const volunteerRoles = [
    "Hackathon Mentor / Judge", "NGO Social Work", 
    "Campus Placement Training", "Industrial Visit Coordinator"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Hero Section - Responsive Padding */}
      <section className="bg-[#1e40af] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <HandHelping className="absolute -right-10 -bottom-10 w-48 h-48 md:w-80 md:h-80 rotate-12" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <HandHelping className="mx-auto mb-4 md:mb-6 text-blue-300" size={50} md={60} />
          <h1 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-tight">
            Giving <span className="text-blue-300">Back</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-sm md:text-lg font-medium opacity-90 italic px-2">
            Share your expertise and time. Help the current batch of VGECians build the future you once imagined.
          </p>
        </motion.div>
      </section>

      {/* 2. Selection Cards - Responsive Grid */}
      <section className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Be a Mentor Card */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border-b-8 border-blue-600 group flex flex-col justify-between"
        >
          <div>
            <div className="bg-blue-50 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Users size={32} md={40} />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Be a Mentor</h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base font-medium italic">
              Guide individual students or small groups. Share career advice, technical insights, and interview tips.
            </p>
          </div>
          <button 
            onClick={() => setActiveForm('mentor')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-blue-700 transition shadow-xl active:scale-95 shadow-blue-100"
          >
            Sign Up as Mentor
          </button>
        </motion.div>

        {/* Be a Volunteer Card */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border-b-8 border-green-600 group flex flex-col justify-between"
        >
          <div>
            <div className="bg-green-50 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-green-600 group-hover:text-white transition-all">
              <Heart size={32} md={40} />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Be a Volunteer</h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base font-medium italic">
              Support college events, hackathons, or community service initiatives. Give your time for institutional growth.
            </p>
          </div>
          <button 
            onClick={() => setActiveForm('volunteer')}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-green-700 transition shadow-xl active:scale-95 shadow-green-100"
          >
            Volunteer for Events
          </button>
        </motion.div>
      </section>

      {/* 3. Dynamic Registration Form (Modal - Mobile Optimized) */}
      <AnimatePresence>
        {activeForm && (
          <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-3xl relative"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 md:p-8 flex justify-between items-center z-20">
                <div>
                  <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                    {activeForm === 'mentor' ? 'Mentor App' : 'Volunteer App'}
                  </h2>
                  <p className="text-gray-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-1">VGEC Alumni Engagement</p>
                </div>
                <button onClick={() => setActiveForm(null)} className="bg-gray-100 p-2 md:p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form className="p-6 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Full Name</label>
                    <input type="text" placeholder="Alumni`s Name" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Batch Year</label>
                    <input type="number" min="1994" placeholder="Alumni`s Batch" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" required />
                  </div>
                </div>

                {activeForm === 'mentor' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Domain</label>
                      <select className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm">
                        {mentorDomains.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Available From</label>
                      <input type="date" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm" required />
                    </div>
                  </div>
                )}

                {activeForm === 'volunteer' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Roles Interested</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {volunteerRoles.map(role => (
                        <label key={role} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-green-50 cursor-pointer transition border border-transparent hover:border-green-200">
                          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                          <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Motivation</label>
                  <textarea rows="3" placeholder="Why would you like to contribute to VGEC?" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm resize-none" required></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`w-full py-5 rounded-2xl font-black text-white text-xs md:text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all ${activeForm === 'mentor' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-green-600 hover:bg-green-700 shadow-green-100'}`}
                >
                  Confirm Registration <CheckCircle className="inline ml-2" size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GivingBackPage;