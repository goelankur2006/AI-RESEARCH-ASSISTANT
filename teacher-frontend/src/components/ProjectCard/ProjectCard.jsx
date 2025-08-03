import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p><strong>Domain:</strong> {project.domain}</p>
      <p><strong>Status:</strong> {project.status}</p>

      {project.feedback && project.status === 'rejected' && (
        <p className="feedback">
          <strong>Admin Feedback:</strong> {project.feedback}
        </p>
      )}
    </div>
  );
};

export default ProjectCard;
