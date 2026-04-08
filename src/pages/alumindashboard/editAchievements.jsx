import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";

const EditAchievement = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [form,setForm] = useState({
    title:"",
    category:"",
    description:"",
    photo:null
  });

  const [preview,setPreview] = useState("");

  useEffect(()=>{

    const fetchAchievement = async ()=>{

      const res = await fetch(
        `http://localhost:8000/api/v1/achievements/${id}`,
        { credentials:"include" }
      );

      const data = await res.json();

      if(data?.data){

        setForm({
          title:data.data.title,
          category:data.data.category,
          description:data.data.description,
          photo:null
        });

        setPreview(`http://localhost:8000${data.data.photo}`);
      }

    };

    fetchAchievement();

  },[id]);

  const handleChange = (e)=>{

    const {name,value} = e.target;

    setForm({
      ...form,
      [name]:value
    });

  };

  const handlePhotoChange = (e)=>{

    const file = e.target.files[0];

    if(file){

      setForm({
        ...form,
        photo:file
      });

      setPreview(URL.createObjectURL(file));
    }

  };

  const handleSubmit = async (e)=>{

    e.preventDefault();

    const formData = new FormData();

    formData.append("title",form.title);
    formData.append("category",form.category);
    formData.append("description",form.description);

    if(form.photo){
      formData.append("photo",form.photo);
    }

    const res = await fetch(
      `http://localhost:8000/api/v1/achievements/update/${id}`,
      {
        method:"PATCH",
        credentials:"include",
        body:formData
      }
    );

    const data = await res.json();

    if(data?.success){
      alert("Achievement updated and sent for approval");
      navigate("/my-achievements");
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Update Achievement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block font-medium mb-1">
              Achievement Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Entrepreneurship">Entrepreneurship</option>
              <option value="Academic">Academic</option>
              <option value="Corporate">Corporate</option>
              <option value="SocialWork">Social Work</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="border p-3 w-full rounded-lg"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block font-medium mb-1">
              Achievement Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="border p-2 w-full rounded-lg"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-4 w-40 rounded-lg shadow"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Achievement
            </button>

            <button
              type="button"
              onClick={()=>navigate("/my-achievements")}
              className="bg-gray-300 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditAchievement;