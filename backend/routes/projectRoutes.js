import express from 'express';
import {
  getAllProjects,
  approveProject,
  rejectProject,
  getPendingProjects,
<<<<<<< HEAD
  viewProjectDocument
=======
  downloadProjectDocument,
  getProjectsByTeacherId
>>>>>>> 7930d21ce7eed22aad3c64023d9190ac231890dd
} from '../controllers/projectController.js';

import Project from '../models/Project.js'; 

const router = express.Router();

<<<<<<< HEAD
router.get('/', getAllProjects); // ✅ This is what your frontend calls
router.get('/pending', getPendingProjects);
router.put('/:id/approve', approveProject);
router.put('/:id/reject', rejectProject);
router.get('/:id/document', viewProjectDocument);
=======
router.get('/', getAllProjects);
router.get('/pending', getPendingProjects);
router.put('/:id/approve', approveProject);
router.put('/:id/reject', rejectProject);
router.get('/:id/download', downloadProjectDocument);
router.get('/:teacherId', getProjectsByTeacherId);


>>>>>>> 7930d21ce7eed22aad3c64023d9190ac231890dd

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
