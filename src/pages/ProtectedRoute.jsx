
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) return <p>Loading...</p>;

  return currentUser ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
