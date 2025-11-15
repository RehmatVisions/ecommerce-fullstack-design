import { Product } from '../models/product.model.js';

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    try { 
        const { name, price, description, category } = req.body;
        const image = req.file?.path || 'uploads/default.png';  // multer se upload image ka path

        // Required fields check
        if (!name || !price || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, price, description and category are required",
            });
        }

        const product = await Product.create({
            name,
            price,
            description,
            category,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// GET ALL PRODUCTS + FILTER
export const getAllProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        const filter = {};

        if (search) filter.name = { $regex: search, $options: "i" };
        if (category) filter.category = { $regex: `^${category}`, $options: "i" };

        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.json({ success: true, data: products });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// GET PRODUCT BY ID
export const getProductbyId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // FIXED: findById

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({ success: true, data: product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const image = req.file?.path;

        const updatedData = {};

        if (name) updatedData.name = name;
        if (price) updatedData.price = price;
        if (description) updatedData.description = description;
        if (category) updatedData.category = category;
        if (image) updatedData.image = image;

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            updated
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            deleted
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
