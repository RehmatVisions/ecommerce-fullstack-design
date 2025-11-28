// Test backend endpoints
// Run these in browser console to debug

window.testLogin = async (email, password) => {
  console.log('Testing login...');
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log('Login Response:', data);
    console.log('Status:', response.status);
    console.log('Token location check:', {
      'data.token': data.token,
      'data.data.token': data.data?.token,
      'data.authToken': data.authToken
    });
    
    return data;
  } catch (error) {
    console.error('Login test failed:', error);
  }
};

window.testGetUser = async () => {
  console.log('Testing get user...');
  const token = localStorage.getItem('token');
  console.log('Using token:', token?.substring(0, 30) + '...');
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    console.log('Get User Response:', data);
    console.log('Status:', response.status);
    
    return data;
  } catch (error) {
    console.error('Get user test failed:', error);
  }
};

window.testAddToCart = async (productId) => {
  console.log('Testing add to cart...');
  const token = localStorage.getItem('token');
  console.log('Using token:', token?.substring(0, 30) + '...');
  
  try {
    const response = await fetch('http://localhost:5000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    
    const data = await response.json();
    console.log('Add to Cart Response:', data);
    console.log('Status:', response.status);
    
    return data;
  } catch (error) {
    console.error('Add to cart test failed:', error);
  }
};

window.testGetCart = async () => {
  console.log('Testing get cart...');
  const token = localStorage.getItem('token');
  console.log('Using token:', token?.substring(0, 30) + '...');
  
  try {
    const response = await fetch('http://localhost:5000/api/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    console.log('Get Cart Response:', data);
    console.log('Status:', response.status);
    console.log('Response keys:', Object.keys(data));
    console.log('Items:', data.items || data.data?.items || data.cart?.items);
    
    return data;
  } catch (error) {
    console.error('Get cart test failed:', error);
  }
};

window.testRemoveFromCart = async (productId) => {
  console.log('Testing remove from cart...');
  console.log('Product ID:', productId);
  const token = localStorage.getItem('token');
  
  try {
    const url = `http://localhost:5000/api/cart/remove/${productId}`;
    console.log('Remove URL:', url);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('Response status:', response.status);
    console.log('Response content-type:', response.headers.get('content-type'));
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Remove Response:', data);
      return data;
    } else {
      const text = await response.text();
      console.log('Non-JSON Response:', text.substring(0, 500));
      return text;
    }
  } catch (error) {
    console.error('Remove test failed:', error);
  }
};

console.log('Backend test functions loaded!');
console.log('Usage:');
console.log('  testLogin("your@email.com", "password")');
console.log('  testGetUser()');
console.log('  testAddToCart("product-id")');
console.log('  testGetCart()');
console.log('  testRemoveFromCart("product-id")');
