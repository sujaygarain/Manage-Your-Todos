
// import { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate, useSearchParams } from "react-router-dom";

// function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const { confirmResetPassword } = useAuth();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const oobCode = searchParams.get("oobCode");

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       setError("");
//       if (!oobCode) throw new Error("Invalid or missing reset code.");
//       await confirmResetPassword(oobCode, password);
//       setSuccess(true);
//       setTimeout(() => navigate("/login"), 3000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 to-gray-700">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
//           Set New Password
//         </h2>
//         {error && <p className="text-gray-950 text-center mb-4">{error}</p>}
//         {success && (
//           <p className="text-blue-700 text-center mb-4">
//             Password reset successful. Redirecting to login...
//           </p>
//         )}
//         <form onSubmit={handleReset} className="space-y-6">
//           <div>
//             <input
//               type="password"
//               placeholder="New Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition-all duration-200"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebaseConfig";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);
    const oobCode = params.get("oobCode");

    if (!oobCode) {
      setError("Invalid or missing reset code.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div>
      {success ? (
        <p>Password has been reset successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <button type="submit">Reset Password</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
