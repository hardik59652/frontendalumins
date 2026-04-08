import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  User, Mail, FileText, CheckCircle, XCircle, 
  ArrowLeft, Info, ExternalLink, Filter
} from "lucide-react";

const JobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/jobapplication/job/${jobId}`,
      { credentials: "include" }
    );

    const data = await res.json();

    if (data?.data) {
      setApplications(data.data);
  const [fetching, setFetching] = useState(true);

  const fetchApplicants = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/jobapplication/job/${jobId}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data?.data) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (id, status) => {

    const res = await fetch(
      `http://localhost:8000/api/v1/jobapplication/status/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status })
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/jobapplication/status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status })
        }
      );
      if (res.ok) {
        fetchApplicants();
      }
    } catch (error) {
      console.error("Update Status Error:", error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center">
          Job Applicants
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >

              <div className="flex items-center gap-4 mb-4">

                {app.userId?.profileImage ? (
                  <img
                    src={`http://localhost:8000/${app.userId.profileImage}`}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                    {app.userId?.fullName?.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg">
                    {app.userId?.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {app.userId?.email}
                  </p>
                </div>

              </div>

              <p className="text-sm mb-3">
                Status :
                <span className="ml-2 font-semibold text-blue-600">
                  {app.status}
                </span>
              </p>

              <a
                href={`http://localhost:8000/${app.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Resume
              </a>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => updateStatus(app._id, "approved")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

  if (fetching) {
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
            >
              <ArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">Review Applicants</h2>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded">
               Total: {applications.length}
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        
        {/* Recruitment Insight Box */}
        <div className="mb-8 bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-start gap-4">
          <div className="bg-blue-50 p-2 rounded text-blue-600">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-950 uppercase tracking-tight">Hiring Management</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
              Review candidate profiles and resumes below. Approved candidates will be notified for the next interview rounds. 
              Ensure you verify the graduation year before shortlisting.
            </p>
          </div>
        </div>

        {/* Applicants Container */}
        <div className="space-y-4">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Candidate Profile Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                        {app.userId?.profileImage ? (
                          <img
                            src={`http://localhost:8000/${app.userId.profileImage}`}
                            alt="Candidate"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={28} className="text-slate-300" />
                        )}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        app.status === 'approved' ? 'bg-emerald-500' : app.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                      }`}></div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-slate-950 leading-none">
                        {app.userId?.fullName}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <Mail size={14} className="text-slate-400" /> {app.userId?.email}
                      </p>
                      <div className="pt-2">
                        <a
                          href={`http://localhost:8000/${app.resumeUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] hover:underline"
                        >
                          <FileText size={14} /> VIEW RESUME <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Status & Decision Controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 border-t md:border-t-0 pt-6 md:pt-0">
                    
                    <div className="text-center md:text-right space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Application Status</p>
                      <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter border ${
                        app.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        app.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="h-10 w-px bg-slate-100 hidden md:block"></div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(app._id, "approved")}
                        disabled={app.status === "approved"}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 px-5 py-2.5 rounded text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                      >
                        <CheckCircle size={15} /> Approve
                      </button>

                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        disabled={app.status === "rejected"}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 px-5 py-2.5 rounded text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                      >
                        <XCircle size={15} /> Reject
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-slate-200 rounded-md p-20 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                <Filter size={32} />
              </div>
              <h3 className="text-slate-950 font-semibold text-lg">No Applications Found</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">There are no candidates currently listed for this position.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );

};

export default JobApplicants;