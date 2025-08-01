import express from 'express';
import {
  getAllProjects,
  approveProject,
  rejectProject,
  downloadProjectDocument,
  getPendingProjects,
  getProjectsByTeacherId
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.put('/:id/approve', approveProject);
router.put('/:id/reject', rejectProject);
router.get('/:id/document', downloadProjectDocument);
router.get('/pending', getPendingProjects);
router.get('/teacher/:teacherId', getProjectsByTeacherId);



export default router;
