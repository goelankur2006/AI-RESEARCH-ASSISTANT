import express from 'express';
import {
  getAllProjects,
  approveProject,
  rejectProject,
  getPendingProjects,
  viewProjectDocument,
  getProjectsByTeacherId
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/pending', getPendingProjects);
router.put('/:id/approve', approveProject);
router.put('/:id/reject', rejectProject);
router.get('/:id/document', viewProjectDocument);
router.get('/teacher/:teacherId', getProjectsByTeacherId);

export default router;
