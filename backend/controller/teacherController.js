import Project from '../models/Project.js';

export const addProject = async (req, res) => {
  try {
    console.log("📥 Incoming Request Data:");
    console.log("Form fields:", req.body);
    console.log("Uploaded file:", req.file);

    const {
      title, domain, description, startDate, endDate,
      objectives, technologies, budget, guide
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
      status: 'Pending'
    });

    await newProject.save();

    console.log("✅ Project saved successfully!");
    res.status(201).json({ message: 'Project added successfully' });

  } catch (error) {
    console.error("❌ Error in addProject controller:", error); // 🔍 Logs the real error
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id, // depends on auth
      status: 'approved'
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};