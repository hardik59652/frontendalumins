import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Building2, Search, 
  Filter, Plus, X, ArrowUpRight, Clock 
} from 'lucide-react';

const opportunities = () => {
  // 1. States
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const jobTypes = ["All", "Full-time", "Internship", "Remote", "Contract"];

  // 2. Dummy Data (Skeleton)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      role: "Software Development Engineer",
      company: "Google / Alphabet",
      location: "Bangalore / Remote",
      type: "Full-time",
      postedBy: "Hardik Shah",
      batch: "2018",
      salary: "Competitive"
    },
    {
      id: 2,
      role: "Graduate Engineer Trainee",
      company: "L&T Engineering",
      location: "Ahmedabad",
      type: "Internship",
      postedBy: "Anjali Vyas",
      batch: "2020",
      salary: "₹30k - ₹45k/mo"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-[#1e40af] text-white pt-20 pb-28 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase">
            Career Opportunities
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg opacity-90 italic">
            "Work is Worship" — Connecting VGEC graduates with global opportunities.
          </p>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-800 px-10 py-4 rounded-2xl font-black hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3 mx-auto shadow-xl"
          >
            <Plus size={24} strokeWidth={3} /> Post an Opportunity
          </button>
        </div>
      </section>

      {/* --- SEARCH & FILTER FLOATING BAR --- */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white p-5 rounded-3xl shadow-2xl border border-gray-100 -mt-14 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:flex-1">
              
              <input 
                type="text" 
                placeholder="Search by role, company, or keywords..." 
                className="w-full pl-5 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-700 font-medium"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>

            {/* Vertical Divider (Desktop Only) */}
            <div className="hidden lg:block w-px h-12 bg-gray-100 mx-2"></div>

            {/* Filter Buttons */}
            <div className="w-full lg:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <div className="flex gap-2">
                {jobTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                      activeFilter === type 
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105" 
                      : "bg-white text-gray-500 border-gray-100 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- JOB LISTINGS GRID --- */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="space-y-6">
          {jobs
            .filter(job => (activeFilter === "All" || job.type === activeFilter))
            .filter(job => (job.role.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm)))
            .map((job) => (
            <div key={job.id} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex gap-6">
                  {/* Company Logo Placeholder */}
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.role}
                    </h3>
                    <div className="flex flex-wrap gap-y-2 gap-x-6 mt-2 text-sm text-gray-500 font-semibold uppercase tracking-wider">
                      <span className="text-blue-800">{job.company}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={18} /> {job.location}</span>
                      <span className="flex items-center gap-1.5 text-orange-600"><Clock size={18} /> {job.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end justify-between">
                  <span className="text-green-700 font-black bg-green-50 px-4 py-2 rounded-xl text-sm border border-green-100">
                    {job.salary}
                  </span>
                  <button className="mt-4 flex items-center gap-2 text-blue-600 font-black hover:gap-3 transition-all uppercase text-xs tracking-widest">
                    Apply Now <ArrowUpRight size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Poster Info Bar */}
              <div className="mt-8 pt-5 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest gap-2">
                <span>Posted by: <span className="text-gray-900">{job.postedBy}</span> | Batch {job.batch}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Ref: VGEC-2026-{job.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ADD OPPORTUNITY MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-md z-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-3xl relative animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-8 flex justify-between items-center z-10 rounded-t-4xl">
              <div>
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
                  <Plus className="text-blue-600" size={32} strokeWidth={3} /> Post Job
                </h2>
                <p className="text-gray-500 text-sm mt-1 font-medium italic">Help your juniors find their dream career.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="bg-gray-100 p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Job Role / Title</label>
                  <input type="text" placeholder="Full Stack Developer" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
                  <input type="text" placeholder="Tata Consultancy Services" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Opportunity Type</label>
                  <select className="w-full p-4 bg-white-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {jobTypes.filter(t => t !== "All").map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
                  <input type="text" placeholder="Gandhinagar" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Salary / LPA</label>
                  <input type="text" placeholder="e.g. 12 LPA" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Application URL / Link</label>
                <input type="url" placeholder="https://careers.google.com/..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Job Description & Requirements</label>
                <textarea rows="4" placeholder="Mention tech stack (React, Python), batch eligibility, and referral process..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 active:scale-[0.98]"
              >
                Launch Opportunity <Briefcase className="inline ml-2" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default opportunities;