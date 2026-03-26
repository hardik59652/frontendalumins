import React, { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, CheckCircle } from "lucide-react";

const News = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [newsList, setNewsList] = useState([]);

  const fetchNews = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/news/admin/all",
        { withCredentials: true }
      );

      setNewsList(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreateNews = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {

      await axios.post(
        "http://localhost:8000/api/v1/news/create",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      fetchNews();
      setTitle("");
      setDescription("");
      setImage(null);

    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async (id) => {

    try {

      await axios.patch(
        `http://localhost:8000/api/v1/news/publish/${id}`,
        {},
        { withCredentials: true }
      );

      fetchNews();

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="space-y-10">

      {/* CREATE NEWS */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create News
        </h2>

        <form
          onSubmit={handleCreateNews}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            placeholder="News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-3 rounded-lg"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            <UploadCloud size={18} />
            Create News
          </button>

        </form>

      </div>


      {/* NEWS LIST */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          All News
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">

              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {newsList.map((news) => (

                <tr
                  key={news._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {news.title}
                  </td>

                  <td className="p-4 text-gray-600">
                    {news.description}
                  </td>

                  <td className="p-4">

                    {news.image && (
                      <img
                        src={`http://localhost:8000/${news.image}`}
                        alt="news"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}

                  </td>

                  <td className="p-4">

                    {news.isPublished ? (
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

                    {!news.isPublished && (

                      <button
                        onClick={() => handlePublish(news._id)}
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
};

export default News;