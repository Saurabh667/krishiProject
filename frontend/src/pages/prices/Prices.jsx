// import React from "react";
// import styles from "./Prices.module.css";

// const marketData = [
//   { crop: "Paddy", market: "Kochi Mandi", price: "₹2,203", change: "+1.5%" },
//   { crop: "Wheat", market: "Delhi Mandi", price: "₹2,700", change: "-0.8%" },
//   { crop: "Tomato", market: "Bangalore Mandi", price: "₹3,500", change: "+5.2%" },
//   { crop: "Onion", market: "Nashik Mandi", price: "₹2,800", change: "-2.1%" },
//   { crop: "Rubber", market: "Kottayam Mandi", price: "₹1,800", change: "+0.5%" },
//   { crop: "Coconut", market: "Kozhikode Mandi", price: "₹3,200", change: "-1.2%" },
// ];

// export default function Prices() {
//   return (
//     <section className={styles.container}>
//       <h2 className={styles.heading}>Price & Markets</h2>
//       <p className={styles.subHeading}>
//         Latest market prices for various crops.
//       </p>

//       <div className={styles.tableWrapper}>
//         <h3 className={styles.tableHeading}>📈 Market Prices (per Quintal)</h3>
//         <p className={styles.tableSubHeading}>
//           Live prices from major markets.
//         </p>

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Crop</th>
//               <th>Market</th>
//               <th>Price</th>
//               <th>Change</th>
//             </tr>
//           </thead>
//           <tbody>
//             {marketData.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.crop}</td>
//                 <td>{item.market}</td>
//                 <td>{item.price}</td>
//                 <td
//                   className={
//                     item.change.includes("+")
//                       ? styles.positive
//                       : styles.negative
//                   }
//                 >
//                   {item.change}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }



import React from "react";
import styles from "./Prices.module.css";

const marketData = [
  { crop: "Paddy", market: "Kochi Mandi", price: "₹2,203", change: "+1.5%" },
  { crop: "Wheat", market: "Delhi Mandi", price: "₹2,700", change: "-0.8%" },
  { crop: "Tomato", market: "Bangalore Mandi", price: "₹3,500", change: "+5.2%" },
  { crop: "Onion", market: "Nashik Mandi", price: "₹2,800", change: "-2.1%" },
  { crop: "Rubber", market: "Kottayam Mandi", price: "₹1,800", change: "+0.5%" },
  { crop: "Coconut", market: "Kozhikode Mandi", price: "₹3,200", change: "-1.2%" },
];

export default function Prices() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>🌾 Global Market Prices</h1>
      <p className={styles.subHeading}>
        Live mandi updates powered by KrishiSakhi’s AI market intelligence.
      </p>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>📈 Market Prices (per Quintal)</h3>
          <p>Updated daily with national averages.</p>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Market</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((item, index) => (
              <tr key={index} className={styles.row}>
                <td>{item.crop}</td>
                <td>{item.market}</td>
                <td className={styles.price}>{item.price}</td>
                <td
                  className={
                    item.change.includes("+")
                      ? styles.positive
                      : styles.negative
                  }
                >
                  {item.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}