import express from 'express';
<<<<<<< HEAD
=======
import { addProject, loginTeacher, getMyProjects } from '../controllers/teacherController.js';
>>>>>>> 7930d21ce7eed22aad3c64023d9190ac231890dd
import multer from 'multer';
import { addProject, getMyProjects, loginTeacher } from '../controllers/teacherController.js';

const router = express.Router();
const upload = multer(); // for parsing multipart/form-data

router.post('/add-project', upload.single('document'), addProject);
router.get('/my-projects/:teacherId', getMyProjects);
router.post('/login', loginTeacher);

export default router;
