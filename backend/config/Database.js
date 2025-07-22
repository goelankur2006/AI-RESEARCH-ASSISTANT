import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/researchDB').then(() => console.log('MongoDB connected'))}

export default connectDB