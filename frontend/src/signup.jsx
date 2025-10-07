import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:3001/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Signup error:", err);
        setError("Signup failed. Try again!");
      });
  };

  return (
    <>
      <style>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #eafaf1, #d4f5dd);
          font-family: "Segoe UI", Arial, sans-serif;
          padding: 15px;
        }
        .signup-card {
          background: white;
          padding: 35px 30px;
          border-radius: 14px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .signup-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #2e7d32;
        }
        .signup-subtitle {
          font-size: 14px;
          margin-bottom: 25px;
          color: #555;
        }
        .signup-card label {
          font-size: 14px;
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
          text-align: left;
          color: #333;
        }
        .signup-card input {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          transition: border 0.3s;
        }
        .signup-card input:focus {
          border-color: #28a745;
          outline: none;
        }
        .error-message {
          color: red;
          font-size: 13px;
          margin-bottom: 10px;
        }
        .signup-card button {
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
        .signup-card button:hover {
          background: #1e7a34;
        }
        .signup-card p {
          margin-top: 18px;
          font-size: 14px;
          color: #333;
        }
        .signup-card p a {
          color: #28a745;
          text-decoration: none;
          font-weight: bold;
        }
        .signup-card p a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Krishi Sakhi</h2>
          <p className="signup-subtitle">Empowering Farmers with Technology</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Signup</button>
          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
