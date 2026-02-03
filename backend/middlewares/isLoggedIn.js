import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token || token === 'null' || token === 'undefined') return res.status(401).json({ message: "Unauthorized" });
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({ _id: data.userid });
        if (!user) {
            res.clearCookie('token');
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default isLoggedIn