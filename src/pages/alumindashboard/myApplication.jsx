import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, Calendar, Building2, Search, 
  ArrowLeft, Info, CheckCircle2, XCircle, Clock, ExternalLink 
} from "lucide-react";

const MyApplications = () => {
<<<<<<< HEAD

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await fetch(
          "http://localhost:8000/api/v1/jobapplication/myApplications",
          {
            credentials: "include"
          }
        );

        const data = await res.json();

        if (data?.data) {
          setApplications(data.data);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
=======
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/jobapplication/myApplications",
          { credentials: "include" }
        );
        const data = await res.json();
        if (data?.data) {
          setApplications(data.data);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
>>>>>>> e23d3c2362bb38a985761e2a92c1adca91701c3d
      }
    };
<<<<<<< HEAD

=======
>>>>>>> e23d3c2362bb38a985761e2a92c1adca91701c3d
    fetchApplications();
  }, []);

<<<<<<< HEAD
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-lg">
        Loading applications...
=======
  // Formal Status Configuration
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': 
        return { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 size={14} /> };
      case 'rejected': 
        return { color: 'bg-red-50 text-red-700 border-red-200', icon: <XCircle size={14} /> };
      default: 
        return { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock size={14} /> };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1e3a8a] rounded-full animate-spin"></div>
>>>>>>> e23d3c2362bb38a985761e2a92c1adca91701c3d
      </div>
    );
  }

  return (
<<<<<<< HEAD

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          My Job Applications
        </h2>

        {applications.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">
              No applications found
            </p>
=======
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
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">Application Tracker</h2>
>>>>>>> e23d3c2362bb38a985761e2a92c1adca91701c3d
          </div>
        )}

<<<<<<< HEAD
        <div className="grid gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-xl font-semibold">
                    {app.jobId?.title}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Company: <span className="font-medium">{app.jobId?.companyName}</span>
                  </p>

                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold
                  ${app.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                  ${app.status === "accepted" ? "bg-green-100 text-green-700" : ""}
                  ${app.status === "rejected" ? "bg-red-100 text-red-700" : ""}
                  `}
                >
                  {app.status}
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-3">
                Applied on {new Date(app.createdAt).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>
=======
          <div className="flex items-center gap-4">
             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded">
               Total: {applications.length}
             </span>
          </div>
        </div>
      </header>
>>>>>>> e23d3c2362bb38a985761e2a92c1adca91701c3d

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        
        {/* System Info Box */}
        <div className="mb-8 bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-start gap-4">
          <div className="bg-blue-50 p-2 rounded text-[#1e3a8a] shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-950 uppercase tracking-tight">Job Applications Record</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed max-w-4xl">
              Monitor the official status of your job applications. If approved, the respective recruiter or company will contact you directly via your registered primary email.
            </p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-md p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-slate-950 font-semibold text-lg">No Applications Found</h3>
            <p className="text-slate-500 text-sm font-medium mt-1 mb-6">You have not applied for any positions through the portal yet.</p>
            <button 
              onClick={() => navigate("/opportunities")} 
              className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
            >
              Browse Job Opportunities
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {applications.map((app) => {
              const statusConf = getStatusConfig(app.status);
              
              return (
                <div
                  key={app._id}
                  className="bg-white border border-slate-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-5">
                    {/* Professional Icon Box */}
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded flex items-center justify-center text-slate-500 shrink-0">
                      <Briefcase size={20} />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-lg text-slate-950 leading-tight hover:text-[#1e3a8a] cursor-pointer transition-colors">
                        {app.jobId?.title || "Position Title"}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Building2 size={14} className="text-slate-400" />
                          <span className="text-sm font-medium">{app.jobId?.companyName || "Company Name"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          <span className="text-sm font-medium">
                            {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    <div className="md:text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${statusConf.color}`}>
                        {statusConf.icon} {app.status}
                      </div>
                    </div>
                    
                    <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
                    
                    <button 
                      className="flex items-center gap-2 text-xs font-bold text-[#1e3a8a] hover:text-blue-800 transition-colors uppercase tracking-widest"
                      title="View Job Details"
                    >
                      Details <ExternalLink size={14} />
                    </button>
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

export default MyApplications;