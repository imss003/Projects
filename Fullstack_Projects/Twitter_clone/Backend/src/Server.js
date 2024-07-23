import dotenv from "dotenv"
import express from "express"
import authRoutes from "./Routes/auth.routes.js"
import connectDB from "./db/index.js";
dotenv.config();

const app = express();
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port", process.env.PORT || 8000);
    connectDB();
});