import React from "react";
import Marquee from "react-fast-marquee";

export default function LatestNews() {
  return (
<div
  className='w-full fixed bottom-0 flex flex-col sm:flex-row items-center'
  style={{ zIndex: 30 }}
>      {/* Marquee Section */}
      <div className='flex-1 w-full overflow-hidden rounded-t-xl shadow-sm'>
        <Marquee className='bg-red-700 text-white text-sm sm:text-base px-4 py-1' speed={50} gradient={false} pauseOnHover>
          <div className='flex items-center whitespace-nowrap'>
            <span className='mr-6 sm:mr-10'>Saroj International University Launches Global Exchange Program</span>
            <span className='w-2.5 h-2.5 rounded-full bg-red-600 mr-6 sm:mr-10'></span>
            <span className='mr-6 sm:mr-10'>SIU Now Offers AI Specializations</span>
            <span className='w-2.5 h-2.5 rounded-full bg-red-600 mr-6 sm:mr-10'></span>
            <span className='mr-6 sm:mr-10'>Admissions Open for 2025-26 Academic Year</span>
            <span className='w-2.5 h-2.5 rounded-full bg-red-600 mr-6 sm:mr-10'></span>
            <span className='mr-6 sm:mr-10'>Applications Open for SIU Academic Excellence Scholarships 2025</span>
            <span className='w-2.5 h-2.5 rounded-full bg-red-600 mr-6 sm:mr-10'></span>
          </div>
        </Marquee>
      </div>
    </div>
  );
}
