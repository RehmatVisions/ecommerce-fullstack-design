// Import React and necessary hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { showSuccess, showError } from '../utils/toast';
// Import EmailJS for sending order confirmation emails
import emailjs from '@emailjs/browser';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  // Delivery information state
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calculate totals
  const subtotal = cart.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const deliveryFee = subtotal > 100 ? 0 : 10; // Free delivery over $100
  const total = subtotal + deliveryFee;

  // Handle input changes
  const handleInputChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validate cart
    if (!cart.items || cart.items.length === 0) {
      showError('Your cart is empty');
      navigate('/cart');
      return;
    }

    // Validate form
    if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city) {
      showError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    // EmailJS configuration - Same as quote form
    const serviceID = 'service_x6kp0jm';
    const templateID = 'template_sl9oiv5';
    const publicKey = 'HjtNI0vYBWsimtaOh';

    // Prepare order items list for email
    const itemsList = cart.items?.map((item, index) => {
      const product = item.product || {};
      return `${index + 1}. ${product.name} - Qty: ${item.quantity} - Price: $${(product.price * item.quantity).toFixed(2)}`;
    }).join('\n');

    // Prepare email data
    const templateParams = {
      to_email: 'itsrehmet@gmail.com',
      from_name: deliveryInfo.fullName,
      customer_name: deliveryInfo.fullName,
      customer_email: deliveryInfo.email || 'Not provided',
      customer_phone: deliveryInfo.phone,
      delivery_address: deliveryInfo.address,
      city: deliveryInfo.city,
      zip_code: deliveryInfo.zipCode || 'Not provided',
      order_notes: deliveryInfo.notes || 'No special instructions',
      items_list: itemsList,
      subtotal: subtotal.toFixed(2),
      delivery_fee: deliveryFee.toFixed(2),
      total_amount: total.toFixed(2),
      payment_method: 'Cash on Delivery',
      message: `
NEW ORDER RECEIVED!

Customer Information:
- Name: ${deliveryInfo.fullName}
- Email: ${deliveryInfo.email || 'Not provided'}
- Phone: ${deliveryInfo.phone}

Delivery Address:
${deliveryInfo.address}
${deliveryInfo.city}, ${deliveryInfo.zipCode || ''}

Order Items:
${itemsList}

Order Summary:
- Subtotal: $${subtotal.toFixed(2)}
- Delivery Fee: $${deliveryFee.toFixed(2)}
- Total: $${total.toFixed(2)}

Payment Method: Cash on Delivery

Special Instructions:
${deliveryInfo.notes || 'None'}
      `
    };

    try {
      // Send order confirmation email using EmailJS
      await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      // Clear cart after successful order (without showing cart clear message)
      await clearCart(false);
      
      // Show success modal
      setOrderSuccess(true);
      
      // Navigate to home page after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000);
      
    } catch (error) {
      console.error('Order email error:', error);
      
      // Still clear cart and show success even if email fails (without showing cart clear message)
      await clearCart(false);
      setOrderSuccess(true);
      
      // Navigate to home page
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if cart is empty
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Section - Delivery Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
              
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={deliveryInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={deliveryInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Street address, apartment, suite, etc."
                    required
                  ></textarea>
                </div>

                {/* City and Zip Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={deliveryInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="12345"
                    />
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={deliveryInfo.notes}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Any special instructions for delivery..."
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-6">
                  <h3 className="font-bold text-lg mb-3">Payment Method</h3>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg border-2 border-blue-500">
                    <div className="text-3xl">💵</div>
                    <div>
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 hover:shadow-lg active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 mt-6"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Order...
                    </span>
                  ) : (
                    'Place Order - Cash on Delivery'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.items?.map((item) => {
                  const product = item.product || {};
                  return (
                    <div key={item._id || product._id} className="flex gap-3 pb-3 border-b border-gray-100">
                      <img
                        src={product.image || product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-contain bg-gray-50 rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-blue-600">${(product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-gray-500">
                    💡 Add ${(100 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
              </div>

              {/* Payment Info */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Pay ${total.toFixed(2)} when you receive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Order Placed Successfully! 🎉
            </h2>
            
            <p className="text-gray-600 mb-6">
              Your order has been sent to <span className="font-bold text-blue-600">Brand</span>
            </p>

            {/* Order Details */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-semibold text-gray-900">Order Total</p>
                  <p className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">💵</span>
                <div>
                  <p className="font-semibold text-gray-900">Payment Method</p>
                  <p className="text-gray-700">Cash on Delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-900">Delivery To</p>
                  <p className="text-gray-700 text-sm">{deliveryInfo.city}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <span className="font-semibold">✓ Confirmation sent to Brand</span>
                <br />
                We will contact you at <span className="font-semibold">{deliveryInfo.phone}</span> for delivery confirmation
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
            >
              Continue Shopping
            </button>

            {/* Auto redirect message */}
            <p className="text-xs text-gray-500 mt-4">
              Redirecting to home page in 5 seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
