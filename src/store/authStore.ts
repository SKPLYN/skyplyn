import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, phone: string) => Promise<void>;
  updateProfile: (user: Partial<User>) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Mock authentication - replace with real API call
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockUser: User = {
              id: '1',
              name: 'John Doe',
              email,
              phone: '+1234567890',
            };
            set({
              user: mockUser,
              isAuthenticated: true,
            });
            resolve();
          }, 500);
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      signup: async (name: string, email: string, password: string, phone: string) => {
        // Mock signup - replace with real API call
        return new Promise((resolve) => {
          setTimeout(() => {
            const newUser: User = {
              id: Math.random().toString(),
              name,
              email,
              phone,
            };
            set({
              user: newUser,
              isAuthenticated: true,
            });
            resolve();
          }, 500);
        });
      },

      updateProfile: (profileData: Partial<User>) => {
        set((state) => ({
          user: state.user
            ? { ...state.user, ...profileData }
            : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
