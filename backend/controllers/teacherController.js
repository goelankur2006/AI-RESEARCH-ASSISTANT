import Project from '../models/Project.js';

/**
 * POST /api/teachers/add-project
 */
export const addProject = async (req, res) => {
  try {
    console.log("📥 Incoming Request Data:");
    console.log("Form fields:", req.body);
    console.log("Uploaded file:", req.file);

    const {
      title,
      domain,
      description,
      startDate,
      endDate,
      objectives,
      technologies,
      budget,
      guide
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
      status: 'pending'
    }); 

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });

  } catch (error) {
    console.error("Error in addProject controller:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * POST /api/teachers/add
 */
export const addTeacher = (req, res) => {
  try {
    const { name, email, department } = req.body;

    // Later: Add Mongoose save logic here
    console.log("🧑‍🏫 New teacher data received:", { name, email, department });

    res.status(200).json({ message: "Teacher added successfully" });
  } catch (error) {
    console.error("❌ Error in addTeacher controller:", error);
    res.status(500).json({ error: "Failed to add teacher" });
  }
};

/**
 * GET /api/teachers/my-projects
 */
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id, // This requires authentication middleware
      status: 'approved'
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};
