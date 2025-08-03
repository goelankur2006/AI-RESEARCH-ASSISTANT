import mongoose from "mongoose";

const connectDB = async() => {
    await mongoose.connect(`${process.env.MONGODB_URL}/researchDB`)
            .then(()=>console.log("Connected"));
}


export default connectDB;
