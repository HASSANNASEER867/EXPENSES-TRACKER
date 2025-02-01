// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrgouLEepdHZ1-2N74aOT5anWYilYLXhM",
    authDomain: "expense-tracker-c9e6a.firebaseapp.com",
    databaseURL: "https://expense-tracker-c9e6a-default-rtdb.firebaseio.com",
    projectId: "expense-tracker-c9e6a",
    storageBucket: "expense-tracker-c9e6a.firebasestorage.app",
    messagingSenderId: "483725684301",
    appId: "1:483725684301:web:ed86d0ed2885cd9b8c7604"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
