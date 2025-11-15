import express from 'express';
import { 
  createProduct, 
  getAllProducts, 
  getProductbyId, 
  deleteProduct, 
  updateProduct 
} from '../controllers/product.controller.js';

import { upload } from '../middleware/upload.js';

const router = express.Router();

// Create product with image + Get all products
router.route('/')
  .post(upload.single('image'), createProduct)
  .get(getAllProducts);

// Get, Update, Delete product by ID
router.route('/:id')
  .get(getProductbyId)
  .put(upload.single('image'), updateProduct)
  .delete(deleteProduct);

export default router;
