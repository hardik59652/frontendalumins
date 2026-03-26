import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Landmark,
  ShieldCheck,
  Wallet,
  ChevronRight,
  Gift,
  Award,
  CheckCircle
} from "lucide-react";

const Donation = () => {

  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [amount, setAmount] = useState("");

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
  const handleDonation = async () => {

    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }
  
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
            amount: Number(amount)
          })
        }
      );
  
      const data = await res.json();
  
      if (res.ok) {
  
        alert("Donation successful ❤️");
  
        setSelectedCampaign(null);
        setAmount("");
  
        // refresh campaigns progress
        fetchCampaigns();
  
      } else {
        alert(data.message || "Donation failed");
      }
  
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">

      {/* HERO SECTION */}

      <section className="bg-[#1e40af] text-white py-20 px-6 text-center relative overflow-hidden">

        <div className="absolute inset-0 opacity-10">
          <Landmark className="absolute -left-10 -bottom-10 w-64 h-64 rotate-12" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          <Heart className="mx-auto mb-6 text-red-400 fill-red-400 animate-pulse" size={56} />

          <h1 className="text-5xl font-black mb-4 uppercase">
            Support <span className="text-blue-300">VGEC</span>
          </h1>

          <p className="max-w-xl mx-auto text-blue-100 italic">
            Your contribution empowers the next generation of engineers.
          </p>

        </motion.div>

      </section>

      {/* CAMPAIGNS */}

      <div className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-black mb-10 text-center">
          Active Campaigns
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {campaigns.map((campaign) => {

            const progress =
              (campaign.currentAmount / campaign.targetAmount) * 100;

            return (

              <motion.div
                key={campaign._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-xl p-8 border"
              >

                <h3 className="text-xl font-bold mb-2">
                  {campaign.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6">
                  {campaign.description}
                </p>

                {/* PROGRESS BAR */}

                <div className="mb-3">

                  <div className="flex justify-between text-sm font-semibold mb-1">
                    <span>₹{campaign.currentAmount}</span>
                    <span>₹{campaign.targetAmount}</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                    />

                  </div>

                </div>

                <p className="text-xs text-gray-400 mb-6">
                  Ends on{" "}
                  {new Date(campaign.endDate).toLocaleDateString()}
                </p>

                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  Donate
                </button>

              </motion.div>

            );

          })}

        </div>

      </div>

      {/* DONATION FORM */}

      {selectedCampaign && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

  <div className="bg-white rounded-3xl p-10 w-full max-w-md relative">

    <button
      onClick={() => setSelectedCampaign(null)}
      className="absolute top-4 right-4 text-gray-500 hover:text-black"
    >
      ✕
    </button>

    <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
      <Wallet className="text-blue-600" />
      Donate to {selectedCampaign.title}
    </h3>

    <input
      type="number"
      placeholder="Enter amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-full p-4 border rounded-xl mb-6"
    />

    <button
      onClick={handleDonation}
      className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
    >
      Contribute Now <ChevronRight size={20} />
    </button>

  </div>

</div>

)}

    </div>
  );
};

export default Donation;