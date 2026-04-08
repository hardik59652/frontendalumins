import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  User, ChevronRight, Briefcase, Bell, Settings, MessageSquare, 
  Heart, Handshake, Users, Calendar, Search, 
  ChevronDown, LogOut, ShieldCheck, X, MapPin, Clock
} from 'lucide-react';

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
  icon={<MessageSquare size={18}/>} 
  label="my donations"
  path="/my-donation"
/>
<DashboardLink 
  icon={<MessageSquare size={18}/>} 
  label="my mentorship"
  path="/my-mentor"
/>
<DashboardLink 
  icon={<MessageSquare size={18}/>} 
  label="my volunteership"
  path="/my-volunteer"
/>
<DashboardLink 
  icon={<Bell size={18}/>} 
  label="My Events"
  path="/dashboard/events"
/>

<DashboardLink 
  icon={<Settings size={18}/>} 
  label="Account Settings"
  path="/settings"
/>
<DashboardLink 
  icon={<Settings size={18}/>} 
  label="my posted achievements"
  path="/my-achievements"
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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dropdownRef = useRef(null);

  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentAlumni, setRecentAlumni] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const userRes = await fetch("http://localhost:8000/api/v1/users/currentuser", {
        method: "GET",
        credentials: "include"   
      });
      const userData = await userRes.json();
      if (userData?.data) setUser(userData.data);

      const [jobsRes, eventsRes, alumniRes] = await Promise.allSettled([
        axios.get("http://localhost:8000/api/v1/jobopportunity/approved", { withCredentials: true }),
        axios.get("http://localhost:8000/api/v1/events/published", { withCredentials: true }),
        axios.get("http://localhost:8000/api/v1/users/", { withCredentials: true })
      ]);

      if (jobsRes.status === 'fulfilled' && jobsRes.value.data?.data) {
        setRecentJobs(jobsRes.value.data.data.slice(0, 3));
      }
      if (eventsRes.status === 'fulfilled' && eventsRes.value.data?.data) {
        setUpcomingEvents(eventsRes.value.data.data.slice(0, 3));
      }
      if (alumniRes.status === 'fulfilled' && alumniRes.value.data?.data) {
        setRecentAlumni(alumniRes.value.data.data.slice(0, 4));
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') fetchDashboardData();
    }, 15000);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout", {}, { withCredentials: true });
    } catch (error) {}
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-[#0f172a] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-12">
      
      <header className="h-16 bg-white border-b border-slate-300 sticky top-0 z-50 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-[#1b4095] rounded-sm flex items-center justify-center">
              <span className="text-white font-black text-[10px] tracking-widest uppercase">VGEC</span>
            </div>
            <h1 className="text-sm font-black tracking-wider text-slate-900 uppercase hidden sm:block">Alumni Portal</h1>
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchActive && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search records..."
                    className="h-9 pl-3 pr-10 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:border-[#0f172a] outline-none"
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
              >
                {isSearchActive ? <X size={16} /> : <Search size={16} />}
              </button>
            </div>

            <button 
              onClick={() => navigate('/notifications')}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors relative"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            <div className="h-6 w-px bg-slate-300 mx-1"></div>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 p-1 pl-2 hover:bg-slate-50 rounded-sm border border-transparent hover:border-slate-300 transition-all"
              >
                <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user?.fullName?.split(" ")[0]}</p>
                  <p className="text-[10px] text-slate-900 font-bold mt-1 uppercase tracking-widest">Member</p>
                </div>
                
                <div className="w-8 h-8 rounded-sm bg-slate-100 border border-slate-300 overflow-hidden flex items-center justify-center">
                  {user?.profileImage ? (
                    <img src={`http://localhost:8000/${user.profileImage}`} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-slate-400" />
                  )}
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-60 bg-white border border-slate-300 rounded-sm shadow-lg overflow-hidden py-1"
                  >
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">{user?.fullName}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      <DropdownLink icon={<User size={14}/>} label="Personal Profile" onClick={() => navigate('/profile')} />
                      
                      <div className="h-px bg-slate-200 my-1"></div>
                      <p className="px-4 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Workspace</p>
                      <DropdownLink icon={<Briefcase size={14}/>} label="My Posted Jobs" onClick={() => navigate('/my-posted-jobs')} />
                      <DropdownLink icon={<MessageSquare size={14}/>} label="My Applications" onClick={() => navigate('/my-applications')} />
                      <DropdownLink icon={<Calendar size={14}/>} label="My Events" onClick={() => navigate('/dashboard/events')} />

                      <div className="h-px bg-slate-200 my-1"></div>
                      <p className="px-4 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Community</p>
                      <DropdownLink icon={<Heart size={14}/>} label="My Donations" onClick={() => navigate('/my-donation')} />
                      <DropdownLink icon={<Handshake size={14}/>} label="Mentorship" onClick={() => navigate('/my-mentor')} />
                      <DropdownLink icon={<Users size={14}/>} label="Volunteership" onClick={() => navigate('/my-volunteer')} />
                    </div>

                    <div className="pt-1 border-t border-slate-200">
                      <DropdownLink icon={<Settings size={14}/>} label="Account Settings" onClick={() => navigate('/profile')} />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto p-6 md:p-12">
        
        <div className="bg-white border border-slate-300 rounded-sm p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center mb-10">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-sm bg-slate-50 border border-slate-300 flex items-center justify-center shrink-0 overflow-hidden">
            {user?.profileImage ? (
              <img src={`http://localhost:8000/${user.profileImage}`} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-slate-300" />
            )}
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-3 mb-3 tracking-tight">
              Hello, {user?.fullName || "Alumni"}
              <ShieldCheck size={24} className="text-blue-600" />
            </h2>
            <p className="text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
              Welcome to the official alumni portal. Manage your professional profile, track your job postings, and engage with campus initiatives through this centralized dashboard.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
              <div className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase tracking-widest text-slate-700">
                Batch of {user?.graduationYear || "N/A"}
              </div>
              <div className="px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase tracking-widest text-slate-700">
                {user?.department || "Academic Department"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <InsightCard title="Job Applications" val="Active" color="text-green-600" onClick={() => navigate('/my-applications')} />
          <InsightCard title="Upcoming Events" val="Check Schedule" color="text-green-600" onClick={() => navigate('/dashboard/events')} />
          <InsightCard title="Mentorship" val="Manage" color="text-green-600" onClick={() => navigate('/my-mentor')} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start border-t border-slate-300 pt-10">
          
          <div className="bg-white border border-slate-300 rounded-sm flex flex-col h-full">
            <div className="px-5 py-4 border-b border-slate-300 bg-slate-50 flex items-center justify-between">
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Job Opportunities</h3>
              <button onClick={() => navigate('/opportunities')} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">View All</button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {recentJobs.length > 0 ? recentJobs.map(job => (
                <div key={job._id} className="border border-slate-200 p-4 rounded-sm hover:border-slate-400 transition-colors cursor-pointer" onClick={() => navigate(`/apply/${job._id}`)}>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1">{job.title}</h4>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-3">{job.companyName}</p>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {job.type}</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">No active jobs</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-300 rounded-sm flex flex-col h-full">
            <div className="px-5 py-4 border-b border-slate-300 bg-slate-50 flex items-center justify-between">
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Upcoming Events</h3>
              <button onClick={() => navigate('/events')} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">Schedule</button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                <div key={event._id} className="border border-slate-200 p-4 rounded-sm flex gap-4 items-center">
                  <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded-sm flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">
                      {new Date(event.eventDate).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-lg font-black text-slate-900 leading-none mt-0.5">
                      {new Date(event.eventDate).getDate()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1">{event.title}</h4>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{event.time}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">No upcoming events</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-300 rounded-sm flex flex-col h-full">
            <div className="px-5 py-4 border-b border-slate-300 bg-slate-50 flex items-center justify-between">
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Alumni Directory</h3>
              <button onClick={() => navigate('/directory')} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">View Network</button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {recentAlumni.length > 0 ? recentAlumni.map(alumnus => (
                <div key={alumnus._id} className="flex items-center justify-between p-3 border border-slate-200 rounded-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-slate-100 border border-slate-300 overflow-hidden flex items-center justify-center shrink-0">
                      {alumnus.profileImage ? (
                        <img src={`http://localhost:8000/${alumnus.profileImage}`} alt="profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[11px] font-black text-slate-500 uppercase">{alumnus.fullName?.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{alumnus.fullName}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{alumnus.graduationYear || alumnus.department}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              )) : (
                <div className="text-center py-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Network empty</div>
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

const DropdownLink = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider hover:bg-slate-100 transition-colors"
  >
    <span className="text-slate-400">{icon}</span>
    {label}
  </button>
);

const InsightCard = ({ title, val, color, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white border border-slate-300 p-6 rounded-sm cursor-pointer group hover:border-[#0f172a] transition-colors"
  >
    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{title}</p>
    <div className={`text-xl font-black ${color} flex items-center justify-between`}>
      {val}
      <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

export default AlumniDashboard;