import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Target, Award, Plus, X, CheckCircle, Search, Filter, ChevronDown } from 'lucide-react'
import axios from 'axios'

const Achievements = () => {

  const [showModal, setShowModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) 
  const [searchQuery, setSearchQuery] = useState("")
  const [achievements, setAchievements] = useState([])
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    batch: "",
    description: "",
    photo: null
  })

  const categories = ["All Categories", "Corporate", "Sports", "Entrepreneurship", "Academic", "Social Work", "Other"]

  const fetchAchievements = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/achievements/approved", {
        withCredentials: true
      })
      if (res.data?.data) {
        setAchievements(res.data.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAchievements()

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') fetchAchievements()
    }, 15000)

    return () => clearInterval(intervalId)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setFormError("") 
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    })
  }

  const handleYearBlur = (e) => {
    let year = parseInt(e.target.value, 10);
    const currentYear = new Date().getFullYear();
    
    if (isNaN(year) || year < 1994 || year > currentYear) {
      setFormData({
        ...formData,
        batch: 1994
      });
    }
  }

  const isValidContent = (text) => {
    const badWords = ["fuck", "shit", "bitch", "idiot", "stupid", "chutiya", "madarchod", "behenchod", "mc", "bc", "asshole", "abuse"];
    const lowerText = text.toLowerCase();
  
    for (let word of badWords) {
      if (lowerText.includes(word)) return false;
    }
   
    if (/(.)\1{7,}/.test(lowerText)) return false; 
    
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    if (!isValidContent(formData.title) || !isValidContent(formData.description)) {
      setFormError("Please maintain professional language. Inappropriate or spam content is strictly prohibited.")
      return;
    }

    if (formData.batch < 1994 || formData.batch > new Date().getFullYear()) {
      setFormError(`Batch year must be between 1994 and ${new Date().getFullYear()}.`)
      return;
    }

    setIsSubmitting(true)

    try {
      const data = new FormData()
      data.append("title", formData.title)
      data.append("category", formData.category)
      data.append("description", formData.description)
      data.append("batch", formData.batch)
      if (formData.photo) data.append("photo", formData.photo)

      const res = await axios.post("http://localhost:8000/api/v1/achievements/create", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (res.data) {
        alert("Achievement submitted for administrative approval.")
        setShowModal(false)
        setFormData({ title: "", category: "", batch: "", description: "", photo: null })
      }

    } catch (error) {
      console.error(error)
      setFormError(error.response?.data?.message || "Failed to submit achievement. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredAchievements = achievements.filter(item => {
    const matchesCategory = activeCategory === "All Categories" || item.category === activeCategory;
    const matchesSearch = (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
                          (item.description?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                          (item.userId?.fullName?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 selection:bg-blue-100">

      <section className="bg-blue-800 text-white py-16 px-6 border-b border-blue-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full">
            <h1 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
              <Trophy className="text-yellow-400" size={32} /> 
              Alumni Stars
            </h1>
            <p className="mt-3 text-blue-200 text-sm font-medium">
              Celebrating the outstanding milestones and professional achievements of our global network.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-blue-900 hover:bg-slate-100 px-6 py-3 rounded-sm font-bold uppercase text-[11px] tracking-widest transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus size={16} /> Share Achievement
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <form className="bg-white p-2 border border-slate-200 shadow-sm rounded-sm flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
          
          <div className="relative sm:w-64 shrink-0">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 text-slate-800 rounded-sm text-[11px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-500" />
                <span className="truncate">{activeCategory}</span>
              </div>
              <ChevronDown size={14} className={`text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.1 }}
                  className="absolute left-0 mt-1 w-full bg-white border border-slate-200 rounded-sm shadow-lg overflow-hidden z-50"
                >
                  <ul className="p-1 text-[11px] text-slate-700 font-bold uppercase tracking-wider">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => { setActiveCategory(cat); setIsDropdownOpen(false); }}
                          className="block w-full text-left px-3 py-2 hover:bg-slate-50 rounded-sm transition-colors"
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full flex">
            <div className="relative w-full">
               <input 
                type="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:border-slate-500 focus:ring-1 focus:ring-slate-500 outline-none rounded-l-sm placeholder:text-slate-400" 
                placeholder="Search alumni, titles, or descriptions..." 
              />
            </div>
            <button 
              type="submit" 
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] uppercase tracking-widest px-6 py-3 rounded-r-sm transition-colors shrink-0"
            >
              Search
            </button>
          </div>

        </form>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-2">
           <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
             Results <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-sm">{filteredAchievements.length}</span>
           </h2>
        </div>

        {isLoading ? (
           <div className="py-20 flex justify-center">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
           </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((item) => (
                <motion.div
                  layout
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.15 }}
                  className="bg-white rounded-sm border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  <div className="h-40 bg-slate-100 border-b border-slate-200 flex items-center justify-center relative">
                    {item.photo ? (
                      <img src={`http://localhost:8000/${item.photo}`} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <Star className="text-slate-300" size={40} />
                    )}
                    {item.category && (
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-black text-lg text-slate-900 leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">
                      {item.userId?.fullName || "Anonymous"}
                    </p>
                    <p className="text-slate-600 text-sm flex-1 leading-relaxed font-medium">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                      <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle size={14} /> Verified
                      </div>
                      {item.batch && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-2 py-1 rounded-sm border border-slate-200">
                          Batch {item.batch}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!isLoading && filteredAchievements.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-sm mt-4">
            <Trophy className="mx-auto text-slate-300 mb-4" size={40} />
            <p className="text-slate-700 font-black uppercase tracking-widest text-[11px]">No achievements found</p>
            <p className="text-slate-500 text-sm mt-2 font-medium">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-white rounded-sm w-full max-w-lg shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0">
                <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">
                  Share Achievement
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                
                {formError && (
                  <div className="mb-6 bg-red-50 border border-red-200 p-3 text-[11px] font-black text-red-600 uppercase tracking-wider rounded-sm">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                      Achievement Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g., Founded a Tech Startup"
                      onChange={handleChange}
                      value={formData.title}
                      required
                      className="w-full p-3 bg-white border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-500 font-medium placeholder:text-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        onChange={handleChange}
                        value={formData.category}
                        required
                        className="w-full p-3 bg-white border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-500 font-medium"
                      >
                        <option value="">-- Select --</option>
                        {categories.filter(c => c !== "All Categories").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                        Batch Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="batch"
                        min="1994"
                        max={new Date().getFullYear()}
                        placeholder="e.g., 2020"
                        onChange={handleChange}
                        onBlur={handleYearBlur} 
                        value={formData.batch}
                        required
                        className="w-full p-3 bg-white border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-500 font-medium placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Brief details about your milestone..."
                      rows="4"
                      onChange={handleChange}
                      value={formData.description}
                      required
                      className="w-full p-3 bg-white border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-slate-500 font-medium resize-none placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                      Supporting Photo (Optional)
                    </label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      className="w-full border border-slate-300 rounded-sm p-2 text-sm bg-slate-50 file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300 transition-colors"
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm text-[11px] text-slate-600 flex gap-3 items-start font-medium">
                    <Target size={16} className="shrink-0 mt-0.5 text-slate-400" />
                    <p>Submissions are monitored by the Alumni association. Please ensure all details are accurate and professional.</p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2.5 border border-slate-300 rounded-sm text-slate-700 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-blue-700 text-white px-6 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'}`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"} {!isSubmitting && <Award size={14} />}
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Achievements