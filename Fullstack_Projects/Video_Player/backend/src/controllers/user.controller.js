import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async (req, res) => {
    //get the data from user
    //validation - if the data is empty or not
    //check if the user already exists
    //since the avatar field in our data model is required, hence check for that
    //upload the avatar image on cloudinary
    //create the user object and upload it in our db
    //remove password and refresh token field from response
    //check if the user is created or not
    //return the response
    const {fullName, email, username, password} = req.body //all the json data will be in req.body but not the data from url THIS DATA IS TAKEN FROM THE FORM
    // console.log("full name is:", fullName);
    // console.log("email is:", email);
    if((!username) || (!email) || (!password) || (!fullName)){
        throw new ApiError(400, "This field is required!!");
    }
    console.log('passed1')
    const usernameExists = await User.findOne({username: username});
    const emailExists = await User.findOne({email: email});
    if(usernameExists || emailExists){
        throw new ApiError(400, "Username or email already exists");
    }
    console.log('passed2')
    // console.log(req.files);
    if(!req.files.avatar){
        throw new ApiError(400, "Avatar is required!!");
    }
    const avatarLocalPath = req.files.avatar[0].path; //by this we got the local path of the avatar when it is saved in public repoco
    console.log('passed3')
    let coverImageLocalPath = "";
    if(req.files.coverImage){
        coverImageLocalPath = req.files.coverImage[0].path;//by this we got the local path of the coverimage when it is saved in public repo
    }
    console.log("cover local path is: ", coverImageLocalPath);
    console.log("avatar local path is: ", avatarLocalPath);

    const avatarUploaded = await uploadOnCloudinary(avatarLocalPath); //we get the full response which we returned in cloudinary.js
    const coverImageUploaded = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath):"";
    console.log("avatar uploaded is: ", avatarUploaded);
    if(!avatarUploaded){
        throw new ApiError(400, "avatar is required")
    }
    let coverImage = "";
    if(coverImageUploaded){
        coverImage = coverImageUploaded.url;
    }
    const avatar = avatarUploaded.url;//from the full response we extracted the url because we have to put it in user object to save it in db
    
    console.log("after upload avatar: ", avatar);
    console.log("after upload coverImage: ", coverImage);
    const user = await User.create({
        fullName: fullName,
        email: email,
        username: username.toLowerCase(),
        password: password,
        avatar: avatar,
        coverImage: coverImage
    })
    if(!user){
        throw new ApiError(500, "User not created")
    }
    
    const createdUser = await User.findById(user._id).select("-password -refresh");
    console.log("Created User is: ", createdUser);
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully!!")
    )
})
const generateAccessandRefershTokens = async(user) => { //here we are not using asynchandler because we use it for requests and sending responses accordingly, here we dont need to send requests and responses
    try {
        const id = user._id
        const access = await user.generateAccessToken(id);
        const refresh = await user.generateRefreshToken(id);
        //we save refresh token in our database so that we dont need to ask user for password everytime
        user.refreshToken = refresh
        await user.save({validateBeforeSave: false});
        return {access, refresh}
    } catch (error) {
        throw new ApiError(500, "Error generating access and refresh token")
    }
    
}
const loginUser = asyncHandler(async(req, res) => {
    //take the input
    //match the input as they are entered with the saved information inside the database.
    //if they matches give user the access token and refresh token
    //if they dont match give them error
    //send the token using cookie
    console.log("req.body is: ", req.body)
    const {email, username, password} = req.body;
    console.log("email is: ", email)
    if(!email || !username){ //think why did we put or here and not &&
        throw new ApiError(400, "Username or email is required")
    }
    const user = await User.findOne({//we found the required user
        $or: [{email}, {username}] //this is the or operator of mongodb, this allows use to find the first record which matches the username or email
    })
    if(!user){
        throw new ApiError(404, "User not found!!")
    }
    //password check - to do password check, we can use the method we created using bcrypt.compare and it will be accessed by user not User because User is used to access the operations of mongoose
    const passwordCheck = await user.isPasswordCorrect(password)
    if(!passwordCheck){
        throw new ApiError(401, "Invalid credentials!!")
    }
    //since password check is complete, now we have to generate access and refresh tokens and for that we are creating a method because we will generate it many times
    const {access, refresh} = await generateAccessandRefershTokens(user);
    //we are sending the access token and refresh token in the response
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken") // we coult have also changed the existing user which we created earlier and then pass it
    const options = { // the content in options field ensures that the cookie can only be changed by the server
        httpOnly: true,
        secure: true
    }
    return res.status(201)
    .cookie("accessToken", access, options) //we can use the cookies method because of the cookie-parser
    .cookie("refreshToken", refresh, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, access, refresh
            },
            "User logged in successfully!!"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    //we have to delete the refresh token from the database
    //we have to delete the access token from the cookie
    //we have to delete the refresh token from the cookie
    console.log("cookie: ", req.cookie)
    await User.findByIdAndUpdate(
        req.user._id, //since we inserted the user inside req by the middleware auth.middleware now we can access the whole user object and its values
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true // this is done so that the value we get after updation is new one after updation and not the old one because the old one will again have old refreshToken
        }
    )
    const options = { // we need this again to update the cookie
        httpOnly: true,
        secure: true
    }
    return res.
    status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )
})

const refrshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookie.refreshToken//we are getting the refresh token from the cookie and this token is encrypted
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Access");
    }
    //to verify the token we will have to decode the information inside token using the secret key and then find a user by that token and the refresh the tokens of that user
    //in user model when we created the refreshtoken. remember we gave an information for creating it and there we gave it only id. hence we can use this id to find the user for above purposes
    try {
        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id)
        if(!user){
            throw new ApiError(400, "Invalid Refresh token")
        }
        //now we have to create new access token and refresh token for the user and send it to the user
        const {accessToken, newRefreshToken} = generateAccessandRefershTokens(user)
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(200, {
                accessToken,
                refreshToken: newRefreshToken
            },
            "Access token refreshed"
        )
        )
    } catch (error) {
        throw new ApiError(400, "Invalid Refresh token")
    }
})
export  {
    registerUser,
    loginUser,
    logoutUser,
    refrshAccessToken
}