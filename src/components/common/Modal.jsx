import React, { useState } from "react";
import styles from "../../styles/common/modal.module.css";

function Modal({ type, onClose, onSave, user }) {
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "user":
        return (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password (leave empty to keep unchanged):
              <input type="password" name="password" onChange={handleChange} />
            </label>
            <div className={styles.modalActions}>
              <button type="button" onClick={onClose} disabled={loading}>
                Cancel
              </button>
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        );
      case "admin":
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                User Name:
                <input
                  type="text"
                  name="userName"
                  value={formData.adminName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Role:
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </label>
              <label>
                Password (leave empty to keep unchanged):
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </label>
              <div className={styles.modalActions}>
                <button type="button" onClick={onClose} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };  

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{type === "user" ? "Edit User Profile" : "Admin Modal"}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Modal;
