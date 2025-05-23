import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  imgUrl: string | null;
  name: string | null;
  email: string | null;
  isLoggedIn: boolean;
  setAuth: (token: string, name: string, email: string, imgUrl: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      imgUrl: null,
      name: null,
      email: null,
      isLoggedIn: false,

      setAuth: (token, name, email, imgUrl) => {
        set({
          token,
          name,
          email,
          imgUrl,
          isLoggedIn: true,
        });
      },

      logout: () => {
        set({
          token: null,
          imgUrl: null,
          name: null,
          email: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
