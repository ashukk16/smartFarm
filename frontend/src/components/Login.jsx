import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", formData);
      const { token, role, userId, username } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);

      toast.success("✅ Login successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch {
      toast.error("❌ Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="overlay" />
      <div className="auth-box">
        <h3 className="text-center mb-4">SmartFarm Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center mt-3">
            <small>
              Don’t have an account? <a href="/register">Register</a>
            </small>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Login;