import mongoose from 'mongoose';

// ====== Cart Item Schema ======
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",  // Match with actual Product model
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    }
}, { _id: false });

// ====== Cart Schema ======
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
