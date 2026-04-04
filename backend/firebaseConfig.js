import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO2hCxugb8lb4Lpw8wzgmbQZQhbzEH_mE",
  authDomain: "silentvoice-d2119.firebaseapp.com",
  projectId: "silentvoice-d2119",
  storageBucket: "silentvoice-d2119.firebasestorage.app",
  messagingSenderId: "1046134350763",
  appId: "1:1046134350763:web:958648a602718681b368ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export these so authSlice.js can use them
export const auth = getAuth(app);
export const db = getFirestore(app);