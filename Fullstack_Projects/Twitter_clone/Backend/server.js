import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import {v2 as cloudinary} from "cloudinary"
import postRoutes from "./routes/post.routes.js";
import notificationRoute from "./routes/notification.route.js";

dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //used to parse the form data(url encoded)
app.use(cookieParser());//used to parse the req so we could get the cookies

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoute);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})