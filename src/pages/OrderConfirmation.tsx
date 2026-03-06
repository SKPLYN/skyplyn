import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { useStore } from '../store/storeStore';
import '../styles/order-confirmation.css';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { items, getTotalPrice, clearCart } = useCart();
  const { selectedStore } = useStore();

  useEffect(() => {
    // Clear cart after order confirmation
    const timer = setTimeout(() => {
      clearCart();
    }, 3000);
    return () => clearTimeout(timer);
  }, [clearCart]);

  const orderTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const pickupTime = new Date(Date.now() + 20 * 60000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        {/* Success Icon */}
        <div className="success-icon">
          <CheckCircle size={80} />
        </div>

        {/* Message */}
        <h1>Order Confirmed!</h1>
        <p className="order-number">Order #{orderId}</p>

        {/* Order Details */}
        <div className="order-details">
          <div className="detail-item">
            <Clock size={24} />
            <div>
              <p className="label">Pickup Time</p>
              <p className="value">{pickupTime}</p>
            </div>
          </div>

          <div className="detail-item">
            <MapPin size={24} />
            <div>
              <p className="label">Pickup Location</p>
              <p className="value">{selectedStore?.name || 'Selected Store'}</p>
            </div>
          </div>

          <div className="detail-item">
            <Package size={24} />
            <div>
              <p className="label">Items</p>
              <p className="value">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {items.map((item) => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.name} x {item.quantity}</span>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ol>
            <li>You'll receive an SMS notification when your order is ready</li>
            <li>Head to the store and proceed to the pickup counter</li>
            <li>Show your order number and pick up your groceries</li>
            <li>Pay at the counter or use contactless payment</li>
          </ol>
        </div>

        {/* Actions */}
        <div className="actions">
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to Home
            <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
