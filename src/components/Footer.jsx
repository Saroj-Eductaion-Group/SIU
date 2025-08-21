import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-700 text-white py-8">
      <div className="container mx-auto px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 lg:grid-cols-5 gap-8 ">
          {/* University Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              Saroj International University
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <p className="mb-4 text-gray-200">
              Committed to excellence in education, empowering the future.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/siulucknow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white  hover:text-yellow-400 transition-colors  duration-300 "
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/siulucknow/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white  hover:text-yellow-400 transition-colors  duration-300 "
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://www.instagram.com/siulucknow/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Other Colleges */}
          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              Other Colleges
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  Lucknow Institute Of Pharmacy
                </a>
              </li>
            </ul>
          </div>

          {/* Admissions & Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              Admissions
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admissions/admission-process"
                  className="text-gray-200 hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  Admission Process
                </Link>
              </li>
              <li>
                <Link
                  to="/admissions/admission-criteria"
                  className="text-gray-200 hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link
                  to="/admissions/fee-structure"
                  className="text-gray-200 hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  Fee Structure
                </Link>
              </li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4 relative pb-2">
              Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-200 hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-200 hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              Contact
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-yellow-400" />
                <span>
                  12th Km Stone, Sultanpur Road, Near Purvanchal Expressway,
                  Gosaiganj, Lucknow, Uttar Pradesh - 226022
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-yellow-400" />
                <a
                  href="tel:+919513731275"
                  className="hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  +91 95137-31275
                </a>
              </li>

              <li className="flex items-center gap-2">
                <FaPhone className="text-yellow-400" />
                <a
                  href="tel:+915223116178"
                  className="hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  +91 522-311-6178
                </a>
              </li>

              <li className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-400" />
                <a
                  href="mailto:info@sarojuniversity.edu.in"
                  className="hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  info@sarojuniversity.edu.in
                </a>
              </li>

              <li className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-400" />
                <a
                  href="mailto:hr@sarojuniversity.edu.in"
                  className="hover:text-yellow-400 hover:underline hover:underline-offset-8 transition-colors duration-300"
                >
                  hr@sarojuniversity.edu.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="border-t border-gray-700  pt-3  flex justify-center items-center">
          <p>
            © {new Date().getFullYear()} Saroj International University. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
