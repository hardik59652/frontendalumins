import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, Building2, Search, 
  Filter, Plus, X, ArrowUpRight, Clock, DollarSign 
} from 'lucide-react';

const Opportunities = () => {

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const jobTypes = ["All", "Full-time", "Internship", "Remote", "Contract"];

  const [jobs] = useState([
    {
      id: 1,
      role: "Software Development Engineer",
      company: "Google / Alphabet",
      location: "Bangalore / Remote",
      type: "Full-time",
      postedBy: "Hardik Shah",
      batch: "2018",
      salary: "Competitive"
    },
    {
      id: 2,
      role: "Graduate Engineer Trainee",
      company: "L&T Engineering",
      location: "Ahmedabad",
      type: "Internship",
      postedBy: "Anjali Vyas",
      batch: "2020",
      salary: "₹30k - ₹45k/mo"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">
      
      {/* HERO */}
      <section className="bg-[#1e40af] text-white pt-16 pb-24 md:pt-20 md:pb-32 px-6 relative text-center">
        <div className="max-w-7xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black mb-4 tracking-tighter uppercase"
          >
            Career <span className="text-blue-300">Hub</span>
          </motion.h1>

          <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-sm md:text-xl font-medium italic opacity-90">
            "Work is Worship" — Bridging the gap between VGEC talent and global industry.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-800 px-8 py-3.5 md:px-10 md:py-4 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:shadow-2xl transition-all flex items-center gap-3 mx-auto shadow-xl active:scale-95"
          >
            <Plus size={20} strokeWidth={3}/> Post Opportunity
          </button>

        </div>
      </section>


      {/* SEARCH + FILTER */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-2xl border border-gray-100 -mt-10 md:-mt-14 relative z-20">

          <div className="flex flex-col lg:flex-row items-center gap-4">


            {/* SEARCH BAR FIXED */}
            <div className="flex items-center w-full lg:flex-1 bg-gray-50 rounded-2xl px-4 py-4">

              <Search className="text-gray-400 mr-3 flex-shrink-0" size={20}/>

              <input
                type="text"
                placeholder="Search role or company..."
                className="bg-transparent outline-none w-full text-sm font-bold"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />

            </div>


            {/* FILTER BUTTONS */}
            <div className="w-full lg:w-auto flex overflow-x-auto no-scrollbar py-1 gap-2">

              {jobTypes.map(type => (

                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                    activeFilter === type
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white text-gray-400 border-gray-100 hover:border-blue-300"
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
      <section className="max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6">

        <div className="space-y-6">

          <AnimatePresence mode="popLayout">

            {jobs
              .filter(job => (activeFilter === "All" || job.type === activeFilter))
              .filter(job => (
                job.role.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm)
              ))
              .map((job) => (

              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={job.id}
                className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-400 shadow-sm hover:shadow-2xl transition-all duration-300 group relative"
              >

                <div className="flex flex-col md:flex-row justify-between gap-6">

                  <div className="flex gap-4 md:gap-6">

                    <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Building2 size={28}/>
                    </div>

                    <div>

                      <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
                        {job.role}
                      </h3>

                      <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-widest">

                        <span className="text-blue-700">
                          {job.company}
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


                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-gray-50">

                    <span className="text-green-700 font-black bg-green-50 px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest border border-green-100">
                      {job.salary}
                    </span>

                    <button className="flex items-center gap-2 text-blue-600 font-black hover:gap-3 transition-all uppercase text-[10px] tracking-widest">
                      Apply <ArrowUpRight size={18} strokeWidth={3}/>
                    </button>

                  </div>

                </div>


                {/* FOOTER */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">

                  <p>
                    By: <span className="text-gray-900">{job.postedBy}</span> | Batch {job.batch}
                  </p>

                  <span className="bg-gray-100 px-2 py-1 rounded-md hidden sm:block">
                    Ref: VGEC-{job.id}
                  </span>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

      </section>

    </div>
  );
};

export default Opportunities;