# Cart Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Failed to add item to cart"

#### Step 1: Check if you're logged in
1. Open browser console (F12)
2. Type: `localStorage.getItem('token')`
3. If it returns `null`, you need to login first
4. Click the user icon or "Login" button in hero section

#### Step 2: Check backend is running
1. Open: http://localhost:5000/api/products
2. Should see JSON response with products
3. If not, start your backend server

#### Step 3: Check backend cart endpoint
Open browser console and run:
```javascript
fetch('http://localhost:5000/api/cart/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
  body: JSON.stringify({ productId: 'test-id', quantity: 1 })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

#### Step 4: Check console logs
When you click "Add to Cart", check browser console for:
- "Adding to cart:" - Shows the request being sent
- "Cart add success:" - Shows successful response
- "Cart add failed:" - Shows error details

### Expected Backend Response Format

#### For Add to Cart (POST /api/cart/add)
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

#### For Get Cart (GET /api/cart)
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
        "quantity": 2
      }
    ],
    "total": 200
  }
}
```

### Backend Requirements

Your backend cart endpoints should:

1. **Accept Authorization header**: `Bearer {token}`
2. **Validate the token** and get user ID
3. **Accept productId and quantity** in request body
4. **Return proper JSON response** with success/error

### Example Backend Implementation (Node.js/Express)

```javascript
// Add to cart endpoint
router.post('/cart/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // From auth middleware
    
    // Add item to cart in database
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { 
        $push: { 
          items: { product: productId, quantity } 
        } 
      },
      { new: true, upsert: true }
    ).populate('items.product');
    
    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
```

### Testing Steps

1. **Register/Login**
   - Click "Join now" or "Login" in hero section
   - Complete registration or login
   - Check that user name appears in header

2. **Add Product to Cart**
   - Go to any product section
   - Click "Add to Cart" button
   - Should see green success message: "✓ Item added to cart!"
   - Cart icon should show count badge (red circle with number)

3. **View Cart**
   - Click cart icon in header
   - Should see your added items
   - Each item shows: image, name, price, quantity

4. **Remove from Cart**
   - Click "Remove" button on any item
   - Should see success message
   - Item disappears from cart
   - Cart count updates

### Debug Mode

To enable detailed logging, open browser console and run:
```javascript
localStorage.setItem('debug', 'true')
```

Then reload the page. All API calls will be logged in detail.

### Quick Test Without Backend Auth

If you want to test with a dummy token:
```javascript
// In browser console
localStorage.setItem('token', 'test-token-123')
```

Then your backend should accept this token for testing.

### Cart Count Badge

The cart count badge shows the **total quantity** of items, not the number of unique products.

Example:
- 2x Product A + 3x Product B = Badge shows "5"

### Success Indicators

When everything works correctly:
1. ✓ Green toast notification appears
2. ✓ Cart icon shows count badge
3. ✓ Cart page shows added items
4. ✓ No errors in console

### Still Having Issues?

Check browser console for detailed error messages. The system now logs:
- Request details (productId, quantity, token preview)
- Response from backend
- Any errors with full details

Look for messages starting with:
- "Adding to cart:"
- "Cart add success:"
- "Cart add failed:"
- "Error adding to cart:"
