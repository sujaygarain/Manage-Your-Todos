
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import { TodoProvider } from "./contexts/TodoContext";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Todos from "./pages/Todos";
// import ProtectedRoute from "./pages/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <TodoProvider>
//           <Routes>
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Todos />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </TodoProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Todos from "./pages/Todos";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              }
            />
          </Routes>
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
