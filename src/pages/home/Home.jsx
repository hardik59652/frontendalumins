import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users, Calendar, Award, ArrowRight, GraduationCap, 
  Sparkles, ChevronDown, Briefcase, History, Quote, Globe, Building
} from "lucide-react";

const Home = () => {
  // --- OLD DATA (UNCHANGED) ---
  const heroSlides = [
    "https://res.cloudinary.com/di14davts/image/upload/f_auto,q_auto,w_1920/v1772540491/Gemini_Generated_Image_yyrlzayyrlzayyrl_zunbjz.png",
    "https://res.cloudinary.com/di14davts/image/upload/v1772721207/4_vajpyh.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772721189/8_hezskd.jpg"
  ];

  const networkPhotos = [
    "https://res.cloudinary.com/di14davts/image/upload/v1772799299/68785f56323e1SIP_cnktau.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772799308/6989e35659beb_Dr_Prashant_Bhimani_o82wen.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772799301/vssh_d7lcot.jpg"
  ];

  const careerPhotos = [
    "https://res.cloudinary.com/di14davts/image/upload/v1772799299/68785f56323e1SIP_cnktau.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772801117/1753880810_688a18ea925de_over1_yij3dv.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772801103/1648432184615_yzfjgq.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772801091/1737465976954_fq4ozs.jpg"
  ];

  const reunionPhotos = [
    "https://res.cloudinary.com/di14davts/image/upload/v1772802596/698b03c36fbb4_TECHNIX_-_TECH_EVENT_4_qxwcuc.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772721207/4_vajpyh.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772802436/badminton_2023_1_w3sylt.jpg",
    "https://res.cloudinary.com/di14davts/image/upload/v1772802590/67504fb831a5e6_1_pvlula.jpg"
  ];

  const [heroIdx, setHeroIdx] = useState(0);
  const [netIdx, setNetIdx] = useState(0);
  const [careerIdx, setCareerIdx] = useState(0);
  const [reunionIdx, setReunionIdx] = useState(0);

  useEffect(() => {
    const hT = setInterval(() => setHeroIdx((p) => (p + 1) % heroSlides.length), 5000);
    const nT = setInterval(() => setNetIdx((p) => (p + 1) % networkPhotos.length), 3500);
    const cT = setInterval(() => setCareerIdx((p) => (p + 1) % careerPhotos.length), 4000);
    const rT = setInterval(() => setReunionIdx((p) => (p + 1) % reunionPhotos.length), 4500);
    return () => { clearInterval(hT); clearInterval(nT); clearInterval(cT); clearInterval(rT); };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">

      {/* --- HERO SECTION (UNCHANGED) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img key={heroIdx} src={heroSlides[heroIdx]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="w-full h-full object-contain md:object-cover" />
          </AnimatePresence>
        </div>
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-end md:justify-center pb-20 md:pb-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-none">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center">
            <div className="text-left md:max-w-md font-black uppercase tracking-tighter leading-tight">
              <h1 className="text-2xl md:text-5xl">Once a <span className="text-blue-500">Vishwakarmian</span>,<br /> Always a Vishwakarmian.</h1>
              <p className="text-[10px] md:text-xs mt-2 tracking-[0.3em] text-blue-200 italic font-bold">"Work is Worship"</p>
            </div>
            <div className="flex flex-col gap-3 mt-8 md:mt-0 w-full md:w-auto">
              <Link to="/register" className="bg-blue-700 px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest text-center hover:bg-blue-800 transition shadow-sm">Join Network</Link>
              <Link to="/newsevents" className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest text-center hover:bg-white hover:text-black transition">Explore Events</Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- ASSOCIATION BENEFITS --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 flex items-center justify-center gap-3">
            <Sparkles className="text-blue-700" size={24} /> Association Benefits
          </h2>
          <div className="h-1 w-16 bg-blue-700 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SliderCard to="/alumindirectory" title="Professional Networking" desc="Connect with successful VGEC alumni working in top tech giants globally." images={networkPhotos} currentIndex={netIdx} badge="Top Talent" icon={<Users size={18} />} />
          <SliderCard to="/opportunities" title="Career Support" desc="Get exclusive referrals, job boards, and mentorship from industry leaders." images={careerPhotos} currentIndex={careerIdx} badge="Hiring Now" icon={<Briefcase size={18} />} />
          <SliderCard to="/newsevents" title="Annual Reunions" desc="Relive the golden days at Chandkheda. Stay updated on upcoming meets and events." images={reunionPhotos} currentIndex={reunionIdx} badge="Latest News" icon={<History size={18} />} />
        </div>
      </section>

      {/* --- STATS SECTION (SOLID, NO GLOW) --- */}
      <section className="py-20 bg-slate-900 text-white relative border-y-4 border-blue-700">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <NewStat number="25k+" label="Alumni Network" sub="Spanning across 50+ countries" icon={<Globe className="text-blue-500 mb-3" size={24}/>} />
            <NewStat number="500+" label="Active Mentors" sub="Guiding the next generation" icon={<Award className="text-blue-500 mb-3" size={24}/>} />
            <NewStat number="32+" label="Years of Glory" icon={<History className="text-blue-500 mb-3" size={24}/>} sub="Legacy since 1994" />
            <NewStat number="100+" label="Top Recruiters" sub="Partnered global companies" icon={<Building className="text-blue-500 mb-3" size={24}/>} />
          </div>
        </div>
      </section>

      {/* --- NOTABLE VOICES --- */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center md:text-left border-b border-gray-200 pb-6">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide text-gray-900">
              Global <span className="text-blue-700">Impact</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm mt-3">
              Our alumni are leading innovation in world-class organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ModernAlumniCard name="Rahul Patel" role="Software Engineer" company="Google" img="https://res.cloudinary.com/di14davts/image/upload/v1772799299/68785f56323e1SIP_cnktau.jpg" />
            <ModernAlumniCard name="Priya Shah" role="Product Head" company="Microsoft" img="https://res.cloudinary.com/di14davts/image/upload/v1772801117/1753880810_688a18ea925de_over1_yij3dv.jpg" />
            <ModernAlumniCard name="Jay Mehta" role="Founder & CEO" company="Unicorn Inc." img="https://res.cloudinary.com/di14davts/image/upload/v1772801103/1648432184615_yzfjgq.jpg" />
          </div>
        </div>
      </section>

      {/* --- CAMPUS GALLERY --- */}
      <section className="py-20 bg-gray-100 text-gray-900 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800">Campus Memories</h2>
            <div className="h-1 w-12 bg-blue-700 mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[400px]">
            <div className="col-span-2 row-span-2 rounded-xl overflow-hidden group border border-gray-300 bg-white">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772721207/4_vajpyh.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-xl overflow-hidden group border border-gray-300 bg-white">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772802596/698b03c36fbb4_TECHNIX_-_TECH_EVENT_4_qxwcuc.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-xl overflow-hidden group border border-gray-300 bg-white">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772802436/badminton_2023_1_w3sylt.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-2 rounded-xl overflow-hidden group border border-gray-300 bg-white">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772802590/67504fb831a5e6_1_pvlula.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL --- */}
      <section className="py-24 px-6 bg-white">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="max-w-3xl mx-auto text-center relative">
          <Quote className="text-gray-200 mx-auto mb-6" size={48} />
          <p className="text-xl md:text-3xl font-semibold text-gray-700 leading-relaxed italic">
            "The mentorship I received from my seniors via this association was a turning point. It's more than a network; it's a family."
          </p>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-800">Alumni – Batch of 2021</h4>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

/* --- COMPONENTS (Minimally adjusted for standard corporate look) --- */

const NewStat = ({number, label, sub, icon}) => (
  <div className="flex flex-col items-start border-l-2 border-slate-700 pl-6 group">
    {icon}
    <h3 className="text-4xl md:text-5xl font-bold mb-1 group-hover:text-blue-400 transition-colors duration-300">{number}</h3>
    <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">{label}</p>
    <p className="text-xs text-gray-500 mt-1">{sub}</p>
  </div>
);

const ModernAlumniCard = ({name, role, company, img}) => (
  <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden group relative">
    <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
      <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={name} />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Link to="/alumindirectory" className="bg-blue-700 text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-blue-800 transition">View Profile</Link>
      </div>
    </div>
    <div className="p-5 border-t border-gray-200">
      <h3 className="text-xl font-bold uppercase text-gray-900">{name}</h3>
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mt-1">{role} / {company}</p>
    </div>
  </motion.div>
);

const SliderCard = ({ to, title, desc, images, currentIndex, badge, icon }) => (
  <Link to={to} className="block group h-full">
    <motion.div whileHover={{ y: -4 }} className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden transition-all duration-300">
      <div className="h-[220px] w-full relative bg-gray-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img key={currentIndex} src={images[currentIndex]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="w-full h-full object-cover" />
        </AnimatePresence>
        <div className="absolute top-4 left-4 bg-white text-blue-800 text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-gray-200">
          {icon} {badge}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-start">
        <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 group-hover:text-blue-700 transition-colors mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  </Link>
);

export default Home;