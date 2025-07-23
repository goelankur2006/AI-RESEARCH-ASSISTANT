import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Categories Of Papers</h2>
      <ul className="sidebar-list">
        <li><a href="/projects">Robotics</a></li>
        <li><a href="/datasets">IIOT</a></li>
        <li><a href="/about">ML</a></li>
        <li><a href="/about">Healthcare</a></li>
      </ul>
    </div>
  )
}

export default Sidebar