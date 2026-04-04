import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Building2,
  Plus,
  X,
  ArrowUpRight,
  Clock,
  Filter,
  Check
} from "lucide-react";

// Developer: Yash Patel
// Description: Alumni Job Opportunities Board (Dynamic Search UI & Clean Form)

const Opportunities = () => {
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Multi-select Filter State
  const [activeFilters, setActiveFilters] = useState([]); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [jobs, setJobs] = useState([]);
  
  // Global Error State
  const [globalError, setGlobalError] = useState("");
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

  // ===============================
  // Fetch approved jobs
  // ===============================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/jobopportunity/approved");
        const data = await res.json();

        if (res.ok && data?.data) {
          setJobs(data.data);
        } else {
          setGlobalError("Failed to load opportunities. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setGlobalError("Network error: Could not connect to the server.");
      }
    };

    fetchJobs();
  }, []);

  // ===============================
  // Handlers
  // ===============================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setGlobalError(""); // Clear error on typing
  };

  const toggleFilter = (type) => {
    if (activeFilters.includes(type)) {
      setActiveFilters(activeFilters.filter(t => t !== type));
    } else {
      setActiveFilters([...activeFilters, type]);
    }
  };

  // Submit job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");

    // simple validation
    if (Object.values(formData).some((v) => v === "")) {
      setGlobalError("Form Incomplete: Please fill all the required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(",").map((s) => s.trim())
      };

      const res = await fetch("http://localhost:8000/api/v1/jobopportunity/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Opportunity submitted successfully! Awaiting admin approval.");
        setShowModal(false);
        setFormData({
          title: "", companyName: "", location: "", type: "",
          skillsRequired: "", salaryRange: "", applyLink: "", deadline: "", description: ""
        });
      } else {
        setGlobalError(data.message || "Failed to post job opportunity.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setGlobalError("Network error: Failed to submit opportunity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter Logic Application
  const filteredJobs = jobs.filter(job => {
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(job.type);
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm) || 
                          job.companyName?.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-800 overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="bg-blue-800 text-white py-14 px-6 border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide flex items-center gap-3">
              <Briefcase size={32} className="text-blue-300" />
              Career Hub
            </h1>
            <p className="mt-2 text-blue-200 text-sm font-medium">
              Explore and share exclusive job opportunities within the VGEC alumni network.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setGlobalError("");
                setShowModal(true);
              }}
              className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded font-bold uppercase text-xs tracking-wide transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus size={18} /> Post Opportunity
            </button>
          </div>
        </div>
      </section>

      {/* --- GLOBAL ERROR BANNER --- */}
      {globalError && !showModal && (
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="bg-red-50 border-l-4 border-red-600 text-red-800 p-4 rounded shadow-sm text-sm font-bold uppercase tracking-wide flex justify-between items-center">
            <span>{globalError}</span>
            <button onClick={() => setGlobalError("")} className="text-red-500 hover:text-red-800"><X size={18}/></button>
          </div>
        </div>
      )}

      {/* --- SEARCH & MULTI-FILTER BAR --- */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-lg flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Dynamic Search Bar */}
          <form className="max-w-md w-full lg:max-w-md lg:mx-0" onSubmit={(e) => e.preventDefault()}>   
            <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
            <div className="relative">
                
                {/* 👇 Icon only appears when user starts typing 👇 */}
                {searchTerm.length > 0 && (
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-body text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                  </div>
                )}

                <input 
                  type="search" 
                  id="search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  /* 👇 Padding adjusts automatically based on whether icon is visible or not 👇 */
                  className={`block w-full p-3 bg-neutral-secondary-medium bg-gray-50 border border-default-medium border-gray-300 text-heading text-gray-900 text-sm rounded-base rounded focus:ring-brand focus:ring-blue-600 focus:border-brand focus:border-blue-600 shadow-xs outline-none transition-all placeholder:text-body placeholder:text-gray-400 ${searchTerm.length > 0 ? 'ps-9 pl-10' : 'pl-4'}`} 
                  placeholder="🔍 Search role or company..." 
                  required 
                />
                
                <button type="submit" className="absolute end-1.5 bottom-1.5 text-white bg-brand bg-blue-700 hover:bg-brand-strong hover:bg-blue-800 box-border border border-transparent focus:ring-4 focus:ring-brand-medium focus:ring-blue-300 shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none transition-colors">Search</button>
            </div>
          </form>

          {/* Multi-Select Dropdown Filter */}
          <div className="relative w-full lg:w-64">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-700 rounded text-sm font-bold hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <span className="truncate uppercase tracking-wider text-[11px]">
                  {activeFilters.length === 0 ? "All Types" : `${activeFilters.length} Selected`}
                </span>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-20 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg overflow-hidden"
                >
                  <div className="p-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Filter by Type</span>
                    {activeFilters.length > 0 && (
                      <button onClick={() => setActiveFilters([])} className="text-[10px] font-bold text-blue-600 hover:underline">Clear</button>
                    )}
                  </div>
                  <ul className="py-1 text-sm text-gray-700 font-bold">
                    {jobTypes.map((type) => (
                      <li key={type}>
                        <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
                          <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors ${activeFilters.includes(type) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                            {activeFilters.includes(type) && <Check size={12} className="text-white" />}
                          </div>
                          <span className="text-[12px] uppercase tracking-wide">{type}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- JOB LIST --- */}
      <section className="max-w-4xl mx-auto py-8 px-6">
        
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
           <h2 className="text-lg font-bold uppercase text-gray-800 flex items-center gap-2">
             Results <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{filteredJobs.length}</span>
           </h2>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <motion.div
                layout
                key={job._id || Math.random()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-5 md:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-6 md:gap-4 items-start md:items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded flex items-center justify-center shrink-0 text-blue-700">
                    <Building2 size={24}/>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2 font-medium">
                      <span className="text-blue-700 font-bold uppercase tracking-wider">{job.companyName}</span>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {job.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                  <span className="text-green-700 font-bold bg-green-50 border border-green-200 px-3 py-1 rounded text-[10px] uppercase tracking-wider">
                    {job.salaryRange || "Not Disclosed"}
                  </span>
                  <button
                    onClick={() => navigate(`/apply/${job._id}`)}
                    className="flex items-center gap-1.5 text-white bg-blue-700 hover:bg-blue-800 px-5 py-2 rounded font-bold text-xs uppercase tracking-wide transition-colors shadow-sm"
                  >
                    Apply Now <ArrowUpRight size={14}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-lg border border-gray-200 mt-4 shadow-sm">
              <Briefcase size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="font-bold text-gray-700 uppercase tracking-wide">No opportunities found</h3>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- POST JOB MODAL (Enterprise Form - Clean Placeholders) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-lg w-full max-w-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              
              {/* Modal Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-20">
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Post Job Opportunity</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50">
                  <X size={20}/>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto">
                
                {/* Form Level Error Banner */}
                {globalError && (
                  <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-3 text-xs font-bold text-red-700 uppercase tracking-wide">
                    {globalError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Job Title <span className="text-red-500">*</span></label>
                      {/* 👇 Cleaned Placeholder 👇 */}
                      <input name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white" placeholder="Frontend Developer"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Company Name <span className="text-red-500">*</span></label>
                      <input name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white" placeholder="Company Name"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Location <span className="text-red-500">*</span></label>
                      <input name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white" placeholder="City or Remote"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Job Type <span className="text-red-500">*</span></label>
                      <select name="type" value={formData.type} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white">
                        <option value="">-- Select --</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Skills Required <span className="text-red-500">*</span></label>
                    <input name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white" placeholder="React, Node.js, MongoDB"/>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Application Link / Email <span className="text-red-500">*</span></label>
                      <input name="applyLink" value={formData.applyLink} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white" placeholder="URL or Email Address"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Deadline <span className="text-red-500">*</span></label>
                      <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white"/>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Salary Range</label>
                    <input name="salaryRange" value={formData.salaryRange} onChange={handleChange} className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white" placeholder="₹8LPA - ₹12LPA"/>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Description <span className="text-red-500">*</span></label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-1 focus:ring-blue-600 outline-none bg-white resize-none" placeholder="Brief job description..."/>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
                    <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 border border-gray-300 rounded text-gray-700 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className={`bg-blue-700 text-white rounded px-6 py-2 text-sm font-bold uppercase tracking-wide shadow-sm transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}>
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