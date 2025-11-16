import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { Helmet } from "react-helmet-async";
import useAxios from "../../../hooks/useAxios";
import { FaStar } from "react-icons/fa";

const Home = () => {
  const axiosInstance = useAxios();
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);

  // Fetch latest products
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axiosInstance.get("/latest-products");
        setLatestProducts(response.data);

        // For trending, just take the first 3 products
        setTrendingProducts(response.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching latest products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, [axiosInstance]);

  // Example data for top exporting countries
  const topCountries = [
    { name: "China", flag: "🇨🇳", exportVolume: "120M USD" },
    { name: "USA", flag: "🇺🇸", exportVolume: "95M USD" },
    { name: "Germany", flag: "🇩🇪", exportVolume: "85M USD" },
    { name: "India", flag: "🇮🇳", exportVolume: "75M USD" },
  ];

  return (
    <div className="max-w-7xl mx-auto min-h-screen md:p-4">
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Hero Section */}
      <Slider />

      {/* Latest Products Section */}
      <div className="pt-16">
        <h1 className="font-philosopher text-color pl-4 md:pl-2 text-4xl font-semibold">
          Latest Products
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 p-4">
            {latestProducts.map((product) => {
              const discountPercent = Math.round(
                ((product.price - product.discount_price) / product.price) * 100
              );

              return (
                <div key={product._id} className="relative">
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    -{discountPercent}%
                  </div>

                  <div className="card bg-base-100 shadow-sm">
                    <figure>
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        className="w-full h-90 object-cover"
                      />
                    </figure>

                    <div className="card-body">
                      <h2 className="card-title">{product.product_name}</h2>

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

                      <div className="flex items-center gap-3 my-2">
                        <span className="text-gray-400 line-through">
                          ${product.price}
                        </span>
                        <span className="text-blue-600 font-bold">
                          ${product.discount_price}
                        </span>
                      </div>

                      <div className="card-actions">
                        <a
                          href={`/productDetails/${product._id}`}
                          className="btn btn-primary w-full"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Top Exporting Countries Section */}
      <div className="pt-16 px-4 md:px-0">
        <h1 className="font-philosopher text-color text-3xl font-semibold mb-6">
          Top Exporting Countries
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topCountries.map((country) => (
            <div
              key={country.name}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-black text-center"
            >
              <div className="text-4xl mb-2">{country.flag}</div>
              <h2 className="font-semibold text-black text-lg">{country.name}</h2>
              <p className="text-gray-500">{country.exportVolume}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Import Products Section */}
      <div className="pt-16 px-4 md:px-0 mb-16">
        <h1 className="font-philosopher text-color text-3xl font-semibold mb-6">
          Trending Import Products
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <div
                key={product._id}
                className="bg-base-100 shadow-sm rounded-lg overflow-hidden"
              >
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{product.product_name}</h2>
                  <p className="text-blue-600 font-bold mt-2">
                    ${product.discount_price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
