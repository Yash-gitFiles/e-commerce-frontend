import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
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

    console.log("userData", userData);
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

    const imagePic = await imageToBase64(file);

    setUserData((prev) => {
      return {
        ...prev,
        userImage: imagePic,
      };
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Sign Up</h2>

        {/* img */}

        <div className={styles.imgCon}>
          <div className={styles.imgInnerCon}>
            <img src={userData.profilePic} alt="img" />
          </div>
          <form>
            <label>
              <div className={styles.uploadPhoto}>Upload Photo</div>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleUploadPic}
              />
            </label>
          </form>
        </div>
        {/* img */}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={userData.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            required
            onChange={(e) => {
              handleChange(e);
            }}
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
