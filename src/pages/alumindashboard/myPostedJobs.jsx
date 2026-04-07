import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, Building2, Users, ArrowLeft, 
  Search, Info, Plus, ChevronRight 
} from "lucide-react";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/jobopportunity/myjob",
          { credentials: "include" }
        );
        const data = await res.json();
        if (data?.data) {
          setJobs(data.data);
        }
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
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
              onClick={() => navigate(-1)}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors"
              title="Go Back"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">Job Postings Management</h2>
          </div>
          
          <button 
            onClick={() => navigate("/opportunities")} // Route to post new job
            className="bg-[#1e3a8a] text-white px-5 py-2 rounded font-semibold text-sm hover:bg-blue-800 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> Post New Job
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        
        {/* System Info Box */}
        <div className="mb-8 bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-start gap-4">
          <div className="bg-blue-50 p-2 rounded text-[#1e3a8a] shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-950 uppercase tracking-tight">Employer Dashboard</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed max-w-4xl">
              Manage the career opportunities you have shared with the alumni network. Review applicants promptly to ensure a smooth hiring process.
            </p>
          </div>
        </div>

        {/* Content Area */}
        {jobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-md p-20 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-slate-950 font-semibold text-lg">No Active Postings</h3>
            <p className="text-slate-500 text-sm font-medium mt-1 mb-6">You haven't posted any job opportunities yet.</p>
            <button 
              onClick={() => navigate("/opportunities")}
              className="bg-white border border-slate-300 text-slate-700 px-6 py-2.5 rounded text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              Create Your First Job Post
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
            {/* List Header (Desktop Only for Table feel) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-7 pl-2">Job Details</div>
              <div className="col-span-5 text-right pr-2">Actions</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-5 md:p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Job Info */}
                  <div className="flex items-start gap-4 md:col-span-7 w-full">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded flex items-center justify-center text-[#1e3a8a] shrink-0 shadow-sm mt-1 md:mt-0">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-slate-950 leading-tight">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-sm text-slate-600 font-medium">
                        <Building2 size={14} className="text-slate-400" />
                        {job.companyName}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end md:col-span-5 w-full border-t border-slate-100 pt-4 md:border-0 md:pt-0 gap-3">
                    <button
                      onClick={() => navigate(`/job-applications/${job._id}`)}
                      className="w-full md:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 text-[#1e3a8a] px-4 py-2 rounded text-sm font-semibold hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                    >
                      <Users size={16} /> 
                      Review Applicants 
                      <ChevronRight size={16} className="text-slate-400 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyPostedJobs;