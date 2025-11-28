import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getProductById, updateProduct } from '../api';
import { FaImage, FaSave, FaTimes } from 'react-icons/fa';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: null
  });

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const product = await getProductById(id);
      setFormData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        stock: product.stock || '',
        image: null
      });
      // Set existing image preview
      if (product.image) {
        setImagePreview(`https://ecommerc-backend-ycd1.onrender.com/${product.image}`);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('❌ Failed to load product');
      navigate('/products');
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('stock', formData.stock || 0);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await updateProduct(id, data);
      toast.success('✅ Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('❌ Failed to update product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading product...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <FaImage className="text-4xl text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  Change Image
                </label>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              placeholder="e.g., Electronics, Clothing, etc."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <FaSave />
              {loading ? 'Updating...' : 'Update Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              <FaTimes className="inline mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProduct;
