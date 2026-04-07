import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Calendar, Wallet, ShieldCheck, MessageCircle, ArrowLeft, Info, Receipt } from "lucide-react";

const MyDonations = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyDonations = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/donation/my",
        { credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setDonations(data.data);
      }
    } catch (error) {
      console.log("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1e3a8a] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans">
      
      {/* Formal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">Donation History</h2>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded flex items-center gap-2">
               <Wallet size={14} className="text-slate-400" />
               Total Impact: <span className="text-[#1e3a8a]">₹{totalAmount}</span>
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        
        {/* System Info Box */}
        <div className="mb-8 bg-white border border-slate-200 rounded-md p-6 shadow-sm flex items-start gap-4">
          <div className="bg-red-50 p-2 rounded text-red-600 shrink-0">
            <Heart size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-950 uppercase tracking-tight">Contribution Records</h4>
            <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed max-w-3xl">
              This log contains all your official financial contributions to university campaigns. 
              Receipts for completed donations can be used for administrative reference. Thank you for giving back to the community.
            </p>
          </div>
        </div>

        {/* Content Area */}
        {donations.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-md p-20 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Receipt size={32} />
            </div>
            <h3 className="text-slate-950 font-semibold text-lg">No Contributions Found</h3>
            <p className="text-slate-500 text-sm font-medium mt-1 mb-6">You have not made any donations to our campaigns yet.</p>
            <button 
              onClick={() => navigate("/campaigns")} 
              className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
            >
              Explore Active Campaigns
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white border border-slate-200 rounded-md shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-slate-50">
                  <h3 className="text-lg font-semibold text-slate-950 leading-tight mb-4">
                    {donation.campaignId?.title || "Community Campaign"}
                  </h3>
                  
                  {/* Amount Highlight */}
                  <div className="bg-slate-50 border border-slate-100 rounded p-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount Paid</span>
                    <span className="text-xl font-bold text-[#1e3a8a]">₹{donation.amount}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs font-medium">
                        {new Date(donation.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    
                    {donation.isAnonymous && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                        <ShieldCheck size={12} /> Anonymous
                      </div>
                    )}
                  </div>

                  {/* Personal Message */}
                  {donation.message && (
                    <div className="bg-white border-l-2 border-slate-300 pl-3 py-1 mt-2">
                      <p className="text-xs text-slate-500 italic leading-relaxed">
                        "{donation.message}"
                      </p>
                    </div>
                  )}

                </div>

                {/* Card Footer */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    donation.paymentStatus === "completed" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                    : donation.paymentStatus === "pending" 
                    ? "bg-amber-50 text-amber-700 border-amber-100" 
                    : "bg-red-50 text-red-700 border-red-100"
                  }`}>
                    {donation.paymentStatus}
                  </span>
                  
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    ID: {donation._id.slice(-6)}
                  </span>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyDonations;