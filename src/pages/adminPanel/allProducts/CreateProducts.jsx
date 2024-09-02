import React, { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/pages/adminPanel/allProducts/createProducts.module.css";
import axios from "axios";
import cloudinaryImages from "../../../helper/cloudinary";

function CreateProducts() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [sizes, setSizes] = useState([
    "1-2Y",
    "2-3Y",
    "3-4Y",
    "4-5Y",
    "5-6Y",
    "6-7Y",
    "7-8Y",
    "8-9Y",
    "9-10Y",
    "XXS",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "UK 6",
    "UK 7",
    "UK 8",
    "UK 9",
    "UK 10",
    "UK 11",
  ]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [product, setProduct] = useState({
    productName: "",
    size: [],
    img: [],
    desc: "",
    price: "",
    discount: "",
    category: "",
    subCategory: "",
    finalPrice: "",
    stock: "",
  });

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
    setProduct((prev) => ({ ...prev, category: newCategory }));
  };

  const handleSubCategoryChange = (e) => {
    const newSubCategory = e.target.value;
    setSelectedSubCategory(newSubCategory);
    setProduct((prev) => ({ ...prev, subCategory: newSubCategory }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => {
      const isSelected = prev.includes(size);
      if (isSelected) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  useEffect(() => {
    setProduct((prev) => ({ ...prev, size: selectedSizes }));
  }, [selectedSizes]);

  const validate = () => {
    const newErrors = {};
    for (const key in product) {
      if (
        product[key] === "" &&
        [
          "productName",
          "size",
          "img",
          "desc",
          "price",
          "discount",
          "category",
          "subCategory",
          "finalPrice",
          "stock",
        ].includes(key)
      ) {
        newErrors[key] = "This field is required";
      }
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleProduct = async (e) => {
    e.preventDefault();
    if (!validate()) return null;

    try {
      await axios.post(
        "http://localhost:8000/admin/products/createProduct",
        {
          ...product,
        },
        {
          withCredentials: true,
        }
      );
      alert("Product created successfully");
      setProduct({
        productName: "",
        size: [],
        img: [],
        desc: "",
        price: "",
        discount: "",
        category: "",
        subCategory: "",
        finalPrice: "",
        stock: "",
      });
      setSelectedSizes([]);
    } catch (error) {
      console.log(error);
      alert("Error creating product");
    }
  };

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function handleUploadPic(e) {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await cloudinaryImages(file);
      setProduct((prev) => ({
        ...prev,
        img: imagePic.url,
      }));
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Product</h1>
      <form className={styles.form} onSubmit={handleProduct}>
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

        {selectedSubCategory && (
          <div>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <input
                name="productName"
                id="productName"
                className={styles.input}
                value={product.productName}
                onChange={handleProductChange}
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label>Size:</label>
              <div className={styles.sizeOptions}>
                {sizes.map((size) => (
                  <div key={size}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.imgCon}>
              <div className={styles.imgInnerCon}>
                <div className={styles.imgInnerCon}>
                  {product.img ? (
                    <img src={product.img} alt="Profile Preview" />
                  ) : (
                    <div className={styles.imgPlaceholder}>No Image</div>
                  )}
                </div>
              </div>
              <form>
                <label>
                  <div className={styles.uploadPhoto}>Upload Photo</div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <div>
              <label htmlFor="desc">Description:</label>
              <textarea
                name="desc"
                id="desc"
                className={styles.input}
                value={product.desc}
                onChange={handleProductChange}
                placeholder="Enter description"
              />
            </div>

            <div>
              <label htmlFor="price">Price:</label>
              <input
                name="price"
                id="price"
                className={styles.input}
                type="number"
                value={product.price}
                onChange={handleProductChange}
                placeholder="Enter price"
              />
            </div>

            <div>
              <label htmlFor="discount">Discount:</label>
              <input
                name="discount"
                id="discount"
                className={styles.input}
                type="number"
                value={product.discount}
                onChange={handleProductChange}
                placeholder="Enter discount"
              />
            </div>

            <div>
              <label htmlFor="finalPrice">Final Price:</label>
              <input
                name="finalPrice"
                id="finalPrice"
                className={styles.input}
                type="number"
                value={product.finalPrice}
                onChange={handleProductChange}
                placeholder="Enter final price"
              />
            </div>

            <div>
              <label htmlFor="stock">Stock:</label>
              <input
                name="stock"
                id="stock"
                className={styles.input}
                type="number"
                value={product.stock}
                onChange={handleProductChange}
                placeholder="Enter stock"
              />
            </div>

            <button className={styles.button} type="submit">
              Create Product
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateProducts;
