import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";
import { MdCloudUpload } from "react-icons/md";

function ProductForm() {
  const [product, setProduct] = useState({
    ProductName: "",
    Description: "",
    Unit: "",
    Price: "",
    Category: "",
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    for (let key in product) {
      formData.append(key, product[key]);
    }

    try {
      const response = await axios.post(
        "https://products-images.onrender.com/api/users/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setIsLoading(false);
      alert("Product uploaded successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error uploading product:", error);
      setIsLoading(false);
      alert("Failed to upload product");
    }
  };

  return (
    <>
      <div id="fm">
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <p>Product Name: </p>
          <input
            type="text"
            name="ProductName"
            value={product.ProductName}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
          <br />
          <p>Description: </p>
          <textarea
            name="Description"
            value={product.Description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <br />
          <p>Unit: </p>
          <input
            type="text"
            name="Unit"
            value={product.Unit}
            onChange={handleChange}
            placeholder="Unit in kg/mg/g/ml/l"
            required
          />
          <br />
          <p>Price: </p>
          <input
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <br />
          <p>Category: </p>
          <input
            type="text"
            name="Category"
            value={product.Category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <br />
          <p>Image: </p>
          <input type="file" onChange={handleImageChange} required />
          <br />
          <button type="submit" disabled={isLoading}>
            <MdCloudUpload size={30} /> &nbsp;
            {isLoading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="overlay">
          <div className="loading-spinner"></div>
          <p>Please wait...</p>
        </div>
      )}
    </>
  );
}

export default ProductForm;
