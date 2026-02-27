import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, GraduationCap, Mail, Linkedin } from 'lucide-react';

const AlumniDirectory = () => {
  // 1. Dummy Data (5-6 Alumni Profiles)
  const initialAlumni = [
    { id: 1, name: "Yash", batch: "2024", dept: "Information Technology", company: "Google", location: "Bangalore", email: "yash@example.com" },
    { id: 2, name: "Hardik Shah", batch: "2018", dept: "Computer Engineering", company: "Microsoft", location: "Hyderabad", email: "hardik@example.com" },
    { id: 3, name: "Anjali Vyas", batch: "2020", dept: "Electronics & Communication", company: "ISRO", location: "Ahmedabad", email: "anjali@example.com" },
    { id: 4, name: "Sneha Patel", batch: "2015", dept: "Civil Engineering", company: "L&T Construction", location: "Mumbai", email: "sneha@example.com" },
    { id: 5, name: "Rahul Mehta", batch: "2022", dept: "Mechanical Engineering", company: "Tesla", location: "California", email: "rahul@example.com" },
    { id: 6, name: "Jevik", batch: "2023", dept: "Instrumentation & Control", company: "Reliance", location: "Jamnagar", email: "jevik@example.com" }
  ];

  // 2. States for Search and Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const departments = ["All", "Computer Engineering", "Information Technology", "Electronics & Communication", "Mechanical", "Civil", "Instrumentation & Control"];

  // 3. Filter Logic
  const filteredAlumni = initialAlumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alumnus.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || alumnus.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#1e40af] text-white pt-20 pb-28 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
          Alumni Directory
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100 text-lg font-medium opacity-90">
          Connect with thousands of VGECians globally and strengthen your professional network.
        </p>
      </section>

      {/* --- SEARCH & FILTER BAR --- */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white p-5 rounded-3xl shadow-2xl border border-gray-100 -mt-12 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            
            {/* Search Input (No Icon as requested) */}
            <div className="relative w-full lg:flex-1">
              <input 
                type="text" 
                placeholder="Search by name, company, or skills..." 
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-200 mx-2"></div>

            {/* Department Filter */}
            <div className="w-full lg:w-auto flex items-center gap-3">
              <Filter className="text-gray-400 hidden md:block" size={20} />
              <select 
                className="w-full lg:w-48 p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-600 cursor-pointer"
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- ALUMNI LIST GRID --- */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alumnus) => (
              <div key={alumnus.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-5 mb-6">
                  {/* Profile Avatar */}
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-black text-2xl border-4 border-white shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {alumnus.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 leading-tight">
                      {alumnus.name}
                    </h3>
                    <span className="text-blue-600 text-sm font-bold tracking-widest uppercase">
                      Class of {alumnus.batch}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <GraduationCap size={18} className="text-blue-500" /> {alumnus.dept}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <Briefcase size={18} className="text-blue-500" /> {alumnus.company}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                    <MapPin size={18} className="text-blue-500" /> {alumnus.location}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a href={`mailto:${alumnus.email}`} className="flex-1 bg-gray-50 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center gap-2">
                    <Mail size={16} /> Contact
                  </a>
                  <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] shadow-inner">
              <h2 className="text-2xl font-bold text-gray-400 italic">No alumni found matching your criteria.</h2>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AlumniDirectory;