import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (login(username, password)) {
      navigate("/admin/reviews");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 rounded-2xl border border-white/60 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
        <p className="text-gray-600 mb-6">Sign in to manage reviews</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full glass-light border border-white/60 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full glass-light border border-white/60 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            className="w-full glass-button text-white px-5 py-2.5 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

