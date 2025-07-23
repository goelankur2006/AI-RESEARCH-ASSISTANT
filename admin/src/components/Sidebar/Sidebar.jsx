import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title"></div>
      <ul className="sidebar-list">
        <li><a href="/Dashboard">Dashboard</a></li>
        <li><a href="/ManageAddUsers">ManageAddUsers</a></li>
        <li><a href="/ApproveProjects">ApproveProjects</a></li>
        <li><a href="/manageProject">manageProject</a></li>
        <li><a href="/ReviewContributions">ReviewContributions</a></li>
        <li><a href="/MonitorPayments">MonitorPayments</a></li>
      </ul>
    </div>
  )
}

export default Sidebar