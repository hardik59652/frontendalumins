import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {

    const fetchJob = async () => {

      const res = await fetch(
        `http://localhost:8000/api/v1/jobopportunity/${id}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (data?.data) {
        setJob(data.data);
      }

    };

    fetchJob();

  }, [id]);

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading Job Details...</p>
      </div>
    );

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          ← Back
        </button>

        {/* Job Title */}
        <h2 className="text-3xl font-bold mb-2">
          {job.title}
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          {job.companyName}
        </p>

        {/* Job Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <p>
            <span className="font-semibold">📍 Location:</span> {job.location}
          </p>

          <p>
            <span className="font-semibold">💼 Job Type:</span> {job.jobType}
          </p>

          <p>
            <span className="font-semibold">💰 Salary:</span> {job.salaryRange}
          </p>

          <p>
            <span className="font-semibold">⏰ Deadline:</span>{" "}
            {new Date(job.deadline).toLocaleDateString()}
          </p>

          <p>
            <span className="font-semibold">📊 Status:</span>{" "}
            <span className="text-blue-600 font-semibold">
              {job.status}
            </span>
          </p>

        </div>

        {/* Description */}
        <div className="mb-6">

          <h3 className="text-xl font-semibold mb-2">
            Job Description
          </h3>

          <p className="text-gray-700 leading-relaxed">
            {job.description}
          </p>

        </div>

        {/* Skills */}
        <div>

          <h3 className="text-xl font-semibold mb-3">
            Skills Required
          </h3>

          <div className="flex flex-wrap gap-2">

            {job.skillsRequired?.map((skill, index) => (

              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default JobDetails;