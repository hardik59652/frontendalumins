import React, { useEffect, useState } from "react";
import axios from "axios";

const MyVolunteer = () => {
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/giveback/volunteer/my",
          { withCredentials: true }
        );

        setVolunteer(res.data.data); // IMPORTANT
      } catch (error) {
        console.error(error);
      }
    };

    fetchVolunteer();
  }, []);

  if (!volunteer) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold">No Volunteer Application Found</h2>
        <p className="text-gray-500">You haven't applied for volunteer yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">My Volunteer Application</h1>

      <p className="mb-2">
        <strong>Domains:</strong> {volunteer.domains.join(", ")}
      </p>

      <p className="mb-2">
        <strong>Motivation:</strong> {volunteer.motivation}
      </p>

      <p className="mb-2">
        <strong>Availability:</strong> {volunteer.availability}
      </p>

      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span className="font-semibold text-green-600">
          {volunteer.status}
        </span>
      </p>
    </div>
  );
};

export default MyVolunteer;