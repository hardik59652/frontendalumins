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
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">

      {/* --- HERO SECTION (UNCHANGED) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img key={heroIdx} src={heroSlides[heroIdx]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="w-full h-full object-contain md:object-cover" />
          </AnimatePresence>
        </div>
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-end md:justify-center pb-20 md:pb-0">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center">
            <div className="text-left md:max-w-md font-black uppercase tracking-tighter leading-tight">
              <h1 className="text-2xl md:text-5xl">Once a <span className="text-blue-400">Vishwakarmian</span>,<br /> Always a Vishwakarmian.</h1>
              <p className="text-[10px] md:text-xs mt-2 tracking-[0.3em] text-blue-100/60 italic font-bold">"Work is Worship"</p>
            </div>
            <div className="flex flex-col gap-3 mt-8 md:mt-0 w-full md:w-auto">
              <Link to="/register" className="bg-blue-600 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-center shadow-xl hover:bg-blue-700 transition">Join Network</Link>
              <Link to="/newsevents" className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-center hover:bg-white hover:text-black transition">Explore Events</Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- ASSOCIATION BENEFITS (UNCHANGED) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 flex items-center justify-center gap-3">
            <Sparkles className="text-blue-600" size={30} /> Association Benefits
          </h2>
          <div className="h-1.5 w-16 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <SliderCard to="/alumindirectory" title="Professional Networking" desc="Connect with successful VGEC alumni working in top tech giants globally." images={networkPhotos} currentIndex={netIdx} badge="Top Talent" icon={<Users size={18} />} />
          <SliderCard to="/opportunities" title="Career Support" desc="Get exclusive referrals, job boards, and mentorship from industry leaders." images={careerPhotos} currentIndex={careerIdx} badge="Hiring Now" icon={<Briefcase size={18} />} />
          <SliderCard to="/newsevents" title="Annual Reunions" desc="Relive the golden days at Chandkheda. Stay updated on upcoming meets and events." images={reunionPhotos} currentIndex={reunionIdx} badge="Latest News" icon={<History size={18} />} />
        </div>
      </section>

      {/* --- STATS SECTION (UPGRADED: STRIPE/APPLE STYLE) --- */}
      <section className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Abstract Background Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8">
            <NewStat number="25k+" label="Alumni Network" sub="Spanning across 50+ countries" icon={<Globe className="text-blue-500 mb-4" size={28}/>} />
            <NewStat number="500+" label="Active Mentors" sub="Guiding the next generation" icon={<Award className="text-blue-500 mb-4" size={28}/>} />
            <NewStat number="32+" label="Years of Glory" icon={<History className="text-blue-500 mb-4" size={28}/>} sub="Legacy since 1994" />
            <NewStat number="100+" label="Top Recruiters" sub="Partnered global companies" icon={<Building className="text-blue-500 mb-4" size={28}/>} />
          </div>
        </div>
      </section>

      {/* --- NOTABLE VOICES (UPGRADED: INTERNATIONAL GRID) --- */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-gray-900">
              Global <span className="text-blue-600 block md:inline">Impact</span>
            </h2>
            <p className="max-w-xl text-gray-400 font-bold uppercase tracking-widest text-xs mt-6 border-l-4 border-blue-600 pl-6 py-2">
              Our alumni are leading innovation in world-class organizations and building the future of technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <ModernAlumniCard name="Rahul Patel" role="Software Engineer" company="Google" img="https://res.cloudinary.com/di14davts/image/upload/v1772799299/68785f56323e1SIP_cnktau.jpg" />
            <ModernAlumniCard name="Priya Shah" role="Product Head" company="Microsoft" img="https://res.cloudinary.com/di14davts/image/upload/v1772801117/1753880810_688a18ea925de_over1_yij3dv.jpg" />
            <ModernAlumniCard name="Jay Mehta" role="Founder & CEO" company="Unicorn Inc." img="https://res.cloudinary.com/di14davts/image/upload/v1772801103/1648432184615_yzfjgq.jpg" />
          </div>
        </div>
      </section>

      {/* --- CAMPUS GALLERY (BENTO GRID - UNCHANGED) --- */}
      <section className="py-24 bg-[#111] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-white/20 flex-1"></div>
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-white/50">Campus Memories</h2>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[500px]">
            <div className="col-span-2 row-span-2 rounded-[2rem] overflow-hidden group border border-white/10">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772721207/4_vajpyh.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="rounded-[2rem] overflow-hidden group border border-white/10">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772802596/698b03c36fbb4_TECHNIX_-_TECH_EVENT_4_qxwcuc.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="rounded-[2rem] overflow-hidden group border border-white/10">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772802436/badminton_2023_1_w3sylt.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="col-span-2 rounded-[2rem] overflow-hidden group border border-white/10">
              <img src="https://res.cloudinary.com/di14davts/image/upload/v1772802590/67504fb831a5e6_1_pvlula.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL (ULTRA CLEAN - UNCHANGED) --- */}
      <section className="py-32 px-6">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} className="max-w-4xl mx-auto text-center relative">
          <Quote className="text-blue-600/10 absolute -top-12 left-1/2 -translate-x-1/2" size={120} />
          <p className="text-2xl md:text-4xl font-black text-gray-800 leading-snug tracking-tighter">
            "The mentorship I received from my seniors via this association was a turning point. It's more than a network; it's a family."
          </p>
          <div className="mt-12">
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Alumni – Batch of 2021</h4>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

/* --- ENHANCED INTERNATIONAL COMPONENTS --- */

const NewStat = ({number, label, sub, icon}) => (
  <div className="flex flex-col items-start border-l border-white/10 pl-8 group">
    {icon}
    <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-2 group-hover:text-blue-500 transition-colors duration-500">{number}</h3>
    <p className="text-xs font-black uppercase tracking-widest text-white mb-1">{label}</p>
    <p className="text-[10px] font-bold text-gray-500 uppercase italic">{sub}</p>
  </div>
);

const ModernAlumniCard = ({name, role, company, img}) => (
  <motion.div whileHover={{ y: -20 }} className="group relative">
    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-black/10">
      <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" alt={name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
        <Link to="/alumindirectory" className="bg-white text-black p-4 rounded-full"><ArrowRight size={24} /></Link>
      </div>
    </div>
    <div className="px-2">
      <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{name}</h3>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mt-2">{role} <span className="text-gray-300 mx-2">/</span> {company}</p>
    </div>
  </motion.div>
);

const SliderCard = ({ to, title, desc, images, currentIndex, badge, icon }) => (
  <Link to={to} className="block group h-full">
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 h-full overflow-hidden border border-gray-100 flex flex-col">
      <div className="h-[280px] w-full relative overflow-hidden bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.img key={currentIndex} src={images[currentIndex]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="w-full h-full object-cover" />
        </AnimatePresence>
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-blue-600 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-2">
          {icon} {badge}
        </div>
      </div>
      <div className="p-10 flex-1 flex flex-col justify-center">
        <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors mb-3">{title}</h3>
        <p className="text-gray-500 text-sm font-medium leading-relaxed italic">{desc}</p>
      </div>
    </motion.div>
  </Link>
);

export default Home;