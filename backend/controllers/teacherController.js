import Project from '../models/Project.js';
import Teacher from '../models/Teacher.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * POST /api/teachers/add-project
 */
export const addProject = async (req, res) => {
  try {
    console.log("📥 Incoming Request Data:");
    console.log("Form fields:", req.body);
    console.log("Uploaded file:", req.file);

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

    const document = req.file ? req.file.buffer : null;

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
      document,
      submittedBy: teacherId,
      status: 'pending'
    }); 

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });

  } catch (error) {
    console.error("Error in addProject controller:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * GET /api/teachers/my-projects
 */
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id, // This requires authentication middleware
      status: 'approved'
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};


export const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔐 Login attempt:", email);

    const teacher = await User.findOne({ email, role: 'teacher' });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, name: teacher.name, teacherId: teacher._id });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: 'Login failed', detail: err.message });
  }
};