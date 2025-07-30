import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyResearches = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/teacher/my-projects').then(res => {
      const approved = res.data.filter(p => p.status === "approved");
      setProjects(res.data);
    });
  }, []);

  return (
    <div>
      <h2>My Research Projects</h2>
      {projects.map(p => (
        <div key={p._id}>{p.title}</div>
      ))}
    </div>
  );
};

export default MyResearches;
