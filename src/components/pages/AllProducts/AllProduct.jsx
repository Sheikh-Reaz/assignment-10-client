import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const AllProduct = () => {
  const axiosInstance = useAxios();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/allProducts");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching latest products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosInstance]);

  return (
    <div className="max-w-7xl mx-auto md:p-4">
      <h1>Our All Products</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 p-4">
          {products.map((product) => {
            const discountPercent =
              product.price && product.discount_price
                ? Math.round(
                    ((product.price - product.discount_price) / product.price) *
                      100
                  )
                : 0;

            return (
              <div key={product._id} className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  -{discountPercent}%
                </div>

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
                      <div className="text-gray-500">
                        <span className="font-semibold">Origin:</span>{" "}
                        {product.origin_country}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-3 my-2">
                      <span className="text-gray-400 line-through">
                        ${product.price}
                      </span>
                      <span className="text-blue-600 font-bold">
                        ${product.discount_price}
                      </span>
                    </div>
                    <div className="card-actions">
                      <Link
                        to={`/productDetails/${product._id}`}
                        className="btn btn-primary w-full"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
