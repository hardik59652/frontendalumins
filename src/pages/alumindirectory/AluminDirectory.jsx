import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, Briefcase, GraduationCap, Mail, Linkedin, Search, ChevronDown, Users } from 'lucide-react';
import axios from 'axios';

const AlumniDirectory = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const departments = [
    "All Departments",
    "Computer Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Instrumentation & Control"
  ];

  const fetchAlumni = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/", {
        withCredentials: true
      });
      if (res.data?.data) {
        setAlumniData(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') fetchAlumni();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredAlumni = alumniData.filter(alumnus => {
    const searchMatch = 
      (alumnus.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (alumnus.companyName?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const deptMatch = 
      selectedDept === "All Departments" || alumnus.department === selectedDept;

    return searchMatch && deptMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 selection:bg-blue-100">

      <section className="bg-blue-800 text-white py-14 px-6 border-b-4 border-blue-600 relative">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="w-full">
            <h1 className="text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
              <Users size={32} className="text-blue-300" />
              Alumni Directory
            </h1>
            <p className="mt-2 text-blue-200 text-sm font-medium">
              Connect with thousands of VGECians globally and strengthen your professional network.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <form className="bg-white p-2 border border-gray-200 shadow-md rounded flex flex-col sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          
          <div className="relative sm:w-64 shrink-0">
            <button 
              type="button" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold text-[11px] uppercase tracking-wider px-4 py-3 rounded transition-colors outline-none"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-gray-500" />
                <span className="truncate">{selectedDept}</span>
              </div>
              <ChevronDown size={14} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.1 }}
                  className="absolute z-50 top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg w-full max-h-60 overflow-y-auto"
                >
                  <ul className="p-1">
                    {departments.map((dept) => (
                      <li key={dept}>
                        <button
                          type="button"
                          onClick={() => { setSelectedDept(dept); setIsDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-[11px] font-bold text-gray-700 uppercase tracking-wide hover:bg-gray-50 hover:text-blue-700 transition-colors"
                        >
                          {dept}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full mt-2 sm:mt-0 sm:ml-2 flex">
            <div className="relative w-full">
             
              <input 
                type="search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none rounded-l placeholder:text-gray-400" 
                placeholder="Search by name, company..." 
              />
            </div>
            <button 
              type="submit" 
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-r transition-colors shrink-0"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <main className="max-w-6xl mx-auto py-10 px-6">
        
        <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-2">
           <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 flex items-center gap-2">
             Results <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">{filteredAlumni.length}</span>
           </h2>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-700 rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((alumnus) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.15 }}
                    key={alumnus._id}
                    className="bg-white p-6 border border-gray-200 rounded shadow-sm hover:shadow-md transition-all flex flex-col group"
                  >
                    <div className="flex items-start gap-4 mb-5 pb-4 border-b border-gray-100">
                      <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-blue-700 font-bold text-xl uppercase shrink-0 overflow-hidden">
                        {alumnus.profileImage ? (
                          <img src={`http://localhost:8000/${alumnus.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          alumnus.fullName?.charAt(0) || "U"
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                          {alumnus.fullName}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mt-1">
                          Class of {alumnus.graduationYear || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 flex-1">
                      <DataRow icon={<GraduationCap size={16} />} text={alumnus.department || "N/A"} />
                      <DataRow icon={<Briefcase size={16} />} text={alumnus.companyName || "N/A"} />
                      <DataRow icon={<MapPin size={16} />} text={alumnus.location || "N/A"} />
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <a
                        href={`mailto:${alumnus.email}`}
                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100 hover:text-blue-700 py-2 rounded font-bold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <Mail size={14}/> Contact
                      </a>
                      {alumnus.linkedin && (
                        <a 
                          href={alumnus.linkedin} target="_blank" rel="noreferrer"
                          className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white rounded transition-colors flex items-center justify-center"
                        >
                          <Linkedin size={16}/>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-20 border border-gray-200 bg-white rounded shadow-sm">
                  <Search size={40} className="mx-auto text-gray-300 mb-3" />
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    No Alumni Found
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 font-medium">
                    Try adjusting your search criteria or department filter.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

    </div>
  );
};

const DataRow = ({ icon, text }) => (
  <div className="flex items-start gap-3">
    <span className="text-gray-400 mt-0.5 shrink-0">{icon}</span> 
    <span className="block text-sm font-semibold text-gray-700 truncate leading-snug">{text}</span>
  </div>
);

export default AlumniDirectory;