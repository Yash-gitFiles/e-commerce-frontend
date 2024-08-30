import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/pages/adminPanel/subCategory/allSubCategory.module.css";

function AllSubCategory() {
  const [categories, setCategories] = useState({});

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
      const subCategories = response.data.allSubCategoryList;
      const groupedCategories = subCategories.reduce((acc, subCategory) => {
        const categoryName = subCategory.category.name;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(subCategory);
        return acc;
      }, {});
      setCategories(groupedCategories);
    } catch (error) {
      console.error(error);
      alert("error");
    }
  }

  // my code deleteSubCategory
  async function deleteSubCategory(id) {
    try {
      await axios.delete(`http://localhost:8000/admin/subCategory/${id}`, {
        withCredentials: true,
      });
      setCategories((prevCategories) => {
        const updatedCategories = { ...prevCategories };
        for (const category in updatedCategories) {
          updatedCategories[category] = updatedCategories[category].filter(
            (subCat) => subCat._id !== id
          );
          if (updatedCategories[category].length === 0) {
            delete updatedCategories[category];
          }
        }
        return updatedCategories;
      });

      alert("Subcategory deleted successfully");
    } catch (error) {
      console.error("Failed to delete subcategory:", error);
      alert("Error deleting subcategory");
    }
  }

  // chatgpt code deleteSubCategory
  // async function deleteSubCategory(id) {
  //   try {
  //     await axios.delete(`http://localhost:8000/admin/subCategory/${id}`, {
  //       withCredentials: true,
  //     });

  //     setCategories((prevCategories) => {
  //       const updatedCategories = Object.entries(prevCategories).reduce(
  //         (acc, [categoryName, subCategories]) => {
  //           const filteredSubCategories = subCategories.filter(
  //             (subCat) => subCat._id !== id
  //           );
  //           if (filteredSubCategories.length > 0) {
  //             acc[categoryName] = filteredSubCategories;
  //           }
  //           return acc;
  //         },
  //         {}
  //       );

  //       return updatedCategories;
  //     });

  //     alert("Subcategory deleted successfully");
  //   } catch (error) {
  //     console.error("Failed to delete subcategory:", error);
  //     alert("Error deleting subcategory");
  //   }
  // }

  async function editSubCategory(subCategory) {
    console.log(subCategory);
    const categoryId = subCategory.category._id;
    const subCategoryId = subCategory._id;

    const newSubCategoryName = prompt("Enter new subcategory name:");

    if (!newSubCategoryName) {
      alert("Subcategory name cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/admin/subCategory/${subCategoryId}`,
        {
          subCategoryName: newSubCategoryName,
          category: categoryId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Subcategory updated successfully!");
        allSubCategory();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the subcategory:", error);
    }
  }

  if (Object.keys(categories).length === 0) return null;

  return (
    <div className={styles.container}>
      {Object.keys(categories).map((category, index) => (
        <div key={index} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.subCategoryList}>
            {categories[category].map((subCategory, index) => (
              <div key={index} className={styles.subCategoryItem}>
                <p className={styles.subCategoryName}>
                  {subCategory.subCategoryName}
                </p>
                <button onClick={() => deleteSubCategory(subCategory._id)}>
                  Delete
                </button>
                <button onClick={() => editSubCategory(subCategory)}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllSubCategory;
