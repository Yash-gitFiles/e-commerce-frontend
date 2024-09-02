import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/pages/adminPanel/allProducts/allProducts.module.css";

function AllProducts() {
  const [allProductsState, setAllProductsState] = useState([]);

  useEffect(() => {
    allProducts();
  }, []);

  async function allProducts() {
    try {
      const response = await axios.get("http://localhost:8000/admin/products", {
        withCredentials: true,
      });
      setAllProductsState(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function handleDeleteProducts(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/products/${id}`,
        {
          withCredentials: true,
        }
      );
      await allProducts();
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  function handleEditProducts(id) {
    console.log(id);
  }

  if (!allProductsState) return null;

  return (
    <div className={styles.container}>
      <h1>All Products</h1>
      <ul className={styles.productList}>
        {allProductsState?.map((product) => (
          <li key={product?._id} className={styles.productItem}>
            <img
              src={product?.img[0]}
              alt={product?.productName}
              className={styles.productImage}
            />
            <h2 className={styles.productName}>{product?.productName}</h2>
            <p className={styles.productDetail}>
              <strong>Description:</strong> {product?.desc}
            </p>
            <p className={styles.productDetail}>
              <strong>Price:</strong> ${product?.price}
            </p>
            <p className={styles.productDetail}>
              <strong>Discount:</strong> {product?.discount}%
            </p>
            <p className={styles.productDetail}>
              <strong>Final Price:</strong> ${product?.finalPrice}
            </p>
            <p className={styles.productDetail}>
              <strong>Size:</strong> {product?.size?.join(", ")}
            </p>
            <p className={styles.productDetail}>
              <strong>Stock:</strong> {product?.stock}
            </p>
            <p className={styles.productDetail}>
              <strong>Category:</strong> {product?.category?.name}
            </p>
            <p className={styles.productDetail}>
              <strong>Sub-category:</strong>{" "}
              {product?.subCategory?.subCategoryName}
            </p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.editButton}
                onClick={() => {
                  handleEditProducts(product._id);
                }}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => {
                  handleDeleteProducts(product._id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
