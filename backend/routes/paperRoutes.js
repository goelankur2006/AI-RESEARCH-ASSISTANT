import express from 'express';
import {
  getAllPapers,
  getPaperById,
  createPaper,
} from '../controllers/PaperController.js';

const router = express.Router();

router.get('/', getAllPapers);       // GET /api/papers
router.get('/:id', getPaperById);    // GET /api/papers/:id
router.post('/', createPaper);       // POST /api/papers

export default router;
