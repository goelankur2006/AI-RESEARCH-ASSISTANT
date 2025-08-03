import express from 'express';
import multer from 'multer';
import { addProject, getMyProjects, loginTeacher } from '../controllers/teacherController.js';

const router = express.Router();
const upload = multer(); // Used to handle document upload

// Add new project (teacher)
router.post('/add-project', upload.single('document'), addProject);

// Get all projects submitted by a teacher
router.get('/:teacherId', getMyProjects);

// Teacher login
router.post('/login', loginTeacher);

export default router;
