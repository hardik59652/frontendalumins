import React, { useEffect, useState } from "react";

const MyApplications = () => {

  const [applications,setApplications] = useState([]);

  useEffect(() => {
    console.log("MyApplications component loaded");
    const fetchApplications = async () => {

      const res = await fetch(
        "http://localhost:8000/api/v1/jobapplication/myApplications",
        {
          credentials:"include"
        }
      );

      const data = await res.json();
      console.log(data)

      if(data?.data){
        setApplications(data.data);
      }

    };
    
    {applications.length === 0 && (
      <p className="text-gray-500">No applications found</p>
    )}
    fetchApplications();

  },[]);

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Job Applications
      </h2>

      <div className="space-y-4">

        {applications.map(app => (

          <div
            key={app._id}
            className="border p-4 rounded-xl bg-white shadow"
          >

            <h3 className="font-bold text-lg">
              {app.jobId?.title}
            </h3>

            <p className="text-gray-600">
              {app.jobId?.companyName}
            </p>

            <p className="text-sm mt-2">

              Status:

              <span className="ml-2 font-semibold text-blue-600">
                {app.status}
              </span>

            </p>

            <p className="text-xs text-gray-500 mt-1">
              Applied: {new Date(app.createdAt).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyApplications;