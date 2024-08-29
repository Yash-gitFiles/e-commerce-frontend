import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cloudinaryImages from "../helper/cloudinary";
import styles from "../styles/pages/signUp.module.css";

function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    userImage: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        userData
      );
      setUserData({
        name: "",
        email: "",
        password: "",
        userImage: "",
      });
      navigate("/login");
      alert(response.data.message);
    } catch (error) {
      console.error("error", error);
    }
  }

  async function handleUploadPic(e) {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await cloudinaryImages(file);
      setUserData((prev) => ({
        ...prev,
        userImage: imagePic.url,
      }));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Sign Up</h2>

        {/* Image preview */}
        <div className={styles.imgCon}>
          <div className={styles.imgInnerCon}>
            {userData.userImage ? (
              <img src={userData.userImage} alt="Profile Preview" />
            ) : (
              <div className={styles.imgPlaceholder}>No Image</div>
            )}
          </div>
          <form>
            <label>
              <div className={styles.uploadPhoto}>Upload Photo</div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleUploadPic}
              />
            </label>
          </form>
        </div>

        {/* Role selection */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={userData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            required
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            required
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className={styles.login}>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
