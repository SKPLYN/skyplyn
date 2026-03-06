import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import { useCart } from '../store/cartStore';
import '../styles/shop.css';

const ALL_PRODUCTS = [
  { id: '1', name: 'Organic Apples', price: 4.99, category: 'Fruits', emoji: '🍎', rating: 4.8, reviews: 124 },
  { id: '2', name: 'Bananas', price: 2.49, category: 'Fruits', emoji: '🍌', rating: 4.9, reviews: 256 },
  { id: '3', name: 'Lettuce', price: 2.99, category: 'Vegetables', emoji: '🥗', rating: 4.7, reviews: 89 },
  { id: '4', name: 'Carrots', price: 1.99, category: 'Vegetables', emoji: '🥕', rating: 4.8, reviews: 156 },
  { id: '5', name: 'Tomatoes', price: 3.49, category: 'Vegetables', emoji: '🍅', rating: 4.6, reviews: 203 },
  { id: '6', name: 'Greek Yogurt', price: 5.99, category: 'Dairy', emoji: '🥛', rating: 4.9, reviews: 342 },
  { id: '7', name: 'Cheese', price: 6.99, category: 'Dairy', emoji: '🧀', rating: 4.7, reviews: 198 },
  { id: '8', name: 'Whole Bread', price: 3.49, category: 'Bakery', emoji: '🍞', rating: 4.7, reviews: 267 },
  { id: '9', name: 'Milk', price: 3.99, category: 'Dairy', emoji: '🥛', rating: 4.8, reviews: 412 },
  { id: '10', name: 'Eggs', price: 4.49, category: 'Dairy', emoji: '🥚', rating: 4.9, reviews: 324 },
];

const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery'];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddProduct = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.emoji,
      category: product.category,
    });
  };

  return (
    <div className="shop">
      {/* === HEADER === */}
      <div className="shop-header">
        <h1>Shop</h1>
        <p>Browse all our fresh products</p>
      </div>

      <div className="shop-container">
        {/* === FILTERS SIDEBAR === */}
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            <div className="category-list">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="shop-main">
          {/* Search Bar */}
          <div className="shop-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Results */}
          <div className="results-info">
            <p>Showing {filteredProducts.length} products</p>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <span className="product-emoji">{product.emoji}</span>
                </div>
                <div className="product-body">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="product-rating">
                    <Star size={14} className="star" />
                    <span>{product.rating}</span>
                    <span className="rating-count">({product.reviews})</span>
                  </div>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button
                      className="add-btn"
                      onClick={() => handleAddProduct(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
