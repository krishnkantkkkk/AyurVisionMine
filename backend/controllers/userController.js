import userModel from '../models/userModel.js';
import hashGenerator from '../utils/hashGenerator.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerator.js';
import verifyPassword from '../utils/verifyPassword.js';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const isProduction = process.env.NODE_ENV === 'production';

const accessTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 15 * 60 * 1000 // 15 minutes
};

const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const userRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (await userModel.findOne({ email: email.toLowerCase() })) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await userModel.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: await hashGenerator(password)
        });

        const accessToken = generateAccessToken({ userid: user._id });
        const refreshToken = generateRefreshToken({ userid: user._id });

        user.refreshToken = refreshToken;
        await user.save();

        user.password = undefined;
        user.refreshToken = undefined;

        res.cookie("accessToken", accessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        res.cookie("token", accessToken, accessTokenCookieOptions);

        return res.status(201).json({ user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await userModel.findOne({ email: email.toLowerCase() }).select("+password");
        if (user) {
            const result = await verifyPassword(password, user.password);
            if (result) {
                const accessToken = generateAccessToken({ userid: user._id });
                const refreshToken = generateRefreshToken({ userid: user._id });

                user.refreshToken = refreshToken;
                await user.save();

                user.password = undefined;
                user.refreshToken = undefined;

                res.cookie("accessToken", accessToken, accessTokenCookieOptions);
                res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
                res.cookie("token", accessToken, accessTokenCookieOptions);

                return res.status(200).json({ user });
            }
            return res.status(401).json({ message: "Invalid email or password" });
        }
        return res.status(401).json({ message: "Invalid email or password" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh Token required" });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
        } catch {
            res.clearCookie("accessToken", accessTokenCookieOptions);
            res.clearCookie("refreshToken", refreshTokenCookieOptions);
            res.clearCookie("token", accessTokenCookieOptions);
            return res.status(401).json({ message: "Invalid or expired Refresh Token" });
        }

        const user = await userModel.findById(decoded.userid).select("+refreshToken");
        if (!user || user.refreshToken !== refreshToken) {
            res.clearCookie("accessToken", accessTokenCookieOptions);
            res.clearCookie("refreshToken", refreshTokenCookieOptions);
            res.clearCookie("token", accessTokenCookieOptions);
            return res.status(401).json({ message: "Refresh Token revoked or invalid" });
        }

        const newAccessToken = generateAccessToken({ userid: user._id });
        const newRefreshToken = generateRefreshToken({ userid: user._id });

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);
        res.cookie("refreshToken", newRefreshToken, refreshTokenCookieOptions);
        res.cookie("token", newAccessToken, accessTokenCookieOptions);

        return res.status(200).json({ message: "Token refreshed successfully" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userLogout = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
                await userModel.findByIdAndUpdate(decoded.userid, { refreshToken: null });
            } catch {}
        } else if (req.user?._id) {
            await userModel.findByIdAndUpdate(req.user._id, { refreshToken: null });
        }

        res.clearCookie("accessToken", accessTokenCookieOptions);
        res.clearCookie("refreshToken", refreshTokenCookieOptions);
        res.clearCookie("token", accessTokenCookieOptions);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.clearCookie("token");

        return res.status(200).json({ message: "Logout Successful" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userUpdate = async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.body;
        if (email && email.toLowerCase() !== req.user.email.toLowerCase()) {
            const existing = await userModel.findOne({ email: email.toLowerCase(), _id: { $ne: req.user._id } });
            if (existing) {
                return res.status(400).json({ message: "Email already in use by another user" });
            }
        }
        const updateData = { firstName, lastName, age };
        if (email) updateData.email = email.toLowerCase();

        const user = await userModel.findOneAndUpdate({ _id: req.user._id }, updateData, { new: true });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const userProfile = (req, res) => {
    res.status(200).json(req.user);
}