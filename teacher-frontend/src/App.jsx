import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  RejectedProjects  from './pages/RejectedProjects/RejectedProjects';
import Sidebar from './components/TeacherSidebar/TeacherSidebar';
import AddProject from './pages/AddProject/AddProject';
import PendingProjects from './pages/PendingProjects/PendingProjects';
import MyAssistants from './pages/MyAssistants/MyAssistants';
import MakePayment from './pages/MakePayment/MakePayment';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import NewRequests from './pages/NewRequests/NewRequests';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import ApprovedProjects from './pages/ApprovedProjects/ApprovedProjects';


const App = () => {
  return (
    <>
      <div className="teacher-panel">
        <Navbar/>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/teacher/home" />} />
            <Route path='/teacher/home' element={<Home/>} />
            <Route path="/teacher/add-project" element={<AddProject />} />
            <Route path='/teacher/new-requests' element={<NewRequests />} />
            <Route path="/teacher/approved-projects" element={<ApprovedProjects />} />
            <Route path="/teacher/my-assistants" element={<MyAssistants />} />
            <Route path="/teacher/make-payment" element={<MakePayment />} />
            <Route path="/teacher/pending-projects" element={<PendingProjects />} />
            <Route path="/teacher/rejected-projects" element={<RejectedProjects/>} /> 
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
