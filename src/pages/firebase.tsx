// firebase.ts
import { initializeApp, type FirebaseOptions, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";
import { getAuth,type  Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD8PdJj_hko9SftqcUlUJjQf-sxGf1As9g",
  authDomain: "community-connect-454d3.firebaseapp.com",
  projectId: "community-connect-454d3",
  storageBucket: "community-connect-454d3.firebasestorage.app",
  messagingSenderId: "643163865031",
  appId: "1:643163865031:web:4c2f63317664f603b563e2",
  measurementId: "G-48KRJRKXQP",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Analytics is only available in browser environments
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export { analytics };
export default app;
