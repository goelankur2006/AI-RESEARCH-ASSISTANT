import express from 'express';
import {
  getAllPapers,
  getPaperById,
  createPaper,
} from '../controllers/PaperController.js';

const router = express.Router();

router.get('/', getAllPapers);   
router.get('/:id', getPaperById);  
router.post('/', createPaper);    

export default router;
