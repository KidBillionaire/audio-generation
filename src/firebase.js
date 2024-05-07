// Import Firebase SDK functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; // Import Realtime Database

// Your Firebase configuration object, including the database URL
const firebaseConfig = {
  apiKey: "AIzaSyCyMq8vwvjiptoN4mZVJfj1EJtlnyC-d8o",
  authDomain: "test-706d5.firebaseapp.com",
  projectId: "test-706d5",
  storageBucket: "test-706d5.appspot.com",
  messagingSenderId: "828662822289",
  appId: "1:828662822289:web:cb2888ac8ecce520d39630",
  databaseURL: "https://test-706d5-default-rtdb.firebaseio.com/" // Add the database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app); // Export the Realtime Database instance
