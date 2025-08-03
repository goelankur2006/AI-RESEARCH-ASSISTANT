// ApproveProjects.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApproveProjects.css';

const ApproveProjects = () => {
  const [grouped, setGrouped] = useState({
    pending: [],
    approved: [],
    rejected: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch projects from API
  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects/pending');
      const groupedData = {
        pending: [],
        approved: [],
        rejected: []
      };

      res.data.forEach(project => {
        if (project.status === 'pending') groupedData.pending.push(project);
        else if (project.status === 'approved') groupedData.approved.push(project);
        else if (project.status === 'rejected') groupedData.rejected.push(project);
      });

      setGrouped(groupedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects.');
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

      if (!res.ok) throw new Error('Approval failed');

      alert('✅ Project approved!');
      fetchProjects(); // Refresh
    } catch (err) {
      console.error('❌ Approve error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleReject = async (projectId) => {
    const feedback = prompt('Enter rejection reason:');
    if (!feedback) return;

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (!res.ok) throw new Error('Rejection failed');

      alert('❌ Project rejected!');
      fetchProjects(); // Refresh
    } catch (err) {
      console.error('❌ Reject error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Loading pending projects...</p>;

  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchProjects}>Retry</button>
      </div>
    );

  return (
    <div className="approve-projects-content">
      <h2>Projects Awaiting Approval</h2>

      {grouped.pending.length === 0 ? (
        <p>No projects pending approval.</p>
      ) : (
        <div className="project-list-container">
          {grouped.pending.map(project => (
            <div className="project-card" key={project._id}>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <div className="project-actions">
                {/* ✅ View Document only (no download) */}
                <a
                  href={`http://localhost:5000/api/projects/${project._id}/document`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="action-button download-button">View Project Document</button>
                </a>

                {/* Approve Button */}
                <button
                  className="action-button approve-button"
                  onClick={() => handleApprove(project._id)}
                >
                  Approve
                </button>

                {/* Reject Button */}
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
