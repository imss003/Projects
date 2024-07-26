import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";
import { deleteNotification, getNotification } from "../controllers/notifications.controller.js";

const notificationRoute = Router();
notificationRoute.route("/").get(protectedRoute, getNotification);
notificationRoute.route("/delete").delete(protectedRoute, deleteNotification);

export default notificationRoute;