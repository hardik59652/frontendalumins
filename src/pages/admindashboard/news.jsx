import React, { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, CheckCircle, Newspaper, Image as ImageIcon, Activity, FileText } from "lucide-react";


const News = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/news/admin/all",
        { withCredentials: true }
      );
      setNewsList(res.data.data || []);
    } catch (err) {
      console.log("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNews(); 

    const intervalId = setInterval(() => {
      fetchNews();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCreateNews = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

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
      
      const fileInput = document.getElementById("news-image");
      if (fileInput) fileInput.value = "";

      alert("News drafted successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to draft news.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (id) => {
    if (!window.confirm("Are you sure you want to publish this news? It will be visible to all users immediately.")) return;

    try {
      await axios.patch(
        `http://localhost:8000/api/v1/news/publish/${id}`,
        {},
        { withCredentials: true }
      );
      fetchNews();
    } catch (err) {
      console.log(err);
      alert("Failed to publish news.");
    }
  };

  return (
    <div className="space-y-8 font-sans text-slate-800">
      
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded flex items-center justify-center text-indigo-700">
            <Newspaper size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide leading-tight">News & Announcements</h1>
           
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
          <FileText size={16} className="text-slate-400" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Draft New Update
          </h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleCreateNews} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Headline / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a catchy headline..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cover Image <span className="text-slate-400 normal-case font-medium">(Optional)</span>
                </label>
                <input
                  type="file"
                  id="news-image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer file:transition-colors border border-slate-300 rounded cursor-pointer bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write the complete news article or announcement here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="w-full bg-white border border-slate-300 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-[#0A192F] text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#112240] shadow-sm'}`}
              >
                {isSubmitting ? "Saving..." : (
                  <>
                    <UploadCloud size={16} /> Save 
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Newspaper size={16} className="text-indigo-700" /> Published & Drafts
          </h2>
          <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Total: {newsList.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b-2 border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 w-1/2">News Details</th>
                <th className="px-6 py-4">Visuals</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {newsList.length > 0 ? (
                newsList.map((news) => (
                  <tr key={news._id} className="hover:bg-slate-50 transition-colors">
                    
                    <td className="px-6 py-4 align-top">
                      <p className="text-sm font-bold text-slate-800 truncate max-w-[300px] md:max-w-md">{news.title}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 max-w-[300px] md:max-w-md leading-relaxed">{news.description}</p>
                    </td>

                    <td className="px-6 py-4 align-top">
                      {news.image ? (
                        <div className="w-12 h-12 rounded border border-slate-200 overflow-hidden bg-slate-50 shadow-sm">
                          <img
                            src={`http://localhost:8000/${news.image}`}
                            alt="news cover"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image" }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-300">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 align-top">
                      {news.isPublished ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Draft
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 align-top text-right">
                      {!news.isPublished ? (
                        <button
                          onClick={() => handlePublish(news._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          <CheckCircle size={14} /> Publish
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live</span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
               
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Activity size={32} className="mb-3 opacity-30" />
                      <p className="text-sm font-bold text-slate-600">No news found</p>
                      <p className="text-xs mt-1">Draft your first announcement above.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default News;