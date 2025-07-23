import User from '../models/User.js';
import Project from '../models/Project.js';

export const getStats = async (req, res) => {
  const students = await User.countDocuments({ role: 'student' });
  const teachers = await User.countDocuments({ role: 'teacher' });
  const reviewers = await User.countDocuments({ role: 'reviewer' });
  const totalProjects = await Project.countDocuments();
  const recentContributions = await Project.find().sort({ _id: -1 }).limit(5);
  res.json({ students, teachers, reviewers, totalProjects, recentContributions });
};

export const addUser = async (req, res) => {
  const { email, password, role } = req.body;
  const user = new User({ email, password, role });
  await user.save();
  res.json({ message: "User added" });
};

export const approveProject = async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.json({ message: "Approved" });
};

export const rejectProject = async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, { status: 'rejected' });
  res.json({ message: "Rejected" });
};

export const getProjectsByStatus = async (req, res) => {
  const { status } = req.params;
  const projects = await Project.find({ status });
  res.json(projects);
};

