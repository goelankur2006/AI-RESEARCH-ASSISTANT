import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProjects = ({ teacherId }) => {
  const [projects, setProjects] = useState({
    approved: [],
    rejected: [],
    pending: []
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`/api/projects/teacher/${teacherId}`)
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching teacher projects:", err);
      }
    };

    fetchProjects();
  }, [teacherId]);

  return (
    <div>
      <h2>My Projects</h2>

      <h3>Pending</h3>
      {projects.pending.map(p => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <p>{p.description}</p>
        </div>
      ))}

      <h3>Approved</h3>
      {projects.approved.map(p => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <p>{p.description}</p>
        </div>
      ))}

      <h3>Rejected</h3>
      {projects.rejected.map(p => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <p>{p.description}</p>
          <p><strong>Feedback:</strong> {p.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default MyProjects;
