import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, Navigation } from 'lucide-react';

const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent to VGEC Alumni Association.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      
         <section className="bg-blue-800 text-white py-12 px-6 shadow-md border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">Contact Us</h1>
            <p className="mt-2 text-blue-200 text-sm md:text-base">
              Reach out to the VGEC Alumni Association office or send us a direct message below.
            </p>
          </motion.div>
        </div>
      </section>

            <section className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col h-full"
        >
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-blue-900 uppercase tracking-wide">Get in Touch</h2>
            <p className="text-gray-600 text-sm mt-1">
              Whether you want to contribute to projects or organize a batch reunion, our team is ready to assist you.
            </p>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm flex-1 space-y-2">
            <ContactInfoItem icon={<MapPin size={20} />} title="Campus Address" desc="VGEC Campus, Nr. Visat Three Roads, Chandkheda, Ahmedabad, Gujarat - 382424" />
            <div className="h-px bg-gray-100 my-2"></div>
            <ContactInfoItem icon={<Phone size={20} />} title="Phone Number" desc="+91 79 23293866" />
            <div className="h-px bg-gray-100 my-2"></div>
            <ContactInfoItem icon={<Mail size={20} />} title="Email Address" desc="alumni@vgecg.ac.in" />
            <div className="h-px bg-gray-100 my-2"></div>
            <ContactInfoItem icon={<Globe size={20} />} title="Official Website" desc="www.vgecg.ac.in" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm h-full flex flex-col"
        >
          <h2 className="text-xl font-bold text-gray-800 uppercase border-b border-gray-200 pb-3 mb-5">
            Send Us A Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-blue-600 bg-gray-50" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Batch Year <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-blue-600 bg-gray-50" required />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
              <input type="email" className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-blue-600 bg-gray-50" required />
            </div>
            <div className="mb-6 flex-1 flex flex-col">
              <label className="block text-xs font-bold text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
              <textarea className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-blue-600 bg-gray-50 flex-1 min-h-[100px] resize-none" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 uppercase text-sm tracking-wide hover:bg-blue-800 transition-colors flex justify-center items-center gap-2">
              Send Message <Send size={16} />
            </button>
          </form>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-4">
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
           <h2 className="text-lg font-bold uppercase text-gray-800 flex items-center gap-2">
             <MapPin className="text-blue-700" size={20} /> Campus Location
           </h2>
        </div>

        <div className="relative w-full h-[350px] md:h-[450px] border border-gray-300 bg-gray-100 shadow-sm p-1">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.771945029801!2d72.59402287474799!3d23.10544277911573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83c959d4de6f%3A0x748d0828c02cf9fa!2sVishwakarma%20Government%20Engineering%20College!5e0!3m2!1sen!2sin!4v1775123575245!5m2!1sen!2sin" 
            className="w-full h-full border border-gray-200 grayscale hover:grayscale-0 transition-all duration-700"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="absolute top-4 right-4 z-10">
             <a 
              href="https://goo.gl/maps/y1zB3HwR5Wc1m8zQA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-800 px-4 py-2 border border-gray-300 font-bold uppercase text-xs tracking-wide flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
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
  <div className="flex items-start gap-4 py-2 hover:bg-gray-50 transition-colors p-2 -mx-2 rounded">
    <div className="text-blue-700 mt-0.5">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
      <p className="text-gray-600 text-sm mt-0.5">{desc}</p>
    </div>
  </div>
);

export default Contacts;