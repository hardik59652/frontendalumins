import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, Award, Plus, X, CheckCircle, Search } from 'lucide-react';

const Achievements = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Entrepreneurship", "Academic", "Corporate", "Social Work", "Sports"];

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
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-[#1e40af] text-white py-12 md:py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Trophy size={300} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter flex justify-center items-center gap-2 md:gap-4">
            <Trophy size={36} className="text-yellow-400 md:w-12 md:h-12" /> Alumni <span className="text-blue-300">Stars</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 mb-8 text-sm md:text-xl font-medium italic opacity-90">
            Celebrating the legacy and success stories of VGECians across the globe.
          </p>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-800 px-6 py-3 md:px-10 md:py-4 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-blue-50 transition shadow-2xl flex items-center gap-2 mx-auto active:scale-95"
          >
            <Plus size={18} /> Share Your Achievement
          </button>
        </motion.div>
      </section>

      {/* --- FILTER BUTTONS (Mobile Scrollable) --- */}
      <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
        <div className="flex overflow-x-auto pb-4 no-scrollbar gap-3 md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all flex-shrink-0 ${
                activeCategory === cat 
                ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100" 
                : "bg-white text-gray-500 border-gray-100 hover:border-blue-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- ACHIEVEMENTS GRID --- */}
      <section className="py-8 md:py-16 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {initialAchievements
              .filter(item => activeCategory === "All" || item.type === activeCategory)
              .map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-50 group"
                >
                  <div className="h-32 md:h-40 bg-blue-50 flex items-center justify-center relative">
                    <Star size={40} className="text-blue-100 group-hover:text-blue-200 transition-colors" />
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                      {item.type}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-1 leading-tight uppercase tracking-tight">{item.title}</h3>
                    <p className="text-[10px] md:text-xs font-black text-blue-600 mb-4 tracking-widest uppercase">{item.name} <span className="text-gray-300 mx-2">|</span> Batch {item.batch}</p>
                    <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed mb-6 italic">{item.desc}</p>
                    <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 w-fit px-3 py-1 rounded-lg">
                      <CheckCircle size={14} /> Verified Legacy
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- MODAL (Mobile Optimized) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] max-w-lg w-full p-8 md:p-10 shadow-3xl relative overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-blue-600 transition">
                <X size={28} />
              </button>
              
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">Share Success</h2>
                <div className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full"></div>
              </div>
              
              <form className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Achievement Title</label>
                  <input type="text" placeholder="e.g. Received Young Engineer Award" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-medium" required />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                    <select className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium">
                      {categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Batch Year</label>
                    <input type="number" placeholder="2026" min="1994" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" required />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea rows="4" placeholder="How did you achieve this?" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium resize-none" required></textarea>
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl flex gap-4 items-center">
                  <Target className="text-blue-600 shrink-0" size={24} />
                  <p className="text-[10px] text-blue-800 font-bold uppercase tracking-tight leading-tight">
                    Admin will review your submission before it goes live.
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-blue-700 transition shadow-2xl shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
                >
                  Submit for Review <Award size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;