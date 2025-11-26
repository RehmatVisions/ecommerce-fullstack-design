// ===== Import Models =====
import Cart from "../models/cart.model.js"; 
// Cart model import kiya → Cart collection ke saath interact karne ke liye

import Product from "../models/product.model.js"; 
// Product model import kiya → Product collection ke saath interact karne ke liye


// ===== 1) Add item to cart =====
export const addToCart = async (req, res) => {
  // Step 1: User ID le lo (authMiddleware se aata hai)
  const userId = req.user.id; 
  
  // Step 2: Frontend se productId aur quantity le lo
  const { productId, quantity } = req.body; 

  try {
    // Step 3: Database me product check karo
    const product = await Product.findById(productId); 
    if (!product) 
      return res.status(404).json({ success: false, message: "Product not found" });

    // Step 4: User ka existing cart check karo
    let cart = await Cart.findOne({ user: userId }); 

    // Step 5: Agar cart exist nahi karta → naya cart create karo
    if (!cart) {
      cart = await Cart.create({
        user: userId, 
        items: [{ product: productId, quantity, price: product.price }], 
        totalPrice: product.price * quantity // First item ka total price
      });

      // Step 6: Response bhejo frontend ko
      return res.json({ success: true, message: "Item added to cart", cart });
    }

    // Step 7: Agar cart already exist karta hai → check karo item pehle se hai ya nahi
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      // Step 8: Agar item already hai → quantity add kar do
      existingItem.quantity += quantity; 
    } else {
      // Step 9: Naya item push karo cart me
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    // Step 10: Total price recalculate karo
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Step 11: Database me save karo
    await cart.save(); 

    // Step 12: Success response bhejo
    res.json({ success: true, message: "Cart updated successfully", cart });

  } catch (err) {
    // Step 13: Agar server error → 500 bhejo
    res.status(500).json({ success: false, message: err.message });
  }
};


// ===== 2) Get user cart =====
export const getUserCart = async (req, res) => {
  try {
    // Step 1: User ka cart fetch karo aur product details populate karo
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product"); 

    if (!cart) {
      // Step 2: Agar cart empty hai → empty response bhejo
      return res.json({ success: true, message: "Cart is empty", cart: { items: [], totalPrice: 0 } });
    }

    // Step 3: Agar cart hai → frontend ko bhejo
    res.json({ success: true, message: "Cart fetched successfully", cart });

  } catch (err) {
    // Step 4: Server error
    res.status(500).json({ success: false, message: err.message });
  }
};


// ===== 3) Remove item from cart =====
export const removeItem = async (req, res) => {
  const userId = req.user.id; // Logged-in user ID
  const { productId } = req.body; // Product ID jo remove karna hai

  try {
    // Step 1: User ka cart fetch karo
    const cart = await Cart.findOne({ user: userId });
    if (!cart) 
      return res.status(404).json({ success: false, message: "Cart not found" });

    // Step 2: Product remove karo cart.items se
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    // Step 3: Total price recalculate karo
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Step 4: Save cart
    await cart.save();

    // Step 5: Response bhejo
    res.json({ success: true, message: "Item removed successfully", cart });

  } catch (err) {
    // Server error
    res.status(500).json({ success: false, message: err.message });
  }
};


// ===== 4) Clear cart =====
export const clearCart = async (req, res) => {
  try {
    // Step 1: User ka cart fetch karo
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) 
      return res.status(404).json({ success: false, message: "Cart not found" });

    // Step 2: Items aur totalPrice reset karo
    cart.items = [];
    cart.totalPrice = 0;

    // Step 3: Save cart
    await cart.save();

    // Step 4: Response bhejo
    res.json({ success: true, message: "Cart cleared successfully", cart });

  } catch (err) {
    // Server error
    res.status(500).json({ success: false, message: err.message });
  }
};
