// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyd3SCioY0UuaBlHxL1-je1O2gYai2tvI",
  authDomain: "expense-tracker-d5e95.firebaseapp.com",
  projectId: "expense-tracker-d5e95",
  storageBucket: "expense-tracker-d5e95.firebasestorage.app",
  messagingSenderId: "776967212638",
  appId: "1:776967212638:web:0c294f494b0586419e6ecf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
