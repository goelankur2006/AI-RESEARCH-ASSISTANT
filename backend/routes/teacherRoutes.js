import express from 'express';
import { addProject,addTeacher } from '../controllers/teacherController.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add-project', upload.single('document'), addProject);

router.post('/add', addTeacher);

export default router;
