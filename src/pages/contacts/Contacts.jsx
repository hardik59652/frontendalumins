import React from 'react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent to VGEC Alumni Association.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header Section */}
      <section className="bg-[#1e40af] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-wider">Contact Us</h1>
        <p className="text-blue-100 max-w-xl mx-auto">
          Have questions? Reach out to the VGEC Alumni Association office or send us a message below.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* 2. Left Side: Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you want to update your profile, contribute to college projects, or organize a batch reunion, we are here to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Address</h3>
                <p className="text-gray-600 text-sm">VGEC Campus, Visat-Gandhinagar Highway, Chandkheda, Ahmedabad, Gujarat - 382424</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p className="text-gray-600 text-sm">+91 79 23293866</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-gray-600 text-sm">alumni@vgecg.ac.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Official Website</h3>
                <p className="text-gray-600 text-sm">www.vgecg.ac.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Right Side: Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input type="text" placeholder="John Doe" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Batch (Year)</label>
                <input type="text" placeholder="e.g. 2018" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" required />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input type="email" placeholder="email@example.com" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <textarea rows="4" placeholder="How can we help you?" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" required></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* 4. Google Maps Placeholder */}
      <section className="h-96 w-full bg-gray-200 grayscale">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Google Maps Integration - Chandkheda Campus</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;