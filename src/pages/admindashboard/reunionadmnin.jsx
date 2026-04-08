import React, { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, Users, MapPin, CalendarDays, Tag, Plus, X, Image as ImageIcon, Sparkles } from "lucide-react";

const Reunion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  const [highlightInput, setHighlightInput] = useState("");
  const [highlights, setHighlights] = useState([]);

  const [reunion, setReunion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReunion = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/reunion/",
        { withCredentials: true }
      );
      setReunion(res.data.data);
    } catch (err) {
      console.log("Error fetching reunion:", err);
    }
  };

  useEffect(() => {
    fetchReunion(); 
    const intervalId = setInterval(() => {
      fetchReunion();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    
    if (!highlights.some(h => h.title.toLowerCase() === highlightInput.trim().toLowerCase())) {
      setHighlights([...highlights, { title: highlightInput.trim() }]);
    }
    setHighlightInput("");
  };

  const removeHighlight = (indexToRemove) => {
    setHighlights(highlights.filter((_, index) => index !== indexToRemove));
  };

  const handleCreateReunion = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("highlights", JSON.stringify(highlights));

    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/reunion/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      fetchReunion();

      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setHighlights([]);
      setBannerImage(null);
      
      const fileInput = document.getElementById("banner-image");
      if (fileInput) fileInput.value = "";

      alert("Reunion event configured successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to configure reunion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans text-slate-800">
      
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded flex items-center justify-center text-indigo-700">
            <Users size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">Alumni Reunion</h1>
           </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Sparkles size={16} className="text-slate-400" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Configure New Reunion
          </h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleCreateReunion} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Reunion Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Class of 2016 - 10 Year Reunion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                    placeholder="e.g., Ahmedabad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 text-sm rounded pl-10 pr-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                 <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 text-sm rounded pl-10 pr-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Banner Image
                </label>
                <input
                  type="file"
                  id="banner-image"
                  accept="image/*"
                  onChange={(e) => setBannerImage(e.target.files[0])}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer file:transition-colors border border-slate-300 rounded cursor-pointer bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Detail the agenda, dress code, and expected timeline..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
                className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors resize-none"
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Event Highlights
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Live Music, Networking Dinner"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                    className="w-full bg-white border border-slate-300 text-sm rounded pl-10 pr-3 py-2 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-slate-900 transition-colors flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200 border-dashed">
                  {highlights.map((h, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full text-xs font-semibold border border-indigo-200"
                    >
                      {h.title}
                      <button 
                        type="button" 
                        onClick={() => removeHighlight(index)}
                        className="text-indigo-400 hover:text-indigo-900 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-[#0A192F] text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#112240] shadow-sm'}`}
              >
                {isSubmitting ? "Processing..." : (
                  <>
                    <UploadCloud size={16} /> Deploy Reunion
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {reunion && (
        <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <CalendarDays size={16} className="text-indigo-700" /> Active Reunion Event
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Live
            </span>
          </div>

          <div className="p-0">
     
            <div className="w-full h-48 sm:h-64 bg-slate-100 relative overflow-hidden border-b border-slate-200">
              {reunion.bannerImage ? (
                <img
                  src={`http://localhost:8000/${reunion.bannerImage}`}
                  alt="Reunion Banner"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/800x400?text=No+Banner+Image" }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                  <ImageIcon size={48} className="mb-2 opacity-20" />
                  <span className="text-xs font-bold uppercase tracking-widest opacity-50">No Banner Image</span>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                {reunion.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
                {reunion.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 rounded bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-bold text-slate-800">
                      {new Date(reunion.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-slate-800">
                      {reunion.location}
                    </p>
                  </div>
                </div>
              </div>

              {reunion.highlights && reunion.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Event Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {reunion.highlights.map((h, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
                      >
                        <CheckCircle size={14} className="text-emerald-500" />
                        {h.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reunion;