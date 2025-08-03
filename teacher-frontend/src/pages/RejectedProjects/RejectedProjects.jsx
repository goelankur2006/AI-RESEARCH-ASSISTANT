import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RejectedProjects = () => {
<<<<<<< HEAD
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchRejectedProjects = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId');
        const res = await axios.get(`http://localhost:5000/api/projects/my-projects/${teacherId}`);
        const rejected = res.data.filter(project => project.status === 'rejected');
        setProjects(rejected);
      } catch (err) {
        console.error('Error fetching rejected projects:', err);
      }
    };

    fetchRejectedProjects();
  }, []);

  return (
    <div>
      <h2>Rejected Projects</h2>
      {projects.map(project => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><strong>Feedback:</strong> {project.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default RejectedProjects;
  
=======
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const teacherId = localStorage.getItem('teacherId');

useEffect(() => {
const fetchRejected = async () => {
try {
const res = await axios.get(`http://localhost:5000/api/projects/teacher/${teacherId}`);
const rejected = res.data.filter(project => project.status === 'rejected');
setProjects(rejected);
} catch (err) {
console.error('Error fetching rejected projects:', err);
} finally {
setLoading(false);
}
};
if (teacherId) {
  fetchRejected();
} else {
  console.warn("Teacher ID not found in localStorage");
  setLoading(false);
}
}, [teacherId]);

if (loading) return <p>Loading rejected projects...</p>;

return (
<div className="rejected-projects-container">
<h2>Rejected Research Projects</h2>
{projects.length === 0 ? (
<p>No rejected projects found.</p>
) : (
<div className="project-list">
{projects.map((project) => (
<div className="project-card" key={project._id}>
<h3>{project.title}</h3>
<p>{project.description}</p>
<p><strong>Status:</strong> {project.status}</p>
{project.feedback && (
<p className="feedback"><strong>Admin Feedback:</strong> {project.feedback}</p>
)}
</div>
))}
</div>
)}
</div>
);
};

export default RejectedProjects;
>>>>>>> 7930d21ce7eed22aad3c64023d9190ac231890dd
