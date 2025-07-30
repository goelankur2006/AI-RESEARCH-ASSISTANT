import Project from '../models/Project.js';

// ✅ GET: Fetch all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // ← must connect to MongoDB
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// ✅ PUT: Approve a project
export const approveProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve project' });
  }
};

// ✅ PUT: Reject a project
export const rejectProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject project' });
  }
};
