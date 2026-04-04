import React, { useEffect, useState } from "react";
import {
  Heart,
  Landmark,
  ShieldCheck,
  Wallet,
  ChevronRight,
  Gift,
  Award,
  CheckCircle,
  X,
  CreditCard,
  Lock
} from "lucide-react";

// Developer: Yash Patel
// Description: Official Alumni Fundraising & Donation Module

const Donation = () => {

  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FETCH ACTIVE CAMPAIGNS
  const fetchCampaigns = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/campaign/active",
        {
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok && data.data) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.log("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDonation = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const donationAmount = Number(amount);
    if (!donationAmount || donationAmount < 100) {
      setErrorMsg("Please enter a valid amount (Minimum ₹100).");
      return;
    }
  
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/donation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include", // cookie authentication
          body: JSON.stringify({
            campaignId: selectedCampaign._id,
            amount: donationAmount
          })
        }
      );
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Thank you! Your donation was successful. ❤️");
        setSelectedCampaign(null);
        setAmount("");
        fetchCampaigns(); // Refresh progress
      } else {
        setErrorMsg(data.message || "Transaction failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Network error: Could not complete the transaction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">

      {/* --- HERO SECTION --- */}
      <section className="bg-blue-800 text-white py-14 px-6 border-b-4 border-blue-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-900 border border-blue-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck size={14} className="text-green-400" /> 100% Secure & Verified
            </div>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-3 flex items-center gap-3">
              <Heart size={36} className="text-red-400 fill-red-400" />
              Support VGEC
            </h1>
            <p className="text-blue-200 text-sm md:text-base font-medium max-w-xl">
              Your contributions directly empower the next generation of engineers, fund critical campus infrastructure, and support alumni initiatives.
            </p>
          </div>
          
          <div className="hidden md:flex bg-white/10 border border-white/20 p-6 rounded-lg flex-col items-center justify-center text-center w-64 shadow-sm">
            <Landmark size={40} className="text-blue-300 mb-3" />
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">80G Tax Exempt</h3>
            <p className="text-blue-200 text-xs mt-1 font-medium">All donations are eligible for tax deduction.</p>
          </div>
        </div>
      </section>

      {/* --- CAMPAIGNS GRID --- */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
           <h2 className="text-2xl font-bold uppercase text-gray-900 flex items-center gap-2 tracking-wide">
             Active Campaigns <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{campaigns.length}</span>
           </h2>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Gift className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-bold uppercase tracking-wide text-sm">No active campaigns right now</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
              // Calculate progress percentage securely
              const rawProgress = (campaign.currentAmount / campaign.targetAmount) * 100;
              const progress = Math.min(Math.max(rawProgress, 0), 100); // Clamp between 0 and 100

              return (
                <div
                  key={campaign._id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
                      {campaign.description}
                    </p>

                    {/* PROGRESS BAR SECTION */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-1.5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Raised</span>
                          <span className="text-blue-700 font-black text-sm">₹{campaign.currentAmount?.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Target</span>
                          <span className="text-gray-700 font-bold text-sm">₹{campaign.targetAmount?.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-2 mb-3 border border-gray-200 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-xs text-gray-500 font-semibold flex items-center gap-1 mb-5">
                        <Clock size={12} className="text-orange-500" />
                        Ends on {new Date(campaign.endDate).toLocaleDateString()}
                      </p>

                      <button
                        onClick={() => {
                          setErrorMsg("");
                          setAmount("");
                          setSelectedCampaign(campaign);
                        }}
                        className="w-full bg-white border-2 border-blue-600 text-blue-700 py-2.5 rounded text-sm font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors shadow-sm"
                      >
                        Donate Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* --- SECURE DONATION MODAL --- */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setSelectedCampaign(null)}
          />

          {/* Modal Container */}
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl relative z-10 flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                  <Wallet className="text-blue-700" size={20} /> Complete Donation
                </h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1 truncate max-w-[250px]">
                  {selectedCampaign.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              
              {errorMsg && (
                <div className="mb-5 bg-red-50 border-l-4 border-red-500 p-3 text-xs font-bold text-red-700 uppercase tracking-wide">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleDonation}>
                
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Enter Amount (INR) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-bold text-lg">₹</span>
                    </div>
                    <input
                      type="number"
                      min="100"
                      placeholder="e.g. 5000"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setErrorMsg("");
                      }}
                      required
                      className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded text-lg font-bold text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 font-medium">Minimum donation amount is ₹100.</p>
                </div>

                <div className="bg-gray-50 p-4 border border-gray-200 rounded mb-6 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>Campaign Target:</span>
                    <span>₹{selectedCampaign.targetAmount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-blue-700">
                    <span>Currently Raised:</span>
                    <span>₹{selectedCampaign.currentAmount?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-green-600 text-white py-3.5 rounded text-sm font-bold uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'}`}
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Pay"} 
                    {!isSubmitting && <CreditCard size={18} />}
                  </button>
                  <div className="flex justify-center items-center gap-1 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Lock size={12} /> 100% Secure Payment 
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Donation;