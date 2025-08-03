import express from 'express';
import {
  getAllProjects,
  approveProject,
  rejectProject,
  getPendingProjects,
  downloadProjectDocument,
  getProjectsByTeacherId
} from '../controllers/projectController.js';

import Project from '../models/Project.js'; 

const router = express.Router();

router.get('/', getAllProjects);
router.get('/pending', getPendingProjects);
router.put('/:id/approve', approveProject);
router.put('/:id/reject', rejectProject);
router.get('/:id/download', downloadProjectDocument);
router.get('/:teacherId', getProjectsByTeacherId);



router.get('/teacher/:teacherId', async (req, res) => {
  try {
    const projects = await Project.find({ submittedBy: req.params.teacherId });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching teacher projects:', error);
    res.status(500).json({ message: 'Server error while fetching teacher projects' });
  }
});

export default router;
