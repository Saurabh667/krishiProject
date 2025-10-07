import React from "react";
import { Link } from "react-router-dom";
import styles from "./UpperNav.module.css";
import logo from "../../../src/assets/logo.png"; // adjust path as needed

const UpperNav = () => {
  return (
    <div className={styles.upperNav}>
      {/* Logo & Title */}
      <div className={styles.leftSection}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1>Krishi Sakhi</h1>
      </div>

      {/* Auth Buttons */}
      <div className={styles.rightSection}>
        <Link to="/login" className={styles.btnLogin}>
          Login
        </Link>
        <Link to="/register" className={styles.btnSignup}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default UpperNav;