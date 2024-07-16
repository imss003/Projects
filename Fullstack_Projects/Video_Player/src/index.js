import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express"

const app = express();
dotenv.config({
    path:"./env"
})
connectDB()
.then(() => {
    app.on('error', (err) => {
        console.log("Server connection FAILED", err)
    })
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is listening at port: ${process.env.PORT}`);
    })
})
.catch(err => console.log(`MongoDB connection FAILED`, err))

