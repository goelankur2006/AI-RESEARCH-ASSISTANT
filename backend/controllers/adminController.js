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
    const { name, email, password, role } = req.body;

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.json({ message: "User added successfully", user });
  } catch (err) {
    console.error("Add user error:", err);
    res.status(500).json({ error: "Failed to add user", detail: err.message });
  }
};