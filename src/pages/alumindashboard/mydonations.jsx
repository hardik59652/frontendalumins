import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, Wallet, TrendingUp } from "lucide-react";

const MyDonations = () => {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyDonations = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/donation/my",
        {
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok) {
        setDonations(data.data);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const totalDonated = donations.reduce((acc, d) => acc + d.amount, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 font-semibold">
        Loading your donations...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-red-500" size={30} />
        <h1 className="text-3xl font-bold">My Donations</h1>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <Wallet className="text-green-600" size={28} />
          <div>
            <p className="text-gray-500 text-sm">Total Donated</p>
            <p className="text-xl font-bold">₹{totalDonated}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <TrendingUp className="text-blue-600" size={28} />
          <div>
            <p className="text-gray-500 text-sm">Total Donations</p>
            <p className="text-xl font-bold">{donations.length}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <Heart className="text-pink-500" size={28} />
          <div>
            <p className="text-gray-500 text-sm">Campaigns Supported</p>
            <p className="text-xl font-bold">
              {new Set(donations.map(d => d.campaignId?._id)).size}
            </p>
          </div>
        </div>

      </div>

      {/* Donations */}
      {donations.length === 0 ? (

        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
          You have not donated yet.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {donations.map((donation) => (

            <motion.div
              key={donation._id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition"
            >

              <h3 className="text-lg font-semibold mb-2">
                {donation.campaignId?.title || "Campaign"}
              </h3>

              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Wallet size={18} />
                <span className="font-semibold">
                  ₹{donation.amount}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <Calendar size={16} />
                {new Date(donation.createdAt).toLocaleDateString()}
              </div>

              {donation.message && (
                <p className="text-gray-500 text-sm italic mb-4">
                  "{donation.message}"
                </p>
              )}

              <div className="flex justify-between items-center">

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    donation.paymentStatus === "completed"
                      ? "bg-green-100 text-green-600"
                      : donation.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {donation.paymentStatus}
                </span>

                {donation.isAnonymous && (
                  <span className="text-xs text-gray-400">
                    Anonymous
                  </span>
                )}

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyDonations;