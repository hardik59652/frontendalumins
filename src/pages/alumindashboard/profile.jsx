import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Mail, GraduationCap, Building2, MapPin, 
  Globe, Users, Briefcase, Edit, ArrowLeft, ShieldCheck,
  Hash, Calendar, UserCheck, Smartphone, Landmark, Linkedin, ChevronRight
} from "lucide-react";



const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/currentuser", {
        withCredentials: true // Cookies handle karne ke liye zaroori hai
      });

      if (res.data?.data) {
        setUser(res.data.data);
      }
    } catch (err) {
      console.error("Identity Sync Error:", err);
    
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') fetchProfileData();
    }, 500);

    return () => clearInterval(intervalId);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-4">Accessing Database...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
        Unauthorized Access: No Session Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-slate-200">
      
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6">
        <div className="max-w-6xl mx-auto h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 hover:bg-slate-50 rounded text-slate-500 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="h-4 w-px bg-slate-200"></span>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 italic">Identity Record Node</h2>
          </div>
          
          <button 
            onClick={() => navigate("/edit-profile")}
            className="bg-slate-900 text-white px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2"
          >
            <Edit size={12} /> Update Dossier
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-sm p-8 text-center shadow-sm">
              <div className="relative inline-block mb-6">
                <div className="w-28 h-28 bg-slate-50 border border-slate-200 rounded-md overflow-hidden flex items-center justify-center shadow-inner">
                  {user.profileImage ? (
                    <img 
                      src={`http://localhost:8000/${user.profileImage}`} 
                      alt="ID" 
                      className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all" 
                    />
                  ) : (
                    <span className="text-4xl font-black text-slate-200">{user.fullName?.charAt(0)}</span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-sm border-2 border-white shadow-sm">
                  <ShieldCheck size={14} />
                </div>
              </div>
              
              <h1 className="text-xl font-black text-slate-950 tracking-tight leading-none uppercase">
                {user.fullName}
              </h1>
              <p className="text-[9px] text-blue-700 font-black uppercase tracking-[0.15em] mt-2.5">
                Verified Alumnus Member
              </p>
              
              <div className="mt-8 pt-6 border-t border-slate-50 space-y-2 text-left">
                <IconBadge icon={<MapPin size={12}/>} label={user.location || "Global Location Not Set"} />
                <IconBadge icon={<Linkedin size={12}/>} label="LinkedIn Profile" link={user.linkedin} />
                <IconBadge icon={<Globe size={12}/>} label="Public Portfolio" link={user.portfolio} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 border-b border-slate-50 pb-2">Communication Hub</h3>
              <div className="space-y-4">
                <InfoItem icon={<Mail size={14} />} label="System Email" value={user.email} />
                <InfoItem icon={<Smartphone size={14} />} label="Contact Node" value={user.phone || "Private/Not Shared"} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-sm p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                 <ShieldCheck size={80} />
              </div>
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-50 pb-2">Institutional Remarks</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                "{user.bio || "No professional summary has been recorded in the institutional dossier."}"
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                
                {/* Academic Metadata */}
                <div className="p-8 border-b sm:border-b-0 sm:border-r border-slate-100 space-y-6">
                  <SectionHeader icon={<GraduationCap size={16}/>} title="Academic Credentials" />
                  <DetailRow label="Conferred Degree" value={user.degree || "Bachelor of Engineering"} />
                  <DetailRow label="Departmental Major" value={user.department} />
                  <DetailRow label="Graduation Class" value={`Batch of ${user.graduationYear}`} />
                  <DetailRow label="Enrollment Index" value={user.enrollmentNo || "N/A"} />
                </div>

                {/* Professional Metadata */}
                <div className="p-8 space-y-6 bg-slate-50/20">
                  <SectionHeader icon={<Briefcase size={16}/>} title="Professional Dossier" />
                  <DetailRow label="Active Organization" value={user.companyName || "Information Not Updated"} />
                  <DetailRow label="Functional Designation" value={user.designation || "Alumni"} />
                  <DetailRow label="Verification Status" value="Active / Database Sync" isStatus />
                  <DetailRow label="Institutional Node" value={`VGEC-${user._id?.slice(-6).toUpperCase()}`} />
                </div>

              </div>
            </div>
            
            <footer className="flex items-center justify-between px-2 text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">
               <span>Ref: {user.enrollmentNo || "PUBLIC_VIEW"}</span>
               <div className="flex items-center gap-1 text-emerald-600">
                  <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                  <span>System Synced</span>
               </div>
            </footer>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- PURE FUNCTIONAL UI HELPERS ---

const IconBadge = ({ icon, label, link }) => (
  <a 
    href={link || "#"} 
    target={link ? "_blank" : "_self"}
    rel="noreferrer"
    className="flex items-center justify-between px-3 py-2 bg-slate-50/50 border border-slate-100 rounded-sm text-[10px] font-bold text-slate-600 hover:border-slate-300 transition-all"
  >
    <div className="flex items-center gap-2 overflow-hidden">
      <span className="text-slate-400 shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
    <ChevronRight size={10} className="text-slate-300" />
  </a>
);

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="text-slate-900 shrink-0">{icon}</span>
    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">{title}</h3>
  </div>
);

const DetailRow = ({ label, value, isStatus }) => (
  <div className="min-w-0">
    <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1 leading-none">{label}</p>
    <p className={`text-xs font-bold truncate leading-tight ${isStatus ? 'text-emerald-700' : 'text-slate-800'}`}>
      {value || "---"}
    </p>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-slate-300 mt-0.5 shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">{label}</p>
      <p className="text-[11px] font-bold text-slate-900 truncate leading-none">{value || "---"}</p>
    </div>
  </div>
);

export default Profile;