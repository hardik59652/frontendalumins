import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Target, Award, Plus, X, CheckCircle } from 'lucide-react'

const Achievements = () => {

  const [showModal, setShowModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [achievements, setAchievements] = useState([])

  const [formData, setFormData] = useState({
    title:"",
    category:"",
    batch:"",
    description:"",
    photo:null
  })

  const categories = ["All","Entrepreneurship","Academic","Corporate","Social Work","Sports"]

  // ===============================
  // Fetch Approved Achievements
  // ===============================

  const fetchAchievements = async () => {
    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/achievements/approved"
      )

      const data = await res.json()

      if(res.ok){
        setAchievements(data.data)
      }

    } catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAchievements()
  },[])

  // ===============================
  // Handle Input Change
  // ===============================

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  // ===============================
  // Handle File Upload
  // ===============================

  const handleFileChange = (e)=>{
    setFormData({
      ...formData,
      photo:e.target.files[0]
    })
  }

  // ===============================
  // Submit Achievement
  // ===============================

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{

      const data = new FormData()

      data.append("title",formData.title)
      data.append("category",formData.category)
      data.append("description",formData.description)
      data.append("batch",formData.batch)
      data.append("photo",formData.photo)

      const res = await fetch(
        "http://localhost:8000/api/v1/achievements/create",
        {
          method:"POST",
          credentials:"include",
          body:data
        }
      )

      const result = await res.json()

      if(res.ok){
        alert("Achievement submitted for approval")
        setShowModal(false)

        setFormData({
          title:"",
          category:"",
          batch:"",
          description:"",
          photo:null
        })

      }else{
        alert(result.message)
      }

    }catch(error){
      console.log(error)
    }
  }

  return (

    <div className="min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}

      <section className="bg-blue-800 text-white py-16 text-center">

        <h1 className="text-4xl font-black flex justify-center gap-3 items-center">
          <Trophy className="text-yellow-400"/> Alumni Stars
        </h1>

        <p className="mt-3 text-blue-200">
          Celebrating alumni achievements
        </p>

        <button
          onClick={()=>setShowModal(true)}
          className="mt-6 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto"
        >
          <Plus size={18}/> Share Achievement
        </button>

      </section>


      {/* FILTER BUTTONS */}

      <div className="flex gap-3 justify-center mt-10">

        {categories.map((cat)=>(
          <button
            key={cat}
            onClick={()=>setActiveCategory(cat)}
            className={`px-5 py-2 rounded-lg font-bold ${
              activeCategory === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>


      {/* ACHIEVEMENTS GRID */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <AnimatePresence>

          {achievements
          .filter(item=>activeCategory==="All" || item.category===activeCategory)
          .map((item)=>(
            
            <motion.div
              key={item._id}
              initial={{opacity:0,scale:0.9}}
              animate={{opacity:1,scale:1}}
              className="bg-white rounded-2xl shadow-lg border overflow-hidden"
            >

              <div className="h-32 bg-blue-50 flex items-center justify-center">
                <Star className="text-blue-300"/>
              </div>

              <div className="p-6">

                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="text-blue-600 text-sm font-bold mt-1">
                  {item.userId?.fullName}
                </p>

                <p className="text-gray-500 mt-3 text-sm">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-green-600 mt-4 text-xs font-bold">
                  <CheckCircle size={14}/> Verified
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

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <motion.div
            initial={{scale:0.8}}
            animate={{scale:1}}
            className="bg-white p-8 rounded-2xl w-[400px] relative"
          >

            <button
              onClick={()=>setShowModal(false)}
              className="absolute top-4 right-4"
            >
              <X/>
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Share Achievement
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />

              <select
                name="category"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select Category</option>

                {categories
                .filter(c=>c!=="All")
                .map(c=>(
                  <option key={c}>{c}</option>
                ))}

              </select>

              <input
                type="number"
                name="batch"
                placeholder="Batch Year"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />

              <textarea
                name="description"
                placeholder="Description"
                rows="3"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />

              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="w-full"
              />

              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 flex gap-2 items-center">
                <Target size={16}/>
                Admin will review your submission
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2"
              >
                Submit <Award size={18}/>
              </button>

            </form>

          </motion.div>

        </div>

      )}

      </AnimatePresence>

    </div>
  )
}

export default Achievements