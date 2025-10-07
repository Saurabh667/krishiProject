import React from "react";
import styles from "./Benefits.module.css";
const schemes = [
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description:
      "An insurance service for farmers for their yields. It covers losses due to natural calamities, pests, and diseases.",
    button: "Learn More",
  },
  {
    title: "Kisan Credit Card (KCC) Scheme",
    description:
      "Provides farmers with timely access to credit for their cultivation and other needs.",
    button: "Learn More",
  },
  {
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "A central sector scheme with 100% funding from the Government of India that provides income support to all landholding farmer families.",
    button: "Learn More",
  },
  {
    title: "Soil Health Card Scheme",
    description:
      "Provides farmers with soil health cards to promote balanced use of fertilizers and improve productivity.",
    button: "Learn More",
  },
  {
    title: "National Mission on Sustainable Agriculture (NMSA)",
    description:
      "Aims to make agriculture more productive, sustainable, and climate-resilient through soil and water conservation, efficient irrigation, and organic farming.",
    button: "Learn More",
  },
  {
    title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    description:
      "Focused on providing irrigation facilities to farmers, improving water efficiency, and ensuring ‘Per Drop More Crop’.",
    button: "Learn More",
  },
];


  

export default function Benefits() {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Government Benefits & Schemes</h1>
      <p className={styles.subHeading}>
        Explore schemes and benefits available for farmers.
      </p>

      <div className={styles.cardContainer}>
        {schemes.map((scheme, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{scheme.title}</h3>
            <p className={styles.cardDescription}>{scheme.description}</p>
            <button className={styles.cardButton}>{scheme.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
}