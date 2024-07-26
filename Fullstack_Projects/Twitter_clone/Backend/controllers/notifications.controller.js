import asyncHandler from "../utils/asyncHandler.js";
import { Notification } from "../models/notification.model.js";

const getNotification = asyncHandler(async(req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({to: userId}).sort({createdAt: -1})
        .populate({
            path: "from",
            select: "profileImg username"
        });
        await Notification.updateMany({to: userId}, {read: true});
        res.status(200).json(notifications)
    } catch (error) {
        console.log("Error in get notifications controller", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

const deleteNotification = asyncHandler(async(req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({to: userId});
        res.status(200).json({message: "Notifications deleted successfully"});
    } catch (error) {
        console.log("Error in delete notifications controller", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

export {
    getNotification,
    deleteNotification
}