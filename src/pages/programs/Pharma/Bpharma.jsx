import React, { useState } from "react";
import Layout from "../../../components/Layout"; // Default import for Layout
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaBriefcase,
  FaFlask, // Main icon for Pharmacy
  FaPills, // For pharmaceutical products
  FaGraduationCap, // General academic
  FaClock, // For duration
  FaUniversity, // For programs/education
  FaFileAlt, // For details/application
  FaChevronDown, // For accordions
  FaBuilding, // For industry
  FaChartLine, // For quality control/analytics
  FaUsers, // For patient care/sales
  FaSearch, // For research/analysis
  FaCalendarAlt, // For intake dates (kept for highlights, but no "important dates" section)
} from "react-icons/fa";
import { Helmet } from "react-helmet";

const BPharmaPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    careers: false,
    admission: false,
    fees: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Curriculum data kept in the component for highlights, but the full section is removed
  const careerPaths = [
    {
      title: "Retail Pharmacist",
      description: "Dispense medications and provide patient counseling in community pharmacies.",
      icon: <FaPills className='w-6 h-6 text-green-600' />,
    },
    {
      title: "Hospital Pharmacist",
      description: "Manage drug distribution, sterile compounding, and clinical services in hospitals.",
      icon: <FaBuilding className='w-6 h-6 text-teal-600' />,
    },
    {
      title: "Production Chemist",
      description: "Oversee the manufacturing process of pharmaceutical products in industries.",
      icon: <FaFlask className='w-6 h-6 text-indigo-600' />,
    },
    {
      title: "Quality Control Analyst",
      description: "Ensure the quality and safety of pharmaceutical products through testing and analysis.",
      icon: <FaChartLine className='w-6 h-6 text-red-600' />,
    },
    {
      title: "Pharmaceutical Sales Representative",
      description: "Promote pharmaceutical products to healthcare professionals.",
      icon: <FaUsers className='w-6 h-6 text-yellow-600' />,
    },
    {
      title: "Drug Inspector",
      description: "Enforce drug laws and regulations, ensuring compliance in manufacturing and sales.",
      icon: <FaSearch className='w-6 h-6 text-purple-600' />,
    },
  ];

  return (
    <Layout>
      <Helmet>
  <title>Bachelor of Pharmacy (B.Pharm) | Saroj International University</title>
  <meta name="description" content="Enroll in the B.Pharm program at Saroj International University and gain expertise in pharmaceutical sciences, drug formulation, and clinical research." />
</Helmet>

      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className='text-center mb-16'>
          <div className='flex justify-center mb-6'>
            <div className='bg-green-100 p-4 rounded-full'>
              <FaFlask className='w-12 h-12 text-green-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Bachelor of Pharmacy (B.Pharm)</h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>A foundational undergraduate program offering comprehensive knowledge in pharmaceutical sciences and patient care.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaGraduationCap className='w-6 h-6 text-green-600 mr-3' />
              <h3 className='font-semibold text-lg'>Degree Awarded</h3>
            </div>
            <p className='text-gray-700'>Bachelor of Pharmacy (B.Pharm)</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaClock className='w-6 h-6 text-green-600 mr-3' />
              <h3 className='font-semibold text-lg'>Duration</h3>
            </div>
            <p className='text-gray-700'>4 Years (8 Semesters)</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaCalendarAlt className='w-6 h-6 text-green-600 mr-3' />
              <h3 className='font-semibold text-lg'>Intake</h3>
            </div>
            <p className='text-gray-700'>100 Seats (Annual)</p>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("overview")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaBookOpen className='w-6 h-6 text-green-600 mr-3' />
              Program Overview
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.overview ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.overview && (
            <div className='px-6 pb-6'>
              <p className='text-gray-700 mb-4'>The B.Pharm program is designed to provide students with a robust foundation in all aspects of pharmaceutical sciences. It covers the discovery, development, production, and safe use of medications, preparing graduates for diverse roles in the healthcare and pharmaceutical industries.</p>
              <p className='text-gray-700 mb-4'>The curriculum integrates theoretical knowledge with extensive practical training, including laboratory work, industrial visits, and a mandatory internship, to ensure graduates are well-prepared for real-world challenges.</p>
              <div className='mt-6'>
                <h3 className='font-semibold text-lg mb-3 text-gray-800'>Key Learning Outcomes:</h3>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Understand drug action, pharmacology, and pharmacotherapeutics.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Master pharmaceutical chemistry, analysis, and formulation development.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Learn about pharmaceutical manufacturing, quality control, and regulatory affairs.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Develop patient counseling and community pharmacy skills.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Removed Curriculum Structure section as per request */}

        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("careers")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaBriefcase className='w-6 h-6 text-green-600 mr-3' />
              Career Opportunities
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.careers ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.careers && (
            <div className='px-6 pb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {careerPaths.map((career, index) => (
                  <div key={index} className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'>
                    <div className='flex items-center mb-4'>
                      {career.icon}
                      <h3 className='font-semibold text-lg ml-3'>{career.title}</h3>
                    </div>
                    <p className='text-gray-700'>{career.description}</p>
                    
                  </div>
                ))}
              </div>
              <div className='mt-8'>
                <h3 className='font-semibold text-lg mb-3 text-gray-800'>Top Recruiters:</h3>
                <div className='flex flex-wrap gap-4'>
                  {["Cipla", "Sun Pharma", "Dr. Reddy's Labs", "Lupin", "Cadila Healthcare", "Apollo Pharmacy", "Fortis Healthcare", "Ranbaxy", "Pfizer"].map((company, i) => (
                    <div key={i} className='bg-gray-100 px-4 py-2 rounded-full text-gray-800'>
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("admission")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaGraduationCap className='w-6 h-6 text-green-600 mr-3' />
              Admission Process
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.admission ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.admission && (
            <div className='px-6 pb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='font-semibold text-lg mb-3 text-gray-800'>Eligibility:</h3>
                  <ul className='space-y-3 text-gray-700'>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>10+2 with Physics, Chemistry, and Biology/Mathematics</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>Minimum 50% aggregate marks in PCM/PCB</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>Qualifying marks in university/state entrance examination</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-3 text-gray-800'>Application Process:</h3>
                  <ol className='space-y-3 text-gray-700 list-decimal list-inside'>
                    <li>Submit online application form with all required documents.</li>
                    <li>Appear for the entrance examination (if applicable).</li>
                    <li>Participate in counseling based on entrance exam scores.</li>
                    <li>Complete admission formalities and fee payment.</li>
                  </ol>
                </div>
              </div>
              {/* Removed Important Dates section as per request */}
            </div>
          )}
        </div>

        

        <div className='text-center bg-green-700 text-white p-12 rounded-lg'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Start Your Pharmaceutical Journey?</h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>Enroll in our B.Pharm program and become a skilled professional in the world of medicine and healthcare.</p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <a  href="https://siu.in8.nopaperforms.com/"  target="_blank" className='bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center'>
              <FaFileAlt className='mr-2' /> Apply Now
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BPharmaPage;
