import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Navigation, ArrowRight } from 'lucide-react';
import { useStore } from '../store/storeStore';
import '../styles/store-selector.css';

export default function StoreSelector() {
  const navigate = useNavigate();
  const { stores, setSelectedStore, getNearestStores } = useStore();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestStores, setNearestStores] = useState(stores);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          const nearest = getNearestStores(latitude, longitude, 5);
          setNearestStores(nearest);
        },
        () => {
          // Default to mock stores if geolocation fails
          setNearestStores(stores);
        }
      );
    }
  }, []);

  const handleSelectStore = (store: any) => {
    setSelectedStore(store);
    navigate('/');
  };

  return (
    <div className="store-selector">
      <div className="selector-header">
        <h1>Select Your Store</h1>
        <p>Choose a convenient location for pickup</p>
      </div>

      <div className="selector-container">
        <div className="stores-grid">
          {nearestStores.map((store) => (
            <div key={store.id} className="store-card">
              <div className="store-icon">
                <MapPin size={32} />
              </div>

              <h3 className="store-name">{store.name}</h3>
              <p className="store-address">{store.address}</p>

              <div className="store-info">
                <div className="info-item">
                  <Navigation size={16} />
                  <span>{store.distance?.toFixed(1) || '0'} km away</span>
                </div>

                <div className="info-item">
                  <Clock size={16} />
                  <span>{store.avgWaitTime || '15'} min wait</span>
                </div>

                <div className="info-item">
                  <Star size={16} className="star" />
                  <span>{store.rating || '4.8'} ({store.reviews || '100'})</span>
                </div>
              </div>

              <p className="store-hours">Open: {store.hours}</p>

              <button
                className="select-btn"
                onClick={() => handleSelectStore(store)}
              >
                Select Store
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
