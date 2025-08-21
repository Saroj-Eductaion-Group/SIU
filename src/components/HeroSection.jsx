import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, GraduationCap, Globe, BookOpen } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

import Hero1 from "../assets/Hero1.jpeg";
import Hero2 from "../assets/Hero2.jpeg";
import Hero3 from "../assets/Hero3.jpeg";

const HeroSection = () => {
  const primaryBlue = "#214A9A";
  const accentYellow = "#F08F07";
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderContent = [
    {
      title: "World-Class Campus",
      description: "Experience our state-of-the-art facilities designed for innovation and collaboration",
      image: Hero1,
      icon: <GraduationCap size={24} />
    },
    {
      title: "Global Opportunities",
      description: "Join our international network of students and faculty across 50+ countries",
      image: Hero2,
      icon: <Globe size={24} />
    },
    {
      title: "Cutting-Edge Research",
      description: "Work alongside leading researchers in fields that shape tomorrow's world",
      image: Hero3,
      icon: <BookOpen size={24} />
    },
  ];

  const StatsDisplay = ({ value, label }) => {
    return (
      <div className="text-center">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: primaryBlue }}>
          {value.toLocaleString()}+
        </div>
        <div className="text-xs sm:text-sm text-gray-600">{label}</div>
      </div>
    );
  };

  return (
    <div className="relative bg-gradient-to-br font-funneldisplay from-blue-50 to-white overflow-hidden py-2">
      {/* Stable background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 -left-20 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-blue-100 opacity-20"
          style={{ willChange: 'transform' }}
        ></div>
        <div 
          className="absolute bottom-10 -right-10 w-40 h-40 sm:w-80 sm:h-80 rounded-full bg-yellow-100 opacity-20"
          style={{ willChange: 'transform' }}
        ></div>
      </div>
      
      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Header with improved text rendering */}
        <header className="text-center mb-6 sm:mb-12">
        <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeRz6xp5FxhMEHH-nh0G9lsNvH0m12dJbVk2gKjB0umw-qxZg/viewform" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 inline-block md:hidden hover:bg-red-700 text-white px-4 py-1 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/20 animate-[pulse_2s_infinite] whitespace-nowrap text-sm sm:text-base"
            aria-label="Apply via SIUET Form"
          >
            SIUAT Application Form
          </a>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-blue-900">
            Saroj International University
          </h1>
        </header>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          {/* Left Content (30%) */}
          <div className="w-full lg:w-[30%] pt-0 sm:pt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:mb-6 text-blue-900">
              Your Future Starts Here
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-6 text-justify sm:mb-8 leading-relaxed">
              Join a vibrant community of learners and innovators at one of
              the world's most forward-looking universities with
              state-of-the-art facilities and global opportunities.
            </p>

            <div className="flex flex-col gap-3 mb-6 sm:mb-8">
              <button
                className="relative overflow-hidden group text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base"
                style={{ 
                  backgroundColor: primaryBlue,
                  boxShadow: `0 4px 14px ${primaryBlue}80`
                }}
              >
                <Link to='/programs'>Explore Programs</Link>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  size={16}
                />
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-blue-50">
              <StatsDisplay value={15000} label="Students" />
              <StatsDisplay value={250} label="Faculty" />
              <StatsDisplay value={45} label="Programs" />
            </div>
          </div>

          {/* Right Content - Slider (70%) */}
          <div className="w-full lg:w-[70%] mt-0 sm:mt-6">
            {/* Motivational text above slider */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-funneldisplay font-semibold text-black mb-2">
              India’s Gateway to Next-Gen Education
              </h3>
              <span className="w-full block bg-yellow-300 h-1"></span>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white relative">
              <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect={"fade"}
                fadeEffect={{ crossFade: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                speed={1000}
                loop={true}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                pagination={{
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className}" style="background:${
                      index === activeSlide ? accentYellow : "rgba(255,255,255,0.5)"
                    }; width:${index === activeSlide ? "30px" : "10px"}; border-radius:${
                      index === activeSlide ? "5px" : "50%"
                    }; transition: all 0.3s ease;"></span>`;
                  },
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                className="h-full"
              >
                {sliderContent.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-64 sm:h-80 md:h-[400px] lg:h-[500px] w-full">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(${slide.image})`,
                          willChange: 'transform'
                        }}
                      ></div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
                        <div className="max-w-2xl">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 text-white">
                            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-900/30 backdrop-blur-sm border border-white/20">
                              {React.cloneElement(slide.icon, { size: 16 })}
                            </span>
                            <span className="text-xs sm:text-sm opacity-90 font-medium">
                              {slide.title}
                            </span>
                          </div>

                          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                            {slide.description}
                          </h2>

                        
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <div className="absolute z-10 top-1/2 w-full flex justify-between px-2 sm:px-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="swiper-button-prev bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white/50 transition-all duration-300">
                  <ArrowRight size={16} className="text-white rotate-180" />
                </button>
                <button className="swiper-button-next bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white/50 transition-all duration-300">
                  <ArrowRight size={16} className="text-white" />
                </button>
              </div>

              <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xs">
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;