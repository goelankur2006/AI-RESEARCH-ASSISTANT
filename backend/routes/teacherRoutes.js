import express from 'express';
import multer from 'multer';
import { addProject, getMyProjects, loginTeacher } from '../controllers/teacherController.js';

const router = express.Router();
const upload = multer(); // for parsing multipart/form-data

router.post('/add-project', upload.single('document'), addProject);
router.get('/my-projects/:teacherId', getMyProjects);
router.post('/login', loginTeacher);

export default router;
