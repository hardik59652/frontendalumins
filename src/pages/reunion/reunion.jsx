import React, { useState } from 'react';
import { Camera, Users, Calendar, MapPin, Music, Sparkles, X, Heart } from 'lucide-react';

const Reunion = () => {
  const [showRegModal, setShowRegModal] = useState(false);

  // Reunion Highlights (Dummy Data)
  const highlights = [
    { id: 1, title: "Gala Dinner", icon: <Music className="text-pink-500" /> },
    { id: 2, title: "Campus Tour", icon: <MapPin className="text-blue-500" /> },
    { id: 3, title: "Networking", icon: <Users className="text-green-500" /> },
    { id: 4, title: "Award Ceremony", icon: <Sparkles className="text-yellow-500" /> }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      
      {/* 1. HERO SECTION: Emotional & Nostalgic */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-blue-900/60 z-10"></div>
        {/* Placeholder for Campus/Group Photo */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        
        <div className="relative z-20 text-center px-6">
          <span className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest mb-6 inline-block">
            Coming Soon: Silver Jubilee Meet
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter">
            Back to <span className="text-blue-400">Roots</span>
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-3xl mx-auto font-medium opacity-90 italic">
            "Work is Worship" — Reconnect with the people and the place that shaped your journey at VGEC.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowRegModal(true)}
              className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-black hover:scale-105 transition shadow-2xl uppercase tracking-tight"
            >
              Reserve My Spot
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-2xl font-black hover:bg-white hover:text-blue-900 transition uppercase tracking-tight">
              View Schedule
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS/INFO BAR */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-5">
            <Calendar className="text-blue-600" size={40} />
            <div>
              <h4 className="font-black text-gray-900 uppercase">When?</h4>
              <p className="text-sm text-gray-500 font-bold">25th Dec, 2026</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-5">
            <MapPin className="text-red-500" size={40} />
            <div>
              <h4 className="font-black text-gray-900 uppercase">Where?</h4>
              <p className="text-sm text-gray-500 font-bold">VGEC Campus, Chandkheda</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-5">
            <Users className="text-green-500" size={40} />
            <div>
              <h4 className="font-black text-gray-900 uppercase">Who?</h4>
              <p className="text-sm text-gray-500 font-bold">All Batches Welcome</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. REUNION HIGHLIGHTS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">What to Expect</h2>
          <div className="h-2 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map(item => (
            <div key={item.id} className="text-center p-10 bg-gray-50 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                {item.icon}
              </div>
              <h3 className="font-black text-gray-900 uppercase text-sm tracking-widest">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MEMORY LANE: Photo Section */}
      <section className="bg-gray-900 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <Heart className="text-red-500 mb-6" size={48} fill="currentColor" />
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">Relive the <br/> Golden Days</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-medium">
              Recall the long queues at the canteen, the late-night submissions, and the Visat-Gandhinagar highway vibes. Let's create new memories together.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
              <Camera size={20} /> Share a Memory Photo
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="h-64 bg-gray-800 rounded-3xl overflow-hidden rotate-3">
               <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80" alt="Alumni" className="h-full w-full object-cover" />
            </div>
            <div className="h-64 bg-gray-800 rounded-3xl overflow-hidden -rotate-2 mt-12">
               <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80" alt="Students" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGISTRATION MODAL */}
      {showRegModal && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-10 shadow-3xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowRegModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase">RSVP Now</h2>
            <p className="text-gray-500 text-sm font-bold mb-8 italic uppercase tracking-widest">Back to VGEC 2026</p>
            
            <form className="space-y-5">
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Batch Year" min="1994" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
                <input type="text" placeholder="Department" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
              </div>
              <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none">
                <option>Staying for Dinner?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-xl">
                Confirm My Attendance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reunion;