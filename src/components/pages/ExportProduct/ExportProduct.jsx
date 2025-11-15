import React, { useState, useContext } from "react";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";

const ExportProduct = () => {
   const { user } = useContext(AuthContext);
  const axios = useAxios();

  const [formData, setFormData] = useState({
    product_name: "",
    product_image: "",
    price: "",
    origin_country: "",
    rating: "",
    available_quantity: "",
    discount_price: "",
    product_description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login required");

    try {
      await axios.post("/exportProduct", {
        ...formData,
        user_email: user.email,
      });
      alert("Product exported successfully");
      setFormData({
        product_name: "",
        product_image: "",
        price: "",
        origin_country: "",
        rating: "",
        available_quantity: "",
        discount_price: "",
        product_description: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to export product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Export Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="product_name"
          placeholder="Product Name"
          value={formData.product_name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="product_image"
          placeholder="Product Image URL"
          value={formData.product_image}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="discount_price"
          type="number"
          placeholder="Discount Price"
          value={formData.discount_price}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          name="origin_country"
          placeholder="Origin Country"
          value={formData.origin_country}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="rating"
          type="number"
          placeholder="Rating"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="available_quantity"
          type="number"
          placeholder="Available Quantity"
          value={formData.available_quantity}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="product_description"
          placeholder="Product Description"
          value={formData.product_description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Export/Product
        </button>
      </form>
    </div>
  );
};

export default ExportProduct;
