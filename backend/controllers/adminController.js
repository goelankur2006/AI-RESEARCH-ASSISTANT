import Project from '../models/Project.js';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

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


export const addUser = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ 
      name,
      email, 
      password: hashedPassword, 
      role: role || "teacher" 
    });
    
    await user.save();

    res.json({ message: "User added successfully!" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Failed to add user" });
  }
};