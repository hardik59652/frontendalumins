import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Plus, X, 
  Newspaper, Bell, Sparkles, ChevronRight 
} from 'lucide-react';


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
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group"
                  // className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition group"
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
    <Calendar size={28} className="text-blue-600" /> Upcoming Events
  </h2>

  <div className="space-y-6">

  {eventsData.length > 0 ? eventsData.map((event, i) => (

    <motion.div
      key={event._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-5 group"
    >

      {/* Event Image */}

      <div className="h-40 rounded-xl overflow-hidden mb-4">

        <img
          src={`http://localhost:8000/${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />

      </div>

      {/* Title */}

      <h4 className="font-bold text-lg mb-2">
        {event.title}
      </h4>

      {/* Date */}

      <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
        <Calendar size={14}/> {formatDate(event.eventDate)}
      </p>

      {/* Location */}

      <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
        <MapPin size={14}/> {event.location}
      </p>

      {/* Time */}

      <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
        <Clock size={14}/> {event.time}
      </p>

      {/* Register */}

<button
onClick={()=>{
  setSelectedEvent(event);
  setShowRegisterModal(true);
}}
className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1"
>
Register <ChevronRight size={16} />
</button>
 
    </motion.div>

  )) : (

    <p className="text-gray-400">No upcoming events</p>

  )}

  </div>

</div>

        </div>
      </div>
    
      <AnimatePresence>
{showRegisterModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<motion.div
initial={{ scale:0.9, opacity:0 }}
animate={{ scale:1, opacity:1 }}
exit={{ scale:0.9, opacity:0 }}
className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl"
>

<h2 className="text-lg font-bold mb-3">
Confirm Registration
</h2>

<p className="text-sm text-gray-600 mb-6">
Are you sure you want to register for  
<span className="font-semibold"> {selectedEvent?.title}</span> ?
</p>

<div className="flex gap-3 justify-end">

<button
onClick={()=>setShowRegisterModal(false)}
className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
>
Cancel
</button>

<button
onClick={registerForEvent}
disabled={loading}
className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
>
{loading ? "Registering..." : "Yes, Register"}
</button>

</div>

</motion.div>

</div>

)}
</AnimatePresence>

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