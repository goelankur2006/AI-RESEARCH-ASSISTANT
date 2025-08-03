import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const PendingProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId');
        const res = await axios.get(`http://localhost:5000/api/projects/teacher/${teacherId}`);
        const pending = res.data.filter(project => project.status === 'pending');
        setProjects(pending);
      } catch (err) {
        console.error('Error fetching pending projects:', err);
      }
    };

    fetchPendingProjects();
  }, []);

  return (
    <div className="pending-projects-container">
      <h2>Pending Projects</h2>
      {projects.length === 0 ? (
        <p>No pending projects found.</p>
      ) : (
        projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))
      )}
    </div>
  );
};

export default PendingProjects;
