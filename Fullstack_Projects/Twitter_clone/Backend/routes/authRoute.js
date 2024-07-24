import { Router } from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";

const authRoute = Router();

authRoute.route("/me").get(protectedRoute , getMek)
authRoute.route("/signup").post(signup);
authRoute.route("/login").post(login);
authRoute.route("/logout").post(logout);

export default authRoute;