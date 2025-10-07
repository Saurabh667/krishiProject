// import React from "react";

import styles from "./Weather.module.css";

export default function Weather() {
  const forecast = [
    { day: "Tomorrow", temp: "26°C", icon: "🌧" },
    { day: "Mon", temp: "28°C", icon: "☁" },
    { day: "Tue", temp: "32°C", icon: "☀" },
    { day: "Wed", temp: "27°C", icon: "🌧" },
  ];

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Weather & Climate</h1>
      <p className={styles.subHeading}>
        Detailed weather information and forecasts.
      </p>

      <div className={styles.weatherCard}>
        <div className={styles.weatherAdvisory}>
          <h3>Weather Advisory</h3>
          <p className={styles.mainWeather}>30°C, Sunny ☀</p>
          <p>Rain expected tomorrow, consider delaying irrigation.</p>
        </div>

        <div className={styles.forecast}>
          <h4>7-Day Forecast</h4>
          <div className={styles.forecastList}>
            {forecast.map((f, index) => (
              <div key={index} className={styles.forecastItem}>
                <span>{f.day}</span>
                <span>{f.icon}</span>
                <span>{f.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.detailsCard}>
        <h3>Today's Details</h3>
        <p>More details about today’s weather.</p>
        <ul>
          <li>Humidity: <strong>75%</strong></li>
          <li>Wind Speed: <strong>10 km/h</strong></li>
          <li>UV Index: <strong>High</strong></li>
          <li>Chance of Rain: <strong>10%</strong></li>
        </ul>
      </div>
    </section>
  );
}