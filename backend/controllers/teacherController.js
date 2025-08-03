import Project from '../models/Project.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const addProject = async (req, res) => {
  try {
    const {
      title,
      domain,
      description,
      startDate,
      endDate,
      objectives,
      technologies,
      budget,
      guide,
      teacherId
    } = req.body;

    console.log('Submitted by teacherId:', teacherId);

    if (!teacherId) {
      return res.status(400).json({ error: 'Missing teacherId in request' });
    }

    const newProject = new Project({
      title,
      domain,
      description,
      startDate,
      endDate,
      objectives,
      technologies,
      budget,
      guide,
      submittedBy: req.body.teacherId,
      status: 'pending'
    });

    if (req.file) {
      newProject.document = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname
      };
    }

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error in addProject controller:', error);
    res.status(500).json({ error: 'Server error in adding project', detail: error.message });
  }
};

export const getMyProjects = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const projects = await Project.find({ submittedBy: teacherId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teacher projects', error: err.message });
  }
};

export const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await User.findOne({ email, role: 'teacher' });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      name: teacher.name,
      teacherId: teacher._id
    });

  } catch (err) {
    res.status(500).json({ error: 'Login failed', detail: err.message });
  }
};
