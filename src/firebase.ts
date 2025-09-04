// Import the functions you need from the SDKs
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8PdJj_hko9SftqcUlUJjQf-sxGf1As9g",
  authDomain: "community-connect-454d3.firebaseapp.com",
  projectId: "community-connect-454d3",
  storageBucket: "community-connect-454d3.firebasestorage.app",
  messagingSenderId: "643163865031",
  appId: "1:643163865031:web:4c2f63317664f603b563e2",
  measurementId: "G-48KRJRKXQP"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics (optional - can be null if not supported)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  // Use void operator to handle the promise without awaiting
  void isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Auth and Firestore
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// Export what you need
export { app, analytics, auth, db };