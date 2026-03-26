import React, { useState } from "react";

function GiveBack() {

  const [activeForm, setActiveForm] = useState(null);

  const [formData, setFormData] = useState({
    domain: "",
    availability: "Flexible",
    motivation: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const url =
        activeForm === "mentor"
          ? "http://localhost:8000/api/v1/giveback/mentor/apply"
          : "http://localhost:8000/api/v1/giveback/volunteer/apply";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          domains: [formData.domain],
          availability: formData.availability,
          motivation: formData.motivation
        })
      });

      const data = await res.json();

      if (res.ok) {

        alert("Application submitted successfully");

        setActiveForm(null);

        setFormData({
          domain: "",
          availability: "Flexible",
          motivation: ""
        });

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="min-h-screen bg-gray-50 py-16 px-6">

      <div className="max-w-6xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          Give Back to Your Alma Mater
        </h1>

        <p className="text-gray-600 mb-12">
          Help students grow by sharing your experience.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Mentor Card */}

          <div className="bg-white shadow-lg rounded-2xl p-8">

            <h2 className="text-2xl font-semibold mb-4">
              Be a Mentor
            </h2>

            <p className="text-gray-600 mb-6">
              Guide juniors with career advice and industry knowledge.
            </p>

            <button
              onClick={() => setActiveForm("mentor")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Apply as Mentor
            </button>

          </div>

          {/* Volunteer Card */}

          <div className="bg-white shadow-lg rounded-2xl p-8">

            <h2 className="text-2xl font-semibold mb-4">
              Be a Volunteer
            </h2>

            <p className="text-gray-600 mb-6">
              Help organize alumni events and college activities.
            </p>

            <button
              onClick={() => setActiveForm("volunteer")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Apply as Volunteer
            </button>

          </div>

        </div>

      </div>

      {/* Modal Form */}

      {activeForm && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

            <div className="flex justify-between items-center p-6 border-b">

              <h2 className="text-xl font-bold">
                {activeForm === "mentor"
                  ? "Mentor Application"
                  : "Volunteer Application"}
              </h2>

              <button
                onClick={() => setActiveForm(null)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>

            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Domain */}

              <div>

                <label className="block mb-1 font-medium">
                  Domain
                </label>

                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >

                  <option value="">Select Domain</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="UI / UX">UI / UX</option>

                </select>

              </div>

              {/* Availability */}

              <div>

                <label className="block mb-1 font-medium">
                  Availability
                </label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                >

                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Monthly Sessions">Monthly Sessions</option>

                </select>

              </div>

              {/* Motivation */}

              <div>

                <label className="block mb-1 font-medium">
                  Motivation
                </label>

                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                Submit Application
              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );
}

export default GiveBack;