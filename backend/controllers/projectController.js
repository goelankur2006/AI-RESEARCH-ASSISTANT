import Project from '../models/Project.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: 'submittedBy',
      select: 'name employeeId',
      strictPopulate: false
    });

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

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


export const getPendingProjects = async (req, res) => {
  try {
    const pendingProjects = await Project.find({ status: 'pending' });
    res.status(200).json(pendingProjects);
  } catch (err) {
    console.error('Error fetching pending projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const viewProjectDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || !project.document || !project.document.data) {
      return res.status(404).send("Document not found");
    }

    res.set({
      'Content-Type': project.document.contentType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${project.document.originalName || 'document'}"`,
    });

    res.send(project.document.data);
  } catch (err) {
    console.error("Document display error:", err);
    res.status(500).send("Error displaying document");
  }
};

export const getProjectsByTeacherId = async (req, res) => {
  const projects = await Project.find({ submittedBy: req.params.teacherId });
  try {
    const projects = await Project.find({ submittedBy: req.params.teacherId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teacher projects' });
  }
};
