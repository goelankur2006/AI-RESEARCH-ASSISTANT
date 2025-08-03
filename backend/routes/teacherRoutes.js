import express from 'express';
import { addProject, loginTeacher, getMyProjects } from '../controllers/teacherController.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add-project', upload.single('document'), addProject);



router.post('/login', loginTeacher);

export default router;
