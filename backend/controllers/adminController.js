import Project from '../models/Project.js';
import bcrypt from 'bcrypt';
import Teacher from '../models/Teacher.js';

// GET all pending projects
export const getAllPendingProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'pending' });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching pending projects:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT update status (approve/reject)
export const updateProjectStatus = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body; // approved or rejected

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: 'Failed to update project status' });
  }
};


export const addTeacher = async (req, res) => {
  try {
    const { name, course, email, password } = req.body;

    if (!name || !course || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if teacher already exists
    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Teacher already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newTeacher = new Teacher({
      name,
      course,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Teacher added successfully", teacher: newTeacher });
  } catch (error) {
    console.error('Error in addTeacher:', error);
    res.status(500).json({ message: "Failed to add teacher" });
  }
};
