import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCV1SKqxI2l5OzB4j7jCvvojEvxDQ7Wnyo',
  authDomain: 'buttersaltflour-auth.firebaseapp.com',
  projectId: 'buttersaltflour-auth',
  storageBucket: 'buttersaltflour-auth.appspot.com',
  messagingSenderId: '212467582253',
  appId: '1:212467582253:web:25f74fb23c59eed0aa3fa4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
