import React, { useState } from 'react'
import styles from './UpdateForm.module.css'
import Farmer from '../../assets/farmer.json'
import Lottie from 'lottie-react'

const UpdateForm = () => {
    const [formData,setFormData]=useState({})
    const handleSubmit=[]
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  return (
    <>
    {/* <div className={styles.animationDiv}> */}
    <Lottie animationData={Farmer} loop={true} size='10px'/>
    {/* </div> */}
    <h1>Update Your Profile</h1>
    <form onSubmit={handleSubmit}>
    <div className={styles.formDiv}>
        <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
        <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your City name"
              value={formData.location}
              onChange={handleChange}
              required
            />
        <label>Land Size</label>
            <input
              type="number"
              name="size"
              placeholder="Enter land Size(in acres)"
              value={formData.size}
              onChange={handleChange}
              
            />
        <label>Main Crops</label>
            <input
              type="text"
              name="crops"
              placeholder="Enter the main crops grown"
              value={formData.crops}
              onChange={handleChange}
              required
            />
        <label>Phone No.</label>
            <input
              type="number"
              name="phone"
              placeholder="Enter your contact number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

        <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
        <button type="submit">Update Profile</button>
    
    </div>
    </form>
    </>
  )
}

export default UpdateForm
