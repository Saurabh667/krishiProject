import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from '../assets/logo.png'; // Adjust path as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.navbarContainer}>
      {/* Hamburger Menu Toggle (visible only on mobile) */}
      <div className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </div>
      
      {/* Sidebar with KrishiSakhi branding */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* KrishiSakhi Logo and Brand Name */}
        <div className={styles.brandContainer}>
          <img src={logo} alt="KrishiSakhi Logo" className={styles.logo} />
          <h2 className={styles.brandName}>Krishi Sakhi</h2>
        </div>
        
        <br />
        <ul>
          <li>
            <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
          </li>
          <li>
            <Link to="/weather" onClick={() => setIsOpen(false)}>Weather & Climate</Link>
          </li>
          <li>
            <Link to="/advisory" onClick={() => setIsOpen(false)}>Crop & Advisory</Link>
          </li>
          <li>
            <Link to="/activity" onClick={() => setIsOpen(false)}>Activity & AI Recommendation</Link>
          </li>
          <li>
            <Link to="/calendar" onClick={() => setIsOpen(false)}>Crop Calendar</Link>
          </li>
          <li>
            <Link to="/prices" onClick={() => setIsOpen(false)}>Price & Market Trends</Link>
          </li>
          <li>
            <Link to="/chat" onClick={() => setIsOpen(false)}>Chat / Voice Assistant</Link>
          </li>
          <li>
            <Link to="/benefits" onClick={() => setIsOpen(false)}>Government Benefits</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;