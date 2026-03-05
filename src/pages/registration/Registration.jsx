import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Lock, Phone, GraduationCap, 
  Building2, MapPin, Linkedin, Briefcase, 
  Camera, ChevronRight, Hash, Calendar 
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", phone: "",
    graduationYear: "", department: "", enrollmentNumber: "",
    currentCompany: "", jobTitle: "", location: "", linkedinUrl: ""
  });

  const departments = [
    "Computer Engineering", "Information Technology", 
    "Electronics & Communication", "Mechanical Engineering", 
    "Civil Engineering", "Instrumentation & Control", "Chemical Engineering"
  ];

  // Batch Years 1994 to 2026
  const years = Array.from({ length: 2026 - 1994 + 1 }, (_, i) => 1994 + i).reverse();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Congratulations! Registration Successful.");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100 rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white overflow-hidden z-10"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Join the <span className="text-blue-200">Legacy</span>
          </h2>
          <p className="mt-2 text-blue-100 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-80 italic">
            VGEC Alumni Association Registration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-12">
          
          {/* Section 1: Personal Details */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <User size={14} /> Step 1: Personal Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <User className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Mail className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Lock className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="password" type="password" placeholder="Create Password" onChange={handleChange} required className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Phone className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="phone" placeholder="Mobile Number" onChange={handleChange} required className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Section 2: Academic Roots */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <GraduationCap size={14} /> Step 2: Academic Roots
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Hash className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="enrollmentNumber" placeholder="Enrollment Number" onChange={handleChange} required className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
              
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Building2 className="text-gray-400 shrink-0" size={18} />
                <select name="department" onChange={handleChange} required className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 appearance-none cursor-pointer">
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Calendar className="text-gray-400 shrink-0" size={18} />
                <select name="graduationYear" onChange={handleChange} required className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 appearance-none cursor-pointer">
                  <option value="">Graduation Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-1 border border-transparent group">
                <Camera className="text-gray-400 shrink-0" size={18} />
                <input type="file" className="text-[10px] ml-3 w-full cursor-pointer file:bg-blue-100 file:border-none file:rounded-lg file:text-blue-700 file:font-black file:px-2 file:py-1" />
              </div>
            </div>
          </div>

          {/* Section 3: Professional Journey */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={14} /> Step 3: Professional Journey
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Building2 className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="currentCompany" placeholder="Current Organization" onChange={handleChange} className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Briefcase className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="jobTitle" placeholder="Current Job Title" onChange={handleChange} className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <MapPin className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="location" placeholder="City / Country" onChange={handleChange} className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
              <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 transition-all group">
                <Linkedin className="text-gray-400 group-focus-within:text-blue-600" size={18} />
                <input name="linkedinUrl" placeholder="LinkedIn URL" onChange={handleChange} className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:bg-blue-800 transition-all"
          >
            Create Alumni Profile <ChevronRight size={18} />
          </motion.button>
          
          <p className="text-center mt-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Already registered? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;