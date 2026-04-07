import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Heart, DollarSign, Target, Activity } from "lucide-react";


const AdminDonations = () => {

  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

   const fetchDonations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/donation/all",
        { withCredentials: true }
      );
      setDonations(res.data.data);
    } catch (err) {
      console.log("Error fetching donations:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/donation/stats",
        { withCredentials: true }
      );
      setStats(res.data.data);
    } catch (err) {
      console.log("Error fetching donation stats:", err);
    }
  };

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure you want to mark this transaction as ${status}?`)) {
      return;
    }

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:8000/api/v1/donation/${id}/status`,
        { status }, 
        { withCredentials: true }
      );

      await fetchDonations();
      await fetchStats();

    } catch (err) {
      console.log("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
       fetchDonations();
    fetchStats();

    const intervalId = setInterval(() => {
      fetchDonations();
      fetchStats();
    }, 10000);

      return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-8 font-sans text-slate-800">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded flex items-center justify-center text-emerald-700">
          <Heart size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">Financial Records</h1>
          <p className="text-xs text-slate-500 font-medium">Monitor and verify alumni donation transactions.</p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1: Total Volume */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm hover:border-blue-200 transition-colors relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <DollarSign size={100} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Funds Raised</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded">
                <DollarSign size={20} />
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">
                ₹{stats.totalAmount?.toLocaleString() || "0"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm hover:border-blue-200 transition-colors relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Activity size={100} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Transactions</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded">
                <Activity size={20} />
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">
                {stats.totalDonations || "0"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm hover:border-blue-200 transition-colors relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Target size={100} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Campaigns Supported</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded">
                <Target size={20} />
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">
                {stats.campaigns?.length || "0"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Activity size={16} className="text-slate-400" /> Transaction Ledger
          </h2>
          <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Records: {donations.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Transaction ID / Date</th>
                <th className="px-6 py-4">Donor Information</th>
                <th className="px-6 py-4">Target Campaign</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-slate-50 transition-colors">
                    
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        TXN-{donation._id?.slice(-6) || "000000"}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {new Date(donation.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                           {donation.isAnonymous ? "?" : (donation.userId?.name?.charAt(0) || "U")}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {donation.isAnonymous ? "Anonymous Donor" : donation.userId?.name}
                          </p>
                          {!donation.isAnonymous && donation.userId?.email && (
                            <p className="text-[10px] text-slate-500">{donation.userId.email}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-slate-700 truncate max-w-[200px]">
                        {donation.campaignId?.title || "General Fund"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-slate-900">
                        ₹{donation.amount?.toLocaleString()}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      {donation.paymentStatus === "completed" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Confirmed
                        </span>
                      ) : donation.paymentStatus === "failed" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-50 border border-red-200 text-[10px] font-bold text-red-700 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span> Failed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Pending
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {donation.paymentStatus === "pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => updateStatus(donation._id, "completed")}
                            disabled={loading}
                            title="Confirm Payment"
                            className={`p-1.5 text-emerald-600 border border-transparent hover:border-emerald-200 hover:bg-emerald-50 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => updateStatus(donation._id, "failed")}
                            disabled={loading}
                            title="Reject/Fail Payment"
                            className={`p-1.5 text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Closed</span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Activity size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">No transactions found</p>
                      <p className="text-xs mt-1">Donation records will appear here once processed.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDonations;