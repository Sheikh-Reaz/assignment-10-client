import React, { useState } from "react";
import { useLoaderData } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { use } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const ProductDetails = () => {
  const axiosInstance = useAxios();
  const product = useLoaderData();
  const { user } = use(AuthContext);
  console.log(user.email);

  const [showModal, setShowModal] = useState(false);
  const [importQty, setImportQty] = useState("");

  const [currentQty, setCurrentQty] = useState(product.available_quantity);

  const {
    product_name,
    product_description,
    price,
    origin_country,
    product_image,
    discount_price,
  } = product || {};

  const available_quantity = currentQty;

  const isInvalidQty = importQty > available_quantity || importQty <= 0;

  const handleImport = async () => {
    const previousQty = currentQty;

    setCurrentQty(currentQty - importQty);

    try {
      await axiosInstance.patch(`/products/${product._id}`, {
        available_quantity: previousQty - importQty,
      });

      await axiosInstance.post("/myImport", {
        product_name: product.product_name,
        product_image: product.product_image,
        price: product.price,
        discount_price:product.discount_price,
        origin_country: product.origin_country,
        rating: product.rating,
        imported_quantity: importQty,
        createdAt: new Date(),
        user_email: user.email,
      });

      alert("Successfully imported!");
    } catch (error) {
      console.error("Failed:", error);

      setCurrentQty(previousQty);

      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 shadow-xl rounded-2xl p-6">
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product_image}
            alt={product_name}
            className="w-full max-w-md rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between space-y-5">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product_name}</h1>
            <p className="">{product_description}</p>
            <div className="space-y-2 text-lg">
              <p>
                <span className="font-semibold   ">Price:</span> ${" "}
                <span className="line-through">{price}</span>
              </p>
              <p>
                <span className="font-semibold">Discounted Price:</span> $
                {discount_price}
              </p>
              <p>
                <span className="font-semibold">Country of Origin:</span>{" "}
                {origin_country}
              </p>

              <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                <p className="text-color">Rating</p>
                <FaStar />
                <span className="text-gray-700">{product.rating}</span>
              </div>

              <p>
                <span className="font-semibold">Available Quantity:</span>{" "}
                {available_quantity}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Import Now
            </button>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3 text-center">
              Import Product
            </h2>
            <p className="text-sm mb-4 text-gray-500 text-center">
              Enter the quantity you want to import (max: {available_quantity})
            </p>

            <input
              type="number"
              min="1"
              max={available_quantity}
              value={importQty}
              onChange={(e) => setImportQty(Number(e.target.value))}
              className="input input-bordered w-full mb-4"
              placeholder="Enter quantity"
            />

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-accent"
                disabled={isInvalidQty}
                onClick={() => {
                  handleImport();
                  setShowModal(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
