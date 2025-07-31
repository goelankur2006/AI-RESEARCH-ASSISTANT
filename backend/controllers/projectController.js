import Project from '../models/Project.js';

// GET: Fetch all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // must connect to MongoDB
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

// PUT: Reject a project
export const rejectProject = async (req, res) => {
  try {
    const { feedback } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', feedback }, // ✅ Save feedback
      { new: true }
    );

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject project' });
  }
};


// GET: Fetch pending only
export const getPendingProjects = async (req, res) => {
  try {
    const pending = await Project.find({ status: 'pending' });
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending projects' });
  }
};

export const downloadProjectDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || !project.document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${project.title || 'document'}"`,
    });

    res.send(project.document);
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).json({ error: 'Failed to download file' });
  }
};

export const getProjectsByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const projects = await Project.find({ submittedBy: teacherId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher's projects" });
  }
};



import Project from '../models/Project.js';

// GET: Fetch all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // must connect to MongoDB
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

// PUT: Reject a project
export const rejectProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected',feedback: req.body.feedback || '' },
      { new: true }
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject project' });
  }
};

// GET: Fetch pending only
export const getPendingProjects = async (req, res) => {
  try {
    const pending = await Project.find({ status: 'pending' });
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending projects' });
  }
};

export const downloadProjectDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || !project.document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${project.title || 'document'}"`,
    });

    res.send(project.document);
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).json({ error: 'Failed to download file' });
  }
};

