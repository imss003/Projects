import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Notification } from "../models/notification.model.js";
import {v2 as cloudinary} from "cloudinary"
import bcrypt from "bcrypt"

const getUserProfile = asyncHandler(async(req, res) => {
    const {username} = req.params;
    console.log("username is: ", username);
    try {
        const user = await User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("error in getting user profile");
        res.status(500).json({
            error: "Internal server error"
        });
    }
})

const followUnfollowUser = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params; //this will be of type string
        console.log("id is: ", id);
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id); //we added user in request
        console.log("id is: ", id);
        console.log("req.user._id is: ", req.user._id);
        if(id === req.user._id.toString()){ //here req.user._id is of type object, so we need to convert it to string to compare it
            return res.status(400).json({
                error: "You can't follow/unfollow yourself"
            });
        }
        if(!currentUser || !userToModify){
            return res.status(404).json({
                error: "User not found"
            });
        }
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            //unfollow the user
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}});
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}});
            res.status(200).json({
                message: "User unfollowed successfully"
            });
        }
        else{
            //follow the user
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}});//update tje followers array of the user that is being followed
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}}); //update the following of the current user since it followed another user

            //send notification
            const newNotification = new Notification({
                type: 'follow',
                from: currentUser._id,
                to: userToModify._id
            })
            await newNotification.save();

            res.status(200).json({
                message: "User followed successfully"
            });

            
        }


    } catch (error) {
        console.log("Error in followUnfollowUSer", error.message);
        res.status(500).json({
            error: "Internal server error"
        })
    }
})

const getSuggestedUsers = asyncHandler(async(req, res) => {
    try {
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select("following");
        const users = await User.aggregate([
            {
                $match: {
                    _id: {$ne: userId}
                }
            },
            {
                $sample: {size:10}
            }
        ]);
        const filteredUsers = users.filter((u) => !usersFollowedByMe.following.includes(u._id));
        const suggestedUSers = filteredUsers.slice(0, 4);
        suggestedUSers.forEach((u) => u.password = null);
        res.status(200).json(suggestedUSers);
    } catch (error) {
        console.log("Error in suggested users", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
})

const updateUserProfile = asyncHandler(async(req, res) => {
    const {fullName, email, username, currentPassword, newPassword, bio, link} = req.body;
    let { profileImg, coverImg } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).json({
                error: "Provide both current and new password"
            })
        }
        
        if(newPassword && currentPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                return res.status(400).json({
                    error: "Current password is incorrect"
                });
            }
            if(newPassword.length < 6){
                return res.status(400).json({
                    error: "Password must be atleast 6 characters long"
                });
            }
            if(newPassword === currentPassword){
                return res.status(400).json({
                    error: "New password cannot be same as current password"
                })
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]); //this whole operation is done to get the id of the image from the url provided in the coverimg in database.
            }
            const uploadResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadResponse.secure_url;
        }
        
        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]); //this whole operation is done to get the id of the image from the url provided in the profileImg in database.
            }
            const uploadRespnse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadRespnse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        await user.save();
        user.password = null; //password should be null while sending response. this will not change the password field in database because we didnt do user.save after this operation.
        return res.status(200).json({
            message: "User updated successfully"
        })

    } catch (error) {
        console.log("Error in updated user", error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
})
export {
    getUserProfile, 
    followUnfollowUser,
    getSuggestedUsers,
    updateUserProfile
}