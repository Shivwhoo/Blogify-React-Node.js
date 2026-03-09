import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // 1. Token nikaalo (Cookie se ya Authorization Header se)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request - No token found");
        }

        // 2. Token verify karo
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. User dhoondo database mein
        const user = await User.findById(decodedToken?._id).select("-password -refreshtoken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token - User not found");
        }

        // 4. Request object mein user daal do
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});