import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const DebugAuthStatus = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const token = localStorage.getItem('token');

  return (
    <div className="fixed bottom-6 left-6 z-30">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg hover:bg-gray-800 transition-all"
        >
          🐛 Debug
        </button>
      ) : (
        <div className="bg-gray-900 text-white p-4 rounded-lg text-xs shadow-2xl max-w-xs border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">🐛 Debug Info</h3>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>{isAuthenticated ? 'Logged in' : 'Not logged in'}</span>
            </div>
            {user && (
              <p className="pl-4">
                <span className="text-gray-500">User:</span> {user.name}
              </p>
            )}
            <p className="pl-4">
              <span className="text-gray-500">Token:</span> {token ? '✓ Present' : '✗ None'}
            </p>
            <p className="pl-4">
              <span className="text-gray-500">Cart:</span> {cart.items?.length || 0} items
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugAuthStatus;
