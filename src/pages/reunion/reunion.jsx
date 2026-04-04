import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Calendar, MapPin, Heart, X, CheckCircle } from 'lucide-react';
import axios from 'axios';

// Developer: Yash Patel
// Description: Official Reunion & Events Module (Enterprise UI)

const Reunion = () => {
  const [showRegModal, setShowRegModal] = useState(false);
  const [reunion, setReunion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    batch: "",
    department: "",
    galaDinner: "Yes, I'll be there!"
  });

  // Fetch reunion from backend
  const fetchReunion = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/reunion', {
        withCredentials: true
      });
      if (res.data && res.data.data) {
        setReunion(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching reunion:", err);
    }
  };

  useEffect(() => {
    fetchReunion();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for RSVP
    setTimeout(() => {
      alert("RSVP Confirmed! We look forward to seeing you at the reunion.");
      setShowRegModal(false);
      setFormData({ fullName: "", batch: "", department: "", galaDinner: "Yes, I'll be there!" });
      setIsSubmitting(false);
    }, 800);
  };

  // Helper to format image URL safely
  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80";
    return path.startsWith('http') ? path : `http://localhost:8000/${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-800 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Clean & Standard Banner */}
      <section className="relative h-[60vh] md:h-[50vh] flex items-center justify-center overflow-hidden border-b-4 border-blue-600">
        <div className="absolute inset-0 bg-blue-900/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${getImageUrl(reunion?.bannerImage)})` }}
        ></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        >
          <span className="bg-yellow-500 text-yellow-900 px-4 py-1.5 rounded-sm font-bold uppercase text-[10px] md:text-xs tracking-wider mb-4 inline-block shadow-sm">
            {reunion ? `Reunion • ${new Date(reunion.date).getFullYear()}` : 'Upcoming Event'}
          </span>
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 uppercase tracking-wide leading-tight">
            {reunion?.title || 'Back to Roots'}
          </h1>
          <p className="text-blue-100 text-sm md:text-lg font-medium opacity-90 leading-relaxed mb-8 max-w-2xl mx-auto">
            {reunion?.description || "Relive the memories and reconnect with the people that shaped your legacy at VGEC."}
          </p>
          
          <button 
            onClick={() => setShowRegModal(true)}
            className="bg-white text-blue-900 px-8 py-3 rounded font-bold uppercase text-xs tracking-wide hover:bg-gray-100 transition-colors shadow-sm"
          >
            Reserve My Spot
          </button>
        </motion.div>
      </section>

      {/* 2. STATS/INFO BAR - Clean Grid Layout */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            icon={<Calendar className="text-blue-700" size={24} />}
            title="When"
            desc={reunion ? new Date(reunion.date).toDateString() : "Date TBA"}
          />
          <InfoCard
            icon={<MapPin className="text-red-600" size={24} />}
            title="Where"
            desc={reunion?.location || "VGEC Campus"}
          />
          <InfoCard
            icon={<Users className="text-green-600" size={24} />}
            title="Who"
            desc="All Alumni Welcome"
          />
        </div>
      </div>

      {/* 3. REUNION HIGHLIGHTS - Professional Grid */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-6 border-b border-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide mb-3">Event Highlights</h2>
          <div className="h-1 w-16 bg-blue-700 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reunion?.highlights && reunion.highlights.length > 0 ? (
            reunion.highlights.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 border border-gray-200 shadow-sm text-center hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center rounded-lg"
              >
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded flex items-center justify-center mb-4 text-blue-600">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide">{item.title}</h3>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full py-10 font-medium">Highlights will be announced soon.</p>
          )}
        </div>
      </section>

      {/* 4. MEMORY LANE - Standard Two-Column Layout */}
      <section className="bg-gray-900 py-16 md:py-24 px-6 border-b-4 border-blue-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <Heart className="text-red-500 mb-4" size={32} fill="currentColor" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-4 leading-tight">
              Relive the Golden Days
            </h2>
            <p className="text-gray-300 mb-8 text-sm md:text-base font-medium leading-relaxed">
              Recall the long queues at the canteen, the late-night submissions, and the Visat-Gandhinagar highway vibes. Upload your old college photos and let's create new stories where it all began.
            </p>
            <button className="bg-blue-700 text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-wide flex items-center gap-2 hover:bg-blue-800 transition-colors shadow-sm">
              <Camera size={16} /> Share a Memory
            </button>
          </motion.div>

          {/* Clean Collage instead of tilted messy images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 md:h-64 bg-gray-800 border border-gray-700 rounded overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80" alt="Alumni Gathered" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-48 md:h-64 bg-gray-800 border border-gray-700 rounded overflow-hidden mt-8">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80" alt="Students Happy" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
        </div>
      </section>

      {/* 5. REGISTRATION MODAL - Standard Center Modal */}
      <AnimatePresence>
        {showRegModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
              onClick={() => setShowRegModal(false)}
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-lg w-full max-w-md shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-20">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Event RSVP</h2>
                  <p className="text-blue-700 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                    {reunion ? reunion.title : 'Reunion Meet'}
                  </p>
                </div>
                <button onClick={() => setShowRegModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleRSVPSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="As per records" 
                      className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Batch Year <span className="text-red-500">*</span></label>
                      <input 
                        type="number" 
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        placeholder="e.g. 2020" 
                        min="1994" 
                        max={new Date().getFullYear()}
                        className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Department <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Branch Name" 
                        className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Attending Gala Dinner? <span className="text-red-500">*</span></label>
                    <select 
                      name="galaDinner"
                      value={formData.galaDinner}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" 
                      required
                    >
                      <option value="Yes, I'll be there!">Yes, I'll be there!</option>
                      <option value="No, maybe next time">No, maybe next time</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowRegModal(false)} className="px-5 py-2.5 border border-gray-300 rounded text-gray-700 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className={`bg-blue-700 text-white px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wide shadow-sm transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}>
                      {isSubmitting ? "Confirming..." : "Confirm RSVP"}
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

// --- Clean Info Card Component ---
const InfoCard = ({ icon, title, desc }) => (
  <div className="bg-white p-5 border border-gray-200 shadow-sm rounded-lg flex items-center gap-4 hover:border-blue-300 transition-colors">
    <div className="bg-gray-50 border border-gray-100 p-3 rounded shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider">{title}</h4>
      <p className="text-sm text-gray-600 font-medium mt-0.5">{desc}</p>
    </div>
  </div>
);

export default Reunion;