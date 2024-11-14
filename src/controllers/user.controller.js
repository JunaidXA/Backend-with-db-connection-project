import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErros.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { upLoadOnCloudinary } from "../utils/cloudinary.js"
import { response } from "express";
const registerUser = asyncHandler(async (req, res) => {
    // get user detail from frontend
    const { userName, email, fullName, password } = req.body
    console.log("email: ", email);
    // validation for backend
    if ([fullName, email, userName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are Required")
    }
    // check if user already exists username / email
    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "UserName or Email already exist")
    }
    // check for cover images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is Required")
    }
    // upload on cloudinary must avatar image on cloudinary
    const avatar = await upLoadOnCloudinary(avatarLocalPath)
    const coverImage = await upLoadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar is Required")
    }
    // create user object for MongoDB
    const user = await User.create({
        fullName,
        email,
        userName: userName.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // check for user creation 
    if (!createdUser) {
        throw new ApiError(500, "Somthing went wrong while registering the user")
    }
    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    )
})

export { registerUser } 