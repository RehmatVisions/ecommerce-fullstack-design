import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// -------------------- Auth Middleware --------------------
// Verifies JWT token and attaches user to req.user
export const authMiddleware = async (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1]; // Get token from header
   if (!token) return res.status(401).json({ message: "No token provided" });

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      const user = await User.findById(decoded.id).select("-password"); // Get user
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user; // Attach user to request
      next();
   } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
   }
};

// -------------------- Admin Middleware --------------------
// Allows access only to admin users
export const adminMiddleware = (req, res, next) => {
   if (req.user?.isAdmin) {
      next();
   } else {
      res.status(403).json({ message: "Admin access only" });
   }
};
