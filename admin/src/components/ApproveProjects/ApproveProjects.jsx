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
      const res = await axios.get('/api/projects'); // Vite proxy handles localhost
      const grouped = {
        running: [],
        completed: [],
        rejected: []
      };

      res.data.forEach(project => {
        if (project.status === 'approved') grouped.completed.push(project);
        else if (project.status === 'rejected') grouped.rejected.push(project);
        else grouped.running.push(project);
      });

      setProjects(grouped);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
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

      if (!res.ok) throw new Error("Approval failed");

      setProjects(prev => ({
        ...prev,
        running: prev.running.filter(p => p._id !== projectId)
      }));

      alert('✅ Project approved!');
    } catch (err) {
      console.error("❌ Approve error:", err);
      alert(`Error: ${err.message}`);
    }
  };

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

      setProjects(prev => ({
        ...prev,
        running: prev.running.filter(p => p._id !== projectId)
      }));

      alert('❌ Project rejected!');
    } catch (err) {
      console.error("❌ Reject error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  // ✅ Download document using blob
  const handleDownload = async (projectId, title) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/download`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalname);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("❌ Download error:", err);
      alert("Failed to download document");
    }
  };

  if (loading) return <p>Loading pending projects...</p>;

  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={fetchProjects}>Retry</button>
    </div>
  );

  return (
    <div className="approve-projects-content">
      <h2>Projects Awaiting Approval</h2>
      {projects.running.length === 0 ? (
        <p>No projects pending approval.</p>
      ) : (
        <div className="project-list-container">
          {projects.running.map(project => (
            <div className="project-card" key={project._id}>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="project-actions">
                <button
                  className="action-button download-button"
                  onClick={() => handleDownload(project._id)}>
                  Download Document
                </button>

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
