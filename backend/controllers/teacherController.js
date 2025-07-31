import Project from '../models/Project.js';
import Teacher from '../models/Teacher.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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
      guide
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
 * POST /api/teachers/add
 */

export const addTeacher = async (req, res) => {
  try {
    const { name, course, email, password } = req.body;

    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Teacher with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 🔐 hash it before saving

    const newTeacher = new Teacher({
      name,
      course,           // or department, depending on your schema
      email,
      password: hashedPassword,
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error("Error in addTeacher:", error);
    res.status(500).json({ message: 'Server error while registering teacher' });
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

    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, name: teacher.name });
  } catch (err) {
    console.error("❌ Login error:", err); // <-- log full error stack
    res.status(500).json({ error: 'Login failed', detail: err.message });
  }
};
