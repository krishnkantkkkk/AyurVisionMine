import userModel from '../models/userModel.js';
import hashGenerator from '../utils/hashGenerator.js';
import tokenGenerator from '../utils/tokenGenerator.js';
import verifyPassword from '../utils/verifyPassword.js';

export const userRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (await userModel.findOne({ email })) return res.status(400).json({ message: "User already exists" });
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: await hashGenerator(password)
        });
        user.password = undefined;
        const token = tokenGenerator({ userid: user._id });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.status(201).json({ user, token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select("+password");
        if (user) {
            const result = await verifyPassword(password, user.password);
            if (result) {
                const token = tokenGenerator({ userid: user._id });
                user.password = undefined;
                return res.status(200).json({ user, token });
            }
            return res.status(401).json({ message: "Invalid email or password" });
        }
        return res.status(401).json({ message: "Invalid email or password" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const userLogout = (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: "Logout Successfull" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const userUpdate = async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.body;
        const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { firstName, lastName, email, age }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const userProfile = (req, res) => {
    res.status(200).json(req.user);
}