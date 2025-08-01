import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyResearches = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/projects/teacher/${teacherId}`);
        const approvedProjects = res.data.filter(project => project.status === "approved");
        setProjects(approvedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchProjects();
    } else {
      setError("Teacher ID not found. Please login again.");
      setLoading(false);
    }
  }, [teacherId]);

  return (
    <div>
      <h2>Approved Research Projects</h2>
      {projects.length === 0 ? (
        <p>No approved projects yet.</p>
      ) : (
        projects.map(project => (
          <div key={project._id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyResearches;
