import React, { useState } from "react";
import { Handshake, Users, Calendar, Award, X, Send, AlertCircle, HeartHandshake } from "lucide-react";

// Developer: Yash Patel
// Description: Official Alumni Volunteering & Mentorship Application Module

function GiveBack() {
  const [activeForm, setActiveForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    domain: "",
    availability: "Flexible",
    motivation: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMsg(""); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const url =
        activeForm === "mentor"
          ? "http://localhost:8000/api/v1/giveback/mentor/apply"
          : "http://localhost:8000/api/v1/giveback/volunteer/apply";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          domains: [formData.domain],
          availability: formData.availability,
          motivation: formData.motivation
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Application submitted successfully! Our team will contact you soon.");
        setActiveForm(null);
        setFormData({
          domain: "",
          availability: "Flexible",
          motivation: ""
        });
      } else {
        setErrorMsg(data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Network error: Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">

      {/* --- HERO SECTION --- */}
      <section className="bg-blue-800 text-white py-14 px-6 border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide flex items-center gap-3">
              <HeartHandshake size={36} className="text-blue-300" />
              Give Back
            </h1>
            <p className="mt-2 text-blue-200 text-sm md:text-base font-medium max-w-2xl">
              Help current students grow by sharing your industry experience, time, and insights. Your mentorship can shape the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* --- CARDS SECTION --- */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        
        <div className="mb-8 border-b border-gray-200 pb-3 text-center">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
            How would you like to contribute?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Mentor Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8 flex flex-col hover:border-blue-300 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-700">
              <Award size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-3">
              Be a Mentor
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
              Guide juniors with 1-on-1 career advice, resume reviews, and industry knowledge. Help them navigate their professional journey.
            </p>
            <button
              onClick={() => { setErrorMsg(""); setActiveForm("mentor"); }}
              className="w-full bg-blue-700 text-white px-6 py-3 rounded font-bold uppercase text-xs tracking-wide shadow-sm hover:bg-blue-800 transition-colors"
            >
              Apply as Mentor
            </button>
          </div>

          {/* Volunteer Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8 flex flex-col hover:border-green-300 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center mb-6 text-green-700">
              <Users size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-3">
              Be a Volunteer
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
              Help organize alumni networking events, college hackathons, or community outreach activities on campus.
            </p>
            <button
              onClick={() => { setErrorMsg(""); setActiveForm("volunteer"); }}
              className="w-full bg-green-600 text-white px-6 py-3 rounded font-bold uppercase text-xs tracking-wide shadow-sm hover:bg-green-700 transition-colors"
            >
              Apply as Volunteer
            </button>
          </div>

        </div>
      </div>

      {/* --- MODAL FORM --- */}
      {activeForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setActiveForm(null)}
          />

          {/* Modal Container */}
          <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0">
              <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                {activeForm === "mentor" ? <Award className="text-blue-700" size={20}/> : <Users className="text-green-600" size={20}/>}
                {activeForm === "mentor" ? "Mentor Application" : "Volunteer Application"}
              </h2>
              <button
                onClick={() => setActiveForm(null)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              
              {errorMsg && (
                <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-3 text-xs font-bold text-red-700 uppercase tracking-wide flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Domain Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Expertise Domain <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">-- Select Domain --</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="UI / UX">UI / UX</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Core Engineering">Core Engineering</option>
                  </select>
                </div>

                {/* Availability Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Availability <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                    required
                  >
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Monthly Sessions">Monthly Sessions</option>
                  </select>
                </div>

                {/* Motivation Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Motivation & Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Why do you want to contribute, and what specific skills can you offer?"
                    rows="4"
                    className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs text-gray-600 flex gap-2 items-start font-medium mt-2">
                  <Handshake size={16} className="shrink-0 mt-0.5 text-gray-400" />
                  <p>By submitting, you agree to be contacted by the Alumni Association team regarding opportunities.</p>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-gray-200 flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveForm(null)}
                    className="px-5 py-2 border border-gray-300 rounded text-gray-700 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-700 text-white px-6 py-2 rounded text-sm font-bold uppercase tracking-wide shadow-sm flex items-center gap-2 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                  >
                    {loading ? "Submitting..." : "Submit Application"} {!loading && <Send size={16} />}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default GiveBack;