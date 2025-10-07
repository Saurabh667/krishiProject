
import React from "react";
import styles from "./Activity.module.css";

const recommendations = [
  {
    title: "Fertilizer & Irrigation Plan",
    description: "Based on your crop, soil type, and weather conditions.",
    thisWeek:
      "Add 50 kg of Urea for your paddy crop. Irrigate twice this week on Wednesday and Saturday.",
    nextWeek:
      "Monitor for pests. Prepare for a top-dressing of potassium-based fertilizer.",
  },
  {
    title: "Pest Control Plan",
    description: "Prevent crop loss by timely monitoring and action.",
    thisWeek:
      "Monitor for stem borer infestation in paddy. Use light traps in the evening.",
    nextWeek:
      "If infestation exceeds 5%, apply bio-pesticide (Neem oil-based spray).",
  },
  {
    title: "Weather-Based Alert",
    description: "Stay updated with local weather-based advisories.",
    thisWeek: "Heavy rainfall expected. Avoid irrigation for 3–4 days.",
    nextWeek:
      "Clear skies predicted — plan fertilizer top-dressing accordingly.",
  },
  {
    title: "Crop Rotation Advice",
    description: "Improve soil fertility and yield with proper rotation.",
    thisWeek:
      "After harvesting wheat, prepare the field for pulses (moong/urad).",
    nextWeek:
      "Apply farmyard manure (FYM) for soil fertility before sowing.",
  },
  {
    title: "Water Management Plan",
    description: "Save water and maximize irrigation efficiency.",
    thisWeek: "Use drip irrigation for vegetables to save 30% water.",
    nextWeek:
      "Install mulching sheets to reduce soil evaporation and improve yield.",
  },
  {
    title: "Market-Oriented Advice",
    description: "Plan sales based on current and upcoming mandi prices.",
    thisWeek:
      "Tomato prices are high in Bangalore Mandi — consider early harvesting.",
    nextWeek:
      "Coconut demand is rising — store properly for 1 week before selling.",
  },
];

export default function Activity() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>AI Recommendations</h2>
      <p className={styles.subHeading}>Personalized advice for your farm.</p>

      {recommendations.map((rec, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{rec.title}</h3>
            <span className={styles.icon}>🌱</span>
          </div>
          <p className={styles.cardDescription}>{rec.description}</p>

          <p className={styles.recommendation}>
            <span className={styles.thisWeek}>This Week:</span> {rec.thisWeek}
          </p>
          <p className={styles.recommendation}>
            <span className={styles.nextWeek}>Next Week:</span> {rec.nextWeek}
          </p>
        </div>
      ))}
    </section>
  );
}