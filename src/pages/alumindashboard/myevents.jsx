import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Ticket, CheckCircle2, Clock, ArrowLeft, Info } from "lucide-react";

const MyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/events/my-events",
          {
            method: "GET",
            credentials: "include"
          }
        );
        const data = await res.json();
        if (data?.data) {
          setEvents(data.data);
        }
      } catch (err) {
        console.log("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1e3a8a] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans">
      
      {/* Formal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate("/alumni-dashboard");
  }
}}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">Registered Events</h2>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded">
               Total: {events.length}
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        
        {/* System Info Box */}
        <div className="mb-8 bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-start gap-4">
          <div className="bg-blue-50 p-2 rounded text-[#1e3a8a]">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-950 uppercase tracking-tight">Event Schedule</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
              Below are the university and alumni events you have successfully registered for. 
              Please carry your digital confirmation or ID card for campus entry.
            </p>
          </div>
        </div>

        {/* Content Area */}
        {events.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-md p-20 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Ticket size={32} />
            </div>
            <h3 className="text-slate-950 font-semibold text-lg">No Event Registrations</h3>
            <p className="text-slate-500 text-sm font-medium mt-1 mb-6">You have not registered for any upcoming events.</p>
            <button 
              onClick={() => navigate("/newsevents")}
              className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
            >
              Browse Event Calendar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const registeredCount = event.registrations?.length || 0;
              const fillPercentage = Math.min((registeredCount / event.maxParticipants) * 100, 100);

              return (
                <div
                  key={event._id}
                  className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Event Banner */}
                  <div className="relative h-48 border-b border-slate-100">
                    <img
                      src={`http://localhost:8000/${event.image}`}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200 px-2.5 py-1 rounded shadow-sm flex items-center gap-1.5">
                      <Clock size={12} className="text-[#1e3a8a]" />
                      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Upcoming</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-semibold text-lg text-slate-950 mb-4 leading-snug">
                      {event.title}
                    </h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3 text-slate-600">
                        <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                        <span className="text-sm font-medium">{event.location}</span>
                      </div>
                      
                      <div className="flex items-start gap-3 text-slate-600">
                        <Calendar size={16} className="text-slate-400 mt-0.5 shrink-0" />
                        <span className="text-sm font-medium">{formatDate(event.eventDate)}</span>
                      </div>
                    </div>

                    {/* Footer / Status */}
                    <div className="mt-auto pt-5 border-t border-slate-100">
                      
                      {/* Slim Progress Bar for Seats */}
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Capacity Filled</span>
                        <span className="text-xs font-semibold text-slate-900">{registeredCount} / {event.maxParticipants}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
                        <div 
                          className="h-full bg-[#1e3a8a] rounded-full transition-all duration-500"
                          style={{ width: `${fillPercentage}%` }}
                        ></div>
                      </div>

                      {/* Decent Confirmation Indicator */}
                      <div className="w-full bg-emerald-50 text-emerald-700 border border-emerald-200 py-2.5 rounded text-xs font-bold flex items-center justify-center gap-2 cursor-default">
                        <CheckCircle2 size={16} /> REGISTRATION CONFIRMED
                      </div>
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyEvents;