import axios from "axios";
import styles from "../../styles/pages/adminPanel/allUsers.module.css";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../components/common/Modal";

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getAllUserDetails = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin", {
        withCredentials: true,
      });
      setAllUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    getAllUserDetails();
  }, [getAllUserDetails]);

  const handleUserDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/admin/${id}`, {
        withCredentials: true,
      });
      await getAllUserDetails();
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUserEdit = (id) => {
    const user = allUsers.find((user) => user._id === id);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/${selectedUser._id}`,
        updatedUser,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        await getAllUserDetails();
        closeModal();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };

  if (!allUsers) return null;

  return (
    <div className={styles.container}>
      {allUsers.map((user) => (
        <div key={user._id} className={styles.card}>
          <img src={user.userImage} alt={user.name} className={styles.image} />
          <div className={styles.details}>
            <h2 className={styles.name}>{user.name}</h2>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.joinDate}>
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className={styles.btnCon}>
              <button
                className={styles.editButton}
                onClick={() => handleUserEdit(user._id)}
              >
                Edit Profile
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleUserDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && selectedUser && (
        <Modal
          type="admin"
          user={selectedUser}
          onClose={closeModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}

export default AllUsers;
