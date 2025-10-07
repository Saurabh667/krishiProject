// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data === "Success") {
          navigate("/");
        } else {
          setError(result.data || "Invalid email or password");
        }
      })
      .catch((err) => {
        console.log("Login error:", err);
        setError("Something went wrong. Try again!");
      });
  };

  return (
    <>
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #eafaf1, #d4f5dd);
          font-family: "Segoe UI", Arial, sans-serif;
          padding: 15px;
        }
        .login-card {
          background: white;
          padding: 35px 30px;
          border-radius: 14px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .login-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #2e7d32;
        }
        .login-subtitle {
          font-size: 14px;
          margin-bottom: 25px;
          color: #555;
        }
        .login-card label {
          font-size: 14px;
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
          text-align: left;
          color: #333;
        }
        .login-card input {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          transition: border 0.3s;
        }
        .login-card input:focus {
          border-color: #28a745;
          outline: none;
        }
        .error-message {
          color: red;
          font-size: 13px;
          margin-bottom: 10px;
        }
        .login-card button {
          width: 100%;
          padding: 12px;
          background: #28a745;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }
        .login-card button:hover {
          background: #1e7a34;
        }
        .login-card p {
          margin-top: 18px;
          font-size: 14px;
          color: #333;
        }
        .login-card p a {
          color: #28a745;
          text-decoration: none;
          font-weight: bold;
        }
        .login-card p a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Krishi Sakhi</h2>
          <p className="login-subtitle">Welcome back, farmer friend 🌱</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p>
            Don’t have an account? <Link to="/register">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
