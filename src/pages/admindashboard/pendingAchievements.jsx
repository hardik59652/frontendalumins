import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

function PendingAchievements() {

  const [achievements, setAchievements] = useState([]);

  const fetchPendingAchievements = async () => {
    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/achievements/pending",
        {
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAchievements(data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPendingAchievements();
  }, []);

  const approveAchievement = async (id) => {
    try {

      const res = await fetch(
        `http://localhost:8000/api/v1/achievements/approve/${id}`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (res.ok) {
        setAchievements(prev => prev.filter(a => a._id !== id))
      }

    } catch (error) {
      console.log(error);
    }
  };

  const rejectAchievement = async (id) => {
    try {

      const res = await fetch(
        `http://localhost:8000/api/v1/achievements/reject/${id}`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (res.ok) {
        setAchievements(prev => prev.filter(a => a._id !== id));
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Pending Achievements
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

            <tr>
              <th className="p-4 text-left">Achievement</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {achievements.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  <p className="font-semibold">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </td>

                <td className="p-4">
                  {item.userId?.fullName}
                </td>

                <td className="p-4">

                  {item.photo && (
                    <img
                      src={`http://localhost:8000/${item.photo}`}
                      alt="photo not available"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}

                </td>

                <td className="p-4">

                  <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                    Pending
                  </span>

                </td>

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() => approveAchievement(item._id)}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => rejectAchievement(item._id)}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default PendingAchievements;