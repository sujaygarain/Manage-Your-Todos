
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      await resetPassword(email);
      setMessage("Password reset link sent in your emaild id.");
    } catch {
      setError("Invalid Email Address!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 to-gray-700">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        {error && <p className="text-gray-950 text-base text-center mb-4">{error}</p>}
        {message && <p className="text-blue-700 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition-all duration-200"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;