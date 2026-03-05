import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Briefcase, GraduationCap, Mail, Linkedin, UserCircle } from 'lucide-react';

const AlumniDirectory = () => {

  const initialAlumni = [
    { id: 1, name: "Yash", batch: "2024", dept: "Information Technology", company: "Google", location: "Bangalore", email: "yash@example.com" },
    { id: 2, name: "Hardik Shah", batch: "2018", dept: "Computer Engineering", company: "Microsoft", location: "Hyderabad", email: "hardik@example.com" },
    { id: 3, name: "Anjali Vyas", batch: "2020", dept: "Electronics & Communication", company: "ISRO", location: "Ahmedabad", email: "anjali@example.com" },
    { id: 4, name: "Sneha Patel", batch: "2015", dept: "Civil Engineering", company: "L&T Construction", location: "Mumbai", email: "sneha@example.com" },
    { id: 5, name: "Rahul Mehta", batch: "2022", dept: "Mechanical Engineering", company: "Tesla", location: "California", email: "rahul@example.com" },
    { id: 6, name: "Jevik", batch: "2023", dept: "Instrumentation & Control", company: "Reliance", location: "Jamnagar", email: "jevik@example.com" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const departments = [
    "All",
    "Computer Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Instrumentation & Control"
  ];

  const filteredAlumni = initialAlumni.filter(alumnus => {

    const matchesSearch =
      alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDept === "All" || alumnus.dept === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">

      {/* HERO */}
      <section className="bg-[#1e40af] text-white pt-16 pb-24 md:pt-20 md:pb-28 px-6 text-center relative overflow-hidden">

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <UserCircle className="absolute -right-10 -bottom-10 w-64 h-64" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-tight">
            Alumni <span className="text-blue-300">Directory</span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 text-sm md:text-lg font-medium opacity-90 italic px-2">
            Connect with thousands of VGECians globally and strengthen your professional network.
          </p>
        </motion.div>

      </section>


      {/* SEARCH + FILTER */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-2xl border border-gray-100 -mt-10 md:-mt-14 relative z-20">

          <div className="flex flex-col lg:flex-row items-center gap-4">

            {/* SEARCH BAR FIXED */}
            <div className="flex items-center w-full lg:flex-1 bg-gray-50 rounded-2xl px-4 py-4">

              <Search className="text-gray-400 mr-3 flex-shrink-0" size={18} />

              <input
                type="text"
                placeholder="Search by name or company..."
                className="bg-transparent outline-none w-full font-bold text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>


            <div className="hidden lg:block w-px h-10 bg-gray-200 mx-2"></div>


            {/* DEPARTMENT FILTER */}
            <div className="w-full lg:w-auto">

              <div className="relative">

                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                <select
                  className="w-full lg:w-56 pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-gray-600 text-sm cursor-pointer appearance-none"
                  onChange={(e) => setSelectedDept(e.target.value)}
                  value={selectedDept}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ALUMNI GRID */}
      <section className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          <AnimatePresence mode="popLayout">

            {filteredAlumni.length > 0 ? (

              filteredAlumni.map((alumnus) => (

                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={alumnus.id}
                  className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-300 group"
                >

                  <div className="flex items-center gap-4 md:gap-5 mb-6">

                    <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-2xl md:rounded-full flex items-center justify-center text-blue-600 font-black text-xl md:text-2xl border-4 border-white shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {alumnus.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tight">
                        {alumnus.name}
                      </h3>

                      <span className="text-blue-600 text-[10px] md:text-xs font-black tracking-widest uppercase">
                        Class of {alumnus.batch}
                      </span>
                    </div>

                  </div>


                  <div className="space-y-3 mb-8 px-1">

                    <InfoItem icon={<GraduationCap size={16} />} text={alumnus.dept} />
                    <InfoItem icon={<Briefcase size={16} />} text={alumnus.company} />
                    <InfoItem icon={<MapPin size={16} />} text={alumnus.location} />

                  </div>


                  <div className="flex gap-3 mt-auto">

                    <a
                      href={`mailto:${alumnus.email}`}
                      className="flex-1 bg-gray-50 text-gray-700 py-3.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Mail size={14}/> Contact
                    </a>

                    <button className="p-3.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Linkedin size={18}/>
                    </button>

                  </div>

                </motion.div>

              ))

            ) : (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 bg-white rounded-[2rem] md:rounded-[3rem] shadow-inner border border-dashed border-gray-200"
              >

                <h2 className="text-xl font-black text-gray-400 italic uppercase tracking-tighter">
                  No Alumni Found
                </h2>

                <p className="text-gray-400 text-xs font-medium mt-1">
                  Try adjusting your search or filters.
                </p>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </section>

    </div>
  );
};


const InfoItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-[11px] md:text-sm font-bold text-gray-500 italic">
    <span className="text-blue-500">{icon}</span> {text}
  </div>
);

export default AlumniDirectory;