# E-commerce Design - React + Tailwind CSS

A pixel-perfect e-commerce homepage design built with React and Tailwind CSS.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local server URL (usually http://localhost:5173)

## Build for Production

```bash
npm run build
```

## Features

### Home Page
- Responsive header with search bar
- Sidebar navigation
- Hero section with promotional banners
- Deals and offers section with countdown timer
- Product categories (Home & Outdoor, Electronics)
- Quote request form
- Recommended items grid
- Services showcase
- Suppliers by region
- Newsletter subscription
- Comprehensive footer

### Product Listing Page
- Advanced filtering sidebar (Category, Brands, Features, Price Range, Condition, Ratings)
- Product grid/list view toggle
- Product cards with images, pricing, ratings, and descriptions
- Pagination
- Breadcrumb navigation
- Verified products filter
- Sort by featured option

### Shopping Cart Page
- Cart items list with product details
- Quantity selector for each item
- Remove and Save for later options
- Coupon code input
- Price breakdown (Subtotal, Discount, Tax)
- Total calculation
- Checkout button with payment method icons
- Security features display (Secure payment, Customer support, Free delivery)
- Saved for later section
- Promotional discount banner

## Tech Stack

- React 18
- Tailwind CSS 3
- Vite

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── HeroSection.jsx
│   ├── DealsSection.jsx
│   ├── HomeGadgets.jsx
│   ├── ComputerSection.jsx
│   ├── SendRequest.jsx
│   ├── RecommendedItems.jsx
│   ├── OurServices.jsx
│   ├── SuppliersByRegion.jsx
│   ├── Newsletter.jsx
│   ├── Footer.jsx
│   ├── listing/
│   │   ├── Breadcrumb.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ProductGrid.jsx
│   │   └── ProductCard.jsx
│   └── cart/
│       ├── CartHeader.jsx
│       ├── CartItems.jsx
│       ├── CartSummary.jsx
│       ├── CartFeatures.jsx
│       ├── SavedForLater.jsx
│       └── DiscountBanner.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProductListing.jsx
│   └── CartPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Navigation

Use the floating buttons in the bottom-right corner to switch between:
- **Home** - Main e-commerce homepage
- **Listing** - Product search and filtering page
- **Cart** - Shopping cart with checkout
