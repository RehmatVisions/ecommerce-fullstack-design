// API base URL
const API_BASE_URL = 'https://ecommerc-backend-ycd1.onrender.com/api';
const BASE_URL = 'https://ecommerc-backend-ycd1.onrender.com';

// Helper function to convert image path to full URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  // Convert backslashes to forward slashes and prepend base URL
  const cleanPath = imagePath.replace(/\\/g, '/');
  return `${BASE_URL}/${cleanPath}`;
};

// Fetch all products from backend
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const result = await response.json();
    // Extract data array from response and convert image paths
    const products = result.data || result || [];
    return products.map(product => ({
      ...product,
      image: getImageUrl(product.image),
      imageUrl: getImageUrl(product.imageUrl || product.image)
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const result = await response.json();
    // Extract data from response and convert image paths
    const product = result.data || result || null;
    if (product) {
      return {
        ...product,
        image: getImageUrl(product.image),
        imageUrl: getImageUrl(product.imageUrl || product.image)
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('authToken');
};

// Authentication API Functions

// Register new user
export const registerUser = async (userData) => {
  try {
    console.log('Registering user:', userData.email);
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    console.log('Register response:', result);

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Registration failed');
    }
    
    // Store token - check multiple possible locations including user.token
    const token = result.token || result.user?.token || result.data?.token || result.authToken;
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token stored successfully:', token.substring(0, 20) + '...');
    } else {
      console.warn('No token received in registration response');
    }
    
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    console.log('Logging in user:', credentials.email);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();
    console.log('Login response:', result);

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Login failed');
    }
    
    // Store token - YOUR BACKEND RETURNS: result.user.token
    const token = result.user?.token || result.token || result.data?.token || result.authToken;
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token stored successfully:', token.substring(0, 20) + '...');
    } else {
      console.warn('No token received in login response');
      console.log('Response structure:', Object.keys(result));
    }
    
    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.log('No token found in getCurrentUser');
      return null;
    }

    console.log('Fetching user with token:', token.substring(0, 20) + '...');

    const response = await fetch(`${API_BASE_URL}/auth/getuser`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    console.log('Get user response:', result);

    if (!response.ok) {
      console.error('Get user failed:', result);
      // If token is invalid, clear it
      if (response.status === 401 || response.status === 403) {
        console.log('Token invalid, clearing...');
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
      }
      return null;
    }

    // Return user data - handle different response formats
    return result.user || result.data || result;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
};

// Verify token is valid
export const verifyToken = async () => {
  const token = getAuthToken();
  if (!token) {
    console.log('No token to verify');
    return false;
  }

  try {
    console.log('Verifying token...');
    const user = await getCurrentUser();
    const isValid = !!user;
    console.log('Token valid:', isValid);
    return isValid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

// Cart API Functions

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Please login to add items to cart');
    }

    console.log('Adding to cart:', { productId, quantity, token: token.substring(0, 20) + '...' });

    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });

    const result = await response.json();
    console.log('Cart add response:', { status: response.status, result });
    
    if (!response.ok) {
      console.error('Cart add failed:', result);
      
      // If token is invalid, clear it and ask user to login again
      if (response.status === 401 || response.status === 403) {
        console.log('Token invalid, clearing...');
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        throw new Error('Session expired. Please login again.');
      }
      
      throw new Error(result.message || result.error || 'Failed to add item to cart');
    }

    console.log('Cart add success:', result);
    return result;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Get cart items
export const getCart = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.log('No token found, returning empty cart');
      return { items: [], total: 0 };
    }

    console.log('Fetching cart with token:', token.substring(0, 20) + '...');

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    console.log('Cart fetch response:', result);
    console.log('Response structure:', {
      hasData: !!result.data,
      hasCart: !!result.cart,
      hasItems: !!result.items,
      dataType: typeof result.data,
      cartType: typeof result.cart,
      itemsType: typeof result.items
    });

    if (!response.ok) {
      console.error('Cart fetch failed:', result);
      throw new Error(result.message || 'Failed to fetch cart');
    }

    // Try different response formats
    let cart = result.data || result.cart || result;
    
    // If cart is not in expected format, try to extract items
    if (!cart.items) {
      console.log('Cart items not found in expected location, checking alternatives...');
      if (Array.isArray(result.items)) {
        cart = { items: result.items, total: result.total || 0 };
      } else if (Array.isArray(result.data?.items)) {
        cart = result.data;
      } else if (Array.isArray(result.cart?.items)) {
        cart = result.cart;
      } else {
        console.warn('Could not find cart items in response');
        cart = { items: [], total: 0 };
      }
    }
    
    console.log('Extracted cart:', cart);
    console.log('Cart items count:', cart.items?.length || 0);
    
    // Convert image paths for cart items
    if (cart.items && Array.isArray(cart.items)) {
      cart.items = cart.items.map(item => {
        console.log('Processing cart item:', item);
        return {
          ...item,
          product: item.product ? {
            ...item.product,
            image: getImageUrl(item.product.image),
            imageUrl: getImageUrl(item.product.imageUrl || item.product.image)
          } : null
        };
      });
    }
    
    console.log('Final cart to return:', cart);
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [], total: 0 };
  }
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Please login to remove items from cart');
    }

    console.log('Removing from cart:', productId);

    // Backend route: DELETE /api/cart/remove/:productId
    // But controller expects productId in body, so we send both ways
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Remove failed:', result);
      throw new Error(result.message || 'Failed to remove item from cart');
    }

    console.log('Remove success:', result);
    return result;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Please login to clear cart');
    }

    console.log('Clearing cart');

    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Clear cart failed:', result);
      throw new Error(result.message || 'Failed to clear cart');
    }

    console.log('Clear cart success:', result);
    return result;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
