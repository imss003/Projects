import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import {v2 as cloudinary} from "cloudinary"

const createPost = asyncHandler(async (req, res) => {
    try {
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                error: "User not found!"
            });
        }
        if(!text && !img){
            return res.status(400).json({
                error: "Post must have an image or a text"
            });
        }
        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }
        const newPost = new Post({
            user: userId,
            text,
            img
        })
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in creating post", error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
})

const deletePost = asyncHandler(async (req, res) => {
    try {
        const postId = req.params.id;
        console.log("id is: ", postId);
        const post = await Post.findById(postId);
        console.log("post is: ", post);
        if(!post){
            return res.status(404).json({
                error: "Post not found"
            });
        }
        if(post.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                error: "You are not authorized to delete this post"
            })
        }
        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleting the post", error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
})

const likeUnlikePost = asyncHandler(async(req, res) => {
    try {
        const postId = req.params.id;
        console.log("post ID is: ", postId);
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                error: "Post not found"
            });
        }
        const isLiked = post.likes.includes(userId);
        if(isLiked){
            //unlike the post
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({_id: userId}, { $pull: {likedPosts: postId}});
            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString()); //done to update the count of likes so that when we update the likes we dont have to refetch the posts everytime
            console.log("updated likes is: ", updatedLikes);
            res.status(200).json(updatedLikes);
        }
        else{
            //like the post
            post.likes.push(userId);
            await User.updateOne({_id: userId}, { $push: {likedPosts: postId}});
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like"
            });
            await notification.save();
            
            const updatedLikes = post.likes;
            console.log("updated likes is: ", updatedLikes);
            res.status(200).json(updatedLikes);
        }
    } catch (error) {
        console.log("Error in likeUnlike post", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
})

const comments = asyncHandler(async(req, res) => {
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        if(!text){
            return res.status(400).json({
                error: "Please enter a comment"
            });
        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                error: "Post not found"
            });
        }
        const comment = {user: userId, text};
        post.comments.push(comment);
        await post.save();
        res.status(200).json({
            message: "Comment added successfully"
        });
    } catch (error) {
        console.log("Error in comments", error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
})

const likedPosts = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                error: "User not found"
            });
        }
        const posts = await Post.find({user: userId})
        .sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password"
        });
        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error in likedPosts", error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
})

const getAllPosts = asyncHandler(async(req, res) => {
    try {
        const posts = await Post.find()
        .sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        })

        if(posts.length === 0){
            return res.status(200).json([]);
        }
        return res.status(200).json({
            posts
        })
    } catch (error) {
        console.log("Error in getAllPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
})

const getFollowingPosts = asyncHandler(async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const following = user.following;
        const posts = await Post.find({user: {$in: following}})
        .sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        })

        res.status(200).json({
            posts
        });
    } catch (error) {
        console.log("Error in getFollowingPosts", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

const getUsersPost = asyncHandler(async(req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        const posts = await Post.find({user: user._id})
        .sort({createdAt: -1})
        .populate({
            path: "user",
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        })
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getting users posts", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
})
export {
    createPost,
    deletePost, 
    likeUnlikePost,
    comments,
    getAllPosts,
    likedPosts,
    getFollowingPosts,
    getUsersPost,
}