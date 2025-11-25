import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(401).json({
                message: "All Fields Are Required",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User Already Exist"
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hashedpassword
        })
        const token = generateToken(newUser._id)
        return res.status(201).json({
            message: "User created Successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token

            }
            , success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Field Are Required"
            })
        }
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email And Password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Password does not match" });
        }
        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 });


        return res.status(200).json({
            message: "User Logged In Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token,
            }
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({
            user,
            message: "User Found Successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}