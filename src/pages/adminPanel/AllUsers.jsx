import axios from "axios";
import styles from "../../styles/pages/adminPanel/allUsers.module.css";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { formatDateToDDMMYYYY, getName } from "../../helper/eCommerce";

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
    console.log("updatedUser", updatedUser);
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Type</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <img
                  src={user.userImage}
                  alt={user.name}
                  className={styles.image}
                />
              </td>
              <td>{getName(user.role)}</td>
              <td>{getName(user.name)}</td>
              <td>{user.email}</td>
              <td>{formatDateToDDMMYYYY(new Date(user.createdAt))}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleUserEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleUserDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
