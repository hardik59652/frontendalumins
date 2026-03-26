import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

function AdminPendingGiveBack() {

  const [mentors, setMentors] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  // =============================
  // FETCH PENDING MENTORS
  // =============================
  const fetchPendingMentors = async () => {
    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/giveback/mentor/pending",
        { credentials: "include" }
      );

      const data = await res.json();

      if (res.ok) {
        setMentors(data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };


  // =============================
  // FETCH PENDING VOLUNTEERS
  // =============================
  const fetchPendingVolunteers = async () => {
    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/giveback/volunteer/pending",
        { credentials: "include" }
      );

      const data = await res.json();

      if (res.ok) {
        setVolunteers(data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchPendingMentors();
    fetchPendingVolunteers();
  }, []);


  // =============================
  // APPROVE / REJECT MENTOR
  // =============================
  const approveMentor = async (id) => {

    const res = await fetch(
      `http://localhost:8000/api/v1/giveback/mentor/approve/${id}`,
      {
        method: "PATCH",
        credentials: "include"
      }
    );

    if (res.ok) {
      setMentors(prev => prev.filter(m => m._id !== id));
    }

  };

  const rejectMentor = async (id) => {

    const res = await fetch(
      `http://localhost:8000/api/v1/giveback/mentor/reject/${id}`,
      {
        method: "PATCH",
        credentials: "include"
      }
    );

    if (res.ok) {
      setMentors(prev => prev.filter(m => m._id !== id));
    }

  };


  // =============================
  // APPROVE / REJECT VOLUNTEER
  // =============================
  const approveVolunteer = async (id) => {

    const res = await fetch(
      `http://localhost:8000/api/v1/giveback/volunteer/approve/${id}`,
      {
        method: "PATCH",
        credentials: "include"
      }
    );

    if (res.ok) {
      setVolunteers(prev => prev.filter(v => v._id !== id));
    }

  };

  const rejectVolunteer = async (id) => {

    const res = await fetch(
      `http://localhost:8000/api/v1/giveback/volunteer/reject/${id}`,
      {
        method: "PATCH",
        credentials: "include"
      }
    );

    if (res.ok) {
      setVolunteers(prev => prev.filter(v => v._id !== id));
    }

  };


  return (

    <div className="space-y-10">

      {/* =============================
          PENDING MENTORS
      ============================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Pending Mentor Applications
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Domains</th>
              <th className="p-4 text-left">Motivation</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {mentors.map((mentor) => (

              <tr
                key={mentor._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {mentor.userId?.fullName}
                </td>

                <td className="p-4">
                  {mentor.domains.join(", ")}
                </td>

                <td className="p-4 text-sm text-gray-600">
                  {mentor.motivation}
                </td>

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() => approveMentor(mentor._id)}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => rejectMentor(mentor._id)}
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



      {/* =============================
          PENDING VOLUNTEERS
      ============================= */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Pending Volunteer Applications
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Domains</th>
              <th className="p-4 text-left">Motivation</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {volunteers.map((volunteer) => (

              <tr
                key={volunteer._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {volunteer.userId?.fullName}
                </td>

                <td className="p-4">
                  {volunteer.domains.join(", ")}
                </td>

                <td className="p-4 text-sm text-gray-600">
                  {volunteer.motivation}
                </td>

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() => approveVolunteer(volunteer._id)}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => rejectVolunteer(volunteer._id)}
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

export default AdminPendingGiveBack;