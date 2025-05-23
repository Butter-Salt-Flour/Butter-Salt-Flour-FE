import { create } from 'zustand';

// useAuthStore return type
interface AuthState {
  token: string | null;
  imgUrl: string | null;
  name: string | null;
  email: string | null;
  isLoggedIn: boolean;
  setAuth: (token: string, name: string, email: string, imgUrl: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  imgUrl: null,
  name: null,
  email: null,
  isLoggedIn: false,

  setAuth: (token, name, email, imgUrl) => {
    localStorage.setItem('token', token);
    set({
      token,
      name,
      email,
      imgUrl,
      isLoggedIn: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      token: null,
      imgUrl: null,
      name: null,
      email: null,
      isLoggedIn: false,
    });
  },
}));
