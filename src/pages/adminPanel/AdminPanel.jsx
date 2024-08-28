import React from "react";
import styles from "../../styles/pages/adminPanel/adminPanel.module.css";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

function AdminPanel() {
  const user = useSelector((store) => store.userSlices.user);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <aside>
        <div className={styles.userInfo}>
          <img src={user.userImage} alt="" />
          <p>{user.name}</p>
        </div>
        <div className={styles.productsAndUser}>
          <Link to="/adminPanel/allProducts">All products</Link>
          <Link to="/adminPanel/allUsers">All Users</Link>
          <Link to="/adminPanel/allCategory">All Category</Link>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
