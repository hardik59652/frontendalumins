import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, Wallet } from "lucide-react";

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

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500 font-semibold">
        Loading your donations...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
        <Heart className="text-red-500" />
        My Donations
      </h1>

      {donations.length === 0 ? (

        <div className="text-gray-500 text-center mt-20">
          You have not donated yet.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {donations.map((donation) => (

            <motion.div
              key={donation._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border"
            >

              <h3 className="text-lg font-bold mb-2">
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
                <p className="text-gray-500 text-sm italic mb-3">
                  "{donation.message}"
                </p>
              )}

              <div className="flex justify-between items-center mt-4">

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