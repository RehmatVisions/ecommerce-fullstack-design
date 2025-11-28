# Cart System Testing Guide

## Step-by-Step Testing Process

### Step 1: Check Backend is Running

1. Open browser and go to: `http://localhost:5000/api/products`
2. You should see JSON response with your products
3. If not, start your backend server first

### Step 2: Register a New User

1. Go to your frontend (http://localhost:3000 or your port)
2. Click **"Join now"** button in the hero section (blue card)
3. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
4. Click **"Register"** button
5. **Open Browser Console (F12)** and check for:
   ```
   Registering user: test@example.com
   Register response: {success: true, token: "..."}
   Token stored successfully: ...
   ```

### Step 3: Verify Token is Stored

In browser console, type:
```javascript
localStorage.getItem('token')
```

You should see a token string. If you see `null`, the registration didn't store the token properly.

### Step 4: Check Debug Panel

Look at the bottom-left corner of your screen. You should see a black debug panel showing:
```
Debug Info
Auth: ✓ Logged in
User: Test User
Token: eyJhbGciOiJIUzI1...
Cart Items: 0
```

If it shows "✗ Not logged in", the authentication didn't work.

### Step 5: Add Product to Cart

1. Scroll to any product section (Deals, Home & Outdoor, etc.)
2. Click **"Add to Cart"** button on any product
3. **Check Browser Console** for these messages:
   ```
   Adding to cart: {productId: "...", quantity: 1, token: "..."}
   Cart add success: {success: true, ...}
   Fetching cart with token: ...
   Cart fetch response: {success: true, data: {...}}
   ```
4. You should see a **green toast notification**: "✓ Item added to cart!"
5. The **cart icon** in header should show a red badge with number "1"

### Step 6: View Cart

1. Click the **cart icon** in the header
2. You should see your added product with:
   - Product image
   - Product name
   - Price
   - Quantity
   - Remove button

### Common Issues and Solutions

#### Issue 1: "Please login to add items to cart"

**Solution:**
1. Check if token exists: `localStorage.getItem('token')`
2. If null, login again
3. Check console for "Token stored successfully" message
4. Verify debug panel shows "✓ Logged in"

#### Issue 2: Token exists but cart still fails

**Possible causes:**
1. **Backend not accepting token format**
   - Check your backend expects: `Authorization: Bearer {token}`
   - Check token validation in backend

2. **Token expired**
   - Clear token: `localStorage.removeItem('token')`
   - Login again

3. **Backend cart endpoint not working**
   - Test manually in console:
   ```javascript
   fetch('http://localhost:5000/api/cart/add', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     },
     body: JSON.stringify({ 
       productId: '692890f1dc4a09c98ddb1c24', // Use real product ID
       quantity: 1 
     })
   })
   .then(r => r.json())
   .then(console.log)
   .catch(console.error)
   ```

#### Issue 3: Cart count not updating

**Solution:**
1. Check console for "Cart fetch response"
2. Verify response has `items` array
3. Check debug panel shows correct "Cart Items" count
4. Try refreshing the page

#### Issue 4: Products not showing in cart

**Solution:**
1. Check cart API response format in console
2. Verify backend returns products populated:
   ```json
   {
     "success": true,
     "data": {
       "items": [
         {
           "_id": "cart-item-id",
           "product": {
             "_id": "product-id",
             "name": "Product Name",
             "price": 100,
             "image": "uploads/image.jpg"
           },
           "quantity": 1
         }
       ]
     }
   }
   ```

### Backend Requirements Checklist

Your backend must:

- [ ] Accept `POST /api/cart/add` with body: `{productId, quantity}`
- [ ] Accept `GET /api/cart` to fetch cart
- [ ] Accept `DELETE /api/cart/remove/:productId` to remove item
- [ ] Accept `DELETE /api/cart/clear` to clear cart
- [ ] Validate `Authorization: Bearer {token}` header
- [ ] Return proper JSON responses with `success` field
- [ ] Populate product details in cart items

### Expected Backend Response Formats

#### Add to Cart Response
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "items": [...],
    "total": 100
  }
}
```

#### Get Cart Response
```json
{
  "success": true,
  "data": {
    "items": [
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
    ],
    "total": 200
  }
}
```

### Console Commands for Testing

```javascript
// Check token
localStorage.getItem('token')

// Set test token
localStorage.setItem('token', 'your-token-here')

// Clear token
localStorage.removeItem('token')

// Test add to cart
fetch('http://localhost:5000/api/cart/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  body: JSON.stringify({ productId: 'product-id-here', quantity: 1 })
}).then(r => r.json()).then(console.log)

// Test get cart
fetch('http://localhost:5000/api/cart', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
}).then(r => r.json()).then(console.log)
```

### Success Indicators

When everything works:
1. ✓ Green toast appears: "✓ Item added to cart!"
2. ✓ Cart badge shows count (red circle with number)
3. ✓ Debug panel shows "Cart Items: 1" (or more)
4. ✓ Console shows "Cart add success"
5. ✓ Cart page displays the product

### Still Not Working?

1. **Check all console logs** - they show exactly what's happening
2. **Check debug panel** - shows auth and cart status
3. **Test backend directly** - use curl or Postman
4. **Verify backend code** - ensure cart endpoints work
5. **Check CORS** - backend must allow frontend origin

### Need Help?

Share these from browser console:
1. Result of: `localStorage.getItem('token')`
2. Console logs when clicking "Add to Cart"
3. Response from: `fetch('http://localhost:5000/api/cart', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(r => r.json()).then(console.log)`
