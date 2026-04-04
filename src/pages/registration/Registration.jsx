import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Developer: Yash Patel
// Last Update: Connected with User Auth API
// TODO: Add OTP verification next month

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    graduationYear: "",
    department: "",
    enrollmentNumber: "",
    currentCompany: "",
    jobTitle: "",
    location: "",
    linkedinUrl: ""
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const departments = [
    "Computer Engineering", "Information Technology",
    "Electronics & Communication", "Mechanical Engineering",
    "Civil Engineering", "Instrumentation & Control", "Chemical Engineering"
  ];
  
  // Generate years from 1994 to 2026
  const years = Array.from({ length: 2026 - 1994 + 1 }, (_, i) => 1994 + i).reverse();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg(""); // clear error when typing
  };

  const handleFile = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Manual basic validation
    if(formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      console.log("Sending registration request...");

      const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        body: data
      });

      if (response.ok) {
        alert("Registration successful! You can now login.");
        localStorage.setItem("registeredName", formData.fullName);
        navigate("/login");
      } else {
        const result = await response.json();
        setErrorMsg(result.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server connection failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-sm border border-gray-200">
        
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-blue-900 uppercase">Alumni Registration Form</h2>
          <p className="text-sm text-gray-500 mt-1">Please fill in your authentic details to join the VGEC network.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-6 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={registerUser}>
          
          {/* --- Section 1 --- */}
          <h3 className="text-lg font-semibold bg-gray-100 p-2 mb-4 text-gray-700">1. Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Profile Photo</label>
              <input type="file" accept="image/*" onChange={handleFile} className="w-full border border-gray-300 p-1 text-sm bg-gray-50" />
            </div>
          </div>

          {/* --- Section 2 --- */}
          <h3 className="text-lg font-semibold bg-gray-100 p-2 mb-4 text-gray-700">2. College Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Enrollment Number <span className="text-red-500">*</span></label>
              <input type="text" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department <span className="text-red-500">*</span></label>
              <select name="department" value={formData.department} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 bg-white">
                <option value="">-- Select Department --</option>
                {departments.map((dep) => <option key={dep} value={dep}>{dep}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Graduation Year <span className="text-red-500">*</span></label>
              <select name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500 bg-white">
                <option value="">-- Select Year --</option>
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
          </div>

          {/* --- Section 3 --- */}
          <h3 className="text-lg font-semibold bg-gray-100 p-2 mb-4 text-gray-700">3. Current Status (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1">Current Company</label>
              <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location (City)</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
              <input type="text" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <Link to="/login" className="text-blue-600 text-sm hover:underline">
              Already registered? Login here.
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-8 shadow-sm transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;