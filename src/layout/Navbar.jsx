import React, { useState, useEffect } from "react";
import styles from "../styles/layout/navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserDetails } from "../redux/slices/userSlices";
import { getName } from "../helper/eCommerce";

function Navbar() {
  const [profile, setProfile] = useState(false);

  const user = useSelector((state) => state.userSlices.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  async function fetchUserDetails() {
    try {
      const response = await axios.get("http://localhost:8000/userDetails", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  async function handleLogout() {
    const logoutUser = await axios.get("http://localhost:8000/logout", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(setUserDetails(""));
    if (logoutUser.data.success) {
      navigate("/");
    }
  }

  function toggle() {
    setProfile(!profile);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* logo */}
        <div className={styles.logoCon}>
          <h1>Logo</h1>
        </div>

        {/* search */}
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>

        {/* info */}
        <div className={styles.additionalInfo}>
          {user ? (
            <>
              <div className={styles.userDetails}>
                <img src={user?.userImage} alt="User Avatar" />
                <span>{getName(user?.name)}</span>
              </div>
              <div className={styles.profileMenu}>
                <button onClick={toggle}>
                  {profile ? (
                    <i className="fa-solid fa-chevron-up"></i>
                  ) : (
                    <i className="fa-solid fa-chevron-down"></i>
                  )}
                </button>
                {profile && (
                  <div className={styles.dropDown}>
                    {user?.role === "admin" && (
                      <Link to="/admin">Admin Panel</Link>
                    )}
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
              <Link to="/cart" className={styles.cart}>
                <i className="fa-solid fa-cart-shopping"></i>
                <div className={styles.cartCount}>
                  <p>10</p>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button className={styles.loginBtn}>Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
