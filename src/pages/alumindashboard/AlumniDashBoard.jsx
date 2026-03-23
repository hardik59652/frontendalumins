import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, Bell, Settings, Award, MessageSquare, ChevronRight, Star } from 'lucide-react';

const AlumniDashboard = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch("http://localhost:8000/api/v1/users/currentuser", {
            method: "GET",
            credentials: "include"   // IMPORTANT for cookies
          });
    
          const data = await res.json();
          setUser(data.data);
    
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
    
      fetchUser();
    }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans text-gray-900">
      
      {/* Header Banner */}
      <div className="bg-[#1e40af] h-32 md:h-48 w-full relative">
        <div className="absolute -bottom-12 left-6 md:left-12 flex items-end gap-4">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden">
  {user?.profileImage ? (
    <img
    src={`http://localhost:8000/${user.profileImage}`}
     
      alt="profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full text-blue-600 font-black text-4xl">
      {user?.fullName?.charAt(0)}
    </div>
  )}
</div>
          <div className="mb-2">
            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter md:text-blue-900">{user?.fullName}</h1>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-900 md:text-blue-900">Class of {user?.graduationYear} • {user?.department} Dept</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Stats & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
        
          <div className="bg-white overflow-hidden rounded-[2rem] shadow-sm border border-gray-100">
          <div className="p-6 space-y-4">
<DashboardLink
  icon={<Briefcase size={18}/>}
  label="My Posted Jobs"
  path="/my-posted-jobs"
/>

<DashboardLink 
  icon={<User size={18}/>} 
  label="My Profile"
  path="/profile"
/>

<DashboardLink 
  icon={<Briefcase size={18}/>} 
  label="My Applications"
  path="/my-applications"
/>

<DashboardLink 
  icon={<MessageSquare size={18}/>} 
  label="Messages"
  path="/messages"
/>

<DashboardLink 
  icon={<Settings size={18}/>} 
  label="Account Settings"
  path="/settings"
/>

</div>
          </div>
        </div>

        {/* Right: Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <Star className="absolute -right-4 -top-4 w-24 h-24 opacity-10 rotate-12" />
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Welcome Back, {user?.fullName}!</h2>
          
          </div>


        </div>

      </div>
    </div>
  );
};
// const DashboardLink = ({ icon, label, to }) => (
//   <Link to={to} className="flex items-center justify-between w-full group">
//     <div className="flex items-center gap-3">
//       <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
//         {icon}
//       </span>

//       <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">
//         {label}
//       </span>
//     </div>

//     <ChevronRight
//       size={14}
//       className="text-gray-300 group-hover:translate-x-1 transition-transform"
//     />
//   </Link>
// );
const DashboardLink = ({ icon, label, path }) => {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="flex items-center justify-between w-full group"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-400 group-hover:text-blue-600">{icon}</span>
        <span className="text-sm font-bold text-gray-600 uppercase">
          {label}
        </span>
      </div>

      <ChevronRight size={14} className="text-gray-300" />
    </button>
  );
};


export default AlumniDashboard;