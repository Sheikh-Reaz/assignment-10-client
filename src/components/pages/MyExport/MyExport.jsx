import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyExport = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const [exports, setExports] = useState([]);
  const [modalData, setModalData] = useState(null);

  const fetchExports = async () => {
    if (!user) return;
    const res = await axios.get(`/myExport?email=${user.email}`);
    setExports(res.data);
  };

  useEffect(() => {
    fetchExports();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`/exportProduct/${id}`);
    setExports(exports.filter((p) => p._id !== id));
  };

  const handleUpdate = (data) => {
    setModalData(data);
  };

  const handleModalChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...updateData } = modalData;
    await axios.patch(`/exportProduct/${_id}`, updateData);
    setExports(
      exports.map((p) => (p._id === _id ? { ...p, ...updateData } : p))
    );
    setModalData(null);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen md:p-4">
      <Helmet>
        <title>My Exports</title>
      </Helmet>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exports.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-xl p-4">
            <img
              src={product.product_image}
              alt={product.product_name}
              className="w-full h-40 object-cover"
            />
            <h2 className="font-bold text-xl mt-2">{product.product_name}</h2>
            <p>Price: ${product.price}</p>
            <p>Discount Price: ${product.discount_price}</p>
            <p>Origin: {product.origin_country}</p>
            <p>Rating: {product.rating}</p>
            <p>Available Quantity: {product.available_quantity}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(product._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(product)}
                className="btn btn-sm btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle"
          onClose={() => setModalData(null)}
        >
          <div className="modal-box w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-bold text-lg mb-4">Update Product</h3>
            <form onSubmit={handleModalSubmit} className="space-y-3">
              <input
                name="product_name"
                value={modalData.product_name}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                placeholder="Product Name"
                required
              />
              <input
                name="product_image"
                value={modalData.product_image}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                placeholder="Product Image URL"
                required
              />
              <input
                name="price"
                type="number"
                value={modalData.price}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                placeholder="Price"
                required
              />
              <input
                name="discount_price"
                type="number"
                value={modalData.discount_price}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                placeholder="Discount Price"
              />
              <input
                name="origin_country"
                value={modalData.origin_country}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                placeholder="Origin Country"
                required
              />
              <input
                name="rating"
                type="number"
                step="0.1"
                value={modalData.rating}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                placeholder="Rating"
                required
              />
              <input
                name="available_quantity"
                type="number"
                value={modalData.available_quantity}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                placeholder="Available Quantity"
                required
              />
              <textarea
                name="product_description"
                value={modalData.product_description}
                onChange={handleModalChange}
                className="textarea textarea-bordered w-full"
                placeholder="Product Description"
                required
              />

              <div className="modal-action justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setModalData(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyExport;
