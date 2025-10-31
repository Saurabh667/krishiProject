import React, { useState } from "react";
import styles from "./Weather.module.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "72c5515dfff5433e83141947251907";

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name!");
      setWeather(null);
      return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Something went wrong. Please try again later.");
      setWeather(null);
    }
  };

  const forecast = [
    { day: "Tomorrow", temp: "26°C", icon: "🌧" },
    { day: "Sun", temp: "27°C", icon: "🌦" },
    { day: "Mon", temp: "28°C", icon: "☁" },
    { day: "Tue", temp: "32°C", icon: "☀" },
  ];

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Weather & Climate</h1>
      <p className={styles.subHeading}>Get real-time weather details below.</p>

      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "60%",
            marginRight: "10px",
          }}
        />
        <button
          onClick={getWeather}
          style={{
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Get Weather
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Weather Information */}
      {weather && (
        <>
          <div className={styles.weatherCard}>
            <div className={styles.weatherAdvisory}>
              <h3>
                {weather.location.name}, {weather.location.country}
              </h3>
              <p className={styles.mainWeather}>
                {weather.current.temp_c}°C - {weather.current.condition.text}{" "}
                <img
                  src={`https:${weather.current.condition.icon}`}
                  alt="icon"
                />
              </p>
              <p>
                Local time: <strong>{weather.location.localtime}</strong>
              </p>
              <p>
                Feels Like: <strong>{weather.current.feelslike_c}°C</strong>
              </p>
            </div>

            <div className={styles.forecast}>
              <h4>Upcoming Days</h4>
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

          {/* Detailed Info */}
          <div className={styles.detailsCard}>
            <h3>Today's Details</h3>
            <ul>
              <li>
                Humidity: <strong>{weather.current.humidity}%</strong>
              </li>
              <li>
                Wind Speed: <strong>{weather.current.wind_kph} km/h</strong>
              </li>
              <li>
                Wind Direction: <strong>{weather.current.wind_dir}</strong>
              </li>
              <li>
                Precipitation: <strong>{weather.current.precip_mm} mm</strong>
              </li>
              <li>
                Pressure: <strong>{weather.current.pressure_mb} mb</strong>
              </li>
              <li>
                UV Index: <strong>{weather.current.uv}</strong>
              </li>
              <li>
                Latitude: <strong>{weather.location.lat}</strong> | Longitude:{" "}
                <strong>{weather.location.lon}</strong>
              </li>
              <li>
                Timezone: <strong>{weather.location.tz_id}</strong>
              </li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}