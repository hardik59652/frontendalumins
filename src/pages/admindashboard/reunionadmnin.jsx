import React, { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

const Reunion = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  const [highlightInput, setHighlightInput] = useState("");
  const [highlights, setHighlights] = useState([]);

  const [reunion, setReunion] = useState(null);

  // FETCH REUNION
  const fetchReunion = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/reunion/",
        { withCredentials: true }
      );

      setReunion(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReunion();
  }, []);

  // ADD HIGHLIGHT
  const addHighlight = () => {

    if (!highlightInput.trim()) return;

    setHighlights([
      ...highlights,
      { title: highlightInput }
    ]);

    setHighlightInput("");
  };

  // CREATE REUNION
  const handleCreateReunion = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("highlights", JSON.stringify(highlights));

    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    try {

      await axios.post(
        "http://localhost:8000/api/v1/reunion/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      fetchReunion();

      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setHighlights([]);
      setBannerImage(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="space-y-10">

      {/* CREATE REUNION */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create Reunion
        </h2>

        <form
          onSubmit={handleCreateReunion}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            placeholder="Reunion Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerImage(e.target.files[0])}
            className="border p-3 rounded-lg"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded-lg md:col-span-2"
          />

          {/* HIGHLIGHTS */}

          <div className="md:col-span-2">

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Add highlight (ex: Live Music)"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                className="border p-3 rounded-lg flex-1"
              />

              <button
                type="button"
                onClick={addHighlight}
                className="bg-gray-800 text-white px-4 rounded-lg"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-3">

              {highlights.map((h, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {h.title}
                </span>
              ))}

            </div>

          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            <UploadCloud size={18} />
            Create Reunion
          </button>

        </form>

      </div>


      {/* REUNION DETAILS */}

      {reunion && (

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Current Reunion
          </h2>

          <div className="space-y-4">

            {reunion.bannerImage && (
              <img
                src={`http://localhost:8000/${reunion.bannerImage}`}
                alt="banner"
                className="w-full h-60 object-cover rounded-xl"
              />
            )}

            <h3 className="text-xl font-semibold">
              {reunion.title}
            </h3>

            <p className="text-gray-600">
              {reunion.description}
            </p>

            <p>
              <strong>Date:</strong> {new Date(reunion.date).toLocaleDateString()}
            </p>

            <p>
              <strong>Location:</strong> {reunion.location}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">

              {reunion.highlights?.map((h, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {h.title}
                </span>
              ))}

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default Reunion;