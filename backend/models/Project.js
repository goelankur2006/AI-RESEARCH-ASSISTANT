import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: String,
  description: String,
  startDate: Date,
  endDate: Date,
  objectives: String,
  technologies: String,
  budget: String,
  guide: String,
  document: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'running', 'completed'],
    default: 'pending'
  },
  submittedBy: { type: String },  // employeeId instead of ObjectId
  feedback: String                // Add feedback field if needed
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
