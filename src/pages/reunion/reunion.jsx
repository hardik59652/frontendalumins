import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Calendar, MapPin, Music, Sparkles, X, Heart, ChevronRight } from 'lucide-react';

const Reunion = () => {
  const [showRegModal, setShowRegModal] = useState(false);

  // Reunion Highlights (Enhanced Icons)
  const highlights = [
    { id: 1, title: "Gala Dinner", icon: <Music className="text-pink-500" size={28} /> },
    { id: 2, title: "Campus Tour", icon: <MapPin className="text-blue-500" size={28} /> },
    { id: 3, title: "Networking", icon: <Users className="text-green-500" size={28} /> },
    { id: 4, title: "Award Ceremony", icon: <Sparkles className="text-yellow-500" size={28} /> }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Full View & Responsive */}
      <section className="relative h-[80vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/70 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-6"
        >
          <span className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest mb-6 inline-block shadow-lg">
            Silver Jubilee Meet • 2026
          </span>
          <h1 className="text-4xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Back to <span className="text-blue-400">Roots</span>
          </h1>
          <p className="text-blue-50 text-base md:text-2xl max-w-3xl mx-auto font-medium italic opacity-90 leading-relaxed px-4">
            "Work is Worship" — Relive the memories and people that shaped your legacy at VGEC.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-6">
            <button 
              onClick={() => setShowRegModal(true)}
              className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition shadow-2xl active:scale-95"
            >
              Reserve My Spot
            </button>
            <button className="border-2 border-white/40 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-blue-900 transition active:scale-95 backdrop-blur-md">
              View Schedule
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. STATS/INFO BAR - Stackable on Mobile */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <InfoCard icon={<Calendar className="text-blue-600" size={32} />} title="When?" desc="25th Dec, 2026" />
          <InfoCard icon={<MapPin className="text-red-500" size={32} />} title="Where?" desc="VGEC Campus, Chandkheda" />
          <InfoCard icon={<Users className="text-green-500" size={32} />} title="Who?" desc="All Batches Welcome" />
        </div>
      </div>

      {/* 3. REUNION HIGHLIGHTS - Responsive Grid */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">What to Expect</h2>
          <div className="h-2 w-16 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {highlights.map(item => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={item.id} 
              className="text-center p-10 bg-gray-50 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                {item.icon}
              </div>
              <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. MEMORY LANE - Mobile Stacked View */}
      <section className="bg-gray-900 py-20 md:py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <Heart className="text-red-500 mb-6 mx-auto lg:mx-0" size={48} fill="currentColor" />
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">Relive the <br/> Golden Days</h2>
            <p className="text-gray-400 mb-10 text-sm md:text-lg font-medium italic opacity-80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Recall the long queues at the canteen, the late-night submissions, and the Visat-Gandhinagar highway vibes. Let's create new stories where it all began.
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 transition shadow-xl mx-auto lg:mx-0 active:scale-95">
              <Camera size={20} /> Share a Memory
            </button>
          </motion.div>

          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <motion.div whileHover={{ rotate: 0 }} className="h-48 md:h-72 bg-gray-800 rounded-[2.5rem] overflow-hidden rotate-3 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80" alt="Alumni" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ rotate: 0 }} className="h-48 md:h-72 bg-gray-800 rounded-[2.5rem] overflow-hidden -rotate-3 mt-10 md:mt-16 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80" alt="Students" className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. REGISTRATION MODAL - Mobile Bottom Sheet Style */}
      <AnimatePresence>
        {showRegModal && (
          <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] max-w-lg w-full p-8 md:p-12 shadow-3xl relative overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setShowRegModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-blue-600 transition">
                <X size={28} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">RSVP Now</h2>
              <p className="text-blue-600 text-[10px] font-black mb-10 italic uppercase tracking-widest">Reunion Meet 2026</p>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="Your Name" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Batch</label>
                    <input type="number" placeholder="e.g. 2026" min="1994" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dept</label>
                    <input type="text" placeholder="Your Branch" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gala Dinner?</label>
                  <select className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm bg-white">
                    <option>Yes, I'll be there!</option>
                    <option>No, maybe next time</option>
                  </select>
                </div>
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition shadow-2xl active:scale-95 shadow-blue-100">
                  Confirm Attendance
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Helper Components ---
const InfoCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100 flex items-center gap-5 hover:scale-105 transition-transform">
    <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-black text-gray-900 uppercase text-xs tracking-tight">{title}</h4>
      <p className="text-sm text-gray-500 font-bold italic">{desc}</p>
    </div>
  </div>
);

export default Reunion;