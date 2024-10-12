import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDl4lKXK0jghCbDhyOAHA0mCSQyPiV9y-0",
  authDomain: "esportsmanager-ded65.firebaseapp.com",
  projectId: "esportsmanager-ded65",
  storageBucket: "esportsmanager-ded65.appspot.com",
  messagingSenderId: "35696086940",
  appId: "1:35696086940:web:91aec7749c17b58b00c259",
  measurementId: "G-84BC5M82RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
