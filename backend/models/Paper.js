import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
});

const Paper = mongoose.model('Paper', paperSchema);
export default Paper;
