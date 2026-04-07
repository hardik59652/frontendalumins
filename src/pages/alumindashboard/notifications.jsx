import React, { useState, useEffect } from "react";
import { Bell, Clock, CheckCircle, Info, AlertTriangle, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/notifications/all", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications(data.data || []);
      }
    } catch (error) {
      console.error("Notification sync error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') fetchNotifications();
    }, 600);

    return () => clearInterval(intervalId);
  }, []);

  const deleteNotification = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/notifications/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        setNotifications(prev => prev.filter(n => n._id !== id));
      }
    } catch (error) {
      console.log("Error deleting notification", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-20">
      {/* HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-6 lg:px-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-500">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
            Notification Center
          </h1>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {notifications.length} Unread Updates
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 px-6">
        <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Activity</p>
            {notifications.length > 0 && (
              <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider">Mark all as read</button>
            )}
          </div>

          <div className="divide-y divide-slate-100">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div key={item._id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors group relative">
                  {/* Status Icon */}
                  <div className={`mt-1 w-9 h-9 rounded flex items-center justify-center shrink-0 border ${
                    item.type === 'alert' ? 'bg-red-50 border-red-100 text-red-600' :
                    item.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                    'bg-blue-50 border-blue-100 text-blue-600'
                  }`}>
                    {item.type === 'alert' ? <AlertTriangle size={16} /> : 
                     item.type === 'success' ? <CheckCircle size={16} /> : 
                     <Info size={16} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{item.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.message}</p>
                    <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Clock size={12} />
                      {new Date(item.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                    </div>
                  </div>

                  {/* Action */}
                  <button 
                    onClick={() => deleteNotification(item._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              /* EMPTY STATE */
              <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                <Bell size={40} className="mb-4 opacity-20" />
                <p className="text-sm font-bold text-slate-600">All caught up!</p>
                <p className="text-[11px] font-medium mt-1">No new notifications at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;