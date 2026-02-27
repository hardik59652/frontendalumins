import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    graduationYear: "",
    department: "",
    enrollmentNumber: "",
    currentCompany: "",
    jobTitle: "",
    location: "",
    linkedinUrl: "",
    role: "alumni"   // AUTO ROLE
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Alumni Registration Successful!");
  };

  return (
    <div className="container">
      <h2>Alumni Registration</h2>

      <form onSubmit={handleSubmit} className="form">
      {/* <h3 className="bg-amber-950 text-white">profilePhoto</h3> */}
      <input title="pfp" placeholder="pfp" type="file" name="profilePhoto" onChange={handleChange} />
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} />

        <input name="graduationYear" placeholder="Graduation Year" onChange={handleChange} />
        <input name="department" placeholder="Department" onChange={handleChange} />
        <input name="enrollmentNumber" placeholder="Enrollment Number" onChange={handleChange} />

        <input name="currentCompany" placeholder="Current Company" onChange={handleChange} />
        <input name="jobTitle" placeholder="Job Title" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="linkedinUrl" placeholder="LinkedIn URL" onChange={handleChange} />
        

        <button type="submit">Register as Alumni</button>
      </form>
    </div>
  );
}

export default Register;