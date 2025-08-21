import React from 'react';

const HeaderCTA = () => {
  return (
    <div className="relative overflow-hidden hidden md:block bg-blue-50 py-2 ">
      <div className="whitespace-nowrap  text-center text-md tracking-tight transition-all duration-300 animate-[pulse_1.5s_infinite] whitespace-nowrap">
       🔴 Admissions closing soon! Secure your seat at Saroj International University
      </div>


       <style jsx>{`
        @keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0;
  }
}

      `}</style>
    </div>
  );
};

export default HeaderCTA;