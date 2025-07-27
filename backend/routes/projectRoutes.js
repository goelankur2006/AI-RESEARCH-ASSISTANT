import express from 'express';
import {
  getAllProjects,
  approveProject,
  rejectProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/projects', getAllProjects);
router.put('/projects/:id/approve', approveProject);
router.put('/projects/:id/reject', rejectProject);

export default router;
