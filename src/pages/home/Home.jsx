import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, BookOpen, ArrowRight, GraduationCap, MapPin, Sparkles } from 'lucide-react';

const Home = () => {
  // Teri naya Cloudinary Link
  const heroImg = "https://res.cloudinary.com/di14davts/image/upload/v1772540491/Gemini_Generated_Image_yyrlzayyrlzayyrl_zunbjz.png";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Hero Section - Full View & High Clarity */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="VGEC Campus Life" 
            // object-top se college name dikhega, h-full se students
            className="w-full h-full object-cover object-top brightness-110 contrast-105 transition-transform duration-1000 hover:scale-105" 
          />
          {/* Subtle Blue Gradient Overlay taaki text aur image dono clear rahein */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-900/20 to-white"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          {/* Identity Badge */}
          <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
            <GraduationCap size={14} className="text-blue-300" /> Connecting Since 1994
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-none uppercase tracking-tighter drop-shadow-2xl">
            Once a <span className="text-blue-400">Vishwakarmian</span>, <br />
            Always a Vishwakarmian.
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-blue-50 font-medium max-w-3xl mx-auto italic drop-shadow-lg">
            "Work is Worship" — Re-igniting 30+ years of excellence and legacy.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-blue-700 transition shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2">
              Join the Network <ArrowRight size={20} />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-white hover:text-blue-900 transition shadow-xl">
              Explore Events
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. Stats Section - Floating Reveal */}
      <section className="py-12 relative z-20 -mt-20 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Global Alumni", count: "25K+", icon: <Users size={24} /> },
            { label: "Current Mentors", count: "500+", icon: <Award size={24} /> },
            { label: "Chapters", count: "15+", icon: <MapPin size={24} /> },
            { label: "Est. Year", count: "1994", icon: <Calendar size={24} /> }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-default"
            >
              <div className="text-blue-600 flex justify-center mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-4xl font-black text-gray-900 mb-1 leading-none">{stat.count}</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="text-4xl font-black text-gray-900 uppercase tracking-tighter flex items-center justify-center gap-3"
          >
            <Sparkles className="text-blue-600" /> Why Join the Association?
          </motion.h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Users className="text-blue-600" size={32} />}
            title="Professional Networking"
            desc="Connect with seniors working in top MNCs and startups globally."
          />
          <FeatureCard 
            icon={<Award className="text-blue-600" size={32} />}
            title="Career Support"
            desc="Exclusive job portal and referrals for VGEC alumni members."
          />
          <FeatureCard 
            icon={<Calendar className="text-blue-600" size={32} />}
            title="Annual Reunions"
            desc="Relive your college days at our annual flagship meetups in Ahmedabad."
          />
        </div>
      </section>

      {/* 4. Events Section */}
      <section className="py-24 bg-gray-50 rounded-[4rem] mx-4 md:mx-10 border border-gray-100 mb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black text-blue-900 uppercase tracking-tighter leading-none">Upcoming Events</h2>
              <p className="text-gray-500 mt-3 font-medium italic opacity-80 uppercase text-xs tracking-widest tracking-widest">Mark your calendar for excellence.</p>
            </div>
            <button className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline">View All Events</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <EventCard 
              date="MAR 15"
              title="Tech Innovation Summit 2026"
              location="VGEC Auditorium, Chandkheda"
            />
            <EventCard 
              date="APR 10"
              title="Global Alumni Virtual Meet"
              location="Zoom / Online"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -12 }}
    className="p-12 border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all bg-white group border-b-8 border-transparent hover:border-blue-600 text-center md:text-left"
  >
    <div className="mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mx-auto md:mx-0">{icon}</div>
    <h3 className="text-2xl font-black mb-4 text-gray-900 uppercase tracking-tight">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed italic">{desc}</p>
  </motion.div>
);

const EventCard = ({ date, title, location }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white p-8 rounded-[3rem] flex flex-col md:flex-row gap-8 items-center border border-gray-100 shadow-md group"
  >
    <div className="bg-blue-600 text-white p-6 rounded-3xl text-center min-w-[100px] shadow-lg">
      <span className="block text-xs font-bold uppercase tracking-widest mb-1">{date.split(' ')[0]}</span>
      <span className="block text-4xl font-black leading-none">{date.split(' ')[1]}</span>
    </div>
    <div className="flex-1 text-center md:text-left">
      <h4 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 font-bold text-sm italic">
        <MapPin size={18} className="text-blue-500" /> {location}
      </p>
    </div>
    <button className="p-4 bg-gray-50 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
      <ArrowRight size={24} />
    </button>
  </motion.div>
);
export default Home;