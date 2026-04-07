import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Handshake, Users, Clock, AlertCircle } from "lucide-react";


function AdminPendingGiveBack() {
  const [mentors, setMentors] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [processingId, setProcessingId] = useState(null); // Prevents double-clicking

  const fetchPendingMentors = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/giveback/mentor/pending", { credentials: "include" });
      const data = await res.json();
      if (res.ok) setMentors(data.data || []);
    } catch (error) {
      console.log("Error fetching mentors:", error);
    }
  };

  const fetchPendingVolunteers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/giveback/volunteer/pending", { credentials: "include" });
      const data = await res.json();
      if (res.ok) setVolunteers(data.data || []);
    } catch (error) {
      console.log("Error fetching volunteers:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchPendingMentors();
    fetchPendingVolunteers();

    const intervalId = setInterval(() => {
      fetchPendingMentors();
      fetchPendingVolunteers();
    }, 1000);

    
    return () => clearInterval(intervalId);
  }, []);

  
  const handleMentorAction = async (id, action) => {
    const isApprove = action === 'approve';
    if (!window.confirm(`Are you sure you want to ${action} this mentor application?`)) return;

    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/giveback/mentor/${action}/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      if (res.ok) {
        setMentors(prev => prev.filter(m => m._id !== id));
      } else {
        alert(`Failed to ${action} application.`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleVolunteerAction = async (id, action) => {
    const isApprove = action === 'approve';
    if (!window.confirm(`Are you sure you want to ${action} this volunteer application?`)) return;

    setProcessingId(id);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/giveback/volunteer/${action}/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      if (res.ok) {
        setVolunteers(prev => prev.filter(v => v._id !== id));
      } else {
        alert(`Failed to ${action} application.`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8 font-sans text-slate-800">
    
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded flex items-center justify-center text-indigo-700">
            <Handshake size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">Giveback Applications</h1>
           
          </div>
        </div>
     
        <div className="flex gap-3">
          <div className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            Mentors: <span className="text-indigo-600 ml-1">{mentors.length}</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            Volunteers: <span className="text-blue-600 ml-1">{volunteers.length}</span>
          </div>
        </div>
      </div>

  
      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Users size={16} className="text-indigo-700" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Pending Mentors
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 w-1/4">Applicant Profile</th>
                <th className="px-6 py-4 w-1/4">Target Domains</th>
                <th className="px-6 py-4 w-2/4">Motivation & Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentors.length > 0 ? (
                mentors.map((mentor) => (
                  <tr key={mentor._id} className="hover:bg-slate-50 transition-colors">
                 
                    <td className="px-6 py-4 align-top">
                      <p className="text-sm font-bold text-slate-800">{mentor.userId?.fullName || "Unknown User"}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">Application ID: {mentor._id.slice(-6)}</p>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.domains?.map((domain, i) => (
                          <span key={i} className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                        {mentor.motivation}
                      </p>
                    </td>

                    <td className="px-6 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleMentorAction(mentor._id, 'approve')}
                          disabled={processingId === mentor._id}
                          title="Approve Mentor"
                          className={`p-1.5 text-emerald-600 border border-transparent hover:border-emerald-200 hover:bg-emerald-50 rounded transition-colors ${processingId === mentor._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleMentorAction(mentor._id, 'reject')}
                          disabled={processingId === mentor._id}
                          title="Reject Mentor"
                          className={`p-1.5 text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 rounded transition-colors ${processingId === mentor._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Clock size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">Queue is empty</p>
                      <p className="text-xs mt-1">No pending mentor applications to review.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <Handshake size={16} className="text-blue-700" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Pending Volunteers
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 w-1/4">Applicant Profile</th>
                <th className="px-6 py-4 w-1/4">Areas of Interest</th>
                <th className="px-6 py-4 w-2/4">Motivation & Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {volunteers.length > 0 ? (
                volunteers.map((volunteer) => (
                  <tr key={volunteer._id} className="hover:bg-slate-50 transition-colors">
                    
                   
                    <td className="px-6 py-4 align-top">
                      <p className="text-sm font-bold text-slate-800">{volunteer.userId?.fullName || "Unknown User"}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">Application ID: {volunteer._id.slice(-6)}</p>
                    </td>

                   
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {volunteer.domains?.map((domain, i) => (
                          <span key={i} className="inline-block bg-blue-50 border border-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </td>

               
                    <td className="px-6 py-4 align-top">
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                        {volunteer.motivation}
                      </p>
                    </td>

                   
                    <td className="px-6 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleVolunteerAction(volunteer._id, 'approve')}
                          disabled={processingId === volunteer._id}
                          title="Approve Volunteer"
                          className={`p-1.5 text-emerald-600 border border-transparent hover:border-emerald-200 hover:bg-emerald-50 rounded transition-colors ${processingId === volunteer._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleVolunteerAction(volunteer._id, 'reject')}
                          disabled={processingId === volunteer._id}
                          title="Reject Volunteer"
                          className={`p-1.5 text-red-600 border border-transparent hover:border-red-200 hover:bg-red-50 rounded transition-colors ${processingId === volunteer._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
               
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <AlertCircle size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">Queue is empty</p>
                      <p className="text-xs mt-1">No pending volunteer applications to review.</p>
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

export default AdminPendingGiveBack;