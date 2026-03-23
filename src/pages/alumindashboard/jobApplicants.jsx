import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobApplicants = () => {

  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  console.log(applications)
  const fetchApplicants = async () => {

    const res = await fetch(
      `http://localhost:8000/api/v1/jobapplication/job/${jobId}`,
      {
        credentials: "include"
      }
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
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ status })
      }
    );

    if (res.ok) {
      fetchApplicants();
    }

  };

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Job Applicants
      </h2>

      <div className="space-y-4">

        {applications.map(app => (

          <div
            key={app._id}
            className="border p-4 rounded-xl bg-white shadow"
          >
  {app.userId?.profileImage && (
  <img
    src={`http://localhost:8000/${app.userId.profileImage}`}
    alt="profile"
    className="w-10 h-10 rounded-full"
  />
)}

            <h3 className="font-bold text-lg">
            fullName:{app.userId?.fullName}
            </h3>

            <p className="text-gray-600">
            email:{app.userId?.email}
            </p>

            <p className="text-sm mt-2">
              Status:
              <span className="ml-2 font-semibold text-blue-600">
                {app.status}
              </span>
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => updateStatus(app._id, "approved")}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Reject
              </button>

            </div>
            <a
  href={`http://localhost:8000/${app.resumeUrl}`}
  target="_blank"
  className="text-blue-600 underline"
>
  View Resume
</a>
           

          </div>

        ))}

      </div>

    </div>

  );
};

export default JobApplicants;