import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

function PendingOpportunities() {

  const [jobs, setJobs] = useState([]);

  // FETCH PENDING JOBS
  const fetchPendingJobs = async () => {
    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/jobopportunity/pending",
        {
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok) {
        setJobs(data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  // APPROVE JOB
  const approveJob = async (id) => {
    try {

      const res = await fetch(
        `http://localhost:8000/api/v1/jobopportunity/approve/${id}`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (res.ok) {
        setJobs(prev => prev.filter(job => job._id !== id));
      }

    } catch (error) {
      console.log(error);
    }
  };

  // REJECT JOB
  const rejectJob = async (id) => {
    try {

      const res = await fetch(
        `http://localhost:8000/api/v1/jobopportunity/reject/${id}`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (res.ok) {
        setJobs(prev => prev.filter(job => job._id !== id));
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Pending Opportunities
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

            <tr>
              <th className="p-4 text-left">Job</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Posted By</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {jobs.map((job) => (

              <tr
                key={job._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  <p className="font-semibold">
                    {job.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {job.description}
                  </p>
                </td>

                <td className="p-4">
                  {job.company}
                </td>

                <td className="p-4">
                  {job.location}
                </td>

                <td className="p-4">
                  {job.postedBy?.fullName}
                </td>

                <td className="p-4">

                  <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                    Pending
                  </span>

                </td>

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() => approveJob(job._id)}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => rejectJob(job._id)}
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

export default PendingOpportunities;