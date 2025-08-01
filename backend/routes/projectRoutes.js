import express from 'express';
import {
  getAllProjects,
  approveProject,
  rejectProject,
  getPendingProjects,
  downloadProjectDocument
} from '../controllers/projectController.js';

const router = express.Router();


router.get('/projects', getAllProjects);
router.get('/projects/pending', getPendingProjects);
router.put('/projects/:id/approve', approveProject);
router.put('/projects/:id/reject', rejectProject);
router.get('/projects/:id/download', downloadProjectDocument); 


export default router;
