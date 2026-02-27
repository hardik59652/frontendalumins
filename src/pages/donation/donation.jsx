import React, { useState } from 'react';
import { Heart, Landmark, ShieldCheck, Wallet, ChevronRight, Gift, Award } from 'lucide-react';

const donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const amounts = [1000, 5000, 10000, 25000];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. Hero Section */}
      <section className="bg-[#1e40af] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Landmark className="absolute -left-10 -bottom-10 w-64 h-64 rotate-12" />
        </div>
        
        <div className="relative z-10">
          <Heart className="mx-auto mb-6 text-red-400 fill-red-400 animate-pulse" size={56} />
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Give Back to VGEC
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg font-medium opacity-90">
            "Work is Worship" — Your contribution empowers the next generation of engineers at our Chandkheda campus.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* 2. Left Side: Why Donate & Impact */}
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-6">
              Your Impact
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Established in 1994, VGEC has been a home to thousands. Today, you can help us maintain that excellence by supporting these core causes.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border-l-8 border-blue-600 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <Award className="text-blue-600" size={28} />
                <h3 className="font-black text-xl text-gray-900 uppercase">Student Scholarships</h3>
              </div>
              <p className="text-gray-600 text-sm">Providing financial aid to meritorious students from economically weaker sections.</p>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border-l-8 border-blue-600 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <ShieldCheck className="text-blue-600" size={28} />
                <h3 className="font-black text-xl text-gray-900 uppercase">Modern Infrastructure</h3>
              </div>
              <p className="text-gray-600 text-sm">Upgrading departmental labs and research facilities with the latest technology.</p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border-l-8 border-blue-600 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <Gift className="text-blue-600" size={28} />
                <h3 className="font-black text-xl text-gray-900 uppercase">Innovation Fund</h3>
              </div>
              <p className="text-gray-600 text-sm">Funding student startups and technical projects representating VGEC globally.</p>
            </div>
          </div>
        </div>

        {/* 3. Right Side: Donation Form Card */}
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
            Secure Donation
          </div>

          <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900 uppercase">
            <Wallet className="text-blue-600" size={32} /> Support Us
          </h3>

          {/* Amount Selection */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`p-5 rounded-2xl font-black text-lg border-4 transition-all ${
                  selectedAmount === amt 
                  ? "border-blue-600 bg-blue-50 text-blue-600 scale-95" 
                  : "border-gray-50 bg-gray-50 text-gray-400 hover:border-blue-200"
                }`}
              >
                ₹{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Custom Amount (₹)</label>
              <input 
                type="number" 
                placeholder="Enter any other amount" 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Batch (Year)</label>
                <input type="number" min="1994" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-3 active:scale-[0.98]">
              Contribute Now <ChevronRight size={24} strokeWidth={3} />
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-8">
            Contributions are 80G Tax Exempted • Secure via Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default donation;