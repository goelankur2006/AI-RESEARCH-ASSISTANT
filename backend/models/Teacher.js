import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },  // ✅ Add this
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
