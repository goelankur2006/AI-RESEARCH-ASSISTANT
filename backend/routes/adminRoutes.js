import express from 'express';
import {
  getAllPendingProjects,
  updateProjectStatus,
  addUser,
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/pending-projects', getAllPendingProjects);
router.put('/update-project-status/:projectId', updateProjectStatus);
router.post('/teachers/add', addUser); 

export default router;

