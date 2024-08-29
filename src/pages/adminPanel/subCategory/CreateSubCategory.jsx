import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/pages/adminPanel/subCategory/createSubCategory.module.css";

function CreateSubCategory() {
  const [categoryState, setCategoryState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    allCategory();
  }, []);

  async function allCategory() {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/category/allCategory",
        { withCredentials: true }
      );
      setCategoryState(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleSubCategoryChange(e) {
    setSubCategoryName(e.target.value);
  }

  async function handleSubCategory(e) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/admin/subCategory/createSubCategory",
        {
          subCategoryName: subCategoryName,
          categoryId: selectedCategory,
        },
        { withCredentials: true }
      );
      alert("Subcategory created successfully!");
      setSubCategoryName("");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Category</h1>
      <form className={styles.form}>
        <select
          name="category"
          id="category"
          className={styles.select}
          onChange={handleChange}
          value={selectedCategory}
        >
          <option value="">Select a category</option>
          {categoryState.map((categoryName) => (
            <option key={categoryName._id} value={categoryName._id}>
              {categoryName.name}
            </option>
          ))}
        </select>
      </form>

      {selectedCategory && (
        <form onSubmit={handleSubCategory}>
          <input
            className={styles.input}
            value={subCategoryName}
            onChange={handleSubCategoryChange}
            placeholder="Enter subcategory name"
          />
          <button className={styles.button}>Create Subcategory</button>
        </form>
      )}
    </div>
  );
}

export default CreateSubCategory;
