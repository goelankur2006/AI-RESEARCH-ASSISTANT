import React, { useState, useEffect } from 'react';
import './ApproveProjects.css';

const ApproveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('http://localhost:5000/api/projects/pending');
      const data = await res.json();

      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleApprove = async (projectId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}/approve`, {
        method: 'PUT',
      });

      if (!res.ok) throw new Error("Failed to approve project");

      setProjects(prev => prev.filter(project => project._id !== projectId));
      alert('Project approved!');
    } catch (err) {
      console.error('Error approving project:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleReject = async (projectId) => {
    const feedback = prompt("Enter reason for rejection:");
    if (feedback === null) return; // Cancelled
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (!res.ok) throw new Error("Failed to reject project");

      setProjects(prev => prev.filter(project => project._id !== projectId));
      alert('Project rejected!');
    } catch (err) {
      console.error('Error rejecting project:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div className="approve-projects-content"><p>Loading projects...</p></div>;

  if (error) return (
    <div className="approve-projects-content error">
      <p>{error}</p>
      <button onClick={fetchProjects}>Retry</button>
    </div>
  );

  return (
    <div className="approve-projects-content">
      <h1 className="page-title">Approve Projects</h1>
      {projects.length === 0 ? (
        <p className="no-projects-message">No projects currently awaiting approval.</p>
      ) : (
        <div className="project-list-container">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-details">
                <h3 className="project-name">{project.title}</h3>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}
              </div>

              <div className="project-actions">
                <a
                  href={`http://localhost:5000/api/projects/${project._id}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="action-button download-button">
                    Download Document
                  </button>
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
