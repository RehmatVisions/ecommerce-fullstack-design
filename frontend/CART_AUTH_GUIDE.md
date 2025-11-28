# Cart & Authentication Integration Guide

## Features Implemented

### Authentication APIs
- ✅ **Register User**: `POST /api/auth/register`
- ✅ **Login User**: `POST /api/auth/login`
- ✅ **Get User**: `GET /api/auth/getuser`

### Cart APIs
- ✅ **Add to Cart**: `POST /api/cart/add`
- ✅ **Get Cart**: `GET /api/cart`
- ✅ **Remove Item**: `DELETE /api/cart/remove/:productId`
- ✅ **Clear Cart**: `DELETE /api/cart/clear`

## How to Use

### 1. Authentication

#### Register/Login (Multiple Ways)

**Option 1: Hero Section (Home Page)**
- On the home page, find the blue card in the hero section
- Click **"Join now"** button to open the registration modal
- Click **"Log in"** button to open the login modal
- After successful login, the card shows "Hi, [Your Name]" with a logout button

**Option 2: Header**
- Click the **user icon** in the header to open the login modal
- New users can click "Register" to create an account
- Existing users can login with email and password
- After successful login, the user's name will appear in the header

#### Logout (Multiple Ways)
- **Hero Section**: Click the red "Logout" button in the blue card (home page)
- **Header**: Click the logout icon in the header
- Both will clear the token and log you out

### 2. Shopping Cart

#### Add Products to Cart
- Browse products on the **Product Listing** page (`/products`)
- Click **"Add to Cart"** button on any product
- Cart count badge will update in the header
- **Note**: You must be logged in to add items to cart

#### View Cart
- Click the **cart icon** in the header
- View all items in your cart with:
  - Product image, name, category
  - Price and quantity
  - Stock information
  - Total price calculation

#### Remove Items
- Click **"Remove"** button on any item in cart
- Click **"Remove all"** to clear entire cart

#### Cart Summary
- View subtotal, tax (10%), and total
- Apply coupon codes (feature coming soon)
- Proceed to checkout

### 3. Product Features

All products now display:
- Product name
- Price
- Category
- Description
- Stock status
- Product image from backend

## API Response Format

### Authentication Response
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

### Cart Response
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
          "description": "Description",
          "stock": 10
        },
        "quantity": 2
      }
    ],
    "total": 200
  }
}
```

## Backend Requirements

Make sure your backend:
1. Is running on `http://localhost:5000`
2. Has CORS enabled
3. Returns JWT token on login/register
4. Accepts `Bearer {token}` in Authorization header for protected routes
5. Returns product data with proper image paths

## Testing Without Backend Auth

If you want to test cart features without implementing full auth:

1. Open browser console
2. Run: `window.setTestToken('your-test-token-here')`
3. Reload the page
4. Cart features will now work with this token

To clear token:
```javascript
window.clearToken()
```

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginModal.jsx       # Login form modal
│   │   └── RegisterModal.jsx    # Registration form modal
│   ├── cart/
│   │   ├── CartItems.jsx        # Cart items list (updated)
│   │   └── CartSummary.jsx      # Cart summary (updated)
│   └── Header.jsx               # Header with auth/cart (updated)
├── context/
│   ├── AuthContext.jsx          # Authentication state management
│   └── CartContext.jsx          # Cart state management
├── utils/
│   ├── api.js                   # All API functions
│   └── auth.js                  # Auth utilities
└── pages/
    └── CartPage.jsx             # Cart page (updated)
```

## Notes

- Cart items are fetched from backend on page load
- Cart automatically updates after add/remove operations
- User must be logged in to use cart features
- All product images are converted from backend paths to full URLs
- Cart count badge shows total quantity of items
