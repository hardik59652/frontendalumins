import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountSettings = () => {

  const [preview,setPreview] = useState(null)
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  const [profile,setProfile] = useState({
    fullName:"",
    phoneNumber:"",
    location:"",
    currentCompany:"",
    jobTitle:"",
    linkedinUrl:""
  })

  const [password,setPassword] = useState({
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  })

  const [profileImage,setProfileImage] = useState(null)


  // fetch user
  const fetchUser = async ()=>{
    try{

      const res = await axios.get(
        "http://localhost:8000/api/v1/users/currentuser",
        {withCredentials:true}
      )

      const userData = res.data.data

      setUser(userData)

      setProfile({
        fullName:userData.fullName || "",
        phoneNumber:userData.phoneNumber || "",
        location:userData.location || "",
        currentCompany:userData.currentCompany || "",
        jobTitle:userData.jobTitle || "",
        linkedinUrl:userData.linkedinUrl || ""
      })

    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])


  // handle image select
  const handleImageChange = (e)=>{

    const file = e.target.files[0]

    if(!file) return

    setProfileImage(file)

    setPreview(URL.createObjectURL(file))

  }


  // update profile info
  const handleProfileUpdate = async ()=>{
    try{

      const formData = new FormData()

      Object.keys(profile).forEach(key=>{
        formData.append(key,profile[key])
      })

      await axios.patch(
        "http://localhost:8000/api/v1/users/update-profile",
        formData,
        {withCredentials:true}
      )

      alert("Profile updated")

      fetchUser()

    }catch(err){
      console.log(err)
    }
  }


  // update profile photo
  const handleUpdatePhoto = async () => {

    if(!profileImage){
      alert("Please select an image first")
      return
    }

    try{

      const formData = new FormData()
      formData.append("profileImage", profileImage)

      await axios.patch(
        "http://localhost:8000/api/v1/users/update-profile",
        formData,
        {withCredentials:true}
      )

      alert("Profile photo updated")

      setPreview(null)
      setProfileImage(null)

      fetchUser()

    }catch(err){
      console.log(err)
    }
  }


  // change password
  const handleChangePassword = async () => {

    if(password.newPassword !== password.confirmPassword){
      alert("Passwords do not match")
      return
    }
  
    try{
  
      // change password
      await axios.patch(
        "http://localhost:8000/api/v1/users/change-password",
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword
        },
        {withCredentials:true}
      )
  
      alert("Password changed successfully. Please login again.")
  
      // logout user
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {withCredentials:true}
      )
  
      // redirect to login page
      window.location.href="/login"
  
    }catch(err){
      console.log(err)
      alert("Error changing password")
    }
  }

  // logout
  const handleLogout = async ()=>{
    await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {withCredentials:true}
    )
    window.location.href="/login"
  }


  // delete account
  const handleDeleteAccount = async ()=>{

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    )

    if(!confirmDelete) return

    try{

      await axios.delete(
        "http://localhost:8000/api/v1/users/delete-account",
        {withCredentials:true}
      )

      window.location.href="/"

    }catch(err){
      console.log(err)
    }

  }


  if(loading){
    return <div style={{textAlign:"center"}}>Loading...</div>
  }


  return (

    <div style={styles.container}>

      <h1 style={styles.title}>Account Settings</h1>

      {/* PROFILE INFORMATION */}

      <section style={styles.section}>

        <h2>Profile Information</h2>

        <div style={styles.grid}>

          <div>
            <label>Full Name</label>
            <input
              style={styles.input}
              type="text"
              value={profile.fullName}
              onChange={(e)=>setProfile({...profile,fullName:e.target.value})}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              style={styles.input}
              type="text"
              value={profile.phoneNumber}
              onChange={(e)=>setProfile({...profile,phoneNumber:e.target.value})}
            />
          </div>

          <div>
            <label>Location</label>
            <input
              style={styles.input}
              type="text"
              value={profile.location}
              onChange={(e)=>setProfile({...profile,location:e.target.value})}
            />
          </div>

          <div>
            <label>Current Company</label>
            <input
              style={styles.input}
              type="text"
              value={profile.currentCompany}
              onChange={(e)=>setProfile({...profile,currentCompany:e.target.value})}
            />
          </div>

          <div>
            <label>Job Title</label>
            <input
              style={styles.input}
              type="text"
              value={profile.jobTitle}
              onChange={(e)=>setProfile({...profile,jobTitle:e.target.value})}
            />
          </div>

          <div>
            <label>LinkedIn URL</label>
            <input
              style={styles.input}
              type="text"
              value={profile.linkedinUrl}
              onChange={(e)=>setProfile({...profile,linkedinUrl:e.target.value})}
            />
          </div>

        </div>

        <button style={styles.primaryBtn} onClick={handleProfileUpdate}>
          Update Profile
        </button>

      </section>


      {/* PROFILE PHOTO */}

      <section style={styles.section}>

        <h2>Profile Photo</h2>

        <img
          src={preview || `http://localhost:8000/${user.profileImage}`}
          alt="profile"
          style={styles.image}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button
          style={styles.primaryBtn}
          onClick={handleUpdatePhoto}
        >
          Update Photo
        </button>

      </section>


      {/* SECURITY */}

      <section style={styles.section}>

        <h2>Security</h2>

        <input
          style={styles.input}
          type="password"
          placeholder="Old Password"
          onChange={(e)=>setPassword({...password,oldPassword:e.target.value})}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="New Password"
          onChange={(e)=>setPassword({...password,newPassword:e.target.value})}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Confirm Password"
          onChange={(e)=>setPassword({...password,confirmPassword:e.target.value})}
        />

        <button style={styles.primaryBtn} onClick={handleChangePassword}>
          Change Password
        </button>

      </section>


      {/* ACCOUNT INFO */}

      <section style={styles.section}>

        <h2>Account Information</h2>

        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Graduation Year: {user.graduationYear}</p>
        <p>Department: {user.department}</p>
        <p>Member Since: {new Date(user.createdAt).toDateString()}</p>

      </section>


      {/* ACCOUNT ACTIONS */}

      <section style={styles.section}>

        <h2>Account Actions</h2>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>

        <button style={styles.deleteBtn} onClick={handleDeleteAccount}>
          Delete Account
        </button>

      </section>

    </div>
  )
}

export default AccountSettings



const styles = {

  container:{
    maxWidth:"900px",
    margin:"40px auto",
    padding:"20px",
    fontFamily:"Arial"
  },

  title:{
    marginBottom:"20px"
  },

  section:{
    border:"1px solid #eee",
    padding:"25px",
    marginBottom:"25px",
    borderRadius:"12px",
    display:"flex",
    flexDirection:"column",
    gap:"15px",
    boxShadow:"0 2px 8px rgba(0,0,0,0.05)"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    gap:"15px"
  },

  input:{
    padding:"10px",
    borderRadius:"6px",
    border:"1px solid #ccc",
    fontSize:"14px"
  },

  primaryBtn:{
    padding:"10px 16px",
    border:"none",
    borderRadius:"6px",
    background:"#2563eb",
    color:"white",
    cursor:"pointer",
    width:"160px"
  },

  logoutBtn:{
    padding:"10px",
    border:"none",
    borderRadius:"6px",
    background:"#444",
    color:"white",
    cursor:"pointer",
    width:"120px"
  },

  deleteBtn:{
    padding:"10px",
    border:"none",
    borderRadius:"6px",
    background:"red",
    color:"white",
    cursor:"pointer",
    width:"150px"
  },

  image:{
    width:"120px",
    height:"120px",
    borderRadius:"50%",
    objectFit:"cover"
  }

}