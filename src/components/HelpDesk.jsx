import React, { useEffect, useState } from 'react';

const HelpDesk = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to a certain amount
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="relative bg-gray-100 flex items-center justify-center">
      <div className="fixed bottom-8 left-8 flex flex-row items-start space-y-1 z-50">
        {/* Help Desk Component */}
        <div className="bg-[#f08f07] text-white flex items-center p-3 rounded-full shadow-lg max-w-sm">
          {/* Headphone Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white mr-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v3z"></path>
            <path d="M12 11V5M12 5H9.5M12 5H14.5"></path>
          </svg>
          <div className="flex flex-col font-medium">
            <span className='text-xs'>Admission Help Desk</span>
            <span className="text-md">Call Us: 1800-180-7686</span>
          </div>
        </div>

      </div>
   
    </div>
  );
};

export default HelpDesk;
