import React, { useState } from 'react';
import { 
  Users, HandHelping, Calendar, BookOpen, 
  MessageSquare, Heart, GraduationCap, X, CheckCircle 
} from 'lucide-react';

const GivingBackPage = () => {
  const [activeForm, setActiveForm] = useState(null); // 'mentor' or 'volunteer'

  const mentorDomains = [
    "Software Development", "Data Science & AI", "Core Engineering", 
    "Higher Studies (GRE/GATE)", "Civil Services / UPSC", "Entrepreneurship"
  ];

  const volunteerRoles = [
    "Hackathon Mentor / Judge", "NGO Social Work", 
    "Campus Placement Training", "Industrial Visit Coordinator"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="bg-[#1e40af] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <HandHelping className="mx-auto mb-6 text-blue-300" size={60} />
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Giving Back
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg font-medium opacity-90">
            Share your expertise and time. Help the current batch of VGECians build the future you once imagined.
          </p>
        </div>
      </section>

      {/* 2. Selection Cards */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Be a Mentor Card */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-b-8 border-blue-600 hover:shadow-2xl transition-all group">
          <Users className="text-blue-600 mb-6 group-hover:scale-110 transition" size={48} />
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Be a Mentor</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Guide individual students or small groups. Share career advice, technical insights, and interview tips.
          </p>
          <button 
            onClick={() => setActiveForm('mentor')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"
          >
            Sign Up as Mentor
          </button>
        </div>

        {/* Be a Volunteer Card */}
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-b-8 border-green-600 hover:shadow-2xl transition-all group">
          <Heart className="text-green-600 mb-6 group-hover:scale-110 transition" size={48} />
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Be a Volunteer</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Support college events, hackathons, or community service initiatives. Give your time for institutional growth.
          </p>
          <button 
            onClick={() => setActiveForm('volunteer')}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-black hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2"
          >
            Volunteer for Events
          </button>
        </div>
      </section>

      {/* 3. Dynamic Registration Form (Modal) */}
      {activeForm && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-3xl relative animate-in fade-in zoom-in duration-300">
            
            <div className="sticky top-0 bg-white border-b border-gray-100 p-8 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-black text-gray-900 uppercase">
                  {activeForm === 'mentor' ? 'Mentorship Application' : 'Volunteer Registration'}
                </h2>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">VGEC Alumni Engagement</p>
              </div>
              <button onClick={() => setActiveForm(null)} className="bg-gray-100 p-3 rounded-full hover:bg-red-50 hover:text-red-500">
                <X size={20} />
              </button>
            </div>
            
            <form className="p-8 space-y-6">
              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Full Name</label>
                  <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Batch Year</label>
                  <input type="number" min="1994" placeholder="e.g. 2018" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
                </div>
              </div>

              {/* Mentor Specific Fields */}
              {activeForm === 'mentor' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Mentorship Domain</label>
                    <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none bg-white">
                      {mentorDomains.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Preferred Availability Date</label>
                    <input type="date" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
                  </div>
                </>
              )}

              {/* Volunteer Specific Fields */}
              {activeForm === 'volunteer' && (
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Type of Volunteering</label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    {volunteerRoles.map(role => (
                      <label key={role} className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl hover:bg-green-50 cursor-pointer transition">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="text-sm font-bold text-gray-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase ml-1">Brief Motivation</label>
                <textarea rows="3" placeholder="Why would you like to contribute?" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required></textarea>
              </div>

              <button type="submit" className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-xl active:scale-[0.98] transition-all ${activeForm === 'mentor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
                Confirm Submission <CheckCircle className="inline ml-2" size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GivingBackPage;