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

router.get('/projects', getAllProjects);
router.put('/projects/:id/approve', approveProject);
router.put('/projects/:id/reject', rejectProject);
router.get('/projects/:id/document', downloadProjectDocument);
router.get('/projects/pending', getPendingProjects);
router.get('/projects/teacher/:teacherId', getProjectsByTeacherId);



export default router;
