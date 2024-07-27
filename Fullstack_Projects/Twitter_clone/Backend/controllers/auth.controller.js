import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateTokenAndSetCookie } from "../utils/generatingToken.js";

const signup = asyncHandler(async (req, res) => {
    console.log("req is: ", req.body);
    const {fullName, username, email, password} = req.body;
    console.log("fullName is: ", fullName);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    if(!username || !email){
        return res.status(400).json({message: "username and email are required"});
    }
    const existingUsername = await User.findOne({username});
    if(existingUsername){
        return res.status(400).json({error: "username already exists."});
    }
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        return res.status(400).json({error: "email already exists."});
    }
    if(password.length < 6){
        return res.status(400).json({error: "Password must be atleast of 6 characters"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({fullName, username, email, password: hashedPassword});
    if(user){
        generateTokenAndSetCookie(user._id, res);
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        });
    }
    else{
        res.status(400).json({error: "Invalid user data"})
    }
})

const login = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const validPassword = await bcrypt.compare(password, user?.password || "");
    if(!user || !validPassword){
        return res.status(400).json({error: "Invalid username or password"});
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg
    });
})

const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {maxAge: 0});//This line sets a cookie named jwt with an empty string as its value and a maxAge of 0. Setting maxAge to 0 effectively deletes the cookie by instructing the browser to expire it immediately. This is a common technique for logging out a user by removing the JWT (JSON Web Token) that might have been used for authentication.
    res.status(200).json({message: "Logged out successfully"});
})

const getMe = asyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error is in getme controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
})

export {
    signup,
    login,
    logout,
    getMe
}