import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Navigation } from 'lucide-react';

const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent to VGEC Alumni Association.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Header Section (Same as before) */}
      <section className="bg-[#1e40af] text-white py-14 md:py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
            <MessageSquare size={250} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-5xl font-black mb-3 uppercase tracking-tighter">Contact Us</h1>
          <p className="text-blue-100 max-w-xl mx-auto text-xs md:text-base font-medium italic opacity-85">
            "Work is Worship" — Reach out to the VGEC Alumni Association office or send us a message below.
          </p>
        </motion.div>
      </section>

      {/* 2. Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto py-10 md:py-16 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Get in Touch</h2>
            <p className="text-gray-500 text-sm leading-relaxed italic">
              Whether you want to contribute to projects or organize a batch reunion, our team is ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <ContactInfoItem icon={<MapPin size={20} />} title="Address" desc="VGEC Campus, Chandkheda, Ahmedabad, Gujarat - 382424" />
            <ContactInfoItem icon={<Phone size={20} />} title="Phone" desc="+91 79 23293866" />
            <ContactInfoItem icon={<Mail size={20} />} title="Email" desc="alumni@vgecg.ac.in" />
            <ContactInfoItem icon={<Globe size={20} />} title="Official Website" desc="www.vgecg.ac.in" />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="p-3.5 bg-gray-50 border-none rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition font-bold text-sm" required />
              <input type="text" placeholder="Batch Year" className="p-3.5 bg-gray-50 border-none rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition font-bold text-sm" required />
            </div>
            <input type="email" placeholder="Email Address" className="p-3.5 bg-gray-50 border-none rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition font-bold text-sm" required />
            <textarea rows="3" placeholder="How can we help you?" className="p-3.5 bg-gray-50 border-none rounded-xl focus:ring-1 focus:ring-blue-500 outline-none transition font-bold text-sm resize-none" required></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition shadow-lg active:scale-95 shadow-blue-100">
              Send Message <Send size={16} className="inline ml-2"/>
            </button>
          </form>
        </motion.div>
      </section>

      {/* --- REFINED MINI MAP SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="relative w-full h-[250px] md:h-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.731388487729!2d72.592398575853!3d23.106889713177652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e824967335607%3A0x640097148566b7a2!2sVishwakarma%20Government%20Engineering%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            className="w-full h-full border-none"
            allowFullScreen="" 
            loading="lazy" 
          ></iframe>
          
          <div className="absolute top-4 right-4">
             <a 
              href="https://maps.app.goo.gl/3QW9X7Z5D5B8y6Yp6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-2 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-xl flex items-center gap-2 hover:bg-blue-600 hover:text-white transition"
            >
              Get Directions <Navigation size={14} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

const ContactInfoItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 group">
    <div className="bg-blue-600 p-3 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-black text-gray-900 uppercase tracking-tight text-xs md:text-sm">{title}</h3>
      <p className="text-gray-500 text-[11px] font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Contacts;