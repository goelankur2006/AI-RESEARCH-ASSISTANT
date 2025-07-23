import Paper from '../models/Paper.js';

export const getAllPapers = async (req, res) => {
  const { category } = req.query;

  try {
    const papers = category && category !== 'All'
      ? await Paper.find({ category })
      : await Paper.find();
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPaperById = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (paper) res.json(paper);
    else res.status(404).json({ message: 'Paper not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPaper = async (req, res) => {
  const { title, category, description, tags } = req.body;

  try {
    const newPaper = new Paper({ title, category, description, tags });
    const savedPaper = await newPaper.save();
    res.status(201).json(savedPaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
