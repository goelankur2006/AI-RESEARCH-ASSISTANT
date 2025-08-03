import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './ApprovedProjects.css';

const ApprovedProjects = () => {
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedProjects = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId');
        if (!teacherId) {
          console.error('Teacher ID not found in localStorage');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/projects/teacher/${teacherId}`);
        const approved = response.data.filter(project => project.status === 'approved');
        setApprovedProjects(approved);
      } catch (error) {
        console.error('Error fetching approved projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProjects();
  }, []);

  if (loading) return <p>Loading approved projects...</p>;

  return (
    <div className="approved-projects-container">
      <h2>Approved Projects</h2>
      {approvedProjects.length === 0 ? (
        <p>No approved projects found.</p>
      ) : (
        approvedProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))
      )}
    </div>
  );
};

export default ApprovedProjects;
