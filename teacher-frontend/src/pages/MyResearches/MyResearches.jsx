import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyResearches = () => {
  const [projects, setProjects] = useState([]);
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/teacher/${teacherId}`);
        const approved = res.data.filter(p => p.status === "approved");
        setProjects(approved);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    if (teacherId) {
      fetchProjects();
    }
  }, [teacherId]);

  return (
    <div>
      <h2>Approved Research Projects</h2>
      {projects.length === 0 ? (
        <p>No approved projects yet.</p>
      ) : (
        projects.map(p => (
          <div key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyResearches;
