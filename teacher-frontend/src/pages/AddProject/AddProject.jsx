import React, { useState } from 'react';
import axios from 'axios';
import './AddProject.css';

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    description: '',
    startDate: '',
    endDate: '',
    objectives: '',
    employeeId: '',
    technologies: '',
    budget: '',
    guide: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teacherId = localStorage.getItem('teacherId'); 

      const projectData = new FormData();
      for (let key in formData) {
        projectData.append(key, formData[key]);
      }

      projectData.append('submittedBy', teacherId); 

      await axios.post('http://localhost:5000/api/teacher/add-project', projectData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Project submitted successfully!');
    } catch (error) {
      alert('Error submitting project.');
      console.error(error);
    }
  };

  return (
    <div className="add-project-container">
      <h2>Add New Research Project</h2>
      <form onSubmit={handleSubmit} className="add-project-form">
        <input type="text" name="title" placeholder="Project Title" required onChange={handleChange} />
        <input type="text" name="domain" placeholder="Research Domain" required onChange={handleChange} />
        <textarea name="description" placeholder="Project Description" required onChange={handleChange}></textarea>
        <input type="date" name="startDate" placeholder="Expected Start Date" required onChange={handleChange} />
        <input type="date" name="endDate" placeholder="Expected End Date" required onChange={handleChange} />
        <textarea name="objectives" placeholder="Research Objectives" required onChange={handleChange}></textarea>
        <input type="text" name="technologies" placeholder="Tools/Technologies Used" required onChange={handleChange} />
        <input type="text" name="budget" placeholder="Estimated Budget (Optional)" onChange={handleChange} />
        <input type="text" name="guide" placeholder="Project Guide Name" required onChange={handleChange} />
        <input type="file" name="document" onChange={handleChange} />

        <button type="submit">Submit Project</button>
      </form>
    </div>
  );
};

export default AddProject;
