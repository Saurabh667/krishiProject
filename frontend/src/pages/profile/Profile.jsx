import React from "react";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className={styles.dashboardContainer}>
      
      {/* Pest & Disease Detection */}
      <div className={styles.card}>
        <h2>Pest & Disease Detection</h2>
        <p>Upload a photo of your crop to detect pests and diseases.</p>
        <img
          src="https://i0.wp.com/netzeroindia.org/wp-content/uploads/2025/06/ChatGPT-Image-Jun-14-2025-07_36_41-PM.jpg"
          alt="Crop Example"
          className={styles.image}
        />
        <button className={styles.button}><Link to="/advisory">Upload Photo</Link></button>
        <p className={styles.example}>
          Example Result: Leaf spot disease detected – Apply fungicide.
        </p>
      </div>

      {/* Farmer Profile */}
      <div className={styles.card}>
        <h2>Farmer Profile</h2>
        <p>Your farm's configuration at a glance.</p>

        {/* Farmer Avatar */}
        <div className={styles.avatarContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
            alt="Farmer Avatar"
            className={styles.avatar}
          />
        </div>

        <div className={styles.profileDetails}>
          <p><strong>Name:</strong> Anu Sharma</p>
          <p><strong>Location:</strong> Kerala, India</p>
          <p><strong>Land Size:</strong> 5 Acres</p>
          <p><strong>Main Crop:</strong> Paddy</p>
          <p><strong>Soil Type:</strong> Alluvial</p>
          <p><strong>Irrigation:</strong> Drip Irrigation</p>
          <p><strong>Experience:</strong> 12 Years</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
          <p><strong>Email:</strong> anu.sharma@gmail.com</p>
        </div>

        {/* Farmer Badges */}
        <div className={styles.badges}>
          <span className={styles.badge}>🌱 Organic Farmer</span>
          <span className={styles.badge}>💧 Smart Irrigation</span>
          <span className={styles.badge}>🚜 Modern Equipment</span>
        </div>
        <div className={styles.updateBtn}><button className={styles.button}><Link to="/updateForm">Update Profile</Link></button></div>
      </div>

      {/* Previous Crop Yield */}
      <div className={styles.card}>
        <h2>Previous Crop Yield</h2>
        <p>Yield for Paddy over the last 3 years.</p>

        <img
          src="https://tse2.mm.bing.net/th/id/OIP.Y1C8Vyis7Sh8p5A-DH4LKgHaD1?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Yield Chart"
          className={styles.image}
        />

        {/* Yield Table */}
        <table className={styles.yieldTable}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Crop</th>
              <th>Yield (Quintals)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2022</td>
              <td>Paddy</td>
              <td>45</td>
            </tr>
            <tr>
              <td>2023</td>
              <td>Paddy</td>
              <td>52</td>
            </tr>
            <tr>
              <td>2024</td>
              <td>Paddy</td>
              <td>49</td>
            </tr>
          </tbody>
        </table>

        {/* Yield Highlights */}
        <div className={styles.yieldHighlights}>
          <p><strong>Best Year:</strong> 2023 (52 Quintals)</p>
          <p><strong>Average Yield:</strong> 48.6 Quintals</p>
          <span className={styles.badge}>📈 Improving Trend</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;