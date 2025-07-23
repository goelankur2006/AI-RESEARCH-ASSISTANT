import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  researcher: String,
  domain: String,
  description: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'running', 'completed'], default: 'pending' }
});

export default mongoose.model("Project", projectSchema);
