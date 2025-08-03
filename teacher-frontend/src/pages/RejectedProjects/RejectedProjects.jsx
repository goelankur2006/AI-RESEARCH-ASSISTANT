import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RejectedProjects = () => {
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
  