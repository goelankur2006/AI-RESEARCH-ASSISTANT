import Project from '../models/Project.js';
import mime from 'mime-types'; // npm install mime-types

// GET: All projects (admin)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('submittedBy', 'name employeeId');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// PUT: Approve a project
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

// PUT: Reject a project with feedback
export const rejectProject = async (req, res) => {
  try {
    const { feedback } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', feedback },
      { new: true }
    );

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject project' });
  }
};

// GET: Pending projects only
export const getPendingProjects = async (req, res) => {
  try {
    const pendingProjects = await Project.find({ status: 'pending' });
    res.status(200).json(pendingProjects);
  } catch (err) {
    console.error('Error fetching pending projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET: View document inline (PDF view)
export const viewProjectDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.document || !project.document.data) {
      return res.status(404).send("Document not found");
    }

    const mimeType = project.document.contentType || 'application/pdf';
    const originalName = project.document.originalName || 'document.pdf';

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${originalName}"`,
    });

    res.send(project.document.data);
  } catch (err) {
    console.error("❌ Document view error:", err);
    res.status(500).send("Error displaying document");
  }
};

// GET: All projects submitted by a teacher
export const getProjectsByTeacherId = async (req, res) => {
  try {
    const projects = await Project.find({ submittedBy: req.params.teacherId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teacher projects' });
  }
};
