import React, { useState, useEffect } from 'react';
import './ApproveProjects.css'; 

const ApproveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const mockProjects = [
          { id: 'proj001', name: 'Project 1', description: 'Study researchers domain descriptions' },
          { id: 'proj002', name: 'Project 2', description: 'Description for project 2' },
          { id: 'proj003', name: 'Project 3', description: 'Description for project 3' },
          { id: 'proj004', name: 'Project 4', description: 'Description for project 4' },
        ];
        await new Promise(resolve => setTimeout(resolve, 500)); 
        setProjects(mockProjects);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleApprove = async (projectId) => {
    console.log(`Approving project with ID: ${projectId}`);
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); 
      setProjects(prev => prev.filter(project => project.id !== projectId));
      console.log(`Project ${projectId} approved successfully!`);
    } catch (err) {
      console.error('Error approving project:', err);
      alert(`Error approving project ${projectId}: ${err.message}`);
    }
  };

  const handleReject = async (projectId) => {
    console.log(`Rejecting project with ID: ${projectId}`);
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); 
      setProjects(prev => prev.filter(project => project.id !== projectId));
      console.log(`Project ${projectId} rejected successfully!`);
    } catch (err) {
      console.error('Error rejecting project:', err);
      alert(`Error rejecting project ${projectId}: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="approve-projects-content"><p>Loading projects...</p></div>;
  }

  if (error) {
    return (
      <div className="approve-projects-content error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="approve-projects-content">
      <h1 className="page-title">Approve Projects</h1>
      {projects.length === 0 ? (
        <p className="no-projects-message">No projects currently awaiting approval.</p>
      ) : (
        <div className="project-list-container">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-details">
                <h3 className="project-name">{project.name}</h3>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}
              </div>
              <div className="project-actions">
                <button
                  className="action-button approve-button"
                  onClick={() => handleApprove(project.id)}
                >
                  Approve
                </button>
                <button
                  className="action-button reject-button"
                  onClick={() => handleReject(project.id)}
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
