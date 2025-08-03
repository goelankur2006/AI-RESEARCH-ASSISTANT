import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyResearches.css';

const ApprovedProjects = () => {
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const teacherId = localStorage.getItem('teacherId');

useEffect(() => {
const fetchApproved = async () => {
try {
const res = await axios.get(`http://localhost:5000/api/projects/teacher/${teacherId}`);
const approved = res.data.filter(project => project.status === 'approved');
setProjects(approved);
} catch (err) {
console.error('Error fetching approved projects:', err);
} finally {
setLoading(false);
}
};

if (teacherId) {
  fetchApproved();
} else {
  console.warn("Teacher ID not found in localStorage");
  setLoading(false);
}
}, [teacherId]);

if (loading) return <p>Loading approved projects...</p>;

return (
<div className="approved-projects-container">
<h2>Approved Research Projects</h2>
{projects.length === 0 ? (
<p>No approved projects found.</p>
) : (
<div className="project-list">
{projects.map(project => (
<div className="project-card" key={project._id}>
<h3>{project.title}</h3>
<p>{project.description}</p>
<p><strong>Status:</strong> {project.status}</p>
</div>
))}
</div>
)}
</div>
);
};

export default ApprovedProjects;