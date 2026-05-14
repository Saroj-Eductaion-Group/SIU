import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import SearchBar from './SearchBar';

const TopNav = () => {
  return (
    <div className="bg-[#1c2e4a] z-[999] text-white shadow-sm font-funneldisplay">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile — Topnav hidden on mobile, button shown in HeroSection */}

        {/* Desktop */}
        <div className="md:flex md:flex-row hidden justify-between items-center py-1 gap-2 sm:gap-0">
          {/* Contact Info - Wrapped for better mobile display */}
          <div className=" flex-wrap flex items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-sm m-2">
            
            

            <div className="flex items-center space-x-1">
              <a 
                
                href="tel:+919513731275"
                className="flex items-center hover:text-blue-200 transition-colors duration-200 group"
                aria-label="Call main university number"
              >
                <Phone className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">+91-9513731275</span>
              </a>
              <span className="text-blue-300 mx-1 hidden sm:inline">|</span>
            </div>
            
            <a 
              href="mailto:info@sarojuniversity.edu.in" 
              className="flex items-center hover:text-blue-200 transition-colors duration-200 group"
              aria-label="Email university"
            >
              <Mail className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="whitespace-nowrap">info@sarojuniversity.edu.in</span>
            </a>
            <span>|</span>

             <a 
              href="mailto:hr@sarojuniversity.edu.in" 
              className="flex items-center hover:text-blue-200 transition-colors duration-200 group"
              aria-label="Email university"
            >
              <Mail className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="whitespace-nowrap">For Jobs(Send Cv) : hr@sarojuniversity.edu.in</span>
            </a>

            <span>|</span>
             <a 
href='/fee-payment'            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f08f07] text-white px-4 py-1 rounded-md font-medium  whitespace-nowrap text-sm sm:text-base"
            aria-label="Apply via SIUET Form"
          >
            Pay Fees Online
          </a>
           

          </div>

          {/* Talent Hunt Buttons */}
          <div className="flex items-center gap-2">
            <a 
              href="/cuet-neet-talent-hunt"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md font-medium transition-all duration-300 shadow-lg animate-pulse whitespace-nowrap text-sm sm:text-base"
              aria-label="CUET/NEET Talent Hunt"
            >
              📚 CUET/NEET Talent Hunt
            </a>
            <a 
              href="/talent-hunt"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md font-medium transition-all duration-300 shadow-lg animate-pulse whitespace-nowrap text-sm sm:text-base"
              aria-label="Talent Hunt 2026-27"
            >
              🏆 Talent Hunt 2026-27
            </a>
          </div>
        </div>
        {/* End Desktop */}
      </div>
    </div>
  );
};

export default TopNav;