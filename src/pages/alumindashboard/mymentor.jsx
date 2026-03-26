import React, { useEffect, useState } from "react";

function MyMentor() {

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyMentor = async () => {
    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/giveback/mentor/my",
        {
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMentor(data.data);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyMentor();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          You have not applied as a mentor yet.
        </p>
      </div>
    );
  }

  const statusColor =
    mentor.status === "approved"
      ? "bg-green-100 text-green-700"
      : mentor.status === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (

    <div className="min-h-screen bg-gray-50 py-16 px-6">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          My Mentor Application
        </h1>

        {/* User Info */}

        <div className="flex items-center gap-4 mb-6">

          {mentor.userId?.profilePicture && (

            <img
              src={`http://localhost:8000/${mentor.userId.profilePicture}`}
              alt="profile"
              className="w-16 h-16 rounded-full object-cover"
            />

          )}

          <div>

            <p className="font-semibold text-lg">
              {mentor.userId?.name}
            </p>

            <p className="text-gray-500 text-sm">
              Batch {mentor.userId?.batchYear}
            </p>

          </div>

        </div>

        {/* Domains */}

        <div className="mb-6">

          <h3 className="font-semibold mb-2">
            Domains
          </h3>

          <div className="flex flex-wrap gap-2">

            {mentor.domains.map((d, index) => (

              <span
                key={index}
                className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
              >
                {d}
              </span>

            ))}

          </div>

        </div>

        {/* Availability */}

        <div className="mb-6">

          <h3 className="font-semibold mb-2">
            Availability
          </h3>

          <p className="text-gray-700">
            {mentor.availability}
          </p>

        </div>

        {/* Motivation */}

        <div className="mb-6">

          <h3 className="font-semibold mb-2">
            Motivation
          </h3>

          <p className="text-gray-700">
            {mentor.motivation}
          </p>

        </div>

        {/* Status */}

        <div className="mb-6">

          <h3 className="font-semibold mb-2">
            Application Status
          </h3>

          <span
            className={`px-4 py-2 text-sm rounded-full ${statusColor}`}
          >
            {mentor.status.toUpperCase()}
          </span>

        </div>

        {/* Applied Date */}

        <div>

          <p className="text-sm text-gray-500">
            Applied on: {new Date(mentor.createdAt).toLocaleDateString()}
          </p>

        </div>

      </div>

    </div>

  );
}

export default MyMentor;