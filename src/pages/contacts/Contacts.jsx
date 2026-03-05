import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from 'lucide-react';

const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent to VGEC Alumni Association.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Header Section - Responsive Padding */}
      <section className="bg-[#1e40af] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
            <MessageSquare size={300} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Contact Us</h1>
          <p className="text-blue-100 max-w-xl mx-auto text-sm md:text-lg font-medium italic opacity-90">
            Have questions? Reach out to the VGEC Alumni Association office or send us a message below.
          </p>
        </motion.div>
      </section>

      {/* 2. Main Content - Responsive Grid */}
      <section className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 md:space-y-10"
        >
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 md:mb-6 uppercase tracking-tight">Get in Touch</h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed italic">
              Whether you want to update your profile, contribute to projects, or organize a batch reunion, our team is ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
            <ContactInfoItem 
              icon={<MapPin size={24} />} 
              title="Address" 
              desc="VGEC Campus, Visat-Gandhinagar Highway, Chandkheda, Ahmedabad, Gujarat - 382424" 
            />
            <ContactInfoItem 
              icon={<Phone size={24} />} 
              title="Phone" 
              desc="+91 79 23293866" 
            />
            <ContactInfoItem 
              icon={<Mail size={24} />} 
              title="Email" 
              desc="alumni@vgecg.ac.in" 
            />
            <ContactInfoItem 
              icon={<Globe size={24} />} 
              title="Official Website" 
              desc="www.vgecg.ac.in" 
            />
          </div>
        </motion.div>

        {/* Contact Form - Responsive Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100"
        >
          <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-gray-900 uppercase tracking-tight">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Full Name</label>
                <input type="text" placeholder="Alumni`s Name" className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition font-medium" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Batch (Year)</label>
                <input type="text" placeholder="e.g. 2026" className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition font-medium" required />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Email Address</label>
              <input type="email" placeholder="Alumni`s Email" className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition font-medium" required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest">Your Message</label>
              <textarea rows="4" placeholder="How can we help you?" className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition font-medium resize-none" required></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 shadow-blue-200">
              Send Message <Send size={18} />
            </button>
          </form>
        </motion.div>
      </section>

      {/* 3. Map Section - Responsive Height */}
      <section className="h-[300px] md:h-[500px] w-full bg-gray-200 relative">
         {/* Simple Placeholder for Map - In production you can use an iframe here */}
        <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50">
          <MapPin size={48} className="text-blue-600 mb-4 animate-bounce" />
          <h4 className="text-lg font-black uppercase tracking-tighter text-blue-900">VGEC Chandkheda Campus</h4>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Ahmedabad, Gujarat</p>
          <button className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-full font-black text-[10px] uppercase shadow-md hover:bg-blue-600 hover:text-white transition">Get Directions</button>
        </div>
      </section>
    </div>
  );
};

// --- Helper Component ---
const ContactInfoItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-5 group">
    <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm md:text-base">{title}</h3>
      <p className="text-gray-500 text-xs md:text-sm font-medium mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Contacts;