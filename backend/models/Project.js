import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  domain: String,
  description: String,
  startDate: Date,
  endDate: Date,
  objectives: String,
  technologies: String,
  budget: String,
  guide: String,
  document: Buffer,
  status: {
  type: String,
  enum: ['Pending', 'Approved', 'Rejected', 'Running', 'Completed'],
  default: 'Pending'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


export default mongoose.model("Project", projectSchema);
