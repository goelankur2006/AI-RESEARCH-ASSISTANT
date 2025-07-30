import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PendingProjects.css';

const PendingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacherId = localStorage.getItem('teacherId'); // Replace with actual login data

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        const pending = res.data.filter(
          proj => proj.status === 'pending' && proj.teacherId === teacherId
        );
        setProjects(pending);
      } catch (err) {
        console.error('Error fetching pending projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingProjects();
  }, [teacherId]);

  if (loading) return <p>Loading pending projects...</p>;

  return (
    <div className="pending-projects-container">
      <h2>Pending Research Projects</h2>
      {projects.length === 0 ? (
        <p>No pending projects found.</p>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
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

export default PendingProjects;
