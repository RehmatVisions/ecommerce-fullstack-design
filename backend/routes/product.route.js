import express from 'express';
import { 
  createProduct, 
  getAllProducts, 
  getProductbyId, 
  deleteProduct, 
  updateProduct 
} from '../controllers/product.controller.js';

import { upload } from '../middleware/upload.js';
import { authMiddleware ,adminMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// // Create product with image + Get all products
// router.route('/')
//   .post(upload.single('image'), createProduct)
//   .get(getAllProducts);

// // Get, Update, Delete product by ID
// router.route('/:id')
//   .get(getProductbyId)
//   .put(upload.single('image'), updateProduct)
//   .delete(deleteProduct);



// Public: Get all products
router.get('/', getAllProducts);

// Admin-only: Create product
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createProduct);

// Admin-only: Update product
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProduct);

// Admin-only: Delete product
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

// Public: Get product by ID
router.get('/:id', getProductbyId);


export default router;
