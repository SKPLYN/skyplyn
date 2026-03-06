import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/authStore';
import { useStore } from './store/storeStore';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import StoreSelector from './pages/StoreSelector';
import AuthPage from './pages/AuthPage';
import './styles/globals.css';

function App() {
  const { isAuthenticated } = useAuth();
  const { selectedStore } = useStore();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (!selectedStore) {
    return <StoreSelector />;
  }

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
