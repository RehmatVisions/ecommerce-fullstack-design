# Cart Shows Empty - Debug Guide

## Problem
Items are being added to cart (success message shows), but cart page is empty.

## Quick Debug Steps

### Step 1: Check What Backend Returns
Open browser console (F12) and run:
```javascript
testGetCart()
```

This will show you exactly what your backend returns for the cart.

### Step 2: Look for Cart Data
Check the console output for:
- `Get Cart Response:` - The full response
- `Response keys:` - What fields are in the response
- `Items:` - The cart items array

### Step 3: Common Response Formats

Your backend might return cart in one of these formats:

**Format 1:**
```json
{
  "items": [...],
  "total": 100
}
```

**Format 2:**
```json
{
  "data": {
    "items": [...],
    "total": 100
  }
}
```

**Format 3:**
```json
{
  "cart": {
    "items": [...],
    "total": 100
  }
}
```

**Format 4:**
```json
{
  "success": true,
  "data": {
    "cart": {
      "items": [...],
      "total": 100
    }
  }
}
```

## What to Check in Console

After running `testGetCart()`, look for these logs:
```
Fetching cart with token: eyJhbGciOiJIUzI1...
Cart fetch response: {...}
Response structure: { hasData: true, hasCart: false, hasItems: true, ... }
Extracted cart: { items: [...], total: 100 }
Cart items count: 3
Final cart to return: { items: [...], total: 100 }
```

## If Cart Items Count is 0

The backend might be returning an empty cart. Check:

1. **Are items actually being saved?**
   - Check your backend database
   - Look at backend logs when adding to cart

2. **Is the cart endpoint using the correct user?**
   - Backend should get user ID from token
   - Should return cart for that specific user

## Expected Cart Item Structure

Each item in the cart should have:
```json
{
  "_id": "cart-item-id",
  "product": {
    "_id": "product-id",
    "name": "Product Name",
    "price": 100,
    "image": "uploads/image.jpg",
    "category": "Category",
    "description": "Description"
  },
  "quantity": 2
}
```

## Backend Cart Endpoint Example

Your backend should look something like:

```javascript
// GET /api/cart
router.get('/cart', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    
    // Find cart for this user
    const cart = await Cart.findOne({ user: userId })
      .populate('items.product'); // Populate product details
    
    if (!cart) {
      return res.json({
        success: true,
        data: { items: [], total: 0 }
      });
    }
    
    res.json({
      success: true,
      data: {
        items: cart.items,
        total: cart.total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
```

## Common Issues

### Issue 1: Cart Not Populated
**Problem:** Backend returns cart but product details are missing
**Fix:** Use `.populate('items.product')` in your backend query

### Issue 2: Wrong User
**Problem:** Backend returns cart for different user
**Fix:** Make sure `req.user.id` matches the logged-in user

### Issue 3: Items Not Saved
**Problem:** Add to cart succeeds but doesn't save to database
**Fix:** Check backend add to cart logic

### Issue 4: Response Format Mismatch
**Problem:** Frontend can't find items in response
**Fix:** Check console logs to see actual response format

## Testing Flow

1. **Clear cart:**
   ```javascript
   // In browser console
   fetch('http://localhost:5000/api/cart/clear', {
     method: 'DELETE',
     headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
   }).then(r => r.json()).then(console.log);
   ```

2. **Add item:**
   - Click "Add to Cart" on a product
   - Should see success message

3. **Check cart:**
   ```javascript
   testGetCart()
   ```
   Should show the item you just added

4. **View cart page:**
   - Click cart icon
   - Should see your items

## What I Need From You

Run this in console and share the output:
```javascript
testGetCart()
```

Then I can tell you exactly what format your backend uses and fix the frontend accordingly.

## Temporary Fix

If you want to see what data is being returned, add this to your cart page:

```javascript
// In browser console on cart page
console.log('Cart data:', window.cartData);
```

Or check the debug panel (bottom-left) which shows:
- Cart Items: [number]

If it shows 0, the backend is returning empty cart or wrong format.
