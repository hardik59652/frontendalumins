import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Plus, X, 
  Newspaper, Sparkles, ChevronRight, AlertCircle
} from 'lucide-react';
import axios from 'axios';

const NewsEventsPage = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  
  const [eventsData, setEventsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchNewsAndEvents = async () => {
    try {
      const [newsRes, eventsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/v1/news/published", { withCredentials: true }),
        axios.get("http://localhost:8000/api/v1/events/published", { withCredentials: true })
      ]);

      if (newsRes.data?.data) setNewsData(newsRes.data.data);
      if (eventsRes.data?.data) setEventsData(eventsRes.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsAndEvents();

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') fetchNewsAndEvents();
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const registerForEvent = async () => {
    if (!selectedEvent) return;
    
    try {
      setLoading(true);
      
      const res = await axios.post(`http://localhost:8000/api/v1/events/register/${selectedEvent._id}`, {}, {
        withCredentials: true
      });
      
      if (res.data) {
        alert("Successfully registered!");
        setShowRegisterModal(false);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 selection:bg-blue-100">
      
      <section className="bg-blue-800 text-white py-16 px-6 border-b border-blue-900 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={12} className="text-yellow-400" /> What's New at VGEC
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-3">
              Legacy <span className="text-blue-300">&</span> Updates
            </h1>
            <p className="text-blue-200 text-sm font-medium max-w-xl">
              Stay connected with campus milestones, achievements, and exclusive global alumni events.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <button 
              onClick={() => setShowEventModal(true)}
              className="w-full md:w-auto bg-white text-blue-900 hover:bg-slate-100 px-6 py-3 rounded-sm font-bold uppercase text-[11px] tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add New Entry
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                <Newspaper size={16} className="text-blue-700" /> Latest News
              </h2>
            </div>
            
            {isDataLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsData.length > 0 ? newsData.map((news, i) => (
                  <motion.div 
                    key={news._id}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
                  >
                    <div className="h-48 overflow-hidden bg-slate-100 border-b border-slate-200 relative">
                      <img
                        src={`http://localhost:8000/${news.image}`}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image" }}
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1 font-medium">
                        {news.description}
                      </p>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {formatDate(news.publishedAt)}
                        </span>
                        {news.category && (
                          <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border border-slate-200">
                            {news.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full text-center py-16 bg-white border border-slate-200 rounded-sm shadow-sm">
                     <p className="text-slate-500 font-bold text-[11px] uppercase tracking-widest">No news available at the moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                <Calendar size={16} className="text-blue-700" /> Upcoming Events
              </h2>
            </div>

            {isDataLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {eventsData.length > 0 ? eventsData.map((event, i) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white border border-slate-200 border-l-2 border-l-blue-700 rounded-sm shadow-sm hover:shadow-md transition-all p-5 flex flex-col group"
                  >
                    <div className="h-32 rounded-sm bg-slate-100 border border-slate-200 overflow-hidden mb-4 relative">
                      <img
                        src={`http://localhost:8000/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x150?text=Event" }}
                      />
                    </div>

                    <h4 className="font-black text-slate-900 text-sm leading-tight mb-3">
                      {event.title}
                    </h4>

                    <div className="space-y-2 mb-5">
                      <p className="text-[11px] text-slate-600 flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Calendar size={12} className="text-slate-400 shrink-0"/> {formatDate(event.eventDate)}
                      </p>
                      <p className="text-[11px] text-slate-600 flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Clock size={12} className="text-slate-400 shrink-0"/> {event.time}
                      </p>
                      <p className="text-[11px] text-slate-600 flex items-start gap-2 font-bold uppercase tracking-wider">
                        <MapPin size={12} className="text-slate-400 shrink-0 mt-0.5"/> 
                        <span className="leading-snug">{event.location}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowRegisterModal(true);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 text-blue-700 hover:bg-blue-50 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 mt-auto"
                    >
                      Register <ChevronRight size={12} />
                    </button>
                  </motion.div>
                )) : (
                  <div className="text-center py-16 bg-white border border-slate-200 rounded-sm shadow-sm">
                     <p className="text-slate-500 font-bold text-[11px] uppercase tracking-widest">No upcoming events.</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowRegisterModal(false)}
            />

            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-white rounded-sm w-full max-w-sm shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                 <AlertCircle size={16} className="text-blue-700" />
                 <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.15em]">
                   Confirm Registration
                 </h2>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                  Are you sure you want to register for <br/>
                  <span className="font-black text-slate-900 block mt-1">{selectedEvent?.title}</span>
                </p>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-sm text-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={registerForEvent}
                    disabled={loading}
                    className={`px-4 py-2 rounded-sm bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                  >
                    {loading ? "Registering..." : "Confirm"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowEventModal(false)}
            />

            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-white rounded-sm w-full max-w-md shadow-2xl relative z-10 flex flex-col overflow-hidden"
            >
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.15em]">Create Update</h2>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter title..." 
                      className="w-full border border-slate-300 rounded-sm p-3 text-sm font-medium focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Description <span className="text-red-500">*</span></label>
                    <textarea 
                      placeholder="Enter description details..." 
                      rows="5"
                      className="w-full border border-slate-300 rounded-sm p-3 text-sm font-medium focus:outline-none focus:border-slate-500 resize-none placeholder:text-slate-400"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-4">
                    <button 
                      type="button"
                      onClick={() => setShowEventModal(false)}
                      className="px-5 py-2.5 border border-slate-300 rounded-sm text-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-700 text-white px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-colors">
                      Publish
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NewsEventsPage;