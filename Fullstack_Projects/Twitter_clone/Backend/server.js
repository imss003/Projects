import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //used to parse the form data(url encoded)
app.use(cookieParser());//used to parse the req so we could get the cookies

app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})