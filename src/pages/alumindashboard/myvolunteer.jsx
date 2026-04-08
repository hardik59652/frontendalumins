import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Heart, Clock, ArrowLeft, CheckCircle2, 
  XCircle, Info, FileText, Users, Calendar 
} from "lucide-react";

const MyVolunteer = () => {
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/giveback/volunteer/my",
          { withCredentials: true }
        );
        setVolunteer(res.data.data);
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteer();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1e3a8a] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Formal Empty State
  if (!volunteer) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">Volunteership Program</h2>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 rounded-md p-16 text-center shadow-sm max-w-lg w-full">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Heart size={32} />
            </div>
            <h3 className="text-slate-950 font-semibold text-lg">No Application Found</h3>
            <p className="text-slate-500 text-sm font-medium mt-2 mb-8 leading-relaxed">
              You haven't submitted an application to become a volunteer yet. Join our initiatives to give back to the community and campus.
            </p>
            <button 
              onClick={() => navigate("/volunteer-apply")} // Update route as per your system
              className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
            >
              Apply to Volunteer
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Dynamic Status Configuration
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": 
        return { color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: <CheckCircle2 size={16} /> };
      case "rejected": 
        return { color: "text-red-700 bg-red-50 border-red-200", icon: <XCircle size={16} /> };
      default: 
        return { color: "text-amber-700 bg-amber-50 border-amber-200", icon: <Clock size={16} /> };
    }
  };

  const statusConf = getStatusConfig(volunteer.status);

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
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">My Volunteer Profile</h2>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        
        {/* System Info Box */}
        <div className="mb-8 bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-start gap-4">
          <div className="bg-blue-50 p-2 rounded text-[#1e3a8a] shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-950 uppercase tracking-tight">Application Record</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed max-w-4xl">
              This is the official record of your volunteer application. The administration reviews these details to assign you to the most suitable campus initiatives.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar: Status Summary */}
          <section className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm">
              
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-slate-50 rounded border border-slate-100 text-slate-500">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-950">Application Status</h3>
                  <p className="text-xs text-slate-500 font-medium">Volunteership Tracker</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Current Phase</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider border ${statusConf.color}`}>
                    {statusConf.icon} {volunteer.status}
                  </div>
                </div>

                {volunteer.createdAt && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date Submitted</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(volunteer.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* Right Area: Application Details */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-md p-8 md:p-10 shadow-sm space-y-10">
              
              {/* Interest Domains */}
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-5 flex items-center gap-2 border-l-4 border-[#1e3a8a] pl-3">
                   Areas of Interest (Domains)
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {volunteer.domains?.length > 0 ? (
                    volunteer.domains.map((d, index) => (
                      <span
                        key={index}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded shadow-sm"
                      >
                        {d}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500 italic">No domains specified.</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>

              {/* Availability */}
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-4 flex items-center gap-2 border-l-4 border-[#1e3a8a] pl-3">
                   Time Commitment / Availability
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded">
                  {volunteer.availability || "Not specified."}
                </p>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-4 flex items-center gap-2 border-l-4 border-[#1e3a8a] pl-3">
                   Personal Motivation
                </h3>
                <div className="bg-white border-l-2 border-slate-300 pl-4 py-2">
                  <p className="text-sm text-slate-600 italic leading-relaxed font-medium">
                    "{volunteer.motivation || "No statement provided."}"
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default MyVolunteer;