import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn-home">
        Go Back Home
      </Link>

      {/* Inline CSS in <style> tag */}
      <style>
        {`
          .notfound-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            background: #f8f9fa;
            font-family: Arial, sans-serif;
          }

          .notfound-container h1 {
            font-size: 6rem;
            margin: 0;
            color: #ff4d4f;
          }

          .notfound-container p {
            font-size: 1.2rem;
            margin: 10px 0 20px;
            color: #333;
          }

          .btn-home {
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            transition: background 0.3s ease;
          }

          .btn-home:hover {
            background: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default PageNotFound;
