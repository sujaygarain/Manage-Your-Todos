

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhwWuB4Lfaewgqwy1o2-A-cFAB7-BHrDs",
  authDomain: "todo-context-ebcb5.firebaseapp.com",
  projectId: "todo-context-ebcb5",
  storageBucket: "todo-context-ebcb5.firebasestorage.app",
  messagingSenderId: "866151393014",
  appId: "1:866151393014:web:453fff4af41610c527aed7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

