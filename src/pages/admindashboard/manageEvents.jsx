import React, { useEffect, useState } from "react";
import { UploadCloud, CheckCircle, CalendarDays, MapPin, Users, Activity, Image as ImageIcon } from "lucide-react";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    maxParticipants: ""
  });

  const [image, setImage] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/events/all", {
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) setEvents(data.data || []);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    const intervalId = setInterval(() => {
      fetchEvents();
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("eventDate", formData.eventDate);
    form.append("location", formData.location);
    if (formData.maxParticipants) form.append("maxParticipants", formData.maxParticipants);
    if (image) form.append("image", image);

    try {
      const res = await fetch("http://localhost:8000/api/v1/events/create", {
        method: "POST",
        credentials: "include",
        body: form
      });

      if (res.ok) {
        setFormData({ title: "", description: "", eventDate: "", location: "", maxParticipants: "" });
        setImage(null);
       
        const fileInput = document.getElementById('event-image');
        if (fileInput) fileInput.value = '';
        
        fetchEvents();
        alert("Event created successfully as Draft.");
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.log(error);
      alert("Network error while creating event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const publishEvent = async (id) => {
    if (!window.confirm("Publish this event? It will become visible to all alumni.")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/v1/events/publish/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      if (res.ok) {
        setEvents(prev => prev.map(e => e._id === id ? { ...e, status: "published" } : e));
      } else {
        alert("Failed to publish event.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8 font-sans text-slate-800">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded flex items-center justify-center text-indigo-700">
          <CalendarDays size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">Event Management</h1>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Sync Active
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Create New Event
          </h2>
        </div>

        <div className="p-6">
          <form onSubmit={createEvent} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Annual Alumni Meet 2026"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., VGEC Campus, Ahmedabad"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-slate-300 text-sm rounded pl-10 pr-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Max Participants <span className="text-slate-400 normal-case font-medium">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="maxParticipants"
                    placeholder="e.g., 500"
                    min="1"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-300 text-sm rounded pl-10 pr-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Event Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Detail the agenda, speakers, and instructions for attendees..."
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Event Banner / Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  id="event-image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer file:transition-colors border border-slate-300 rounded cursor-pointer bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-[#0A192F] text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#112240] shadow-sm'}`}
              >
                {isSubmitting ? "Saving..." : (
                  <>
                    <UploadCloud size={16} /> Save as Draft
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <CalendarDays size={16} className="text-indigo-700" /> Event Directory
          </h2>
          <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Total: {events.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Schedule & Location</th>
                <th className="px-6 py-4">Visuals</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event._id} className="hover:bg-slate-50 transition-colors">
                    
                    <td className="px-6 py-4 align-top">
                      <p className="text-sm font-bold text-slate-800 truncate max-w-xs">{event.title}</p>
                      <p className="text-[10px] text-slate-500 mt-1 truncate max-w-xs leading-relaxed">{event.description}</p>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <p className="text-xs font-semibold text-slate-700 mb-1">
                        {new Date(event.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide truncate max-w-[150px]">
                        {event.location}
                      </p>
                    </td>

                    <td className="px-6 py-4 align-top">
                      {event.image ? (
                        <div className="w-12 h-12 rounded border border-slate-200 overflow-hidden bg-slate-50 shadow-sm">
                          <img
                            src={`http://localhost:8000/${event.image}`}
                            alt="event cover"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image" }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-300">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 align-top">
                      {event.status === "published" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Draft
                        </span>
                      )}
                    </td>

                 
                    <td className="px-6 py-4 align-top text-right">
                      {event.status === "draft" ? (
                        <button
                          onClick={() => publishEvent(event._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          <CheckCircle size={14} /> Publish
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No Action</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
              
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Activity size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">No events found</p>
                      <p className="text-xs mt-1">Create your first event above.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default ManageEvents;