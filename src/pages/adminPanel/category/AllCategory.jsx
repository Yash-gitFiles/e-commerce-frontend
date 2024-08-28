import React, { useEffect, useState } from "react";
import styles from "../../../styles/pages/adminPanel/category/allCategory.module.css";
import axios from "axios";

function AllCategory() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchAllCategory();
  }, []);

  async function fetchAllCategory() {
    const response = await axios.get(
      "http://localhost:8000/admin/category/allCategory",
      {
        withCredentials: true,
      }
    );
    setCategories(response.data.data);
  }

  async function deleteCategory(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/category/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  }

  async function addNewCategory() {
    const name = prompt("Enter the new category name:");

    if (!name) {
      alert("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/category",
        { name },
        { withCredentials: true }
      );

      if (response.data.success) {
        setCategories((prevCategories) => [
          ...prevCategories,
          response.data.newCategory,
        ]);
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  }

  if (!categories) return null;

  return (
    <div className={styles.allCategoryContainer}>
      <h1 className={styles.allCategoryTitle}>Category List</h1>
      <button className={styles.allCategoryButton} onClick={addNewCategory}>
        + Add Category
      </button>
      <table className={styles.allCategoryTable}>
        <thead>
          <tr>
            <th className={styles.allCategoryTableHeader}>ID</th>
            <th className={styles.allCategoryTableHeader}>Name</th>
            <th className={styles.allCategoryTableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((value, index) => (
            <tr key={value._id} className={styles.allCategoryTableRow}>
              <td className={styles.allCategoryTableCell}>{index + 1}</td>
              <td className={styles.allCategoryTableCell}>{value.name}</td>
              <td className={styles.allCategoryTableCell}>
                <button
                  className={styles.allCategoryButton}
                  onClick={() => deleteCategory(value._id)}
                >
                  Delete
                </button>
                <button className={styles.allCategoryButton}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCategory;
