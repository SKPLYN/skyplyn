import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  X,
  MapPin,
  LogOut,
} from 'lucide-react';
import { useCart } from '../store/cartStore';
import { useAuth } from '../store/authStore';
import { useStore } from '../store/storeStore';
import '../styles/header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const { selectedStore } = useStore();
  const totalItems = items.length;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">SkpLyn</span>
        </Link>

        {/* Store Info - Desktop */}
        {selectedStore && (
          <div className="store-info-desktop">
            <MapPin size={16} />
            <span className="store-name">{selectedStore.name}</span>
          </div>
        )}

        {/* Right Actions */}
        <div className="header-actions">
          {/* Cart Icon */}
          <Link to="/checkout" className="cart-link">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="mobile-menu">
          {selectedStore && (
            <div className="menu-store-info">
              <MapPin size={18} />
              <div>
                <p className="menu-label">Pickup From</p>
                <p className="menu-store">{selectedStore.name}</p>
              </div>
            </div>
          )}

          <Link to="/" className="menu-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" className="menu-link" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/orders" className="menu-link" onClick={() => setIsMenuOpen(false)}>
            Orders
          </Link>

          {user && (
            <>
              <div className="menu-divider" />
              <div className="menu-user">
                <p className="menu-user-name">{user.name}</p>
                <p className="menu-user-email">{user.email}</p>
              </div>
              <button className="menu-logout" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
