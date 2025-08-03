// RejectedProjects.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RejectedProjects.css'; // Optional if you have styles

const RejectedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchRejectedProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/teacher/${teacherId}`);
        const rejectedProjects = res.data.filter(project => project.status === 'rejected');
        setProjects(rejectedProjects);
      } catch (err) {
        console.error('Error fetching rejected projects:', err);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchRejectedProjects();
    } else {
      console.warn('Teacher ID not found in localStorage');
      setLoading(false);
    }
  }, [teacherId]);

  if (loading) return <p>Loading rejected projects...</p>;

  return (
    <div className="rejected-projects-container">
      <h2>Rejected Projects</h2>

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
                <p className="feedback">
                  <strong>Admin Feedback:</strong> {project.feedback}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedProjects;
