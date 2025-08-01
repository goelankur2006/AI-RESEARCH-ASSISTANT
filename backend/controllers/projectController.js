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
    const pendingProjects = await Project.find({ status: 'pending' });
    res.json(pendingProjects);
  } catch (err) {
    console.error('Error fetching pending projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const downloadProjectDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || !project.document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.set({
      'Content-Type': 'application/pdf', // ✅ Explicitly PDF
      'Content-Disposition': `inline; filename="${project.title || 'document'}.pdf"`,
    });

    const buffer = Buffer.isBuffer(project.document)
      ? project.document
      : Buffer.from(project.document);

    res.send(buffer);
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).json({ error: 'Failed to download file' });
  }
};


export const getProjectsByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const projects = await Project.find({ submittedBy: teacherId }).populate('submittedBy');

    const grouped = {
      approved: [],
      rejected: [],
      pending: []
    };

    projects.forEach(p => {
      if (p.status === 'approved') grouped.approved.push(p);
      else if (p.status === 'rejected') grouped.rejected.push(p);
      else grouped.pending.push(p);
    });

    res.status(200).json(grouped);
  } catch (err) {
    console.error("Error fetching teacher projects:", err);
    res.status(500).json({ error: 'Failed to fetch teacher projects' });
  }
};



