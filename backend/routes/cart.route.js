import express from "express";
import { addToCart, getUserCart, removeItem, clearCart } from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add item → Auth check → Backend me cart add/update
router.post("/add", authMiddleware, addToCart);

// Get cart → Auth check → Backend se user ka cart fetch
router.get("/", authMiddleware, getUserCart);

// Remove item → Auth check → Backend se ek product remove
router.delete('/remove/:productId', authMiddleware, removeItem);

// Clear cart → Auth check → Backend se sab items remove
router.delete("/clear", authMiddleware, clearCart);

export default router;
