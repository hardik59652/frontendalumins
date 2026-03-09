import React, { useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Trophy, 
  CalendarDays, 
  Newspaper, 
  Users, 
  LogOut,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

function AdminLayout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sidebar Links Configuration
  const menuItems = [
    { path: "overview", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "pending-opportunities", label: "Opportunities", icon: <Briefcase size={20} /> },
    { path: "pending-achievements", label: "Achievements", icon: <Trophy size={20} /> },
    { path: "events", label: "Manage Events", icon: <CalendarDays size={20} /> },
    { path: "news", label: "Manage News", icon: <Newspaper size={20} /> },
    { path: "users", label: "Manage Users", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <motion.aside 
        animate={{ width: isCollapsed ? "80px" : "280px" }}
        className="bg-[#0f172a] text-slate-300 flex flex-col shadow-2xl z-50 sticky top-0 h-screen"
      >
        {/* Header / Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
          <div className="bg-blue-600 p-2 rounded-xl text-blue-400 shadow-lg shadow-blue-900/20 shrink-0">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Admin <span className="text-blue-500">HQ</span></h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">VGEC Portal</p>
            </motion.div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40" 
                  : "hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}>
                  {item.icon}
                </span>
                
                {!isCollapsed && (
                  <span className="text-sm font-bold uppercase tracking-tight truncate">
                    {item.label}
                  </span>
                )}

                {isActive && !isCollapsed && (
                  <motion.div layoutId="activeInd" className="absolute right-4 text-blue-400/50">
                    <ChevronRight size={14} />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-800/50">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-black uppercase text-xs tracking-widest">
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Top Header for Admin */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {/* Collapse Toggle */}
             <button 
               onClick={() => setIsCollapsed(!isCollapsed)}
               className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
             >
               <LayoutDashboard size={20} />
             </button>
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest italic">
               System Management Console
             </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900 uppercase">Super Admin</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Online</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-black text-slate-500">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
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