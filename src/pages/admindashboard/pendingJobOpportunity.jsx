import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Briefcase, Building, MapPin, Clock, User } from "lucide-react";

// Developer: Yash Patel
// Description: Admin Pending Jobs Moderation (Live Auto-Update + Enterprise UI)

function PendingOpportunities() {
  const [jobs, setJobs] = useState([]);
  const [processingId, setProcessingId] = useState(null); // Prevents double-clicking

  // FETCH PENDING JOBS
  const fetchPendingJobs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/jobopportunity/pending", {
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(data.data || []);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error);
    }
  };

  // --- LIVE AUTO-UPDATE LOGIC ---
  useEffect(() => {
    fetchPendingJobs(); // Initial load

    // Poll the server every 10 seconds for new job submissions
    const intervalId = setInterval(() => {
      fetchPendingJobs();
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // APPROVE LOGIC
  const approveJob = async (id) => {
    if (!window.confirm("Approve this job opportunity? It will be published to the job board.")) return;
    
    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/jobopportunity/approve/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      if (res.ok) {
        setJobs(prev => prev.filter(job => job._id !== id));
      } else {
        alert("Failed to approve job.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessingId(null);
    }
  };

  // REJECT LOGIC
  const rejectJob = async (id) => {
    if (!window.confirm("Reject this job opportunity? It will be removed from the pending queue.")) return;

    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/jobopportunity/reject/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      if (res.ok) {
        setJobs(prev => prev.filter(job => job._id !== id));
      } else {
        alert("Failed to reject job.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8 font-sans text-slate-800">
      
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded flex items-center justify-center text-indigo-700">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">Job Moderation</h1>
        
          </div>
        </div>

        <div className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          Pending Review: <span className="text-indigo-600 ml-1">{jobs.length}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Clock size={16} className="text-slate-400" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Opportunities Awaiting Approval
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 w-1/3">Role Details</th>
                <th className="px-6 py-4 w-1/4">Company & Location</th>
                <th className="px-6 py-4">Posted By</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                    
                    <td className="px-6 py-4 align-top">
                      <p className="text-sm font-bold text-slate-800 truncate max-w-[250px]">{job.title}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 max-w-[300px] leading-relaxed">
                        {job.description}
                      </p>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-1.5 mb-1.5 text-sm font-bold text-slate-800">
                        <Building size={14} className="text-slate-400" /> 
                        <span className="truncate max-w-[150px]">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin size={14} className="text-slate-400" /> 
                        <span className="truncate max-w-[150px]">{job.location}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <User size={12} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{job.postedBy?.fullName || "Unknown User"}</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">Alumni</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Pending
                      </span>
                    </td>

                    <td className="px-6 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => approveJob(job._id)}
                          disabled={processingId === job._id}
                          title="Approve Job"
                          className={`p-1.5 text-emerald-600 border border-transparent hover:border-emerald-200 hover:bg-emerald-50 rounded transition-colors ${processingId === job._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => rejectJob(job._id)}
                          disabled={processingId === job._id}
                          title="Reject Job"
                          className={`p-1.5 text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 rounded transition-colors ${processingId === job._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
               
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Briefcase size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">Queue is empty</p>
                      <p className="text-xs mt-1">No pending job opportunities to review.</p>
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

export default PendingOpportunities;