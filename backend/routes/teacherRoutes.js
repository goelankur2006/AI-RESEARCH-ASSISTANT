import express from 'express';
import { addProject } from '../controller/teacherController.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add-project', upload.single('document'), addProject);


export default router;
