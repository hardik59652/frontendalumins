import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

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
import AdminDashboard from "./pages/admindashboard/adminDashboard.jsx";
import AlumniDashboard from './pages/alumindashboard/AlumniDashBoard.jsx';
import PendingAchievements from "./pages/admindashboard/pendingAchievements.jsx";
import AdminLayout from './pages/admindashboard/adminLayout.jsx'
import PendingOpportunities from './pages/admindashboard/pendingJobOpportunity.jsx'
import ProtectedRoute from "./utils/ProtectedRoute";
import ApplyJob from "./pages/opportunities/applyJob.jsx";
import MyApplications from './pages/alumindashboard/myApplication.jsx'
import JobApplicants from "./pages/alumindashboard/jobApplicants.jsx";
import MyPostedJobs from './pages/alumindashboard/myPostedJobs.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contacts' element={<Contacts />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='achivements' element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
      <Route path='opportunities' element={<ProtectedRoute><Opportunities /></ProtectedRoute>} />
      <Route path='donation' element={<ProtectedRoute><Donation /></ProtectedRoute>} />
      <Route path='givingback' element={<ProtectedRoute><GivingBackPage /></ProtectedRoute>} />
      <Route path="alumin-dashboard" element={<AlumniDashboard />} />
      <Route path="alumindirectory" element={<AlumniDirectory />} />
      <Route path="reunion" element={<Reunion />} />
      <Route path="newsevents" element={<NewsEventsPage />} />
      <Route path="/apply/:jobId" element={<ApplyJob />} />
      <Route path="/my-applications" element={<MyApplications />} />
      <Route path="/dashboard" element={<AlumniDashboard />} />
      <Route path="/my-posted-jobs" element={<MyPostedJobs />} />
<Route path="/job-applications/:jobId" element={<JobApplicants />} />
      {/* ADMIN ROUTES */}

      <Route path="admin-dashboard" element={<AdminLayout />}>

        <Route index element={<AdminDashboard />} />

        <Route 
          path="pending-achievements" 
          element={<PendingAchievements />} 
        />
<Route path="pending-opportunities" element={<PendingOpportunities />} />
      </Route>

    </Route>
  )
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
