import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId');
        const res = await axios.get(`http://localhost:5000/api/projects/my-projects/${teacherId}`);
        const pending = res.data.filter(project => project.status === 'pending');
        setProjects(pending);
      } catch (err) {
        console.error('Error fetching pending projects:', err);
      }
    };

    fetchPendingProjects();
  }, []);

  return (
    <div>
      <h2>Pending Projects</h2>
      {projects.map(project => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PendingProjects;
