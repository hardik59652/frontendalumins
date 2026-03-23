import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPostedJobs = () => {

  const [jobs,setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchJobs = async () => {

      const res = await fetch(
        "http://localhost:8000/api/v1/jobopportunity/myjob",
        {
          credentials:"include"
        }
      );

      const data = await res.json();

      if(data?.data){
        setJobs(data.data);
      }

    };

    fetchJobs();

  },[]);

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Posted Jobs
      </h2>

      <div className="space-y-4">

        {jobs.map(job => (

          <div
            key={job._id}
            className="border p-4 rounded-xl bg-white shadow"
          >

            <h3 className="font-bold text-lg">
              {job.title}
            </h3>

            <p className="text-gray-600">
              {job.companyName}
            </p>

            <button
              onClick={() => navigate(`/job-applications/${job._id}`)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              View Applications
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyPostedJobs;