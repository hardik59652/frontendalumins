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
import News from './pages/admindashboard/news.jsx'
import ManageEvents from "./pages/admindashboard/manageEvents.jsx";
import MyEvents from './pages/alumindashboard/myevents.jsx'
import Campaign from './pages/admindashboard/campagin.jsx'
import MyDonations from './pages/alumindashboard/mydonations.jsx'
import AdminDonations from './pages/admindashboard/donation.jsx'
import ReunionAdmin from './pages/admindashboard/reunionadmnin.jsx'
import AdminPendingGiveBack from './pages/admindashboard/giveback.jsx'
import MyMentor from './pages/alumindashboard/mymentor.jsx'
import MyVolunteer from './pages/alumindashboard/myvolunteer.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contacts' element={<Contacts />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='achivements' element={<Achievements />}/>
      <Route path='opportunities' element={<Opportunities />} />
      <Route path='donation' element={<Donation />} />
      <Route path='/givingback' element={<GivingBackPage />} />
      <Route path="alumni-dashboard" element={<AlumniDashboard />} />
      <Route path="alumindirectory" element={<AlumniDirectory />} />
      <Route path="reunion" element={<Reunion />} />
      <Route path="newsevents" element={<NewsEventsPage />} />
      <Route path="/apply/:jobId" element={<ApplyJob />} />
      <Route path="/my-applications" element={<MyApplications />} />
      {/* <Route path="/dashboard" element={<AlumniDashboard />} /> */}
      <Route path="/my-posted-jobs" element={<MyPostedJobs />} />
<Route path="/job-applications/:jobId" element={<JobApplicants />} />
<Route path="/dashboard/events" element={< MyEvents/>} />
<Route path="/my-donation" element={<MyDonations />} />
<Route path="/my-mentor" element={<MyMentor/>} />
<Route path="/my-volunteer" element={<MyVolunteer />} />
      {/* ADMIN ROUTES */}

      <Route path="admin-dashboard" element={<AdminLayout />}>

        <Route index element={<AdminDashboard />} />

        <Route 
          path="pending-achievements" 
          element={<PendingAchievements />} 
        />
<Route path="pending-opportunities" element={<PendingOpportunities />} />
<Route path="manage-news" element={<News />} />

<Route path="campagin" element={<Campaign />} />
<Route path="donation" element={<AdminDonations />} />
<Route path="reunion" element={<ReunionAdmin />} />
<Route path="giveback" element={<AdminPendingGiveBack />} />
<Route path="/admin-dashboard/events" element={<ManageEvents />} />

      </Route>

    </Route>
  )
)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
