import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import ThinkInspirationImg1 from "../assets/think-inspiration/ThinkInspiration1.jpeg";
import ThinkInspirationImg2 from "../assets/think-inspiration/ThinkInspiration2.jpeg";
import ThinkInspirationImg3 from "../assets/think-inspiration/ThinkInspiration3.png";

const slides = [
  {
    src: ThinkInspirationImg1,
    alt: "Abdul Kalam inspiration quote",
  },
  {
    src: ThinkInspirationImg2,
    alt: "Rabindranath Tagore inspiration quote",
  },
  {
    src: ThinkInspirationImg3,
    alt: "Mother Teresa inspiration quote",
  },
];

const features = [
  "Modern Curriculum with Global Relevance",
  "Highly Qualified & Industry-Experienced Faculty",
  "State-of-the-Art Labs & Digital Infrastructure",
  "Strong Focus on Innovation & Entrepreneurship",
  "Global Collaborations with Top Universities",
  "100% Placement Assistance & Career Support",
  "Vibrant Campus Life & Holistic Development",
];

const ThinkInspirationSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <section className="flex flex-col lg:flex-row w-full">
      {/* LEFT: Image Slider */}
      <div className="w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-[70vh] xl:min-h-[700px] relative group">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop
          speed={3000}
          className="h-full w-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className="h-full w-full ">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover md:object-fill    lg:object-left "
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT: Text Content */}
      <div className="w-full lg:w-1/2 h-auto lg:h-[70vh] xl:min-h-[700px] bg-primary text-white font-funneldisplay p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-2 leading-tight hover:text-yellow-200 transition-colors duration-300">
            THINK EXCELLENCE
          </h2>
          <p className="uppercase text-xs sm:text-sm md:text-base mb-4 sm:mb-6 tracking-wider opacity-90 hover:opacity-100 transition-opacity duration-300">
            AT SAROJ INTERNATIONAL UNIVERSITY
          </p>

          <ul className="space-y-2 mb-6 sm:mb-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`border-b border-red-400/50 pb-2 last:border-0 transition-all duration-300 ${
                  activeFeature === index
                    ? "pl-2 border-l-4 border-white"
                    : "hover:pl-2 hover:border-l-4 hover:border-white/50"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                {feature}
              </li>
            ))}
          </ul>

                </div>
      </div>
    </section>
  );
};

export default ThinkInspirationSection;