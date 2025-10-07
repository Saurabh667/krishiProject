// import React from "react";

// const Dashboard = () => {
//   return <h1>Welcome, Farmer! (Dashboard Page)</h1>;
// };

// export default Dashboard;
import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      {/* Welcome Section */}
      <h2 className={styles.welcome}>Welcome, Farmer!</h2>

      <div className={styles.topSection}>
        {/* Weather Advisory */}
        <div className={styles.weatherCard}>
          <h3>Weather Advisory</h3>
          <p className={styles.temperature}>30°C, Sunny</p>
          <p className={styles.note}>
            Rain expected tomorrow, consider delaying irrigation.
          </p>

          <div className={styles.forecast}>
            <div>
              <p>Tomorrow</p>
              <span>🌧️ 26°C</span>
            </div>
            <div>
              <p>Mon</p>
              <span>☁️ 28°C</span>
            </div>
            <div>
              <p>Tue</p>
              <span>☀️ 32°C</span>
            </div>
            <div>
              <p>Wed</p>
              <span>🌧️ 27°C</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className={styles.recommendations}>
          <h3>Recommendations</h3>
          <ul>
            <li>Add 50 kg urea this week for paddy.</li>
            <li>Irrigate twice this week.</li>
          </ul>
        </div>
      </div>

      {/* Market Prices */}
      <div className={styles.marketSection}>
        <h3>Market Prices (per Quintal)</h3>
        <table className={styles.marketTable}>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paddy</td>
              <td>₹2,203</td>
              <td className={styles.positive}>+1.5%</td>
            </tr>
            <tr>
              <td>Wheat</td>
              <td>₹2,700</td>
              <td className={styles.negative}>-0.8%</td>
            </tr>
            <tr>
              <td>Tomato</td>
              <td>₹3,500</td>
              <td className={styles.positive}>+5.2%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;