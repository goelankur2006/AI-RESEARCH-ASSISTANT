// ProjectController.js
import Project from '../models/Project.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * POST /api/teacher/add-project
 */
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

    // Check teacherId present
    if (!teacherId) {
      return res.status(400).json({ message: 'Missing teacherId' });
    }

    // Prepare project object
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
      submittedBy: teacherId,
      status: 'pending',
      document: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            originalName: req.file.originalname
          }
        : undefined
    });

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error("Error in addProject controller:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * GET /api/teacher/my-projects/:teacherId
 */
export const getMyProjects = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const projects = await Project.find({ submittedBy: teacherId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teacher projects', error: err.message });
  }
};

/**
 * POST /api/teacher/login
 */
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
