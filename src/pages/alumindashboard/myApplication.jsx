import React, { useEffect, useState } from "react";

const MyApplications = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const res = await fetch(
          "http://localhost:8000/api/v1/jobapplication/myApplications",
          {
            credentials: "include"
          }
        );

        const data = await res.json();

        if (data?.data) {
          setApplications(data.data);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };

    fetchApplications();

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-lg">
        Loading applications...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          My Job Applications
        </h2>

        {applications.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">
              No applications found
            </p>
          </div>
        )}

        <div className="grid gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-xl font-semibold">
                    {app.jobId?.title}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Company: <span className="font-medium">{app.jobId?.companyName}</span>
                  </p>

                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold
                  ${app.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                  ${app.status === "accepted" ? "bg-green-100 text-green-700" : ""}
                  ${app.status === "rejected" ? "bg-red-100 text-red-700" : ""}
                  `}
                >
                  {app.status}
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-3">
                Applied on {new Date(app.createdAt).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default MyApplications;