import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import ManageUser from './components/ManageUser/ManageUser';
import Dashboard from './components/Dashboard/Dashboard';
import ApproveProjects from './components/ApproveProjects/ApproveProjects';
import ManageProject from './components/ManageProjects/ManageProjects';
import ReviewContributions from './components/ReviewContributions/ReviewContributions';
import MonitorPayments from './components/MonitorPayments/MonitorPayments';
import Home from './pages/Home/Home';



const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ManageUser" element={<ManageUser />} />
            <Route path="/approveProjects" element={<ApproveProjects />} />
            <Route path="/manageProject" element={<ManageProject />} />
            <Route path="/reviewContributions" element={<ReviewContributions />} />
            <Route path="/monitorPayments" element={<MonitorPayments />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
