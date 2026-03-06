import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Clock,
  Zap,
  TrendingUp,
  Star,
  MapPin,
} from 'lucide-react';
import { useCart } from '../store/cartStore';
import { useStore } from '../store/storeStore';
import '../styles/home.css';

const FEATURED_DEALS = [
  {
    id: '1',
    category: 'Fresh Produce',
    discount: '30% OFF',
    emoji: '🥬',
    color: 'from-green-400 to-green-600',
  },
  {
    id: '2',
    category: 'Dairy',
    discount: '20% OFF',
    emoji: '🥛',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: '3',
    category: 'Bakery',
    discount: '25% OFF',
    emoji: '🍞',
    color: 'from-yellow-400 to-yellow-600',
  },
];

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Organic Apples',
    price: 4.99,
    emoji: '🍎',
    badge: 'Fresh Today',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Greek Yogurt',
    price: 5.99,
    emoji: '🥛',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Whole Bread',
    price: 3.49,
    emoji: '🍞',
    badge: 'Daily Fresh',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Fresh Lettuce',
    price: 2.99,
    emoji: '🥗',
    badge: 'Organic',
    rating: 4.8,
    reviews: 203,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { selectedStore } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddProduct = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.emoji,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${searchQuery}`);
    }
  };

  return (
    <div className="home">
      {/* === HERO SECTION === */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Skip the<br />
            <span className="gradient-text">Line Today</span>
          </h1>
          <p className="hero-subtitle">
            Order groceries in advance, skip the line, and pick up in 2 hours!
          </p>

          {/* Search */}
          <form className="search-form" onSubmit={handleSearch}>
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Info */}
          {selectedStore && (
            <div className="quick-info">
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <p className="info-label">Pickup From</p>
                  <p className="info-value">{selectedStore.name}</p>
                </div>
              </div>
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <p className="info-label">Ready in</p>
                  <p className="info-value">~2 hours</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="hero-decoration">🛍️</div>
        </div>
      </section>

      {/* === DEALS SECTION === */}
      <section className="section">
        <div className="section-header">
          <h2>Today's Deals</h2>
          <button className="view-all-link" onClick={() => navigate('/shop')}>
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="deals-grid">
          {FEATURED_DEALS.map((deal) => (
            <button
              key={deal.id}
              className="deal-card"
              onClick={() => navigate(`/shop?category=${deal.category}`)}
            >
              <div className={`deal-emoji`}>{deal.emoji}</div>
              <div className="deal-info">
                <h3>{deal.category}</h3>
                <span className="discount-badge">{deal.discount}</span>
              </div>
              <div className="deal-arrow">→</div>
            </button>
          ))}
        </div>
      </section>

      {/* === FEATURED PRODUCTS === */}
      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <button className="view-all-link" onClick={() => navigate('/shop')}>
            Browse All <ArrowRight size={16} />
          </button>
        </div>

        <div className="products-grid">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.emoji}</span>
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
              </div>

              <div className="product-body">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-rating">
                  <Star size={14} className="star" />
                  <span className="rating-value">{product.rating}</span>
                  <span className="rating-count">({product.reviews})</span>
                </div>

                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button
                    className="add-btn"
                    onClick={() => handleAddProduct(product)}
                    title="Add to cart"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === BENEFITS SECTION === */}
      <section className="section benefits-section">
        <h2 className="benefits-title">Why Shop SkipLine?</h2>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon zap">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Pickup in 15-30 minutes, not hours</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon fresh">🌿</div>
            <h3>Always Fresh</h3>
            <p>Hand-picked quality items</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon save">💰</div>
            <h3>Great Deals</h3>
            <p>Daily discounts and exclusive offers</p>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="section cta-section">
        <h2>Ready to Shop?</h2>
        <button
          className="cta-button"
          onClick={() => navigate('/shop')}
        >
          Start Shopping
          <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
}
