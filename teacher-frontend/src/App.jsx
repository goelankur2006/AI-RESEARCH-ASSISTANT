import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/TeacherSidebar/TeacherSidebar';
import AddProject from './pages/AddProject/AddProject';
import MyResearches from './pages/MyResearches/MyResearches';
import MyAssistants from './pages/MyAssistants/MyAssistants';
import MakePayment from './pages/MakePayment/MakePayment';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import NewRequests from './pages/NewRequests/NewRequests';
import { Navigate } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div className="teacher-panel">
        <Navbar teacherName="Deepanshi" />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/teacher/add-project" />} />
            <Route path="/teacher/add-project" element={<AddProject />} />
            <Route path='/teacher/new-requests' element={<NewRequests />} />
            <Route path="/teacher/my-researches" element={<MyResearches />} />
            <Route path="/teacher/my-assistants" element={<MyAssistants />} />
            <Route path="/teacher/make-payment" element={<MakePayment />} />
          </Routes>

        </div>
      </div>
    </Router>
  );
};

export default App;
