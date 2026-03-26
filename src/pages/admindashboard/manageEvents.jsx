import React, { useEffect, useState } from "react";
import { UploadCloud, CheckCircle } from "lucide-react";

function ManageEvents() {

  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    maxParticipants: ""
  });

  const [image, setImage] = useState(null);

  // FETCH ALL EVENTS
  const fetchEvents = async () => {

    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/events/all",
        {
          credentials: "include"
        }
      );

      const data = await res.json();

      if (res.ok) {
        setEvents(data.data);
      }

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // CREATE EVENT
  const createEvent = async (e) => {

    e.preventDefault();

    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("eventDate", formData.eventDate);
    form.append("location", formData.location);
    form.append("maxParticipants", formData.maxParticipants);
    form.append("image", image);

    try {

      const res = await fetch(
        "http://localhost:8000/api/v1/events/create",
        {
          method: "POST",
          credentials: "include",
          body: form
        }
      );

      if (res.ok) {

        setFormData({
          title: "",
          description: "",
          eventDate: "",
          location: "",
          maxParticipants: ""
        });

        setImage(null);

        fetchEvents();
      }

    } catch (error) {
      console.log(error);
    }

  };

  // PUBLISH EVENT
  const publishEvent = async (id) => {

    try {

      const res = await fetch(
        `http://localhost:8000/api/v1/events/publish/${id}`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (res.ok) {

        setEvents(prev =>
          prev.map(e =>
            e._id === id ? { ...e, status: "published" } : e
          )
        );

      }

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="space-y-10">

      {/* CREATE EVENT FORM */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create Event
        </h2>

        <form
          onSubmit={createEvent}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            value={formData.maxParticipants}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="md:col-span-2"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            <UploadCloud size={18} />
            Create Event
          </button>

        </form>

      </div>

      {/* EVENTS LIST */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          All Events
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

              <tr>
                <th className="p-4 text-left">Event</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {events.map((event) => (

                <tr
                  key={event._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    <p className="font-semibold">
                      {event.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {event.description}
                    </p>

                  </td>

                  <td className="p-4">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {event.location}
                  </td>

                  <td className="p-4">

                    {event.image && (
                      <img
                        src={`http://localhost:8000/${event.image}`}
                        alt="event"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}

                  </td>

                  <td className="p-4">

                    {event.status === "published" ? (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                        Draft
                      </span>
                    )}

                  </td>

                  <td className="p-4 text-center">

                    {event.status === "draft" && (

                      <button
                        onClick={() => publishEvent(event._id)}
                        className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                      >
                        <CheckCircle size={16} />
                        Publish
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default ManageEvents;