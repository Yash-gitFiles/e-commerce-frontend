// import React from "react";
// import styles from "../styles/pages/userProfile.module.css";

// function UserProfile() {
//   return <div>UserProfile</div>;
// }

// export default UserProfile;

import React from "react";
import styles from "../styles/pages/userProfile.module.css";

function UserProfile() {
  // Mock user data (replace with real data fetching logic)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
    bio: "Frontend developer passionate about creating user-friendly interfaces.",
    location: "New York, NY",
    joinDate: "January 2022",
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
        <h1 className={styles.name}>{user.name}</h1>
      </div>
      <div className={styles.profileInfo}>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.bio}>{user.bio}</p>
        <p className={styles.location}>Location: {user.location}</p>
        <p className={styles.joinDate}>Joined: {user.joinDate}</p>
      </div>
      <div className={styles.profileActions}>
        <button className={styles.editButton}>Edit Profile</button>
      </div>
    </div>
  );
}

export default UserProfile;
