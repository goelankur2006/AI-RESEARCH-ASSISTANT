import Project from '../models/Project.js';

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

// ✅ POST add teacher
export const addTeacher = async (req, res) => {
  try {
    const { name, email, subject } = req.body;

    // You should ideally save this to the database:
    // await Teacher.create({ name, email, subject });

    console.log("Received Teacher:", { name, email, subject });

    res.status(200).json({ message: "Teacher added successfully!" });
  } catch (error) {
    console.error('Error in addTeacher:', error);
    res.status(500).json({ error: "Failed to add teacher" });
  }
};

