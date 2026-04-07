import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Send, ArrowLeft, UploadCloud, AlertCircle } from "lucide-react";
import axios from "axios";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!resume) {
      setErrorMsg("Please upload your resume before submitting.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/jobopportunity/apply/${jobId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data) {
        alert("Application submitted successfully!");
        navigate("/opportunities", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 font-sans text-slate-900 selection:bg-blue-100">
      
      <div className="max-w-3xl mx-auto">
        
        <button 
          onClick={() => navigate("/opportunities")}
          className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-700 transition-colors mb-6 uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Opportunities
        </button>

        <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="bg-[#0F172A] p-8 md:p-10 text-white border-b border-slate-800">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <FileText size={24} className="text-blue-400" />
              Submit Application
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-3 leading-relaxed max-w-xl">
              Fill out the details below to apply for this position. Make sure your resume is up-to-date.
            </p>
          </div>

          <div className="p-8 md:p-10">
            
            {errorMsg && (
              <div className="mb-8 bg-red-50 border border-red-200 p-4 rounded-sm text-[11px] font-black text-red-600 uppercase tracking-widest flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
                <p className="leading-snug">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

              <div>
                <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3">
                  Cover Letter / Note <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Introduce yourself and explain why you are a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                  rows="6"
                  className="w-full border border-slate-300 rounded-sm p-4 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition-colors resize-none font-medium text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="border border-slate-200 rounded-sm p-6 bg-slate-50">
                <label className="block text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">
                  Upload Resume (PDF only) <span className="text-red-500">*</span>
                </label>
                
                <div className="relative">
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf"
                    onChange={(e) => {
                      setResume(e.target.files[0]);
                      setErrorMsg("");
                    }}
                    required
                    className="block w-full text-sm text-slate-600 
                      file:mr-4 file:py-2.5 file:px-5 
                      file:rounded-sm file:border-0 
                      file:text-[10px] file:font-black file:uppercase file:tracking-widest
                      file:bg-slate-200 file:text-slate-700 
                      hover:file:bg-slate-300 file:cursor-pointer file:transition-colors cursor-pointer border border-slate-300 rounded-sm bg-white"
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide mt-3 flex items-center gap-1.5">
                  <UploadCloud size={14} className="text-slate-400" /> Max file size: 5MB. Ensure your resume highlights relevant skills.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3 mt-10">
                <button
                  type="button"
                  onClick={() => navigate("/opportunities")}
                  className="px-6 py-3 border border-slate-300 rounded-sm text-slate-700 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`bg-blue-700 text-white px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-colors w-full sm:w-auto ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                >
                  {loading ? "Submitting..." : "Submit Application"} {!loading && <Send size={14} />}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8 text-center text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
        &copy; {new Date().getFullYear()} VGEC Alumni Association. All rights reserved.
      </div>
    </div>
  );
};

export default ApplyJob;