# Token Debug Guide - "Invalid Token" Error

## Problem
After login/register, clicking "Add to Cart" shows "invalid token" error.

## Step-by-Step Debugging

### Step 1: Check if Token is Stored
Open browser console (F12) and run:
```javascript
console.log('Token:', localStorage.getItem('token'));
```

**Expected:** Should show a long string (JWT token)
**If null:** Token was not stored during login

### Step 2: Check Login Response
Look in browser console for these messages after login:
```
Login response: {...}
Token stored successfully: eyJhbGciOiJIUzI1NiI...
```

**If you see "No token received":** Your backend is not returning a token

### Step 3: Check Backend Response Format
Your backend should return token in one of these formats:

**Option 1:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

**Option 2:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {...}
  }
}
```

### Step 4: Test Token Manually
After login, run this in browser console:
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/auth/getuser', {
  headers: { 'Authorization': 'Bearer ' + token }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected:** Should return your user data
**If 401/403:** Token is invalid or expired

### Step 5: Check Backend Token Validation
Your backend auth middleware should:

```javascript
// Example middleware
const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Step 6: Common Backend Issues

#### Issue 1: Token Not Returned on Login
**Fix:** Make sure your login endpoint returns the token:
```javascript
router.post('/auth/login', async (req, res) => {
  // ... validate credentials ...
  
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    success: true,
    token: token,  // ← Make sure this is included
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});
```

#### Issue 2: Wrong JWT Secret
**Fix:** Make sure the same secret is used for signing and verifying:
```javascript
// When creating token (login)
const token = jwt.sign(payload, process.env.JWT_SECRET);

// When verifying token (middleware)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

#### Issue 3: Token Expired
**Fix:** Increase expiration time or implement refresh tokens:
```javascript
const token = jwt.sign(payload, secret, { expiresIn: '7d' }); // 7 days
```

### Step 7: Frontend Token Storage Check

Run this in console after login:
```javascript
// Check all possible token locations
console.log({
  token: localStorage.getItem('token'),
  authToken: localStorage.getItem('authToken'),
  allKeys: Object.keys(localStorage)
});
```

### Step 8: Test Cart Add with Valid Token

If you have a working token from Postman or another tool, test it:
```javascript
// Set token manually
localStorage.setItem('token', 'YOUR_VALID_TOKEN_HERE');

// Reload page
location.reload();

// Try adding to cart
```

### Step 9: Check Network Tab

1. Open DevTools → Network tab
2. Click "Add to Cart"
3. Find the request to `/api/cart/add`
4. Check:
   - **Request Headers:** Should have `Authorization: Bearer <token>`
   - **Response Status:** Should be 200, not 401/403
   - **Response Body:** Check error message

### Step 10: Backend Cart Endpoint Check

Your cart endpoint should look like:
```javascript
router.post('/cart/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // From authMiddleware
    
    // Add to cart logic...
    
    res.json({
      success: true,
      message: 'Item added to cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
```

## Quick Fixes

### Fix 1: Clear Everything and Re-login
```javascript
// In browser console
localStorage.clear();
location.reload();
// Then login again
```

### Fix 2: Check Backend is Running
```
http://localhost:5000/api/products
```
Should return products list

### Fix 3: Test Backend Auth Endpoint
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "test123"
}
```
Should return token

### Fix 4: Verify JWT Secret Exists
In your backend `.env` file:
```
JWT_SECRET=your-secret-key-here
```

## Expected Console Logs (Working Flow)

When everything works, you should see:
```
1. Logging in user: test@test.com
2. Login response: { success: true, token: "eyJ...", user: {...} }
3. Token stored successfully: eyJhbGciOiJIUzI1...
4. Fetching user with token: eyJhbGciOiJIUzI1...
5. Get user response: { success: true, data: {...} }
6. Adding to cart: { productId: "123", quantity: 1, token: "eyJ..." }
7. Cart add response: { status: 200, result: {...} }
8. Cart add success: {...}
```

## Still Not Working?

Check the debug panel in bottom-left corner of your app:
- **Auth:** Should show "✓ Logged in"
- **User:** Should show your name
- **Token:** Should show token preview
- **Cart Items:** Should update after adding

If Auth shows "✗ Not logged in" even after login, the token is not being stored or validated correctly.

## Backend Example (Complete)

```javascript
// auth.routes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Create user
    const user = await User.create({ name, email, password });
    
    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user and verify password
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get user
router.get('/getuser', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
```
