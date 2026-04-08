import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, BookOpen, Clock, Heart, ArrowLeft, 
  ShieldCheck, CheckCircle2, XCircle, Info, FileText 
} from "lucide-react";

const MyMentor = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyMentor = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/giveback/mentor/my",
        { credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setMentor(data.data);
      }
    } catch (error) {
      console.log("Error fetching mentor data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyMentor();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1e3a8a] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle Empty State (Not applied yet)
  if (!mentor) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">Mentorship Program</h2>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 rounded-md p-16 text-center shadow-sm max-w-lg w-full">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FileText size={32} />
            </div>
            <h3 className="text-slate-950 font-semibold text-lg">No Application Found</h3>
            <p className="text-slate-500 text-sm font-medium mt-2 mb-8 leading-relaxed">
              You haven't submitted an application to become a mentor yet. Share your industry experience and guide the next generation.
            </p>
            <button 
              onClick={() => navigate("/givingback")}
              className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
            >
              Apply as Mentor
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

  const statusConf = getStatusConfig(mentor.status);

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
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">My Mentorship Profile</h2>
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
              This is the official record of your mentorship application. If your status is approved, you will be contacted by the university administration for student mapping.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar: Profile & Status Summary */}
          <section className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm text-center">
              
              {/* Profile Image */}
              <div className="w-28 h-28 mx-auto rounded-full bg-slate-100 border border-slate-200 shadow-inner overflow-hidden mb-5 flex items-center justify-center">
                {mentor.userId?.profilePicture ? (
                  <img
                    src={`http://localhost:8000/${mentor.userId.profilePicture}`}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-slate-300" />
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-slate-950 mb-1">
                {mentor.userId?.name || "Applicant Name"}
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                Batch of {mentor.userId?.batchYear || "N/A"}
              </p>

              <div className="h-px w-full bg-slate-100 mb-6"></div>

              {/* Status Indicator */}
              <div className="space-y-4 text-left">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Current Status</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider border ${statusConf.color}`}>
                    {statusConf.icon} {mentor.status}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date Submitted</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {new Date(mentor.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Right Area: Application Details */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-md p-8 md:p-10 shadow-sm space-y-10">
              
              {/* Expertise Domains */}
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-5 flex items-center gap-2 border-l-4 border-[#1e3a8a] pl-3">
                   Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {mentor.domains?.length > 0 ? (
                    mentor.domains.map((d, index) => (
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
                  {mentor.availability || "Not specified."}
                </p>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider mb-4 flex items-center gap-2 border-l-4 border-[#1e3a8a] pl-3">
                   Personal Motivation
                </h3>
                <div className="bg-white border-l-2 border-slate-300 pl-4 py-2">
                  <p className="text-sm text-slate-600 italic leading-relaxed font-medium">
                    "{mentor.motivation || "No statement provided."}"
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

export default MyMentor;