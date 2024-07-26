import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";
import { getUserProfile, followUnfollowUser, getSuggestedUsers, updateUserProfile } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.route("/profile/:username").get(protectedRoute, getUserProfile);
userRoute.route("/suggested").get(protectedRoute, getSuggestedUsers);
userRoute.route("/follow/:id").post(protectedRoute, followUnfollowUser);
userRoute.route("/update").post(protectedRoute, updateUserProfile);

export default userRoute ;