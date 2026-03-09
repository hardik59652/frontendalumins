import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Mail, Lock, Phone, GraduationCap, 
  Building2, MapPin, Linkedin, Briefcase, 
  Camera, ChevronRight, Hash, Calendar 
} from "lucide-react";
const Register = () => {
  const navigate = useNavigate();

const [profileImage,setProfileImage]=useState(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    graduationYear: "",
    department: "",
    enrollmentNumber: "",
    currentCompany: "",
    jobTitle: "",
    location: "",
    linkedinUrl: ""
  });

  const departments = [
    "Computer Engineering", "Information Technology",
    "Electronics & Communication", "Mechanical Engineering",
    "Civil Engineering", "Instrumentation & Control", "Chemical Engineering"
  ];

  const years = Array.from({ length: 2026 - 1994 + 1 }, (_, i) => 1994 + i).reverse();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    const response = await fetch("http://10.11.6.240:8000/api/v1/users/register", {
      method: "POST",
      body: form
    });

    console.log("STATUS:", response.status);

    const text = await response.text(); 
    console.log("RESPONSE:", text);

if (response.ok) {

  alert("Registration Successful! Please login.");

  localStorage.setItem("registeredName", formData.fullName);

  navigate("/login");

}
    else {
      alert("Backend returned error");
    }

  } catch (error) {
    console.log("FETCH ERROR:", error);
    alert("Server error");
  }
};



      
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100 rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white overflow-hidden z-10"
      >

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Join the <span className="text-blue-200">Legacy</span>
          </h2>
          <p className="mt-2 text-blue-100 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-80 italic">
            VGEC Alumni Association Registration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-12">

          {/* PERSONAL DETAILS */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <User size={14}/> Step 1: Personal Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="password"
                type="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="phoneNumber"
                placeholder="Mobile Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="input"
              />
<input 
type="file"
accept="image/*"
onChange={(e)=>setProfileImage(e.target.files[0])}
/>
            </div>
          </div>

          {/* ACADEMIC DETAILS */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <GraduationCap size={14}/> Step 2: Academic Roots
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                name="enrollmentNumber"
                placeholder="Enrollment Number"
                value={formData.enrollmentNumber}
                onChange={handleChange}
                required
                className="input"
              />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select Department</option>
                {departments.map((d)=>(
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Graduation Year</option>
                {years.map((y)=>(
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

            </div>
          </div>

          {/* PROFESSIONAL DETAILS */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Briefcase size={14}/> Step 3: Professional Journey
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                name="currentCompany"
                placeholder="Current Organization"
                value={formData.currentCompany}
                onChange={handleChange}
                className="input"
              />

              <input
                name="jobTitle"
                placeholder="Current Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="input"
              />

              <input
                name="location"
                placeholder="City / Country"
                value={formData.location}
                onChange={handleChange}
                className="input"
              />

              <input
                name="linkedinUrl"
                placeholder="LinkedIn URL"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="input"
              />

            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em]"
          >
            Create Alumni Profile <ChevronRight size={18}/>
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default Register;