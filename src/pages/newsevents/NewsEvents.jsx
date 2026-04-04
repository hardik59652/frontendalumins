import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Plus, X, 
  Newspaper, Sparkles, ChevronRight, AlertCircle
} from 'lucide-react';

// Developer: Yash Patel
// Description: Alumni News & Events Portal (Enterprise UI)

const NewsEventsPage = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeType, setActiveType] = useState("News");
  const [eventsData, setEventsData] = useState([]);
  // ✅ NEW STATE FOR API DATA
  const [newsData, setNewsData] = useState([]);

  // ✅ FETCH PUBLISHED NEWS
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/news/published",
          {
            method: "GET",
            credentials: "include"
          }
        );

        const data = await res.json();

        if (data?.data) {
          setNewsData(data.data);
        }

      } catch (error) {
        console.log("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // ✅ FORMAT DATE
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/events/published",
          {
            method: "GET",
            credentials: "include"
          }
        );
  
        const data = await res.json();
  
        if (data?.data) {
          setEventsData(data.data);
        }
  
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, []);

  // register event
  const registerForEvent = async () => {
    if (!selectedEvent) return;
  
    try {
      setLoading(true);
  
      const res = await fetch(
        `http://localhost:8000/api/v1/events/register/${selectedEvent._id}`,
        {
          method: "POST",
          credentials: "include"
        }
      );
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }
  
      alert("Successfully registered 🎉");
      setShowRegisterModal(false);
  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-blue-800 text-white py-14 px-6 border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-900 border border-blue-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} className="text-yellow-400" /> What's New at VGEC
            </div>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-3">
              Legacy <span className="text-blue-300">&</span> Updates
            </h1>
            <p className="text-blue-200 text-sm md:text-base font-medium max-w-xl">
              Stay connected with campus milestones, achievements, and exclusive global alumni events.
            </p>
          </div>
          <div>
            <button 
              onClick={() => setShowEventModal(true)}
              className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded font-bold uppercase text-xs tracking-wide transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus size={18} /> Add New Entry
            </button>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT (DUAL LAYOUT) --- */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- NEWS SECTION (Left 8 Columns) --- */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <Newspaper size={20} className="text-blue-700" /> Latest News
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ✅ MAP API DATA */}
              {newsData.length > 0 ? newsData.map((news, i) => (
                <motion.div 
                  key={news._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="h-48 overflow-hidden bg-gray-100 border-b border-gray-200">
                    {/* ✅ IMAGE FROM BACKEND */}
                    <img
                      src={`http://localhost:8000/${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image" }}
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                      {news.description}
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        {formatDate(news.publishedAt)}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                        {news.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-12 bg-white border border-gray-200 rounded-lg">
                   <p className="text-gray-500 font-medium">No news available at the moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* --- EVENTS SECTION (Right 4 Columns) --- */}
          <div className="lg:col-span-4 space-y-6">

            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <Calendar size={20} className="text-blue-700" /> Upcoming Events
              </h2>
            </div>

            <div className="space-y-4">
              {eventsData.length > 0 ? eventsData.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-gray-200 border-l-4 border-l-blue-600 rounded shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
                >
                  {/* Event Image */}
                  <div className="h-32 rounded bg-gray-100 border border-gray-200 overflow-hidden mb-3">
                    <img
                      src={`http://localhost:8000/${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x150?text=Event" }}
                    />
                  </div>

                  <h4 className="font-bold text-gray-900 text-base leading-tight mb-3">
                    {event.title}
                  </h4>

                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs text-gray-600 flex items-center gap-2 font-medium">
                      <Calendar size={14} className="text-gray-400"/> {formatDate(event.eventDate)}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-2 font-medium">
                      <Clock size={14} className="text-gray-400"/> {event.time}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-2 font-medium">
                      <MapPin size={14} className="text-gray-400"/> {event.location}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowRegisterModal(true);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 text-blue-700 hover:bg-blue-50 py-2 rounded text-xs font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-1 mt-auto"
                  >
                    Register <ChevronRight size={14} />
                  </button>
                </motion.div>
              )) : (
                <div className="text-center py-10 bg-white border border-gray-200 rounded-lg">
                   <p className="text-gray-500 font-medium text-sm">No upcoming events scheduled.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    
      {/* --- REGISTRATION CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
              onClick={() => setShowRegisterModal(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-lg w-full max-w-sm shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                 <AlertCircle size={18} className="text-blue-700" />
                 <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                   Confirm Registration
                 </h2>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Are you sure you want to register for <br/>
                  <span className="font-bold text-gray-900">{selectedEvent?.title}</span>?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-xs font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={registerForEvent}
                    disabled={loading}
                    className={`px-4 py-2 rounded bg-blue-700 text-white text-xs font-bold uppercase tracking-wide transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800 shadow-sm'}`}
                  >
                    {loading ? "Registering..." : "Yes, Register"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CREATE UPDATE MODAL (Styled to match Enterprise UI) --- */}
      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
              onClick={() => setShowEventModal(false)}
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-lg w-full max-w-md shadow-2xl relative z-10 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Create Update</h2>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Title</label>
                    <input 
                      type="text" 
                      placeholder="Enter title..." 
                      className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Description</label>
                    <textarea 
                      placeholder="Enter description details..." 
                      rows="4"
                      className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white resize-none"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-2">
                    <button 
                      type="button"
                      onClick={() => setShowEventModal(false)}
                      className="px-5 py-2 border border-gray-300 rounded text-gray-700 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded text-sm font-bold uppercase tracking-wide shadow-sm hover:bg-blue-800 transition-colors">
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