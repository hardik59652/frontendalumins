import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminDashboard from "./pages/admindasahboard/AdminDashBoard.jsx";
import AlumniDashboard from './pages/alumindashboard/AlumiinDashBoard.jsx';
import { createBrowserRouter,  createRoutesFromElements,Route,  RouterProvider } from 'react-router-dom'
import Layout from './layout.jsx'
import Home from './pages/home/Home.jsx'
import About from './pages/about/About.jsx'
import Contacts from './pages/contacts/Contacts.jsx'
import Login from './pages/login/Login.jsx'
import Register from './pages/registration/Registration.jsx'
import Achievements from './pages/achivements/achivements.jsx'
import Opportunities from './pages/opportunities/opportunities.jsx'
import Donation from './pages/donation/donation.jsx'
import GivingBackPage from './pages/givingback/GivingBack.jsx'
import AlumniDirectory from './pages/alumindirectory/AluminDirectory.jsx';
import Reunion from './pages/reunion/reunion.jsx';
import NewsEventsPage from './pages/newsevents/NewsEvents.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contacts' element={<Contacts />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='achivements' element={<Achievements />} />
      <Route path='opportunities' element={<Opportunities />} />
      <Route path='donation' element={<Donation />} />
      <Route path='givingback' element={<GivingBackPage />} />
      <Route path="register" element={<Register />} />
      <Route path="admin-dashboard" element={<AdminDashboard />} />
      <Route path="alumin-dashboard" element={<AlumniDashboard />} />
      <Route path="alumindirectory" element={<AlumniDirectory />} />
      <Route path="reunion" element={<Reunion />} />
      <Route path="newsevents" element={<NewsEventsPage />} />
      
 

</Route>

    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )