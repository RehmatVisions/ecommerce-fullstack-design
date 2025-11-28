// Simple auth utility for managing user token

// Set auth token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

// Get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Remove auth token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// For testing: Set a dummy token
// You can call this from browser console: window.setTestToken('your-token-here')
if (typeof window !== 'undefined') {
  window.setTestToken = (token) => {
    setAuthToken(token);
    console.log('Token set successfully. Reload the page to use cart features.');
  };
  
  window.clearToken = () => {
    removeAuthToken();
    console.log('Token cleared.');
  };
}
