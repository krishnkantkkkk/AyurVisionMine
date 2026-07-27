import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import env from '../config/env.js'

const isLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken || req.cookies?.token;
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization.trim();
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            } else {
                token = authHeader;
            }
        }

        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({ message: "Unauthorized", code: "TOKEN_EXPIRED" });
        }

        let data;
        try {
            data = jwt.verify(token, env.JWT_ACCESS_SECRET);
        } catch {
            data = jwt.verify(token, env.JWT_KEY);
        }

        const user = await userModel.findOne({ _id: data.userid }).lean();
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", code: "USER_NOT_FOUND" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log("Auth Error:", err.message);
        return res.status(401).json({ message: "Unauthorized", code: "TOKEN_EXPIRED" });
    }
}

export default isLoggedIn