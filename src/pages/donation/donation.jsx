import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Landmark, ShieldCheck, Wallet, ChevronRight, Gift, Award, CheckCircle } from 'lucide-react';

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const amounts = [1000, 5000, 10000, 25000];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      
      {/* 1. Hero Section - Responsive Padding */}
      <section className="bg-[#1e40af] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Landmark className="absolute -left-10 -bottom-10 w-48 h-48 md:w-64 md:h-64 rotate-12" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <Heart className="mx-auto mb-4 md:mb-6 text-red-400 fill-red-400 animate-pulse" size={48} md={56} />
          <h1 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-tight">
            Give Back to <span className="text-blue-300">VGEC</span>
          </h1>
          <p className="max-w-xl mx-auto text-blue-100 text-sm md:text-lg font-medium opacity-90 italic px-2">
            "Work is Worship" — Your contribution empowers the next generation of engineers at our Chandkheda campus.
          </p>
        </motion.div>
      </section>

      {/* 2. Main Content - Responsive Grid */}
      <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        
        {/* Left Side: Impact Cards */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 md:space-y-10"
        >
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4 md:mb-6">
              Your Impact
            </h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed italic">
              Established in 1994, VGEC has been a home to thousands. Today, you can help us maintain that excellence.
            </p>
          </div>

          <div className="grid gap-4 md:gap-6">
            <ImpactCard 
              icon={<Award size={24} />} 
              title="Scholarships" 
              desc="Financial aid for meritorious students from weaker sections." 
            />
            <ImpactCard 
              icon={<ShieldCheck size={24} />} 
              title="Infrastructure" 
              desc="Upgrading labs and research facilities with latest tech." 
            />
            <ImpactCard 
              icon={<Gift size={24} />} 
              title="Innovation Fund" 
              desc="Funding student startups representing VGEC globally." 
            />
          </div>
        </motion.div>

        {/* 3. Right Side: Donation Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-100 relative"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 md:px-8 py-1.5 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg flex items-center gap-2">
            <CheckCircle size={14} /> Secure Donation
          </div>

          <h3 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 text-gray-900 uppercase tracking-tight">
            <Wallet className="text-blue-600" size={28} /> Support Us
          </h3>

          {/* Amount Selection - Mobile Optimized Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`p-4 md:p-5 rounded-2xl font-black text-base md:text-lg border-4 transition-all active:scale-95 ${
                  selectedAmount === amt 
                  ? "border-blue-600 bg-blue-50 text-blue-600" 
                  : "border-gray-50 bg-gray-50 text-gray-400 hover:border-blue-200"
                }`}
              >
                ₹{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <form className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Custom Amount (₹)</label>
              <input 
                type="number" 
                placeholder="Enter any other amount" 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-base md:text-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" placeholder="Alumni`s Name" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Batch (Year)</label>
                <input type="number" placeholder="Alumni`s Batch" min="1994" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-2 md:gap-3 active:scale-[0.98]">
              Contribute Now <ChevronRight size={20} strokeWidth={3} />
            </button>
          </form>

          <p className="text-center text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6 md:mt-8 px-4">
            Contributions are 80G Tax Exempted • Secure via Razorpay
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Helper Component ---
const ImpactCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border-l-8 border-blue-600 hover:shadow-xl transition-all group">
    <div className="flex items-center gap-4 mb-2 md:mb-3">
      <div className="text-blue-600 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-black text-lg md:text-xl text-gray-900 uppercase tracking-tight">{title}</h3>
    </div>
    <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Donation;