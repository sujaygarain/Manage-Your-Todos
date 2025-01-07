
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
//   confirmPasswordReset,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { app } from "../firebaseConfig";

// const auth = getAuth(app);

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const signup = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     return signOut(auth);
//   };

//   const resetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };

//   const confirmResetPassword = (oobCode, newPassword) => {
//     return confirmPasswordReset(auth, oobCode, newPassword);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     resetPassword,
//     confirmResetPassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
//   confirmPasswordReset,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { app } from "../firebaseConfig";

// const auth = getAuth(app);

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   let logoutTimeout;

//   const startLogoutTimer = () => {
//     clearTimeout(logoutTimeout);
//     logoutTimeout = setTimeout(() => {
//       logout();
//       alert("You have been logged out due to inactivity.");
//     }, 2 * 60 * 1000); // 2 minutes
//   };

//   const resetLogoutTimer = () => {
//     startLogoutTimer();
//   };

//   const signup = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     clearTimeout(logoutTimeout);
//     return signOut(auth);
//   };

//   const resetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };

//   const confirmResetPassword = (oobCode, newPassword) => {
//     return confirmPasswordReset(auth, oobCode, newPassword);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);

//       if (user) {
//         startLogoutTimer();
//         window.addEventListener("mousemove", resetLogoutTimer);
//         window.addEventListener("keydown", resetLogoutTimer);
//       } else {
//         window.removeEventListener("mousemove", resetLogoutTimer);
//         window.removeEventListener("keydown", resetLogoutTimer);
//       }
//     });

//     return () => {
//       clearTimeout(logoutTimeout);
//       window.removeEventListener("mousemove", resetLogoutTimer);
//       window.removeEventListener("keydown", resetLogoutTimer);
//       unsubscribe();
//     };
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     resetPassword,
//     confirmResetPassword,
//   };

//   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
// };


// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const startInactivityTimer = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => logout(), 2 * 60 * 1000); // 2 minutes
    setTimeoutId(id);
  };

  const clearInactivityTimer = () => {
    if (timeoutId) clearTimeout(timeoutId);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    clearInactivityTimer();
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const confirmResetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) startInactivityTimer();
    });

    return unsubscribe;
  }, []);

  // Reset inactivity timer on user interaction
  useEffect(() => {
    const resetTimer = () => startInactivityTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    confirmResetPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// // src/contexts/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const logout = async () => {
//     try {
//       clearInactivityTimer();
//       await signOut(auth);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const clearInactivityTimer = () => {
//     if (window.inactivityTimer) {
//       clearTimeout(window.inactivityTimer);
//       window.inactivityTimer = null;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     const resetTimer = () => {
//       clearInactivityTimer();
//       window.inactivityTimer = setTimeout(() => {
//         logout();
//       }, 120000); // 2 minutes
//     };

//     window.addEventListener("mousemove", resetTimer);
//     window.addEventListener("keypress", resetTimer);

//     return () => {
//       unsubscribe();
//       clearInactivityTimer();
//       window.removeEventListener("mousemove", resetTimer);
//       window.removeEventListener("keypress", resetTimer);
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
