import React, { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/pages/adminPanel/allProducts/createProducts.module.css";
import axios from "axios";

function CreateProducts() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [productName, setProductName] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/category/allCategory",
        { withCredentials: true }
      );
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  }, []);

  const fetchSubCategories = useCallback(async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/subCategory/${categoryId}`,
        { withCredentials: true }
      );
      setSubCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory, fetchSubCategories]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

//   async function handleProduct(e) {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:8000//admin/products/createProduct",
//         {
//           productName: productName,
//           categoryId: selectedCategory,
//         },
//         { withCredentials: true }
//       );
//       alert("Subcategory created successfully!");
//       setProductName("");
//     } catch (error) {
//       console.log(error);
//       alert("error");
//     }
//   }

//   function handleProductChange(e) {
//     setProductName(e.target.value);
//   }

  console.log(selectedSubCategory);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Category and Subcategory</h1>
      <form className={styles.form}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            className={styles.select}
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div>
            <label htmlFor="subCategory">Subcategory:</label>
            <select
              name="subCategory"
              id="subCategory"
              className={styles.select}
              onChange={handleSubCategoryChange}
              value={selectedSubCategory}
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.subCategoryName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* {selectedSubCategory && (
          <form onSubmit={handleProduct}>
            <input
              className={styles.input}
              value={productName}
              onChange={handleProductChange}
              placeholder="Enter subcategory name"
            />
            <button className={styles.button}>Create Subcategory</button>
          </form>
        )} */}
      </form>
    </div>
  );
}

export default CreateProducts;
