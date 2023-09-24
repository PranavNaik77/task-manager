import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './AuthRoute.js';
const app = express()

dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("mongodb connected");
    }
    catch (error){
        throw error;
    }
};

app.use(express.json());

app.use("/api/auth", authRoute);

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
})

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    });
})

app.listen(8800, () => {
    connect();
    console.log("Connected to backend");
})