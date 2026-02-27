import React, { useState } from 'react';
import { Trophy, Star, Target, Award, Plus, X, CheckCircle } from 'lucide-react';

const Achievements = () => {
  // 1. States
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Achievement Types (Categories)
  const categories = ["All", "Entrepreneurship", "Academic", "Corporate", "Social Work", "Sports"];

  // 2. Dummy Data (Skeleton)
  const initialAchievements = [
    {
      id: 1,
      title: "Founded Tech Startup 'Innovate'",
      name: "Rahul Mehta",
      batch: "2015",
      type: "Entrepreneurship",
      desc: "Successfully raised $1M in seed funding for AI-based healthcare solutions.",
      status: "approved"
    },
    {
      id: 2,
      title: "Best Researcher Award 2025",
      name: "Sneha Patel",
      batch: "2018",
      type: "Academic",
      desc: "Published 5+ papers in international journals regarding VLSI design.",
      status: "approved"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#1e40af] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-tight flex justify-center items-center gap-3">
          <Trophy size={40} className="text-yellow-400" /> Alumni Achievements
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100 mb-8">
          Celebrating the success stories of VGECians across the globe.
        </p>
        
        {/* ADD ACHIEVEMENT BUTTON (Only visible when logged in) */}
        <button 
          onClick={() => setShowModal(true)}
          className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition shadow-lg flex items-center gap-2 mx-auto"
        >
          <Plus size={20} /> Add Your Achievement
        </button>
      </section>

      {/* --- FILTER BUTTONS --- */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap justify-center gap-3 border-b pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg font-semibold border transition-all ${
                activeCategory === cat 
                ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- ACHIEVEMENTS GRID --- */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialAchievements
            .filter(item => activeCategory === "All" || item.type === activeCategory)
            .map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all bg-white group">
                <div className="h-40 bg-blue-50 flex items-center justify-center relative">
                  <Star size={40} className="text-blue-200 group-hover:scale-110 transition" />
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {item.type}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm font-bold text-blue-700 mb-3">{item.name} | Batch {item.batch}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
                    <CheckCircle size={14} /> Verified by Admin
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* --- ADD ACHIEVEMENT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-'100' flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Share Your Success</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Achievement Title</label>
                <input type="text" placeholder="e.g. Received Young Engineer Award" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                  <select className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Batch Year</label>
                  <input type="number" placeholder="1994" min="1994" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Detailed Description</label>
                <textarea rows="4" placeholder="Briefly explain your achievement..." className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-3">
                <Target className="text-yellow-600 shrink-0" size={20} />
                <p className="text-xs text-yellow-800 leading-tight">
                  <b>Note:</b> After submission, the admin will review your achievement. Once approved, it will be visible to everyone on this page.
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"
              >
                Submit for Approval <Award size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;