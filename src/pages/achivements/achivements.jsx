import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Target, Award, Plus, X, CheckCircle, Search, Filter } from 'lucide-react'

const Achievements = () => {

  const [showModal, setShowModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) 
  const [searchQuery, setSearchQuery] = useState("")
  const [achievements, setAchievements] = useState([])
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    batch: "",
    description: "",
    photo: null
  })

  // Categories inside the filter
  const categories = ["All Categories", "Corporate", "Sports", "Entrepreneurship", "Academic", "Social Work", "Other"]

  const fetchAchievements = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/achievements/approved")
      const data = await res.json()

      if (res.ok) {
        setAchievements(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAchievements()
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

      const res = await fetch("http://localhost:8000/api/v1/achievements/create", {
        method: "POST",
        credentials: "include",
        body: data
      })

      const result = await res.json()

      if (res.ok) {
        alert("Achievement submitted for administrative approval.")
        setShowModal(false)
        setFormData({ title: "", category: "", batch: "", description: "", photo: null })
      } else {
        setFormError(result.message || "Failed to submit achievement.")
      }

    } catch (error) {
      console.log(error)
      setFormError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter Logic
  const filteredAchievements = achievements.filter(item => {
    const matchesCategory = activeCategory === "All Categories" || item.category === activeCategory;
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.userId?.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  })

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20 overflow-x-hidden">

      <section className="bg-blue-800 text-white py-14 px-6 border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide flex items-center gap-3">
              <Trophy className="text-yellow-400" size={32} /> 
              Alumni Stars
            </h1>
            <p className="mt-2 text-blue-200 text-sm font-medium">
              Celebrating the outstanding milestones and professional achievements of our global network.
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded font-bold uppercase text-xs tracking-wide transition-colors shadow-sm flex items-center gap-2 active:scale-95 transition-transform"
            >
              <Plus size={18} /> Share Achievement
            </button>
          </div>
        </div>
      </section>

      {/* --- UNIFIED SEARCH & FILTER BAR --- */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-lg flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          <form className="w-full lg:max-w-md" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
             <input 
                type="search" 
                id="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-2.5 ps-9 pl-10 bg-gray-neutral-secondary-medium bg-gray-50 border border-gray-default-medium border-gray-300 text-gray-heading text-gray-900 text-sm rounded focus:ring-1 focus:ring-blue-ring focus:border-blue-brand focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors placeholder:text-gray-body" 
                placeholder="Search alumni, titles, or descriptions..." 
                required
              />
              <button 
                type="submit" 
                className="absolute right-1.5 bottom-1.5 end-1.5 bottom-1.5 text-white bg-blue-brand bg-blue-700 hover:bg-blue-brand-strong hover:bg-blue-800 box-border border border-transparent focus:ring-4 focus:ring-blue-brand-medium focus:ring-blue-300 font-medium rounded text-xs px-4 py-1.5 focus:outline-none transition-colors shadow-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category Filter Dropdown */}
          <div className="relative w-full lg:w-56">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-700 rounded text-sm font-bold hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <span className="truncate uppercase tracking-wider text-[11px]">{activeCategory}</span>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-20 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg overflow-hidden"
                >
                  <ul className="py-1 text-sm text-gray-700 font-bold uppercase tracking-wider text-[11px]">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => { setActiveCategory(cat); setIsDropdownOpen(false); }}
                          className={`block w-full text-left px-4 py-2.5 hover:bg-gray-50 hover:text-blue-700 transition-colors ${activeCategory === cat ? 'bg-gray-50 text-blue-700' : ''}`}
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

        </div>
      </div>

      {/* --- ACHIEVEMENTS GRID --- */}
      <section className="max-w-6xl mx-auto px-6 py-8 relative">
        
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
           <h2 className="text-lg font-bold uppercase text-gray-800 flex items-center gap-2">
             Results <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{filteredAchievements.length}</span>
           </h2>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((item) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {/* Card Banner */}
                <div className="h-32 bg-gray-100 border-b border-gray-200 flex items-center justify-center relative">
                  {item.photo ? (
                    <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <Star className="text-gray-300" size={40} />
                  )}
                  {item.category && (
                    <span className="absolute top-3 right-3 bg-white border border-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-blue-700 text-xs font-bold uppercase tracking-wide mb-3">
                    {item.userId?.fullName || "Anonymous"}
                  </p>
                  <p className="text-gray-600 text-sm flex-1 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold uppercase tracking-wide">
                      <CheckCircle size={14} /> Verified
                    </div>
                    {item.batch && (
                      <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                        Batch {item.batch}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm mt-4">
            <Trophy className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-600 font-bold uppercase tracking-wide">No achievements found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or category filter.</p>
          </div>
        )}
      </section>

      {/* --- SUBMIT MODAL (Enterprise Form with Validation) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-lg w-full max-w-lg shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              
              {/* Modal Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center relative sticky top-0">
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                  Share Achievement
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 absolute top-4 right-4 end-4 top-4">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto">
                
                {formError && (
                  <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-3 text-xs font-bold text-red-700 uppercase tracking-wide">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Title Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Achievement Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g., Founded a Tech Startup"
                      onChange={handleChange}
                      value={formData.title}
                      required
                      className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  {/* Category & Batch Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        onChange={handleChange}
                        value={formData.category}
                        required
                        className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                      >
                        <option value="">-- Select --</option>
                        {categories.filter(c => c !== "All Categories").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
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
                        className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      placeholder="Brief details about your milestone..."
                      rows="3"
                      onChange={handleChange}
                      value={formData.description}
                      required
                      className="w-full p-2.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Supporting Photo (Optional)
                    </label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      className="w-full border border-gray-300 rounded p-1.5 text-sm bg-gray-50 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                  </div>

                  {/* Info Box (Suspension line removed as requested) */}
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded text-xs text-blue-800 flex gap-2 items-start font-medium shadow-inner">
                    <Target size={16} className="shrink-0 mt-0.5" />
                    <p>Submissions are monitored by the Alumni association. Please ensure all details are accurate and professional.</p>
                  </div>

                  {/* Modal Footer */}
                  <div className="pt-4 border-t border-gray-200 mt-6 flex justify-end gap-3 sticky bottom-0 bg-white">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2 border border-gray-300 rounded text-gray-700 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-blue-700 text-white px-6 py-2 rounded text-sm font-bold uppercase tracking-wide shadow-sm flex items-center gap-2 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800 active:scale-95'}`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"} {!isSubmitting && <Award size={16} />}
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