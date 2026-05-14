import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import PramuditImg from '../assets/testimonials/pramudit-shukla.jpeg';
import ShaloniImg from '../assets/testimonials/shaloni-devi.jpeg';
import UmeshImg from '../assets/testimonials/umesh-mishra.jpeg';
import AmanImg from '../assets/testimonials/aman-verma.jpeg';
import TestimonialBg from '../assets/testimonials/TestimonialBg.png';

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      id: 1,
      quote: "Saroj International University offers a well-structured curriculum in English literature that encourages critical thinking and global perspectives. The library and literary societies foster a vibrant academic culture.",
      name: "Pramudit Shukla",
      role: "Computer Science Student",
      image: PramuditImg,
    },
    {
      id: 2,
      quote: "The faculty at SIU are incredibly supportive and emphasize hands-on learning. The advanced labs and real-world projects have strengthened my technical foundation significantly.",
      name: "Shaloni Devi",
      role: "B.Pharma Student",
      image: ShaloniImg,
    },
    {
      id: 3,
      quote: "Saroj International University has a modern campus with top-tier infrastructure. The workshops, seminars, and cultural activities ensure holistic development beyond academics.",
      name: "Umesh Mishra",
      role: "Computer Science Student",
      image: UmeshImg,
    },
    {
      id: 4,
      quote: "SIU provides excellent research opportunities, especially in biotechnology. With guidance from experienced mentors, I was able to work on impactful projects and publish academic papers.",
      name: "Aman Verma",
      role: "Engineering Student",
      image: AmanImg,
    }
  ];

  return (
   <div className='py-10 bg-blue-50 '>
     <div className="relative w-full h-auto min-h-[500px] md:min-h-[600px] lg:min-h-[600px] py-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={TestimonialBg}
          alt="Student Background"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center lg:justify-end h-full px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <div className="w-full max-w-4xl lg:w-2/3 xl:w-1/2 2xl:w-1/3">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center lg:text-left">
            STUDENT VOICES
          </h2>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              bulletClass: 'w-2 h-2 inline-block rounded-full bg-gray-300 mx-1 cursor-pointer transition-all duration-300',
              bulletActiveClass: 'w-4 bg-amber-500 rounded-lg',
            }}
            navigation={{
              nextEl: '.student-next',
              prevEl: '.student-prev',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="!pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-red-600">{testimonial.name}</h3>
                      <p className="text-gray-700 mt-1 text-sm sm:text-base">{testimonial.quote}</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-2">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-4 px-4">
            <button className="student-prev cursor-pointer text-white hover:text-amber-400 transition-colors text-2xl">
              ←
            </button>
            <div className="custom-pagination"></div>
            <button className="student-next cursor-pointer text-white hover:text-amber-400 transition-colors text-2xl">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default TestimonialSlider;