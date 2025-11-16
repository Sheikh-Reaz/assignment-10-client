import React, { useEffect, useState, useContext } from "react";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

const MyImport = () => {
  const axiosInstance = useAxios();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch user's import list
  useEffect(() => {
    if (authLoading) return;
    if (!user?.email) return;

    axiosInstance
      .get(`/myImport?email=${user.email}`)
      .then((res) => {
        setImports(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, authLoading, axiosInstance]);

  // Delete from DB + UI
  const handleRemove = (id) => {
    axiosInstance.delete(`/myImport/${id}`).then(() => {
      setImports((prev) => prev.filter((item) => item._id !== id));
    });
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center min-h-screen mt-20">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen md:p-4">
      <Helmet>
        <title>My Imports</title>
      </Helmet>
      <div className="pt-16 px-4">
        <h1 className="text-center text-2xl text-color font-bold mb-6">
          My Imports
        </h1>

        {imports.length === 0 ? (
          <h2 className="text-center text-lg text-gray-500 mt-8">
            You haven’t imported anything yet.
          </h2>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 p-2">
            {imports.map((product) => (
              <div key={product._id} className="relative">
                <div className="card bg-base-100 shadow-sm">
                  {/* Product Image */}
                  <figure>
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="w-full h-90 object-cover"
                    />
                  </figure>

                  <div className="card-body">
                    {/* Product Name */}
                    <h2 className="card-title">{product.product_name}</h2>

                    {/* Rating and Origin */}
                    <div className="flex items-center justify-between my-2">
                      <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                        <FaStar />
                        <span className="text-gray-700">{product.rating}</span>
                      </div>

                      <div className="text-gray-500 text-sm">
                        <span className="font-semibold">Origin:</span>{" "}
                        {product.origin_country}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-3 my-2">
                      <span className="text-blue-600 font-bold text-lg">
                        ${product.discount_price}
                      </span>
                    </div>

                    {/* Imported Quantity */}
                    <p className="text-gray-700 font-medium">
                      Imported Quantity:{" "}
                      <span className="font-semibold">
                        {product.imported_quantity}
                      </span>
                    </p>

                    {/* Buttons */}
                    <div className="card-actions mt-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="btn btn-error w-full"
                      >
                        Remove
                      </button>

                      {/* Redirect to Product Details using original product_id */}
                      <button
                        onClick={() =>
                          navigate(`/productDetails/${product.product_id}`)
                        }
                        className="btn btn-primary w-full"
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImport;
