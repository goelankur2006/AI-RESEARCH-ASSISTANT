import React, { useState, useEffect } from 'react';
import './ApproveProjects.css';
import axios from 'axios';


const ApproveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending projects from API
  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');

      // Filter only pending projects
      const pendingProjects = res.data.filter(project => project.status === 'pending');

      setProjects(pendingProjects);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  // Approve a project
  const handleApprove = async (projectId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}/approve`, {
        method: 'PUT',
      });

      if (!res.ok) throw new Error("Approval failed");

      setProjects(prev => prev.filter(project => project._id !== projectId));
      alert('✅ Project approved!');
    } catch (err) {
      console.error("❌ Approve error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  // Reject a project with feedback
  const handleReject = async (projectId) => {
    const feedback = prompt("Enter rejection reason:");
    if (!feedback) return;

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (!res.ok) throw new Error("Rejection failed");

      setProjects(prev => prev.filter(project => project._id !== projectId));
      alert('❌ Project rejected!');
    } catch (err) {
      console.error("❌ Reject error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  // Loading or error states
  if (loading) return <p>Loading pending projects...</p>;
  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={fetchProjects}>Retry</button>
    </div>
  );

  // Render list
  return (
    <div className="approve-projects-content">
      <h2>Projects Awaiting Approval</h2>
      {projects.length === 0 ? (
        <p>No projects pending approval.</p>
      ) : (
        <div className="project-list-container">
          {projects.map(project => (
            <div className="project-card" key={project._id}>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="project-actions">
                <p>Employee ID: {project.submittedBy?.employeeId}</p>
                <a
                  href={`http://localhost:5000/api/projects/${project._id}/document`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="action-button download-button">Download Document</button>
                </a>
                <button
                  className="action-button approve-button"
                  onClick={() => handleApprove(project._id)}
                >
                  Approve
                </button>
                <button
                  className="action-button reject-button"
                  onClick={() => handleReject(project._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApproveProjects;
