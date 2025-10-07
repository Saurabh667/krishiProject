// import React, { useState } from "react";
// import styles from "./Advisory.module.css";
// import axios from "axios";

// const Advisory = () => {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const onHandleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert("Please upload a file first");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", file);
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/uploads/photos/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       setResult(res.data);
//       console.log("Uploaded Succesfully", res.data);
//     } catch (error) {
//       console.error("Error uploading file", error);
//     }
//   }

//   return (
//     <>
//       {/* <h1>Upload Image of leaf to detect dieases on the crop</h1> */}
//       <h1>🌱 "Detect crop diseases instantly by uploading a leaf image."</h1>
//       <div className={styles.advisory_container}>
//         <div className={styles.instructionDiv}>
//           <h3>🍃 Upload a clear image of your crop leaf and let our AI-powered system detect possible diseases instantly. Early detection helps farmers take quick action to protect their crops from pests, infections, and nutrient deficiencies. Along with identifying diseases, we also provide advisory tips and preventive measures to ensure your plants stay healthy and your yield remains strong. 🌾</h3>
//           <br />
//           <h2>Instructions</h2>
//           <ul>
//             <li>✅ Make sure the leaf is clearly visible in the picture.</li>
//             <li>✅ Upload only one leaf per image for better accuracy.</li>
//             <li>✅ Supported formats: JPG, PNG.</li>
//             <li>✅ Avoid blurry or dark images.</li>
//           </ul>
//         </div>
//         <div className={styles.uploadDiv}>
//           <form className={styles.form} onSubmit={onHandleSubmit}>
//             <span className={styles.form_title}>Upload your file</span>
//             <p className={styles.form_paragraph}>
//               File should be an image
//             </p>
//             <label htmlFor="file_input" className={styles.drop_container}>
//               <span className={styles.drop_title}>Drop files here</span>
//               or
//               <input type="file" name="image" accept="image/*" required className={styles.file_input} onChange={handleFileChange} />
//             </label>
//             <button className={styles.uploadBtn} type="submit">Upload</button>
//           </form>

//         </div>
//         <div className={styles.resultDiv}>
//           <h2>Result</h2>
//           {result ? (
//             <>
//               <p>✅ Uploaded successfully!</p>
//               <p>File ID: {result.id}</p>
//               <img src={result.image} alt="uploaded leaf" style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }} />
//               <div style={{ marginTop: "15px", padding: "10px", background: "#f4f4f4", borderRadius: "8px" }}>
//                 <h3>🧾 Diagnosis</h3>
//                 <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
//                   {result.diagnosis}
//                 </pre>
//               </div>
//             </>
//           ) : (
//             <p>No result yet.</p>
//           )}
//         </div>
//       </div>
//     </>
//   )
// };

// export default Advisory;

import React, { useState } from "react";
import styles from "./Advisory.module.css";
import axios from "axios";

const Advisory = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/uploads/photos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data);
      console.log("Uploaded Successfully", res.data);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("❌ Failed to upload. Please check if your Django server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>🌱 Detect crop diseases instantly by uploading a leaf image</h1>
      <div className={styles.advisory_container}>
        {/* Instructions */}
        <div className={styles.instructionDiv}>
          <h3>
            🍃 Upload a clear image of your crop leaf and let our AI-powered system
            detect possible diseases instantly. Early detection helps farmers take
            quick action to protect their crops. 🌾
          </h3>
          <br />
          <h2>Instructions</h2>
          <ul>
            <li>✅ Make sure the leaf is clearly visible in the picture.</li>
            <li>✅ Upload only one leaf per image for better accuracy.</li>
            <li>✅ Supported formats: JPG, PNG.</li>
            <li>✅ Avoid blurry or dark images.</li>
          </ul>
        </div>

        {/* Upload Section */}
        <div className={styles.uploadDiv}>
          <form className={styles.form} onSubmit={onHandleSubmit}>
            <span className={styles.form_title}>Upload your file</span>
            <p className={styles.form_paragraph}>File should be an image</p>
            <label htmlFor="file_input" className={styles.drop_container}>
              <span className={styles.drop_title}>Drop files here</span>
              or
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className={styles.file_input}
                onChange={handleFileChange}
              />
            </label>
            <button className={styles.uploadBtn} type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className={styles.resultDiv}>
          <h2>Result</h2>
          {loading ? (
            <p>⏳ Analyzing your leaf image...</p>
          ) : result ? (
            <>
              <p>✅ Uploaded successfully!</p>
              <p><strong>File ID:</strong> {result.id}</p>
              <img
                src={result.image}
                alt="uploaded leaf"
                style={{
                  width: "200px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  background: "#f4f4f4",
                  borderRadius: "8px",
                }}
              >
                <h3>🧾 Diagnosis</h3>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                  {result.diagnosis || "No diagnosis provided by AI."}
                </pre>
              </div>
            </>
          ) : (
            <p>No result yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Advisory;
