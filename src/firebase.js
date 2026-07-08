import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDt_eGHc98ovKeuhEo7x1i33Hi9rxR8trQ",
  authDomain: "sub4links-store.firebaseapp.com",
  projectId: "sub4links-store",
  storageBucket: "sub4links-store.firebasestorage.app",
  messagingSenderId: "951780236077",
  appId: "1:951780236077:web:8bfcba69d977d30f67d1a4",
  measurementId: "G-RJG40Y5T4V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
