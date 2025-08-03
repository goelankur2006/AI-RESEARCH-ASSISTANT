import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  employeeId: String,
  role: { type: String, default: 'teacher' }
}, { timestamps: true });

const TeacherId = mongoose.model('Teacher', teacherSchema);

export default TeacherId;
