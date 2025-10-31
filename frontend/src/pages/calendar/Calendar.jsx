// import React from "react";

// const Calendar = () => {
//   return <h1>Crop Calendar Page</h1>;
// };

// export default Calendar;

import React, { useState } from "react";
import styles from "./Calendar.module.css";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState("2025-09-09");

  const activities = {
    "2025-09-09": [{ title: "Irrigation", details: "Start water pump for 1 hours" }],
    "2025-09-13": [{ title: "Fertilizer", details: "Apply Urea 20 kg" }],
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.container}>
      {/* Calendar Section */}
      <div className={styles.calendar}>
        <h2 className={styles.heading}>Crop Calendar</h2>
        <div className={styles.monthHeader}>
          <button className={styles.navBtn}>◀</button>
          <span className={styles.monthLabel}>September 2025</span>
          <button className={styles.navBtn}>▶</button>
        </div>

        <div className={styles.weekdays}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
            <span key={idx}>{day}</span>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const dateKey = `2025-09-${String(day).padStart(2, "0")}`;
            const isSelected = selectedDate === dateKey;
            const hasActivity = activities[dateKey];

            return (
              <div
                key={day}
                className={`${styles.day} ${isSelected ? styles.selected : ""} ${
                  hasActivity ? styles.hasActivity : ""
                }`}
                onClick={() => handleDateClick(dateKey)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Section */}
      <div className={styles.activities}>
        <h2 className={styles.heading}>
          Activities for {new Date(selectedDate).toLocaleDateString("en-US", { 
            month: "long", day: "numeric", year: "numeric" 
          })}
        </h2>
        <p className={styles.subHeading}>Log and view your daily farming tasks.</p>

        {activities[selectedDate] ? (
          activities[selectedDate].map((act, idx) => (
            <div key={idx} className={styles.activityCard}>
              <span className={styles.activityIcon}>💧</span>
              <div>
                <p className={styles.activityTitle}>{act.title}</p>
                <p className={styles.activityDetails}>{act.details}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noActivity}>No activities for this day.</p>
        )}

        <button className={styles.logBtn}>Log Activity</button>
      </div>
    </div>
  );
}








// import React, { useState } from "react";
// import styles from "./Calendar.module.css";

// export default function Calendar() {
//   const [selectedDate, setSelectedDate] = useState("2025-09-09");

//   const activities = {
//     "2025-09-09": [{ title: "Irrigation", details: "Start water pump for 1 hour." }],
//     "2025-09-13": [{ title: "Fertilizer", details: "Apply Urea 20 kg." }],
//   };

//   const handleDateClick = (date) => setSelectedDate(date);

//   return (
//     <div className={styles.wrapper}>
//       <h1 className={styles.mainTitle}>🌾 Smart Crop Calendar</h1>
//       <p className={styles.subTitle}>
//         Plan, visualize, and log your farm activities — beautifully.
//       </p>

//       <div className={styles.container}>
//         {/* Calendar Section */}
//         <div className={styles.calendarCard}>
//           <div className={styles.monthHeader}>
//             <button className={styles.navBtn}>◀</button>
//             <span className={styles.monthLabel}>September 2025</span>
//             <button className={styles.navBtn}>▶</button>
//           </div>

//           <div className={styles.weekdays}>
//             {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
//               <span key={idx}>{day}</span>
//             ))}
//           </div>

//           <div className={styles.daysGrid}>
//             {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
//               const dateKey = `2025-09-${String(day).padStart(2, "0")}`;
//               const isSelected = selectedDate === dateKey;
//               const hasActivity = activities[dateKey];

//               return (
//                 <div
//                   key={day}
//                   className={`${styles.day} 
//                     ${isSelected ? styles.selected : ""} 
//                     ${hasActivity ? styles.hasActivity : ""}`}
//                   onClick={() => handleDateClick(dateKey)}
//                 >
//                   {day}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Activities Section */}
//         <div className={styles.activitiesCard}>
//           <h2 className={styles.sectionTitle}>
//             Activities —{" "}
//             {new Date(selectedDate).toLocaleDateString("en-US", {
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             })}
//           </h2>

//           <p className={styles.sectionSubtitle}>
//             Stay organized and never miss a field task.
//           </p>

//           {activities[selectedDate] ? (
//             activities[selectedDate].map((act, idx) => (
//               <div key={idx} className={styles.activityCard}>
//                 <span className={styles.activityIcon}>🌱</span>
//                 <div>
//                   <p className={styles.activityTitle}>{act.title}</p>
//                   <p className={styles.activityDetails}>{act.details}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className={styles.noActivity}>No activities for this day.</p>
//           )}

//           <button className={styles.logBtn}>＋ Log New Activity</button>
//         </div>
//       </div>
//     </div>
//   );
// }