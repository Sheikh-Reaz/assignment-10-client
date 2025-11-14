// src/components/Slider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// import your local images (recommended for bundlers)
import controllerImg from "../../../assets/controller.png";
import pixelImg from "../../../assets/pixel7.png";
import headsetImg from "../../../assets/headset.png";
import headsetSmall from "../../../assets/controller.png";
import cameraSmall from "../../../assets/controller.png";

const Slider = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-7">
      {/* Grid: left = slider, right = static cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch rounded-2xl">
        {/* LEFT: Swiper (3 slides) */}
        <div className="md:col-span-3 bg-transparent rounded-2xl flex items-center">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full rounded-2xl"
          >
            {/* Swiper container wrapper: control height here */}
            <div className="h-64 md:h-[500px]">
              {/* Slide 1 */}
              <SwiperSlide>
                <div className="h-80 md:h-[500px] flex items-center justify-center p-0 overflow-hidden rounded-2xl">
                  <img
                    src={controllerImg}
                    alt="Controller"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <div className="h-80 md:h-[500px] flex items-center justify-center p-0 overflow-hidden rounded-2xl">
                  <img
                    src={pixelImg}
                    alt="Pixel 7"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>

              {/* Slide 3 */}
              <SwiperSlide>
                <div className="h-80 md:h-[500px] flex items-center justify-center p-0 overflow-hidden rounded-2xl">
                  <img
                    src={headsetImg}
                    alt="Headset"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>

        {/* RIGHT: Static product/cards (outside Swiper) */}
        <div className="grid md:col-span-2  grid-rows-2   gap-4">
          {/* Aurora Headset */}
          <div className="bg-pink-100 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Aurora Headset
              </h3>
              <div className="flex gap-3 mt-3 text-center">
                <div className="bg-white rounded-lg p-2 text-sm font-semibold">
                  52<br />Days
                </div>
                <div className="bg-white rounded-lg p-2 text-sm font-semibold">
                  11<br />Hr
                </div>
                <div className="bg-white rounded-lg p-2 text-sm font-semibold">
                  38<br />Min
                </div>
                <div className="bg-white rounded-lg p-2 text-sm font-semibold">
                  16<br />Sc
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button className="btn btn-primary btn-sm">Buy Now</button>
              <img
                src={headsetSmall}
                alt="Aurora Headset"
                className="w-24 md:w-28 object-contain"
              />
            </div>
          </div>

          {/* Dual Sense + Instant Camera */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="font-semibold">New Dual Sense</h4>
                <p className="text-sm text-gray-600">For PlayStation 5</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <button className="btn btn-sm btn-outline">View Details</button>
                <img
                  src={controllerImg}
                  alt="Dual Sense"
                  className="w-16 md:w-20 object-contain"
                />
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="font-semibold">Instant Cameras</h4>
                <p className="text-sm text-gray-600">Get photo paper as a gift</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <button className="btn btn-sm btn-outline">View Details</button>
                <img
                  src={cameraSmall}
                  alt="Instant Camera"
                  className="w-16 md:w-20 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Slider;
