import express from 'express';
import {
  getAllProjects,
  approveProject,
  rejectProject,
  getPendingProjects,
  viewProjectDocument
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects); // ✅ This is what your frontend calls
router.get('/pending', getPendingProjects);
router.put('/:id/approve', approveProject);
router.put('/:id/reject', rejectProject);
router.get('/:id/document', viewProjectDocument);

export default router;
