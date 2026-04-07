import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Briefcase, Trophy, CalendarDays, 
  Newspaper, Users, LogOut, ShieldCheck, Heart, 
  Handshake, Menu, X
} from "lucide-react";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "Loading...",
    role: "Admin",
    profilePic: "",
    department: "System",
  });

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/currentuser", {
        credentials: "include"
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();

      setUserData({
        name: data.data.fullName,
        role: data.data.role,
        profilePic: data.data.profilePicture,
        department: data.data.department || "Admin HQ"
      });
    } catch (error) {
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchUser();
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {}
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuGroups = [
    {
      title: "Platform",
      items: [
        { path: "/admin-dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
        { path: "/admin-dashboard/users", label: "User Directory", icon: <Users size={18} /> },
      ]
    },
    {
      title: "Content & Moderation",
      items: [
        { path: "/admin-dashboard/pending-opportunities", label: "Jobs & Opportunities", icon: <Briefcase size={18} /> },
        { path: "/admin-dashboard/pending-achievements", label: "Achievements", icon: <Trophy size={18} /> },
        { path: "/admin-dashboard/manage-news", label: "News & Announcements", icon: <Newspaper size={18} /> },
        { path: "/admin-dashboard/events", label: "Event Scheduler", icon: <CalendarDays size={18} /> },
      ]
    },
    {
      title: "Network & Engagement",
      items: [
        { path: "/admin-dashboard/campagin", label: "Fundraising Campaigns", icon: <Trophy size={18} /> }, 
        { path: "/admin-dashboard/donation", label: "Donation Records", icon: <Heart size={18} /> },
        { path: "/admin-dashboard/reunion", label: "Reunions", icon: <Users size={18} /> },
        { path: "/admin-dashboard/giveback", label: "Giveback Applications", icon: <Handshake size={18} /> },
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'} lg:w-64 lg:translate-x-0 transition-all duration-300 bg-slate-900 text-slate-300 flex flex-col z-50 fixed lg:static top-16 bottom-0 left-0 shadow-xl`}
      >
        
        <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
             <span className="text-base font-bold text-white tracking-wide">Admin Workspace</span>
          </div>
        
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/admin-dashboard');
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-blue-600 text-white" 
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      }`}
                    >
                      <span className={`${isActive ? "text-white" : "text-slate-500"}`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-md transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-semibold text-slate-800 hidden sm:block">
              {menuGroups.flatMap(g => g.items).find(i => i.path === location.pathname)?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
                
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-800">{userData.name}</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{userData.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                {userData.profilePic ? (
                  <img src={`http://localhost:8000/${userData.profilePic}`} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-slate-600">{userData.name.charAt(0)}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
          <div className="max-w-[1200px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }} 
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AdminLayout;