 import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from './routes/auth.route.js'
import cartRoutes from './routes/cart.route.js'

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", productRoutes);
app.use('/api/auth',authRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/cart", cartRoutes);

// api working
app.get("/", (req, res) => {
  res.json({ message: "Backend API is working" });
});

// Connect DB & start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
