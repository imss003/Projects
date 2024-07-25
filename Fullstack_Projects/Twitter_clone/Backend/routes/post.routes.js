import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";
import { comments, createPost, deletePost, getAllPosts, getFollowingPosts, getUsersPost, likedPosts, likeUnlikePost } from "../controllers/post.controller.js";

const postRoutes = Router();

postRoutes.route("/following").get(protectedRoute, getFollowingPosts);
postRoutes.route("/posts").get(protectedRoute, getUsersPost);
postRoutes.route("/all").get(protectedRoute, getAllPosts);
postRoutes.route("/liked/:id").get(protectedRoute, likedPosts);
postRoutes.route("/create").post(protectedRoute, createPost);
postRoutes.route("/:id").delete(protectedRoute, deletePost);
postRoutes.route("/like/:id").post(protectedRoute, likeUnlikePost);
postRoutes.route("/comment/:id").post(protectedRoute, comments);

export default postRoutes;