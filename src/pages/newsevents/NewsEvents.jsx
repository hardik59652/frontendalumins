import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Plus, X, 
  ArrowUpRight, Newspaper, Bell, Share2, Filter 
} from 'lucide-react';

const NewsEventsPage = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  // --- DUMMY DATA (Admin Controlled in future) ---
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
      location: "VGEC Main Auditorium, Chandkheda",
      time: "10:00 AM onwards",
      type: "Reunion"
    },
    {
      id: 2,
      title: "Webinar: Tech Trends in Silicon Valley",
      date: "March 22, 2026",
      location: "Online (Zoom)",
      time: "07:00 PM IST",
      type: "Knowledge Session"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#1e40af] text-white pt-20 pb-32 px-6 relative text-center">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            News & Events Hub
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg italic font-medium opacity-90">
            "Work is Worship" — Stay updated with the latest campus news and network at our upcoming events.
          </p>
          <button 
            onClick={() => setShowEventModal(true)}
            className="bg-white text-blue-800 px-8 py-4 rounded-2xl font-black hover:shadow-2xl transition flex items-center gap-2 mx-auto"
          >
            <Plus size={20} /> Add New Entry
          </button>
        </div>
      </section>

      {/* 2. DUAL LAYOUT: News (Left) & Events (Right) */}
      <div className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* --- NEWS SECTION (2 Columns) --- */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-2">
                <Newspaper className="text-blue-600" /> Latest News
              </h2>
              <button className="text-blue-600 font-bold text-sm hover:underline uppercase">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsData.map(news => (
                <div key={news.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 group transition-all hover:shadow-2xl">
                  <div className="h-56 overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{news.category}</span>
                    <h3 className="text-xl font-black text-gray-900 mt-2 mb-4 leading-tight">{news.title}</h3>
                    <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                      <span>{news.date}</span>
                      <button className="flex items-center gap-1 text-blue-600">Read More <ArrowUpRight size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- EVENTS SECTION (1 Column) --- */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-2">
                <Calendar className="text-blue-600" /> Events
              </h2>
            </div>

            <div className="space-y-4">
              {eventsData.map(event => (
                <div key={event.id} className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-100 hover:border-blue-400 transition-all group">
                  <div className="flex gap-4">
                    <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black leading-none shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                      <span className="text-lg">{event.date.split(' ')[1].replace(',', '')}</span>
                      <span className="text-[10px] uppercase">{event.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 leading-tight mb-2 uppercase text-sm">{event.title}</h4>
                      <div className="space-y-1">
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 font-bold">
                          <MapPin size={12} className="text-blue-500" /> {event.location}
                        </p>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 font-bold">
                          <Clock size={12} className="text-blue-500" /> {event.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-gray-50 text-blue-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
            
            {/* Newsletter Subscription Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
               <Bell className="absolute -right-5 -bottom-5 w-24 h-24 opacity-20 rotate-12" />
               <h3 className="text-xl font-black uppercase mb-2">Get Alerts</h3>
               <p className="text-blue-100 text-sm mb-6 opacity-80">Subscribe to our monthly newsletter for alumni updates.</p>
               <input type="email" placeholder="Your Email" className="w-full p-4 rounded-xl text-gray-900 text-sm font-bold outline-none mb-3" />
               <button className="w-full bg-white text-blue-900 py-4 rounded-xl font-black uppercase text-xs tracking-widest">Subscribe</button>
            </div>
          </div>

        </div>
      </div>

      {/* --- ADMIN ADD CONTENT MODAL --- */}
      {showEventModal && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-8 shadow-3xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowEventModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black text-gray-900 uppercase mb-6">Add News or Event</h2>
            
            <form className="space-y-4">
              <div className="flex gap-4 mb-6">
                <button type="button" className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-black uppercase text-xs">News</button>
                <button type="button" className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-400 font-black uppercase text-xs">Event</button>
              </div>
              <input type="text" placeholder="Title" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
              <textarea placeholder="Short Description" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" rows="3"></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
                <input type="text" placeholder="Category/Type" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" />
              </div>
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl uppercase mt-4">Publish Content</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsEventsPage;