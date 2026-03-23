import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Building2,
  Search,
  Plus,
  X,
  ArrowUpRight,
  Clock
} from "lucide-react";

const Opportunities = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const jobTypes = ["All", "Full-time", "Part-time", "Internship", "Remote", "Contract"];

  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    type: "",
    skillsRequired: "",
    salaryRange: "",
    applyLink: "",
    deadline: "",
    description: ""
  });

  // Fetch approved jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/jobopportunity/approved");
        const data = await res.json();

        if (data?.data) {
          setJobs(data.data);
        }

      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit job
  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (Object.values(formData).some((v) => v === "")) {
      alert("Please fill all fields");
      return;
    }

    try {

      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(",").map((s) => s.trim())
      };

      console.log("Sending payload:", payload);

      const res = await fetch("http://localhost:8000/api/v1/jobopportunity/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      console.log("Response:", data);

   
      setShowModal(false);

      setFormData({
        title: "",
        companyName: "",
        location: "",
        type: "",
        skillsRequired: "",
        salaryRange: "",
        applyLink: "",
        deadline: "",
        description: ""
      });

    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">

      {/* HERO */}
      <section className="bg-[#1e40af] text-white pt-16 pb-24 px-6 text-center">

        <h1 className="text-4xl font-black mb-4 uppercase">
          Career <span className="text-blue-300">Hub</span>
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-blue-800 px-8 py-3 rounded-2xl font-black flex items-center gap-3 mx-auto"
        >
          <Plus size={20}/> Post Opportunity
        </button>

      </section>

      {/* SEARCH */}
      <div className="max-w-6xl mx-auto px-4 mt-10">

        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="flex items-center w-full bg-gray-50 rounded-2xl px-4 py-3">

              <Search className="text-gray-400 mr-3"/>

              <input
                type="text"
                placeholder="Search role or company..."
                className="bg-transparent outline-none w-full"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />

            </div>

            <div className="flex overflow-x-auto gap-2">

              {jobTypes.map((type) => (

                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold ${
                    activeFilter === type
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-500 border"
                  }`}
                >
                  {type}
                </button>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* JOB LIST */}
      <section className="max-w-4xl mx-auto py-16 px-4">

        <div className="space-y-6">

          <AnimatePresence>

            {jobs
              .filter(job => activeFilter === "All" || job.type === activeFilter)
              .filter(job =>
                job.title?.toLowerCase().includes(searchTerm) ||
                job.companyName?.toLowerCase().includes(searchTerm)
              )
              .map((job) => (

                <motion.div
                  key={job._id}
                  className="bg-white p-8 rounded-3xl border shadow"
                >

                  <div className="flex justify-between">

                    <div className="flex gap-4">

                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <Building2 size={28}/>
                      </div>

                      <div>

                        <h3 className="text-xl font-black uppercase">
                          {job.title}
                        </h3>

                        <div className="flex gap-4 text-xs text-gray-500 mt-2">

                          <span className="text-blue-700 font-bold">
                            {job.companyName}
                          </span>

                          <span className="flex items-center gap-1">
                            <MapPin size={14}/> {job.location}
                          </span>

                          <span className="flex items-center gap-1 text-orange-500">
                            <Clock size={14}/> {job.type}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="flex flex-col items-end gap-3">

                      <span className="text-green-700 font-bold bg-green-50 px-4 py-2 rounded-xl text-xs">
                        {job.salaryRange}
                      </span>

                      <button
                          onClick={() => navigate(`/apply/${job._id}`)}
                          className="flex items-center gap-2 text-blue-600 font-bold text-xs"
                        >
                          Apply <ArrowUpRight size={18}/>
                      </button>
                      {/* <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 font-bold text-xs"
                      >
                        Apply <ArrowUpRight size={18}/>
                      </a> */}

                    </div>

                  </div>

                </motion.div>

              ))}

          </AnimatePresence>

        </div>

      </section>

      {/* MODAL */}
      <AnimatePresence>

        {showModal && (

          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <motion.div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative">

              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 text-gray-400"
              >
                <X size={24}/>
              </button>

              <h2 className="text-2xl font-black mb-6 uppercase">
                Post Job Opportunity
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" className="w-full border rounded-xl p-3"/>

                <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="w-full border rounded-xl p-3"/>

                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border rounded-xl p-3"/>

                <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded-xl p-3">
                  <option value="">Select Job Type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Remote</option>
                </select>

                <input name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} placeholder="Skills (React,Node)" className="w-full border rounded-xl p-3"/>

                <input name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="Salary Range" className="w-full border rounded-xl p-3"/>

                <input name="applyLink" value={formData.applyLink} onChange={handleChange} placeholder="Apply Link" className="w-full border rounded-xl p-3"/>

                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full border rounded-xl p-3"/>

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" className="w-full border rounded-xl p-3"/>

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-black">
                  Submit Job
                </button>

              </form>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default Opportunities;