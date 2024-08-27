import React from "react";
import styles from "../styles/pages/userProfile.module.css";
import { useSelector } from "react-redux";

function UserProfile() {
  const userDetails = useSelector((state) => state.userSlices.user);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img
          src={userDetails.userImage}
          alt={userDetails.name}
          className={styles.avatar}
        />
        <h1 className={styles.name}>{userDetails.name}</h1>
      </div>
      <div className={styles.profileInfo}>
        <p className={styles.email}>{userDetails.email}</p>
        <p className={styles.location}>Location: {userDetails.location}</p>
        <p className={styles.joinDate}>Joined: {userDetails.joinDate}</p>
      </div>
      <div className={styles.profileActions}>
        <button className={styles.editButton}>Edit Profile</button>
      </div>
    </div>
  );
}

export default UserProfile;
