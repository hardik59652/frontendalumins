import React, { useEffect, useState } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

function Campaign() {

  const [campaigns, setCampaigns] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    startDate: "",
    endDate: ""
  });

  // FETCH ALL CAMPAIGNS
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

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // CREATE CAMPAIGN
  const createCampaign = async (e) => {

    e.preventDefault();

    // DATE VALIDATION
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert("End date must be after start date");
      return;
    }

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
      }

    } catch (error) {
      console.log(error);
    }

  };

  // PUBLISH CAMPAIGN
  const publishCampaign = async (id) => {

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

      }

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="space-y-10">

      {/* CREATE CAMPAIGN FORM */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create Campaign
        </h2>

        <form
          onSubmit={createCampaign}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* TITLE */}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Campaign Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter campaign title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />
          </div>

          {/* TARGET AMOUNT */}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Target Amount (₹)
            </label>

            <input
              type="number"
              name="targetAmount"
              placeholder="Enter target amount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />
          </div>

          {/* START DATE */}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Campaign Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />
          </div>

          {/* END DATE */}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Campaign End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">
              Campaign Description
            </label>

            <textarea
              name="description"
              placeholder="Enter campaign description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />
          </div>

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            <UploadCloud size={18} />
            Create Campaign
          </button>

        </form>

      </div>

      {/* CAMPAIGNS LIST */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          All Campaigns
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

              <tr>
                <th className="p-4 text-left">Campaign</th>
                <th className="p-4 text-left">Target</th>
                <th className="p-4 text-left">Raised</th>
                <th className="p-4 text-left">Start</th>
                <th className="p-4 text-left">End</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {campaigns.map((campaign) => (

                <tr
                  key={campaign._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    <p className="font-semibold">
                      {campaign.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {campaign.description}
                    </p>

                  </td>

                  <td className="p-4">
                    ₹{campaign.targetAmount}
                  </td>

                  <td className="p-4">
                    ₹{campaign.currentAmount}
                  </td>

                  <td className="p-4">
                    {new Date(campaign.startDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    {campaign.status === "active" ? (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Active
                      </span>
                    ) : campaign.status === "completed" ? (
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                        Completed
                      </span>
                    ) : campaign.status === "expired" ? (
                      <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                        Expired
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                        Draft
                      </span>
                    )}

                  </td>

                  <td className="p-4 text-center">

                    {campaign.status === "draft" && (

                      <button
                        onClick={() => publishCampaign(campaign._id)}
                        className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                      >
                        <CheckCircle size={16} />
                        Publish
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default Campaign;