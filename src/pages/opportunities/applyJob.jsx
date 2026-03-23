import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplyJob = () => {

  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {

      const res = await fetch(
        `http://localhost:8000/api/v1/jobapplication/apply/${jobId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

      const data = await res.json();

      if(res.ok){
        alert("Application submitted");
        navigate("/opportunities");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="max-w-xl mx-auto p-10">

      <h2 className="text-2xl font-bold mb-6">
        Apply for Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e)=>setCoverLetter(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          name="resume"
          accept=".pdf"
          onChange={(e)=>setResume(e.target.files[0])}
          className="w-full"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Submit Application
        </button>

      </form>

    </div>

  );
};

export default ApplyJob;