# 🛡️ E-Commerce Admin Panel

A modern, beginner-friendly admin panel for managing your e-commerce store.

## 📋 Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Authentication
- ✅ Admin registration with secret key
- ✅ Secure login system
- ✅ Protected routes (only admins can access)
- ✅ Token-based authentication

### Product Management
- ✅ View all products in a table
- ✅ Search products by name or category
- ✅ Add new products with images
- ✅ Edit existing products
- ✅ Delete products
- ✅ Real-time statistics

### User Experience
- ✅ Beautiful, modern UI
- ✅ Toast notifications for all actions
- ✅ Responsive design (works on mobile)
- ✅ Loading states and error handling
- ✅ Image preview before upload

## 📁 Project Structure

```
admin-panel/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Layout.jsx      # Main layout with sidebar
│   │
│   ├── pages/              # Page components (routes)
│   │   ├── Login.jsx       # Admin login page
│   │   ├── Register.jsx    # Admin registration page
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── Products.jsx    # Products list page
│   │   ├── AddProduct.jsx  # Add new product page
│   │   └── EditProduct.jsx # Edit product page
│   │
│   ├── api.js              # All API calls to backend
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Entry point
│
├── public/                 # Static files
├── package.json            # Dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:5173
   ```

### First Time Setup

1. **Register an admin account**
   - Go to `/register`
   - Fill in your details
   - Enter admin secret: `MySpecialAdminPassword123`
   - Click "Create Admin Account"

2. **Start managing products**
   - You'll be automatically logged in
   - Navigate to "Products" from the sidebar
   - Click "Add New Product" to create your first product

## 🔧 How It Works

### Authentication Flow

```
1. User registers/logs in
   ↓
2. Backend validates credentials
   ↓
3. Backend returns JWT token
   ↓
4. Token stored in localStorage
   ↓
5. Token sent with every API request
   ↓
6. Backend verifies token
   ↓
7. Request processed
```

### Component Hierarchy

```
App.jsx (Router + Toast Container)
  ├── Login.jsx (Public)
  ├── Register.jsx (Public)
  └── ProtectedRoute (Checks authentication)
      ├── Dashboard.jsx
      │   └── Layout.jsx (Sidebar + Header)
      ├── Products.jsx
      │   └── Layout.jsx
      ├── AddProduct.jsx
      │   └── Layout.jsx
      └── EditProduct.jsx
          └── Layout.jsx
```

### Data Flow

```
User Action → Component → API Function → Backend → Database
                ↓                           ↓
            Update UI ← Response ← Backend ← Database
```

## 📚 API Documentation

### Authentication APIs

#### Register Admin
```javascript
adminRegister(name, email, password, adminSecret)
```
- **Purpose**: Create a new admin account
- **Parameters**:
  - `name`: Admin's full name
  - `email`: Admin's email
  - `password`: Admin's password
  - `adminSecret`: Secret key (must match backend)
- **Returns**: User object with token
- **Storage**: Saves token and user to localStorage

#### Login Admin
```javascript
adminLogin(email, password)
```
- **Purpose**: Login existing admin
- **Parameters**:
  - `email`: Admin's email
  - `password`: Admin's password
- **Returns**: User object with token
- **Validation**: Checks if user has `isAdmin: true`

#### Logout Admin
```javascript
adminLogout()
```
- **Purpose**: Logout current admin
- **Action**: Removes token and user from localStorage

### Product APIs

#### Get All Products
```javascript
getAllProducts()
```
- **Purpose**: Fetch all products
- **Returns**: Array of product objects
- **Auth**: Not required (public endpoint)

#### Get Product By ID
```javascript
getProductById(id)
```
- **Purpose**: Fetch single product details
- **Parameters**: `id` - Product ID
- **Returns**: Product object

#### Create Product
```javascript
createProduct(formData)
```
- **Purpose**: Create new product
- **Parameters**: FormData with:
  - `name`: Product name
  - `price`: Product price
  - `description`: Product description
  - `category`: Product category
  - `stock`: Stock quantity
  - `image`: Product image file
- **Auth**: Required (sends token in header)
- **Returns**: Created product object

#### Update Product
```javascript
updateProduct(id, formData)
```
- **Purpose**: Update existing product
- **Parameters**:
  - `id`: Product ID
  - `formData`: Same as createProduct
- **Auth**: Required
- **Returns**: Updated product object

#### Delete Product
```javascript
deleteProduct(id)
```
- **Purpose**: Delete a product
- **Parameters**: `id` - Product ID
- **Auth**: Required
- **Returns**: Success message

## 🎨 Key Technologies

- **React**: UI library
- **React Router**: Navigation between pages
- **React Toastify**: Toast notifications
- **React Icons**: Icon library
- **Tailwind CSS**: Styling
- **Vite**: Build tool (fast development)

## 🐛 Troubleshooting

### "Failed to fetch" error
- **Cause**: Backend server not running
- **Solution**: Start backend server on port 5000

### "Access denied" on login
- **Cause**: User account is not an admin
- **Solution**: Register with admin secret key

### Images not showing
- **Cause**: Wrong backend URL
- **Solution**: Check `API_BASE_URL` in `api.js`

### Token expired
- **Cause**: JWT token has expired
- **Solution**: Logout and login again

### Can't create products
- **Cause**: Not authenticated or token invalid
- **Solution**: Check if logged in, try logging out and back in

## 📝 Code Style Guide

### For Beginners

1. **Comments**: Every function has comments explaining what it does
2. **Naming**: Variables and functions have clear, descriptive names
3. **Structure**: Code is organized logically
4. **Error Handling**: All API calls have try-catch blocks
5. **User Feedback**: Toast notifications for all actions

### Best Practices Used

- ✅ Separation of concerns (API logic separate from UI)
- ✅ Reusable components (Layout, ProtectedRoute)
- ✅ Consistent error handling
- ✅ Loading states for better UX
- ✅ Form validation
- ✅ Responsive design
- ✅ Clean, readable code

## 🔐 Security Notes

1. **Admin Secret**: Change `MySpecialAdminPassword123` in backend `.env`
2. **HTTPS**: Use HTTPS in production
3. **Token Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)
4. **Input Validation**: Always validate user input
5. **File Upload**: Validate file types and sizes

## 📈 Future Enhancements

- [ ] Order management
- [ ] Customer management
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Bulk product upload
- [ ] Product categories management
- [ ] Inventory alerts
- [ ] Sales reports

## 🤝 Contributing

This is a beginner-friendly project. Feel free to:
- Add new features
- Improve documentation
- Fix bugs
- Enhance UI/UX

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

---

**Made with ❤️ for beginners learning React and full-stack development**
