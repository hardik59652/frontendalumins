import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobApplicants = () => {

  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/jobapplication/job/${jobId}`,
      { credentials: "include" }
    );

    const data = await res.json();

    if (data?.data) {
      setApplications(data.data);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (id, status) => {

    const res = await fetch(
      `http://localhost:8000/api/v1/jobapplication/status/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status })
      }
    );

    if (res.ok) {
      fetchApplicants();
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center">
          Job Applicants
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >

              <div className="flex items-center gap-4 mb-4">

                {app.userId?.profileImage ? (
                  <img
                    src={`http://localhost:8000/${app.userId.profileImage}`}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                    {app.userId?.fullName?.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg">
                    {app.userId?.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {app.userId?.email}
                  </p>
                </div>

              </div>

              <p className="text-sm mb-3">
                Status :
                <span className="ml-2 font-semibold text-blue-600">
                  {app.status}
                </span>
              </p>

              <a
                href={`http://localhost:8000/${app.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Resume
              </a>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => updateStatus(app._id, "approved")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default JobApplicants;