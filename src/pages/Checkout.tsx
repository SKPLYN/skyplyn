import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Clock, MapPin, Trash2 } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { useStore } from '../store/storeStore';
import '../styles/checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, getTotalItems, removeItem, updateQuantity } = useCart();
  const { selectedStore } = useStore();
  const [pickupTime, setPickupTime] = useState('1-2');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate(`/order-confirmation/${Date.now()}`);
  };

  if (items.length === 0) {
    return (
      <div className="checkout">
        <div className="checkout-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h1>Shopping Cart</h1>
          <div /> {/* Spacer */}
        </div>

        <div className="empty-cart">
          <ShoppingCart size={64} />
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <button className="shop-btn" onClick={() => navigate('/shop')}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      {/* Header */}
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Shopping Cart</h1>
        <span className="item-count">{getTotalItems()}</span>
      </div>

      <div className="checkout-container">
        {/* Items List */}
        <div className="checkout-items">
          <h2>Items ({items.length})</h2>

          <div className="items-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">{item.image}</div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="checkout-summary">
          <div className="summary-section">
            <h3>Pickup Details</h3>
            <div className="pickup-info">
              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <p className="label">Store</p>
                  <p className="value">{selectedStore?.name || 'Not selected'}</p>
                </div>
              </div>
              <div className="info-item">
                <Clock size={20} />
                <div>
                  <p className="label">Ready in</p>
                  <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="time-select">
                    <option value="1-2">1-2 hours</option>
                    <option value="2-3">2-3 hours</option>
                    <option value="3-4">3-4 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <h3>Order Summary</h3>
            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Complete Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
