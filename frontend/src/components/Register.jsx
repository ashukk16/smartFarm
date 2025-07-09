import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "FARMER",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/register", formData);
      toast.success("✅ Registered successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      toast.error("❌ Username already taken!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="overlay" />
      <div className="auth-box">
        <h3 className="text-center mb-4">SmartFarm Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="FARMER">FARMER</option>
              <option value="EXPERT">EXPERT</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="text-center mt-3">
            <small>
              Already have an account? <a href="/">Login</a>
            </small>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Register;