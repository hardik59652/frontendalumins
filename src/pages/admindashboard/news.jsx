import React, { useState, useEffect } from "react";
import axios from "axios";

const News = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [newsList, setNewsList] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/news/admin/all",
        {
          withCredentials: true
        }
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
          headers: {
            "Content-Type": "multipart/form-data"
          }
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
        {
          withCredentials: true
        }
      );

      fetchNews();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Create News</h1>

      <form onSubmit={handleCreateNews} className="space-y-4">

        <input
          type="text"
          placeholder="News Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Create News
        </button>

      </form>

      <hr className="my-6"/>

      <h2 className="text-xl font-bold mb-4">All News</h2>

      {newsList.map((news) => (

        <div key={news._id} className="border p-4 mb-4">

          <h3 className="font-bold">{news.title}</h3>

          <p>{news.description}</p>

          <p className="text-sm text-gray-500">
            Published: {news.isPublished ? "Yes" : "No"}
          </p>

          {!news.isPublished && (
            <button
              onClick={() => handlePublish(news._id)}
              className="bg-green-500 text-white px-3 py-1 mt-2"
            >
              Publish
            </button>
          )}

        </div>

      ))}

    </div>
  );
};

export default News;