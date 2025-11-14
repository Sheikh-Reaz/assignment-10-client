import React, { useState } from "react";
import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const product = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [importQty, setImportQty] = useState("");
  const { product_name, product_description, price, origin_country, available_quantity, product_image,discount_price} = product || {};

  // Check if user entered more than available quantity
  const isInvalidQty = importQty > available_quantity || importQty <= 0;

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
            <p className="text-gray-500 mb-4">{product_description}</p>
            <div className="space-y-2 text-lg">
              <p >
                <span className="font-semibold   ">Price:</span> $ <span className="line-through" >{price}</span>
              </p>
              <p>
                <span className="font-semibold">Discounted Price:</span> ${discount_price}
              </p>
              <p>
                <span className="font-semibold">Country of Origin:</span> {origin_country}
              </p>
              <p>
                <span className="font-semibold">Available Quantity:</span> {available_quantity}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Import Now
            </button>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3 text-center">Import Product</h2>
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
                  // We'll handle submit logic next step
                  console.log("Importing:", importQty);
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
