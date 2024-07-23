import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const signup = async(req, res) => {
    res.status(200)
    .json({
        "message": "ok"
    })
}
const login = async(req, res) => {
    return new ApiResponse(200, "signup");
}

const logout = async(req, res) => {
    return new ApiResponse(200, "signup");
}

export {
    signup,
    login,
    logout
}