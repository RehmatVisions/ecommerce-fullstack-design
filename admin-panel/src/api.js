// ==========================================
// API CONFIGURATION FILE
// ==========================================
// This file handles all communication between the admin panel and the backend server
// It contains functions for authentication and product management

// Backend server URL - Change this if your backend runs on a different port
const API_BASE_URL = 'http://localhost:5000/api';

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get the authentication token from browser storage
 * @returns {string|null} The stored token or null if not found
 */
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

/**
 * Get the current admin user data from browser storage
 * @returns {object|null} The user object or null if not found
 */
export const getCurrentAdmin = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

/**
 * Check if an admin is currently logged in
 * @returns {boolean} True if logged in, false otherwise
 */
export const isAdminLoggedIn = () => {
  const token = getAuthToken();
  const user = localStorage.getItem('adminUser');
  return !!(token && user);
};

// ==========================================
// AUTHENTICATION APIs
// ==========================================

/**
 * Register a new admin account
 * @param {string} name - Admin's full name
 * @param {string} email - Admin's email address
 * @param {string} password - Admin's password
 * @param {string} adminSecret - Secret key to verify admin privileges
 * @returns {Promise<object>} Registration result with user data
 */
export const adminRegister = async (name, email, password, adminSecret) => {
  try {
    // Send registration request to backend
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, adminSecret })
    });

    const result = await response.json();
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }

    // Verify that the user has admin privileges
    if (!result.user?.isAdmin) {
      throw new Error('Invalid admin secret. Admin privileges not granted.');
    }

    // Store authentication token and user data in browser
    const token = result.user?.token || result.token;
    if (token) {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(result.user));
    }

    return result;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw error;
  }
};

/**
 * Login an existing admin user
 * @param {string} email - Admin's email address
 * @param {string} password - Admin's password
 * @returns {Promise<object>} Login result with user data and token
 */
export const adminLogin = async (email, password) => {
  try {
    // Send login request to backend
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    // Verify that the user has admin privileges
    if (!result.user?.isAdmin) {
      throw new Error('Access denied. Admin privileges required.');
    }

    // Store authentication token and user data in browser
    const token = result.user?.token || result.token;
    if (token) {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(result.user));
    }

    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Logout the current admin user
 * Removes all stored authentication data from browser
 */
export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

// ==========================================
// PRODUCT MANAGEMENT APIs
// ==========================================

/**
 * Get all products from the database
 * @returns {Promise<Array>} Array of product objects
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const result = await response.json();
    
    // Return the products array (handle different response formats)
    return result.data || result.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get a single product by its ID
 * @param {string} id - The product ID
 * @returns {Promise<object>} Product object
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch product');
    }
    
    return result.data || result.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Create a new product (Admin only)
 * @param {FormData} formData - Form data containing product details and image
 * @returns {Promise<object>} Created product data
 */
export const createProduct = async (formData) => {
  try {
    const token = getAuthToken();
    
    // Send create request with authentication
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData // FormData automatically sets correct Content-Type
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create product');
    }
    
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update an existing product (Admin only)
 * @param {string} id - The product ID to update
 * @param {FormData} formData - Form data containing updated product details
 * @returns {Promise<object>} Updated product data
 */
export const updateProduct = async (id, formData) => {
  try {
    const token = getAuthToken();
    
    // Send update request with authentication
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData // FormData automatically sets correct Content-Type
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update product');
    }
    
    return result;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product (Admin only)
 * @param {string} id - The product ID to delete
 * @returns {Promise<object>} Deletion confirmation
 */
export const deleteProduct = async (id) => {
  try {
    const token = getAuthToken();
    
    // Send delete request with authentication
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete product');
    }
    
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
