import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Plus, X, 
  ArrowUpRight, Newspaper, Bell, Share2, Sparkles, ChevronRight 
} from 'lucide-react';

const NewsEventsPage = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeType, setActiveType] = useState("News"); // 'News' or 'Event' for modal

  const newsData = [
    {
      id: 1,
      title: "VGEC Alumni bags 'Innovator of the Year' award",
      date: "Feb 20, 2026",
      category: "Achievement",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "New R&D Lab inaugurated at IT Department",
      date: "Feb 15, 2026",
      category: "Campus News",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80"
    }
  ];

  const eventsData = [
    {
      id: 1,
      title: "Annual Alumni Meet 2026",
      date: "March 15, 2026",
      location: "VGEC Main Auditorium",
      time: "10:00 AM",
      type: "Reunion"
    },
    {
      id: 2,
      title: "Webinar: Silicon Valley Trends",
      date: "March 22, 2026",
      location: "Online (Zoom)",
      time: "07:00 PM IST",
      type: "Knowledge"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION - High Impact */}
      <section className="bg-[#1e40af] text-white py-16 md:py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Newspaper className="absolute -left-10 -bottom-10 w-64 h-64 rotate-12" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" /> What's New at VGEC
          </span>
          <h1 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none">
            Legacy <span className="text-blue-300">&</span> Updates
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-sm md:text-xl font-medium italic opacity-90 px-4">
            "Work is Worship" — Stay connected with campus milestones and exclusive global alumni events.
          </p>
          <button 
            onClick={() => setShowEventModal(true)}
            className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-2xl transition-all active:scale-95 flex items-center gap-2 mx-auto shadow-xl"
          >
            <Plus size={18} /> Add New Entry
          </button>
        </motion.div>
      </section>

      {/* 2. CONTENT HUB - Dual Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- NEWS SECTION (Left 8 Columns) --- */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center justify-between border-b-4 border-gray-50 pb-6">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                <Newspaper size={32} className="text-blue-600" /> Latest Feed
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsData.map((news, i) => (
                <motion.div 
                  key={news.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
                >
                  <div className="h-60 overflow-hidden relative">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 leading-tight uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{news.date}</span>
                      <button className="flex items-center gap-1 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:gap-2 transition-all">
                        Read Story <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- EVENTS & ALERTS (Right 4 Columns) --- */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Events Timeline */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                <Calendar size={32} className="text-blue-600" /> Upcoming
              </h2>
              
              <div className="space-y-6">
                {eventsData.map(event => (
                  <div key={event.id} className="relative pl-8 border-l-2 border-blue-100 group">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 hover:border-blue-300 transition-all hover:shadow-lg">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{event.type}</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase">{event.date}</span>
                      </div>
                      <h4 className="font-black text-gray-900 leading-tight mb-4 uppercase text-sm tracking-tight">{event.title}</h4>
                      <div className="space-y-2 mb-6">
                        <p className="text-[11px] text-gray-500 flex items-center gap-2 font-bold italic">
                          <MapPin size={14} className="text-blue-500" /> {event.location}
                        </p>
                        <p className="text-[11px] text-gray-500 flex items-center gap-2 font-bold italic">
                          <Clock size={14} className="text-blue-500" /> {event.time}
                        </p>
                      </div>
                      <button className="w-full bg-gray-50 text-blue-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        RSVP Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription - Modern Card */}
            <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <Bell className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
               <h3 className="text-xl md:text-2xl font-black uppercase mb-2 tracking-tighter">Stay Alert</h3>
               <p className="text-blue-100 text-[11px] font-medium mb-6 opacity-80 uppercase tracking-wider">Join 5000+ alumni for monthly news updates.</p>
               <input type="email" placeholder="email@example.com" className="w-full p-4 rounded-2xl text-gray-900 text-sm font-bold outline-none mb-3 bg-white/95 focus:ring-4 focus:ring-white/20 transition-all" />
               <button className="w-full bg-white text-blue-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg hover:bg-blue-50 transition-colors">Subscribe</button>
            </div>
          </div>

        </div>
      </div>

      {/* --- MODAL (Mobile Bottom Sheet Style) --- */}
      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] max-w-lg w-full p-8 md:p-10 shadow-3xl relative"
            >
              <button onClick={() => setShowEventModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-blue-600 transition">
                <X size={28} />
              </button>
              
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">Create Update</h2>
                <div className="h-1.5 w-12 bg-blue-600 mt-2 rounded-full"></div>
              </div>
              
              <form className="space-y-5">
                <div className="flex gap-3 mb-4 bg-gray-50 p-1.5 rounded-2xl">
                  <button 
                    type="button" 
                    onClick={() => setActiveType("News")}
                    className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeType === "News" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400"}`}
                  >News</button>
                  <button 
                    type="button" 
                    onClick={() => setActiveType("Event")}
                    className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeType === "Event" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400"}`}
                  >Event</button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                  <input type="text" placeholder="e.g. Campus Reunion" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date</label>
                    <input type="date" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                    <input type="text" placeholder="Achievement" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea rows="3" placeholder="Brief details about the news/event..." className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-sm resize-none" required></textarea>
                </div>

                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest shadow-2xl active:scale-95 transition-all shadow-blue-100">
                  Publish Now
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsEventsPage;