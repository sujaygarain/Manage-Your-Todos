

// // src/firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDhwWuB4Lfaewgqwy1o2-A-cFAB7-BHrDs",
//   authDomain: "todo-context-ebcb5.firebaseapp.com",
//   projectId: "todo-context-ebcb5",
//   storageBucket: "todo-context-ebcb5.appspot.com",
//   messagingSenderId: "866151393014",
//   appId: "1:866151393014:web:453fff4af41610c527aed7",
// };

// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyDhwWuB4Lfaewgqwy1o2-A-cFAB7-BHrDs",
// //   authDomain: "todo-context-ebcb5.firebaseapp.com",
// //   projectId: "todo-context-ebcb5",
// //   storageBucket: "todo-context-ebcb5.firebasestorage.app",
// //   messagingSenderId: "866151393014",
// //   appId: "1:866151393014:web:453fff4af41610c527aed7",
// //   measurementId: "G-NT0XJR6WHY"
// // };
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);


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

// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBM5HF-Ij5fnv9dxYhuICmLLfkhM7EZfNg",
//   authDomain: "todo-authentication.firebaseapp.com",
//   projectId: "todo-authentication",
//   storageBucket: "todo-authentication.appspot.com",
//   messagingSenderId: "374780143174",
//   appId: "1:374780143174:web:3e37bd7cf2fa76a1ae5b12",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// export { app, db };
