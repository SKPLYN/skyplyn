import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Store {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: string;
  distance?: number; // in km
  avgWaitTime?: number; // in minutes
  rating?: number;
  reviews?: number;
}

interface StoreStore {
  selectedStore: Store | null;
  stores: Store[];
  setSelectedStore: (store: Store) => void;
  setStores: (stores: Store[]) => void;
  getNearestStores: (lat: number, lng: number, limit?: number) => Store[];
}

const MOCK_STORES: Store[] = [
  {
    id: '1',
    name: 'Downtown Market',
    address: '123 Main St, City Center',
    latitude: 40.7128,
    longitude: -74.006,
    hours: '6am - 11pm',
    distance: 0.5,
    avgWaitTime: 5,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: '2',
    name: 'Westside Supermarket',
    address: '456 West Ave, West District',
    latitude: 40.7489,
    longitude: -74.0123,
    hours: '7am - 10pm',
    distance: 2.3,
    avgWaitTime: 8,
    rating: 4.6,
    reviews: 287,
  },
  {
    id: '3',
    name: 'Express Shop',
    address: '789 North St, Uptown',
    latitude: 40.7614,
    longitude: -73.9776,
    hours: '8am - 9pm',
    distance: 3.1,
    avgWaitTime: 12,
    rating: 4.5,
    reviews: 198,
  },
];

export const useStore = create<StoreStore>()(
  persist(
    (set, get) => ({
      selectedStore: null,
      stores: MOCK_STORES,

      setSelectedStore: (store: Store) => {
        set({ selectedStore: store });
      },

      setStores: (stores: Store) => {
        set({ stores });
      },

      getNearestStores: (lat: number, lng: number, limit = 5) => {
        const stores = get().stores;
        const sorted = stores
          .map((store) => ({
            ...store,
            distance: Math.sqrt(
              Math.pow(store.latitude - lat, 2) + Math.pow(store.longitude - lng, 2)
            ) * 111, // Convert to km approximately
          }))
          .sort((a, b) => (a.distance || 0) - (b.distance || 0));
        return sorted.slice(0, limit);
      },
    }),
    {
      name: 'store-storage',
    }
  )
);
