import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Send, ArrowLeft, UploadCloud, AlertCircle } from "lucide-react";

// Developer: Yash Patel
// Description: Job Application Form Module (Enterprise UI)

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
      const res = await fetch(
        `http://localhost:8000/api/v1/jobapplication/apply/${jobId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Application submitted successfully!");
        navigate("/opportunities", { replace: true });
      } else {
        setErrorMsg(data.message || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Network error: Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 font-sans text-gray-800">
      
      <div className="max-w-2xl mx-auto">
        
        {/* --- Top Navigation --- */}
        <button 
          onClick={() => navigate("/opportunities")}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-700 transition-colors mb-6 uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Opportunities
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          
          {/* --- Header Section --- */}
          <div className="bg-blue-800 p-6 md:p-8 text-white border-b-4 border-blue-600">
            <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-3">
              <FileText size={28} className="text-blue-300" />
              Submit Application
            </h2>
            <p className="text-blue-200 text-sm font-medium mt-2">
              Fill out the details below to apply for this position. Make sure your resume is up-to-date.
            </p>
          </div>

          {/* --- Form Section --- */}
          <div className="p-6 md:p-8">
            
            {errorMsg && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-xs font-bold text-red-700 uppercase tracking-wide flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Cover Letter Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Cover Letter / Note <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Introduce yourself and explain why you are a great fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  required
                  rows="5"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-gray-50 focus:bg-white transition-colors resize-none font-medium text-gray-900"
                />
              </div>

              {/* Resume Upload Field */}
              <div className="border border-gray-200 rounded p-4 bg-gray-50">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
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
                    className="block w-full text-sm text-gray-600 
                      file:mr-4 file:py-2.5 file:px-4 
                      file:rounded file:border-0 
                      file:text-xs file:font-bold file:uppercase file:tracking-wide
                      file:bg-blue-100 file:text-blue-800 
                      hover:file:bg-blue-200 file:cursor-pointer file:transition-colors cursor-pointer border border-gray-300 rounded bg-white"
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-medium mt-2 flex items-center gap-1">
                  <UploadCloud size={14} /> Max file size: 5MB. Ensure your resume highlights relevant skills.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/opportunities")}
                  className="px-6 py-2.5 border border-gray-300 rounded text-gray-700 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`bg-blue-700 text-white px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wide shadow-sm flex items-center gap-2 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                >
                  {loading ? "Submitting..." : "Submit Application"} {!loading && <Send size={16} />}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

      <div className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
        &copy; 2026 VGEC Alumni Association. All rights reserved.
      </div>
    </div>
  );
};

export default ApplyJob;