import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Award,
  ArrowRight,
  GraduationCap,
  MapPin,
  Sparkles,
  ChevronDown
} from "lucide-react";

const Home = () => {

  const heroImg =
    "https://res.cloudinary.com/di14davts/image/upload/f_auto,q_auto,w_1920/v1772540491/Gemini_Generated_Image_yyrlzayyrlzayyrl_zunbjz.png";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">

      {/* HERO SECTION */}

      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-white px-4 overflow-hidden">

        <div className="absolute inset-0">

          <img
            src={heroImg}
            alt="VGEC Campus"
            loading="lazy"
            className="w-full h-full object-cover object-center md:object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/40 to-black/50"></div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >

          <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
            <GraduationCap size={14} />
            Connecting Since 1994
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight uppercase tracking-tight mb-6">

            Once a <span className="text-blue-400">Vishwakarmian</span>,
            <br />
            Always a Vishwakarmian.

          </h1>

          <p className="text-lg md:text-2xl mb-10 text-blue-100 italic max-w-3xl mx-auto">

            "Work is Worship" — Re-igniting 30+ years of excellence and legacy.

          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105">

              Join the Network
              <ArrowRight size={18} />

            </button>

            <button className="border border-white/40 px-6 md:px-10 py-3 md:py-4 rounded-xl backdrop-blur-md hover:bg-white hover:text-blue-900 transition">

              Explore Events

            </button>

          </div>

        </motion.div>

        {/* Scroll Indicator */}

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 text-white"
        >
          <ChevronDown size={30} />
        </motion.div>

      </section>

      {/* STATS */}

      <section className="py-16 -mt-16 relative z-10 px-4">

        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {[
            { label: "Global Alumni", count: "25K+", icon: <Users /> },
            { label: "Mentors", count: "500+", icon: <Award /> },
            { label: "Chapters", count: "15+", icon: <MapPin /> },
            { label: "Founded", count: "1994", icon: <Calendar /> }
          ].map((stat, i) => (

            <motion.div
              key={i}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              viewport={{ once: true }}
            >

              <div className="text-blue-600 flex justify-center mb-2">
                {stat.icon}
              </div>

              <div className="text-3xl md:text-4xl font-black">
                {stat.count}
              </div>

              <p className="text-xs uppercase text-gray-400 tracking-widest">
                {stat.label}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-20 max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-black uppercase flex items-center justify-center gap-2">

            <Sparkles className="text-blue-600" />
            Why Join the Association

          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <FeatureCard
            title="Professional Networking"
            desc="Connect with thousands of successful VGEC alumni working worldwide."
            icon={<Users className="text-blue-600" />}
          />

          <FeatureCard
            title="Career Support"
            desc="Exclusive referrals, job boards, and mentoring opportunities."
            icon={<Award className="text-blue-600" />}
          />

          <FeatureCard
            title="Annual Reunions"
            desc="Celebrate nostalgia and reconnect with friends every year."
            icon={<Calendar className="text-blue-600" />}
          />

        </div>

      </section>

      {/* CTA */}

      <section className="bg-blue-600 text-white py-20 text-center px-4">

        <h2 className="text-3xl md:text-4xl font-black mb-6">

          Become Part of the VGEC Alumni Network

        </h2>

        <p className="max-w-2xl mx-auto mb-8 opacity-90">

          Reconnect with classmates, expand your network and give back to the
          institution that shaped your journey.

        </p>

        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:scale-105 transition">

          Register as Alumni

        </button>

      </section>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (

  <motion.div
    whileHover={{ y: -8 }}
    className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition text-center md:text-left"
  >

    <div className="mb-5 bg-blue-50 w-14 h-14 flex items-center justify-center rounded-xl mx-auto md:mx-0">
      {icon}
    </div>

    <h3 className="text-xl font-bold mb-3">{title}</h3>

    <p className="text-gray-500">{desc}</p>

  </motion.div>

);

export default Home;