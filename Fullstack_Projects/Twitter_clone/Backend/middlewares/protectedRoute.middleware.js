//used to check whether the user is authenticated or not. this is used in the cases when the user has to perform some operations such as deleting a post or updating a profile, for that we need to decode the token and hence verify that whether the user is authenticated or not.
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

//protected means logged in or not
export const protectedRoute = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"Unauthorized: Invalid token provided" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectedRoute middleware", error.message);
        return res.status(500).json({error: "Internal server error"})
    }
})

export default protectedRoute;