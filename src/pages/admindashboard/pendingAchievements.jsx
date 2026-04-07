import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Trophy, Image as ImageIcon, Clock, User } from "lucide-react";

function PendingAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [processingId, setProcessingId] = useState(null); 

  const fetchPendingAchievements = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/achievements/pending", {
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setAchievements(data.data || []);
      }
    } catch (error) {
      console.log("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    fetchPendingAchievements(); 

    const intervalId = setInterval(() => {
      fetchPendingAchievements();
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  const approveAchievement = async (id) => {
    if (!window.confirm("Approve this achievement? It will be visible on the user's public profile.")) return;
    
    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/achievements/approve/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      if (res.ok) {
        setAchievements(prev => prev.filter(a => a._id !== id));
      } else {
        alert("Failed to approve achievement.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessingId(null);
    }
  };

  const rejectAchievement = async (id) => {
    if (!window.confirm("Reject this achievement? It will be removed from the pending queue.")) return;

    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/achievements/reject/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      if (res.ok) {
        setAchievements(prev => prev.filter(a => a._id !== id));
      } else {
        alert("Failed to reject achievement.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8 font-sans text-slate-800">
      
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded flex items-center justify-center text-amber-600">
            <Trophy size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">Achievement Moderation</h1>
          
          </div>
        </div>

        <div className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          Pending Review: <span className="text-amber-600 ml-1">{achievements.length}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Clock size={16} className="text-slate-400" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Awaiting Approval
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 w-1/4">User Profile</th>
                <th className="px-6 py-4 w-1/3">Achievement Details</th>
                <th className="px-6 py-4">Proof / Image</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {achievements.length > 0 ? (
                achievements.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.userId?.fullName || "Unknown User"}</p>
                          <p className="text-[10px] text-slate-500 font-medium mt-0.5 uppercase tracking-wide">ID: {item.userId?._id?.slice(-6) || "N/A"}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <p className="text-sm font-bold text-slate-800 truncate max-w-[250px]">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 max-w-[300px] leading-relaxed">
                        {item.description}
                      </p>
                    </td>

                    <td className="px-6 py-4 align-top">
                      {item.photo ? (
                        <div className="w-12 h-12 rounded border border-slate-200 overflow-hidden bg-slate-50 shadow-sm cursor-pointer hover:opacity-80 transition-opacity" title="View Proof">
                          <img
                            src={`http://localhost:8000/${item.photo}`}
                            alt="Achievement Proof"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Proof" }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded border border-slate-100 bg-slate-50 flex flex-col items-center justify-center text-slate-300" title="No Image Provided">
                          <ImageIcon size={16} />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Pending
                      </span>
                    </td>

                    <td className="px-6 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => approveAchievement(item._id)}
                          disabled={processingId === item._id}
                          title="Approve Achievement"
                          className={`p-1.5 text-emerald-600 border border-transparent hover:border-emerald-200 hover:bg-emerald-50 rounded transition-colors ${processingId === item._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => rejectAchievement(item._id)}
                          disabled={processingId === item._id}
                          title="Reject Achievement"
                          className={`p-1.5 text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 rounded transition-colors ${processingId === item._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
              
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Trophy size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">Queue is empty</p>
                      <p className="text-xs mt-1">No pending achievements to review.</p>
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
}

export default PendingAchievements;