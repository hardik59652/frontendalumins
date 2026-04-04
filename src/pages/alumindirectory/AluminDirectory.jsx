import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Briefcase, GraduationCap, Mail, Linkedin, UserCircle } from 'lucide-react';

// Developer: Yash Patel
// Description: Global Alumni Directory Module

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

  const filteredAlumni = initialAlumni.filter(alumnus => {
    const matchesSearch =
      alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDept === "All Departments" || alumnus.dept === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-800 overflow-x-hidden">

      {/* --- HEADER SECTION --- */}
      <section className="bg-blue-800 text-white py-12 px-6 shadow-sm border-b-4 border-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <UserCircle className="absolute -right-10 -bottom-10 w-64 h-64" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
              <UsersIcon size={32} className="text-blue-300" />
              Alumni Directory
            </h1>
            <p className="mt-2 text-blue-200 text-sm font-medium">
              Connect with thousands of VGECians globally and strengthen your professional network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- UNIFIED SEARCH BAR --- */}
      <div className="max-w-4xl mx-auto px-6 mt-8 relative z-20">
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <div className="flex shadow-sm rounded-lg -space-x-px">
            
            {/* Department Dropdown Button */}
            <button 
              type="button" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center shrink-0 z-10 bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-100 font-medium rounded-l-lg text-sm px-4 py-2.5 focus:outline-none transition-colors"
            >
              <Filter className="w-4 h-4 me-1.5 text-gray-400" />
              <span className="hidden sm:inline">{selectedDept}</span>
              <span className="sm:hidden">Dept</span>
              <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
            </button>

            {/* Dropdown Menu (Animated) */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.15 }}
                  className="absolute z-20 top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto"
                >
                  <ul className="p-2 text-sm text-gray-700 font-medium">
                    {departments.map((dept) => (
                      <li key={dept}>
                        <button
                          type="button"
                          onClick={() => { setSelectedDept(dept); setIsDropdownOpen(false); }}
                          className="block w-full text-left p-2 hover:bg-gray-100 hover:text-blue-700 rounded-md transition-colors"
                        >
                          {dept}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Search Input */}
            <div className="relative w-full">
              <input 
                type="search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2.5 bg-white border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 block w-full outline-none" 
                placeholder="Search by name, company..." 
              />
            </div>

            {/* Search Button */}
            <button 
              type="button" 
              className="inline-flex items-center shrink-0 text-white bg-blue-700 hover:bg-blue-800 border border-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-lg text-sm px-5 py-2.5 focus:outline-none transition-colors z-10"
            >
              <Search className="w-4 h-4 me-1.5 hidden sm:inline" />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* --- ALUMNI GRID --- */}
      <section className="max-w-6xl mx-auto py-10 px-6">
        
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
           <h2 className="text-lg font-bold uppercase text-gray-800 flex items-center gap-2">
             Results <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{filteredAlumni.length}</span>
           </h2>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAlumni.length > 0 ? (
              filteredAlumni.map((alumnus) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={alumnus.id}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-5 border-b border-gray-100 pb-4">
                    <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-blue-700 font-bold text-xl uppercase shrink-0">
                      {alumnus.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {alumnus.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mt-1">
                        Class of {alumnus.batch}
                      </p>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-3 mb-6 flex-1">
                    <InfoItem icon={<GraduationCap size={16} />} text={alumnus.dept} />
                    <InfoItem icon={<Briefcase size={16} />} text={alumnus.company} />
                    <InfoItem icon={<MapPin size={16} />} text={alumnus.location} />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={`mailto:${alumnus.email}`}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-xs uppercase tracking-wide hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={14}/> Contact
                    </a>
                    <button className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                      <Linkedin size={16}/>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <Search size={40} className="mx-auto text-gray-300 mb-3" />
                <h2 className="text-lg font-bold text-gray-600 uppercase tracking-wide">
                  No Alumni Found
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Try adjusting your search criteria or department filter.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
};

/* --- Custom Lucide Icon Import --- */
const UsersIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const InfoItem = ({ icon, text }) => (
  <div className="flex items-start gap-3 text-sm text-gray-600 font-medium">
    <span className="text-gray-400 mt-0.5">{icon}</span> 
    <span className="leading-snug">{text}</span>
  </div>
);

export default AlumniDirectory;