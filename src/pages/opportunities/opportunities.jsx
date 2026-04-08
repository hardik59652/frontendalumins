import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase, MapPin, Building2, Plus, X, ArrowUpRight, 
  Clock, Filter, Check, Search, ChevronDown
} from "lucide-react";
import axios from 'axios';

const Opportunities = () => {
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [activeFilters, setActiveFilters] = useState([]); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTypes = ["Full-time", "Part-time", "Internship", "Remote", "Contract"];

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    type: "",
    skillsRequired: "",
    salaryRange: "",
    applyLink: "",
    deadline: "",
    description: ""
  });

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/jobopportunity/approved", {
        withCredentials: true
      });
      if (res.data?.data) {
        setJobs(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchJobs();
      }
    }, 15000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleFilter = (type) => {
    if (activeFilters.includes(type)) {
      setActiveFilters(activeFilters.filter(t => t !== type));
    } else {
      setActiveFilters([...activeFilters, type]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => v === "")) {
      alert("Form Incomplete: Please fill all the required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(",").map((s) => s.trim())
      };

      const res = await axios.post("http://localhost:8000/api/v1/jobopportunity/create", payload, {
        withCredentials: true
      });

      if (res.data) {
        alert("Opportunity submitted successfully! Awaiting admin approval.");
        setShowModal(false);
        setFormData({
          title: "", companyName: "", location: "", type: "",
          skillsRequired: "", salaryRange: "", applyLink: "", deadline: "", description: ""
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit opportunity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(job.type);
    const matchesSearch = (job.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
                          (job.companyName?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 selection:bg-blue-100">

      {/* --- HEADER --- */}
      <section className="bg-blue-800 text-white py-14 px-6 border-b-4 border-blue-600 relative">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="w-full">
            <h1 className="text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
              <Briefcase size={32} className="text-blue-300" />
              Career Hub
            </h1>
            <p className="mt-2 text-blue-200 text-sm font-medium">
              Explore and share exclusive job opportunities within the VGEC alumni network.
            </p>
          </motion.div>
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="w-full md:w-auto bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-sm font-bold uppercase text-[11px] tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Post Opportunity
            </button>
          </div>
        </div>
      </section>

      {/* --- SEARCH & FILTER --- */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <form className="bg-white p-2 border border-gray-200 shadow-md rounded-sm flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
          
          <div className="relative sm:w-64 shrink-0">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 text-gray-800 rounded-sm text-[11px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-gray-500" />
                <span className="truncate">
                  {activeFilters.length === 0 ? "All Types" : `${activeFilters.length} Selected`}
                </span>
              </div>
              <ChevronDown size={14} className={`text-gray-500 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.1 }}
                  className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-lg overflow-hidden z-50"
                >
                  <div className="p-2 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Filter by Type</span>
                    {activeFilters.length > 0 && (
                      <button type="button" onClick={() => setActiveFilters([])} className="text-[9px] font-bold text-blue-600 hover:underline uppercase">Clear</button>
                    )}
                  </div>
                  <ul className="p-1">
                    {jobTypes.map((type) => (
                      <li key={type}>
                        <label className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors rounded-sm">
                          <div className={`w-3 h-3 border rounded-sm mr-3 flex items-center justify-center transition-colors ${activeFilters.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                            {activeFilters.includes(type) && <Check size={10} className="text-white" />}
                          </div>
                          <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">{type}</span>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={activeFilters.includes(type)}
                            onChange={() => toggleFilter(type)}
                          />
                        </label>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full flex-1 flex">
            <div className="relative w-full">
               <input 
                type="search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 text-sm font-bold focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none rounded-l-sm placeholder:text-gray-400 transition-colors" 
                placeholder="Search role or company..." 
              />
            </div>
            <button 
              type="submit" 
              className="bg-gray-900 hover:bg-black text-white font-bold text-[11px] uppercase tracking-widest px-8 py-3 rounded-r-sm transition-colors shrink-0"
            >
              Search
            </button>
          </div>

        </form>
      </div>

      <main className="max-w-7xl mx-auto py-10 px-6">
        
        <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-2">
           <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 flex items-center gap-2">
             Results <span className="bg-gray-200 text-black px-2 py-0.5 rounded text-xs">{filteredJobs.length}</span>
           </h2>
        </div>

        {isLoading ? (
           <div className="py-20 flex justify-center">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
           </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    layout
                    key={job._id || Math.random()}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.15 }}
                    className="bg-white p-5 md:p-6 rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6 items-start md:items-center group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center shrink-0 text-blue-700">
                        <Building2 size={20}/>
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-wider">
                          <span className="text-blue-700">{job.companyName}</span>
                          <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> {job.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 shrink-0">
                      <span className="text-emerald-700 font-black bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-sm text-[9px] uppercase tracking-widest">
                        {job.salaryRange || "Not Disclosed"}
                      </span>
                      <button
                        onClick={() => navigate(`/apply/${job._id}`)}
                        className="flex items-center gap-1.5 text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-widest transition-colors shadow-sm"
                      >
                        Apply Now <ArrowUpRight size={14}/>
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white border border-gray-200 rounded-sm mt-4 shadow-sm">
                  <Briefcase size={40} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="font-bold text-black uppercase tracking-wide text-sm">No opportunities found</h3>
                  <p className="text-gray-500 text-xs mt-1 font-medium">Try adjusting your search or filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-sm w-full max-w-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-20">
                <h2 className="text-[11px] font-black text-gray-800 uppercase tracking-[0.2em]">Post Job Opportunity</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <X size={18}/>
                </button>
              </div>

              <div className="p-6 overflow-y-auto">

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Job Title <span className="text-red-500">*</span></label>
                      <input name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium placeholder:text-gray-400" placeholder="Job Title"/>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Company Name <span className="text-red-500">*</span></label>
                      <input name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium placeholder:text-gray-400" placeholder="Company Name"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Location <span className="text-red-500">*</span></label>
                      <input name="location" value={formData.location} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium placeholder:text-gray-400" placeholder="Location"/>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Job Type <span className="text-red-500">*</span></label>
                      <select name="type" value={formData.type} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium text-gray-700">
                        <option value="">-- Select --</option>
                        {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Skills Required <span className="text-red-500">*</span></label>
                    <input name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium placeholder:text-gray-400" placeholder="Your skills"/>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Application Link / Email <span className="text-red-500">*</span></label>
                      <input name="applyLink" value={formData.applyLink} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium placeholder:text-gray-400" placeholder="URL or Email Address"/>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Deadline <span className="text-red-500">*</span></label>
                      <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium text-gray-700"/>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Salary Range</label>
                    <input name="salaryRange" value={formData.salaryRange} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium placeholder:text-gray-400" placeholder="Salary Range"/>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Description <span className="text-red-500">*</span></label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full p-3 bg-white border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-500 font-medium resize-none placeholder:text-gray-400" placeholder="Brief job description..."/>
                  </div>

                  <div className="pt-4 border-t border-gray-200 mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-300 rounded-sm text-gray-700 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className={`bg-blue-700 text-white rounded-sm px-6 py-2.5 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}>
                      {isSubmitting ? "Submitting..." : "Submit for Approval"}
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Opportunities;