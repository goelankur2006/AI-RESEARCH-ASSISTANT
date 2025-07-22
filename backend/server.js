import express from 'express';
import connectDB from './config/Database.js';

const app= express();
const port=5000;
connectDB()

app.get("/", (req, res) => {
    res.send("API working");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

