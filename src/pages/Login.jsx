import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../redux/slices/userSlices";
import styles from "../styles/pages/login.module.css";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function hidePasswordFun() {
    setHidePassword(!hidePassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        userData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data.userData);

      dispatch(setUserDetails(response.data.data.userData));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormWrapper}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={hidePassword ? "text" : "password"}
              id="password"
              name="password"
              required
              onChange={handleChange}
            />
            <p onClick={hidePasswordFun}>{hidePassword ? "hide" : "show"}</p>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className={styles.loginLink}>
          Don't have an account ?&nbsp;<Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
