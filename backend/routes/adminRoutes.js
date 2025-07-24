import express from 'express';
import { getAllPendingProjects, updateProjectStatus } from '../controller/adminController.js';

const router = express.Router();

router.get('/pending-projects', getAllPendingProjects);
router.put('/update-project-status/:projectId', updateProjectStatus);

export default router;
