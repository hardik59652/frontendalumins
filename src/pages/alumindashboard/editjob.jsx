import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";

const EditJob = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [form,setForm] = useState({
    title:"",
    companyName:"",
    location:"",
    jobType:"",
    description:"",
    skillsRequired:"",
    salaryRange:"",
    applyLink:"",
    deadline:""
  });

  useEffect(()=>{

    const fetchJob = async ()=>{

      const res = await fetch(
        `http://localhost:8000/api/v1/jobopportunity/${id}`,
        { credentials:"include" }
      );

      const data = await res.json();

      if(data?.data){
        setForm({
          ...data.data,
          skillsRequired:data.data.skillsRequired.join(",")
        });
      }

    };

    fetchJob();

  },[id]);

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const res = await fetch(
      `http://localhost:8000/api/v1/jobopportunity/update/${id}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          ...form,
          skillsRequired:form.skillsRequired.split(",")
        })
      }
    );

    const data = await res.json();

    if(data.success){
      alert("Job Updated Successfully");
      navigate("/my-posted-jobs");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Update Job Opportunity
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Job Title */}
          <div>
            <label className="block font-medium mb-1">
              Job Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block font-medium mb-1">
              Company Name
            </label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">
              Job Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block font-medium mb-1">
              Job Type (Full-time / Internship / Remote)
            </label>
            <input
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block font-medium mb-1">
              Salary Range
            </label>
            <input
              name="salaryRange"
              value={form.salaryRange}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium mb-1">
              Skills Required (comma separated)
            </label>
            <input
              name="skillsRequired"
              value={form.skillsRequired}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Apply Link */}
          <div>
            <label className="block font-medium mb-1">
              Application Link
            </label>
            <input
              name="applyLink"
              value={form.applyLink}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block font-medium mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={form.deadline?.substring(0,10)}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Job
            </button>

            <button
              type="button"
              onClick={()=>navigate("/my-posted-jobs")}
              className="bg-gray-300 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditJob;