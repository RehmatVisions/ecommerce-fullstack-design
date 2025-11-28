import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAllProducts } from '../api';
import { FaBox, FaPlus, FaChartLine, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: FaBox,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: '$' + products.reduce((sum, p) => sum + (p.price || 0), 0).toFixed(2),
      icon: FaDollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Categories',
      value: [...new Set(products.map(p => p.category))].length,
      icon: FaChartLine,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'In Stock',
      value: products.filter(p => p.stock > 0).length,
      icon: FaShoppingCart,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard! 👋</h1>
          <p className="text-blue-100">Manage your e-commerce store efficiently</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`text-2xl ${stat.textColor}`} />
                  </div>
                  <div className={`px-3 py-1 bg-gradient-to-r ${stat.color} text-white text-xs font-bold rounded-full`}>
                    Live
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Product Card */}
          <Link
            to="/products/add"
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <FaPlus className="text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Add New Product</h3>
                <p className="text-blue-100">Create a new product listing</p>
              </div>
            </div>
          </Link>

          {/* View Products Card */}
          <Link
            to="/products"
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <FaBox className="text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Manage Products</h3>
                <p className="text-purple-100">View and edit all products</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Products</h2>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No products yet</p>
              <Link
                to="/products/add"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 6).map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={`https://ecommerc-backend-ycd1.onrender.com/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
