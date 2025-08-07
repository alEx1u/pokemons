// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD7Gq4VQnTtUF7yg1PUFUk-g83v6h32g88',
  authDomain: 'pokemon-5fddd.firebaseapp.com',
  projectId: 'pokemon-5fddd',
  storageBucket: 'pokemon-5fddd.firebasestorage.app',
  messagingSenderId: '293257745515',
  appId: '1:293257745515:web:5bb2241d9808c6420d4d2e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export type Collection = 'pokemons' | 'users';
