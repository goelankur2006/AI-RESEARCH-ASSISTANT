import Project from '../models/Project.js';

// GET: Fetch all projects
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


export const viewProjectDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || !project.document) {
      return res.status(404).send("Document not found");
    }

    res.set({
      'Content-Type': 'application/pdf',  // change if file type varies
      'Content-Disposition': `inline; filename="${project.title || 'document'}.pdf"`,
    });

    res.send(project.document);
  } catch (err) {
    console.error("❌ Document display error:", err);
    res.status(500).send("Error displaying document");
  }
};




export const getProjectsByTeacherId = async (req, res) => {
  try {
    const projects = await Project.find({ submittedBy: req.params.teacherId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teacher projects' });
  }
};




