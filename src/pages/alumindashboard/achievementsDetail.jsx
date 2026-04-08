import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AchievementDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [achievement, setAchievement] = useState(null);

  useEffect(() => {

    const fetchAchievement = async () => {
      try {

        const res = await fetch(
          `http://localhost:8000/api/v1/achievements/${id}`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (data?.data) {
          setAchievement(data.data);
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchAchievement();

  }, [id]);

  if (!achievement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading achievement...</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Achievement Details
          </h2>

          <button
            onClick={() => navigate("/my-achievements")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Back
          </button>

        </div>

        {/* Achievement Card */}
        <div className="bg-white shadow-md rounded-xl p-8">

          {achievement.photo && (
            <img
              src={`http://localhost:8000/${achievement.photo}`}
              alt="achievement"
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
          )}

          <h3 className="text-2xl font-semibold text-gray-800">
            {achievement.title}
          </h3>

          <p className="text-gray-600 mt-3">
            {achievement.description}
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-4">

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Posted By</p>
              <p className="font-medium text-gray-800">
                {achievement?.userId?.name || "You"}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-gray-800 capitalize">
                {achievement.status}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AchievementDetail;