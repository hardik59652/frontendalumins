import React, { useEffect, useState } from "react";
import { UploadCloud, CheckCircle, Megaphone, Target } from "lucide-react";


function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    startDate: "",
    endDate: ""
  });

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/campaign/all",
        {
          credentials: "include"
        }
      );
      const data = await res.json();
      if (res.ok) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createCampaign = async (e) => {
    e.preventDefault();

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert("End date must be strictly after the start date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/campaign/create",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          targetAmount: "",
          startDate: "",
          endDate: ""
        });
        fetchCampaigns();
        alert("Campaign created successfully as Draft.");
      } else {
        alert("Failed to create campaign. Please check your inputs.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const publishCampaign = async (id) => {
    if (!window.confirm("Are you sure you want to publish this campaign? It will be visible to all alumni.")) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/campaign/publish/${id}`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (res.ok) {
        setCampaigns(prev =>
          prev.map(c =>
            c._id === id ? { ...c, status: "active" } : c
          )
        );
      } else {
        alert("Failed to publish campaign.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8 font-sans text-slate-800">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded flex items-center justify-center text-blue-700">
          <Megaphone size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">Fundraising Campaigns</h1>
          <p className="text-xs text-slate-500 font-medium">Create and manage donation initiatives for the alumni network.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Create New Campaign
          </h2>
        </div>

        <div className="p-6">
          <form onSubmit={createCampaign} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Campaign Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Campus Library Expansion"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center bg-white border border-slate-300 rounded focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-colors overflow-hidden">
                  
                  {formData.targetAmount && (
                    <span className="pl-3 pr-1 text-slate-700 font-bold text-sm">₹</span>
                  )}
                  
                  <input
                    type="number"
                    name="targetAmount"
                    placeholder="₹ 5000"
                    min="1"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    required
                    className={`w-full text-sm py-2.5 outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      formData.targetAmount ? 'pl-1 pr-3' : 'px-3'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Campaign Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Detail the purpose, goals, and impact of this campaign..."
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-[#0A192F] text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#112240] shadow-sm'}`}
              >
                {isSubmitting ? "Processing..." : (
                  <>
                    <UploadCloud size={16} /> Save as Draft
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Target size={16} className="text-blue-700" /> Active & Past Campaigns
          </h2>
          <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Total: {campaigns.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Campaign Details</th>
                <th className="px-6 py-4">Financials</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.length > 0 ? (
                campaigns.map((campaign) => {
                  
                  const progress = campaign.targetAmount > 0 
                    ? Math.min(Math.round((campaign.currentAmount / campaign.targetAmount) * 100), 100) 
                    : 0;

                  return (
                    <tr key={campaign._id} className="hover:bg-slate-50 transition-colors">
                      
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800 truncate max-w-xs">{campaign.title}</p>
                        <p className="text-xs text-slate-500 truncate max-w-xs mt-0.5">{campaign.description}</p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 w-32">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-blue-700">₹{campaign.currentAmount?.toLocaleString()}</span>
                            <span className="text-slate-400">₹{campaign.targetAmount?.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-xs font-semibold text-slate-700">
                          {new Date(campaign.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">
                          To {new Date(campaign.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        {campaign.status === "active" ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Active
                          </span>
                        ) : campaign.status === "completed" ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                            Completed
                          </span>
                        ) : campaign.status === "expired" ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded bg-red-50 border border-red-200 text-[10px] font-bold text-red-700 uppercase tracking-wider">
                            Expired
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                            Draft
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        {campaign.status === "draft" ? (
                          <button
                            onClick={() => publishCampaign(campaign._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                          >
                            <CheckCircle size={14} /> Publish
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No Action</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Target size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">No campaigns found</p>
                      <p className="text-xs mt-1">Create a new campaign above to get started.</p>
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

export default Campaign;