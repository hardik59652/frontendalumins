import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";

const AdminDonations = () => {

  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH ALL DONATIONS
  const fetchDonations = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/donation/all",
        { withCredentials: true }
      );

      setDonations(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  // FETCH DASHBOARD STATS
  const fetchStats = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/donation/stats",
        { withCredentials: true }
      );

      setStats(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE DONATION STATUS
  const updateStatus = async (id, status) => {

    try {

      setLoading(true);

      await axios.patch(
        `http://localhost:8000/api/v1/donation/${id}/status`,
        { status },   // ✅ FIXED BUG HERE
        { withCredentials: true }
      );

      await fetchDonations();
      await fetchStats();

      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    fetchStats();
  }, []);

  return (

    <div className="space-y-10">

      {/* DASHBOARD STATS */}

      {stats && (

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-gray-500">
              Total Donations
            </h3>

            <p className="text-3xl font-bold">
              {stats.totalDonations}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-gray-500">
              Total Amount
            </h3>

            <p className="text-3xl font-bold">
              ₹{stats.totalAmount}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h3 className="text-gray-500">
              Campaigns
            </h3>

            <p className="text-3xl font-bold">
              {stats.campaigns.length}
            </p>

          </div>

        </div>

      )}


      {/* DONATION TABLE */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          All Donations
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

              <tr>
                <th className="p-4 text-left">Donor</th>
                <th className="p-4 text-left">Campaign</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {donations.map((donation) => (

                <tr
                  key={donation._id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* DONOR */}
                  <td className="p-4 font-semibold">
                    {donation.isAnonymous
                      ? "Anonymous"
                      : donation.userId?.name}
                  </td>

                  {/* CAMPAIGN */}
                  <td className="p-4">
                    {donation.campaignId?.title}
                  </td>

                  {/* AMOUNT */}
                  <td className="p-4 font-semibold">
                    ₹{donation.amount}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">

                    {donation.paymentStatus === "completed" && (

                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Completed
                      </span>

                    )}

                    {donation.paymentStatus === "failed" && (

                      <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                        Failed
                      </span>

                    )}

                    {donation.paymentStatus === "pending" && (

                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                        Pending
                      </span>

                    )}

                  </td>

                  {/* DATE */}
                  <td className="p-4">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTION BUTTONS */}

                  <td className="p-4">

                    {donation.paymentStatus === "pending" && (

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            updateStatus(donation._id, "completed")
                          }
                          disabled={loading}
                          className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                          <CheckCircle size={16}/>
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(donation._id, "failed")
                          }
                          disabled={loading}
                          className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          <XCircle size={16}/>
                          Reject
                        </button>

                      </div>

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
};

export default AdminDonations;