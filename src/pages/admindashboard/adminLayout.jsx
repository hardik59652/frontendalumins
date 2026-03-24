import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Trophy,
  CalendarDays,
  Newspaper,
  Users,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // --- USER DATA STATE ---
  const [userData, setUserData] = useState({
    name: "Admin",
    role: "Super Admin",
    profilePic: "",
    department: "VGEC",
  });
  useEffect(() => {

    const fetchUser = async () => {
      try {
  
        const res = await fetch(
          "http://localhost:8000/api/v1/users/currentuser",
          {
            credentials: "include"
          }
        );
  
        if (!res.ok) {
          navigate("/login");
          return;
        }
  
        const data = await res.json();
  
        setUserData({
          name: data.data.fullName,
          role: data.data.role,
          profilePic: data.data.profilePicture,
          department: data.data.department || "VGEC"
        });
  
      } catch (error) {
        navigate("/login");
      }
    };
  
    fetchUser();
  
  }, [navigate]);

  // --- LOGOUT ---
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // --- SIDEBAR MENU ---
  const menuItems = [
    {
      path: "/admin-dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/admin-dashboard/pending-opportunities",
      label: "Opportunities",
      icon: <Briefcase size={20} />,
    },
    {
      path: "/admin-dashboard/pending-achievements",
      label: "Achievements",
      icon: <Trophy size={20} />,
    },
    {
      path: "/admin-dashboard/events",
      label: "Manage Events",
      icon: <CalendarDays size={20} />,
    },
    {
      path: "/admin-dashboard/manage-news",
      label: "Manage News",
      icon: <Newspaper size={20} />,
    },
    {
      path: "/admin-dashboard/users",
      label: "Manage Users",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] font-sans overflow-hidden">

      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: isCollapsed ? "80px" : "280px" }}
        className="bg-[#0f172a] text-slate-300 flex flex-col shadow-2xl z-50 sticky top-0 h-screen"
      >
        {/* LOGO */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shrink-0">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>

          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-black text-blue-500 uppercase">
                Admin HQ
              </h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                VGEC Portal
              </p>
            </motion.div>
          )}
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xl"
                    : "hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <span
                  className={
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-blue-400"
                  }
                >
                  {item.icon}
                </span>

                {!isCollapsed && (
                  <span className="text-sm font-bold uppercase truncate">
                    {item.label}
                  </span>
                )}

                {isActive && !isCollapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-4 text-white/60"
                  >
                    <ChevronRight size={14} />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-black uppercase text-xs tracking-widest"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">

        {/* HEADER */}
        <header className="bg-white sticky top-0 z-40 border-b border-slate-200 px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
            >
              <LayoutDashboard size={20} />
            </button>

            <h3 className="text-sm font-black text-slate-400 uppercase italic">
              {userData.department} Console
            </h3>
          </div>

          <div className="flex items-center gap-4">

            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900 uppercase">
                {userData.name}
              </p>

              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {userData.role}
              </p>
            </div>

            {/* PROFILE */}
            <div className="w-10 h-10 rounded-xl border-2 border-white shadow-sm flex items-center justify-center font-black text-white bg-blue-600 overflow-hidden">

              {userData.profilePic ? (
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                userData?.name?.charAt(0) || "A"
              )}

            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6 md:p-10 max-w-7xl">

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

export default AdminLayout;