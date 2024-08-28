// import axios from "axios";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import UserModal from "../components/common/UserModal";
// import styles from "../styles/pages/userProfile.module.css";
// import Modal from "../components/common/Modal";

// function UserProfile() {
//   const userDetails = useSelector((state) => state.userSlices.user);
//   const [openModal, setOpenModal] = useState(false);

//   const closeModal = () => {
//     setOpenModal(false);
//   };

//   async function handleSaveUser() {
//     try {
//       const response = await axios.put("http://localhost:8000/userUpdate", {
//         withCredentials: true,
//       });

//       console.log(response);
//       if (response.data.success) {
//         closeModal();
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("An error occurred while updating the user.");
//     }
//   }

//   function isModalOpen() {
//     setOpenModal(true);
//   }

//   console.log(openModal);

//   return (
//     <>
//       <div className={styles.profileContainer}>
//         <div className={styles.profileHeader}>
//           <img
//             src={userDetails.userImage}
//             alt={userDetails.name}
//             className={styles.avatar}
//           />
//           <h1 className={styles.name}>{userDetails.name}</h1>
//         </div>
//         <div className={styles.profileInfo}>
//           <p className={styles.email}>{userDetails.email}</p>
//           <p className={styles.location}>Location: {userDetails.location}</p>
//           <p className={styles.joinDate}>Joined: {userDetails.joinDate}</p>
//         </div>
//         <div className={styles.profileActions}>
//           <button className={styles.editButton} onClick={isModalOpen}>
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {openModal && <Modal onClose={closeModal} />}
//     </>
//   );
// }

// export default UserProfile;

import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/pages/userProfile.module.css";
import Modal from "../components/common/Modal";

function UserProfile() {
  const userDetails = useSelector((state) => state.userSlices.user);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  async function handleSaveUser(userData) {
    try {
      const response = await axios.put(
        "http://localhost:8000/userUpdate",
        userData,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.data.success) {
        closeModal();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while updating the user.");
    }
  }

  function isModalOpen() {
    setOpenModal(true);
  }

  return (
    <>
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
          <button className={styles.editButton} onClick={isModalOpen}>
            Edit Profile
          </button>
        </div>
      </div>

      {openModal && (
        <Modal
          type="user"
          user={userDetails}
          onClose={closeModal}
          onSave={handleSaveUser}
        />
      )}
    </>
  );
}

export default UserProfile;
