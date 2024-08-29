import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/pages/adminPanel/subCategory/allSubCategory.module.css";

function AllSubCategory() {
  const [allSubCategoryState, setAllSubCategoryState] = useState([]);

  useEffect(() => {
    allSubCategory();
  }, []);

  async function allSubCategory() {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/subCategory",
        {
          withCredentials: true,
        }
      );
      setAllSubCategoryState(response.data.allSubCategoryList);
    } catch (error) {
      console.error(error);
      alert("error");
    }
  }

  if (!allSubCategoryState) return null;

  return (
    <div className={styles.container}>
      {allSubCategoryState.map((subCategory) => (
        <div key={subCategory.id} className={styles.subCategoryItem}>
          <p className={styles.subCategoryName}>
            {subCategory.subCategoryName}
          </p>
          <p className={styles.categoryName}>{subCategory.category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default AllSubCategory;
