import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';

// ✅ Register Controller
export const register = async (req, res) => {
    const { name, email, password, adminSecret } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All Fields Are Required", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Admin secret check
        let isAdmin = false;
        if (adminSecret && adminSecret === process.env.ADMIN_SECRET) {
            isAdmin = true;
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin
        });

        const token = generateToken(newUser._id, newUser.isAdmin);

        return res.status(201).json({
            message: "User created Successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token
            },
            success: true
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// ✅ Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All Fields Are Required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Email And Password" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(401).json({ message: "Password does not match" });

        const token = generateToken(user._id, user.isAdmin);

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7*24*60*60*1000 });

        return res.status(200).json({
            message: "User Logged In Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// ✅ Logout Controller
export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        return res.status(200).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

// ✅ Get Profile Controller
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        return res.status(200).json({ message: "User Found Successfully", success: true, user });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};
