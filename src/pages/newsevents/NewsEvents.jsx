import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Plus, X, 
  Newspaper, Bell, Sparkles, ChevronRight 
} from 'lucide-react';

const NewsEventsPage = () => {

  const [showEventModal, setShowEventModal] = useState(false);
  const [activeType, setActiveType] = useState("News");

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

  // EVENTS STILL STATIC (for now)
  const eventsData = [
    {
      id: 1,
      title: "Annual Alumni Meet 2026",
      date: "March 15, 2026",
      location: "VGEC Main Auditorium",
      time: "10:00 AM",
      type: "Reunion"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* HERO */}
      <section className="bg-[#1e40af] text-white py-16 md:py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Newspaper className="absolute -left-10 -bottom-10 w-64 h-64 rotate-12" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} /> What's New at VGEC
          </span>

          <h1 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
            Legacy <span className="text-blue-300">&</span> Updates
          </h1>

          <button 
            onClick={() => setShowEventModal(true)}
            className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-2 mx-auto"
          >
            <Plus size={18} /> Add New Entry
          </button>
        </motion.div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* NEWS SECTION */}
          <div className="lg:col-span-8 space-y-10">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <Newspaper size={28} className="text-blue-600" /> Latest News
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* ✅ MAP API DATA */}
              {newsData.length > 0 ? newsData.map((news, i) => (

                <motion.div 
                  key={news._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition group"
                >
                  <div className="h-56 overflow-hidden">

                    {/* ✅ IMAGE FROM BACKEND */}
                    <img
                      src={`http://localhost:8000/${news.image}`}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />

                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3">
                      {news.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {news.description}
                    </p>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatDate(news.publishedAt)}</span>
                      <span className="text-blue-600 font-bold">
                        {news.category}
                      </span>
                    </div>
                  </div>
                </motion.div>

              )) : (
                <p className="text-gray-400">No news available</p>
              )}

            </div>
          </div>

          {/* EVENTS */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <Calendar size={28} className="text-blue-600" /> Events
            </h2>

            {eventsData.map(event => (
              <div key={event.id} className="bg-white p-5 rounded-xl shadow">
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-sm text-gray-500">{event.date}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={14} /> {event.location}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} /> {event.time}
                </p>

                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded">
                  Register
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* MODAL (unchanged UI) */}
      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-xl w-full max-w-md"
            >
              <button 
                onClick={() => setShowEventModal(false)}
                className="float-right"
              >
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4">Create Update</h2>

              <form className="space-y-4">
                <input type="text" placeholder="Title" className="w-full border p-2"/>
                <textarea placeholder="Description" className="w-full border p-2"/>
                <button className="bg-blue-600 text-white px-4 py-2 w-full">
                  Publish
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