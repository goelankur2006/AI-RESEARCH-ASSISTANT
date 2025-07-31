import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGO_URI = 'mongodb://127.0.0.1:27017/researchDB'; // update if different

const addTeacher = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB ✅");

    const hashed = await bcrypt.hash('mypassword123', 10);

    await mongoose.connection.collection('users').insertOne({
      name: "New Teacher",
      email: "teacher@test.com",
      password: hashed,
      role: "teacher"
    });

    console.log("Teacher added successfully 🎉");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

addTeacher();
