import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/users/currentuser",
        { withCredentials: true }
      );

      setUser(res.data.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">

        {/* Profile Header */}
        <div className="flex flex-col items-center">

          <img
            src={`http://localhost:8000/${user.profileImage}`}
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user.fullName}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

          <p><span className="font-semibold">Phone:</span> {user.phoneNumber}</p>

          <p><span className="font-semibold">Enrollment:</span> {user.enrollmentNumber}</p>

          <p><span className="font-semibold">Department:</span> {user.department}</p>

          <p><span className="font-semibold">Graduation Year:</span> {user.graduationYear}</p>

          <p><span className="font-semibold">Company:</span> {user.currentCompany || "Not specified"}</p>

          <p><span className="font-semibold">Job Title:</span> {user.jobTitle || "Not specified"}</p>

          <p><span className="font-semibold">Location:</span> {user.location || "Not specified"}</p>

        </div>

        {/* LinkedIn */}
        {user.linkedinUrl && (
          <div className="mt-6 text-center">
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
            >
              View LinkedIn Profile
            </a>
          </div>
        )}

      </div>

    </div>
  );
};

export default Profile;