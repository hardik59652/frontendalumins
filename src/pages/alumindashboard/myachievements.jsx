import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyAchievements = () => {

  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchAchievements = async () => {

      try {

        const res = await fetch(
          "http://localhost:8000/api/v1/achievements/my-achievements",
          { credentials: "include" }
        );

        const data = await res.json();

        if (data?.data) {
          setAchievements(data.data);
        }

      } catch (err) {
        console.log(err);
      }

    };

    fetchAchievements();

  }, []);

  // DELETE ACHIEVEMENT
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this achievement?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:8000/api/v1/achievements/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok) {

        setAchievements(prev =>
          prev.filter(item => item._id !== id)
        );

        alert("Achievement deleted successfully");

      } else {
        alert(data.message || "Failed to delete achievement");
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

  };

  return (

    <div className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            My Achievements
          </h2>

          <button
            onClick={() => navigate("/add-achievement")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            + Add Achievement
          </button>

        </div>

        {/* EMPTY STATE */}

        {achievements.length === 0 && (

          <div className="text-center py-20 bg-white rounded-xl shadow">

            <h3 className="text-xl font-semibold text-gray-700">
              No Achievements Added
            </h3>

            <p className="text-gray-500 mt-2">
              Share your accomplishments with the alumni network.
            </p>

            <button
              onClick={() => navigate("/add-achievement")}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Add Achievement
            </button>

          </div>

        )}

        {/* ACHIEVEMENT GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {achievements.map(achievement => (

            <div
              key={achievement._id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >

              <h3 className="text-lg font-semibold text-gray-800">
                {achievement.title}
              </h3>

              <p className="text-gray-600 mt-1">
                {achievement.organization}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                📅 {achievement.year}
              </p>

              <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                {achievement.description}
              </p>

              {/* ACTION BUTTONS */}

              <div className="flex flex-wrap gap-2 mt-5">

                <button
                  onClick={() => navigate(`/achievement-details/${achievement._id}`)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/edit-achievement/${achievement._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(achievement._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default MyAchievements;