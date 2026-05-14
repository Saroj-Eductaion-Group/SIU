import React, { useState } from "react";
import Layout from "../../../components/Layout"; // Adjusted import path based on previous requests
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaBriefcase,
  FaGlobeAmericas, // Main icon for International Relations
  FaGraduationCap, // General academic
  FaClock, // For duration
  FaUniversity, // For programs/education
  FaFileAlt, // For details/application
  FaChevronDown, // For accordions
  FaBuilding, // For organizations/diplomacy
  FaChartLine, // For economics/global markets
  FaGavel, // For international law
  FaUsers, // For diplomacy/people
  FaSearch, // For research
  FaCalendarAlt,
   FaExternalLinkAlt, // For intake dates
} from "react-icons/fa";
import { Helmet } from "react-helmet";

const BSPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    curriculum: false,
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

  const curriculum = [
    {
      semester: "Semester 1",
      courses: ["Introduction to International Relations", "Principles of Economics", "Political Theory", "Global History I", "Academic Writing"],
    },
    {
      semester: "Semester 2",
      courses: ["International Political Economy", "Comparative Politics", "Global History II", "Research Methods in Social Sciences", "Foreign Language I"],
    },
    {
      semester: "Semester 3",
      courses: ["International Law", "Theories of Conflict and Peace", "International Organizations", "Foreign Policy Analysis", "Foreign Language II"],
    },
    {
      semester: "Semester 4",
      courses: ["Regional Studies (e.g., Asia-Pacific)", "Human Rights in International Relations", "Global Governance", "International Development", "Data Analysis for Social Sciences"],
    },
    {
      semester: "Semester 5",
      courses: ["Diplomacy and Statecraft", "International Security", "Environmental Politics", "Elective I", "Internship Preparation"],
    },
    {
      semester: "Semester 6",
      courses: ["Capstone Project in International Relations", "Global Challenges & Futures", "Elective II", "Elective III", "International Relations Internship"],
    },
  ];

  const careerPaths = [
    {
      title: "Diplomat / Foreign Service Officer",
      description: "Represent your country abroad and negotiate international agreements.",
      icon: <FaBuilding className='w-6 h-6 text-indigo-600' />,
    },
    {
      title: "International Affairs Analyst",
      description: "Analyze global political and economic trends for organizations or governments.",
      icon: <FaChartLine className='w-6 h-6 text-teal-600' />,
    },
    {
      title: "Policy Advisor",
      description: "Develop and recommend policies on international issues for various sectors.",
      icon: <FaGavel className='w-6 h-6 text-gray-600' />,
    },
    {
      title: "NGO Program Officer",
      description: "Manage projects for non-governmental organizations focusing on global issues.",
      icon: <FaUsers className='w-6 h-6 text-green-600' />,
    },
    {
      title: "Journalist / Foreign Correspondent",
      description: "Report on international events, conflicts, and global developments.",
      icon: <FaSearch className='w-6 h-6 text-orange-600' />,
    },
  ];

  return (
    <Layout>
      <Helmet>
  <title>Bachelor of Science (BS) in Humanities | Saroj International University</title>
  <meta name="description" content="Earn your BS degree from Saroj International University with a focus on scientific research, critical thinking, and technical expertise." />
</Helmet>

      <div className='max-w-6xl mx-auto px-4 py-12'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <div className='flex justify-center mb-6'>
            <div className='bg-yellow-100 p-4 rounded-full'>
              <FaGlobeAmericas className='w-12 h-12 text-yellow-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>BS in International Relations</h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>A comprehensive program designed for students passionate about global politics, diplomacy, and cross-cultural understanding.</p>
        </div>

        {/* Program Highlights */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaGraduationCap className='w-6 h-6 text-yellow-600 mr-3' />
              <h3 className='font-semibold text-lg'>Degree Awarded</h3>
            </div>
            <p className='text-gray-700'>Bachelor of Science (BS)</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaClock className='w-6 h-6 text-yellow-600 mr-3' />
              <h3 className='font-semibold text-lg'>Duration</h3>
            </div>
            <p className='text-gray-700'>3 Years (6 Semesters)</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaCalendarAlt className='w-6 h-6 text-yellow-600 mr-3' />
              <h3 className='font-semibold text-lg'>Intake</h3>
            </div>
            <p className='text-gray-700'>60 Seats (Annual)</p>
          </div>
        </div>

        {/* Program Overview */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("overview")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaUniversity className='w-6 h-6 text-yellow-600 mr-3' />
              Program Overview
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.overview ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.overview && (
            <div className='px-6 pb-6'>
              <p className='text-gray-700 mb-4'>The BS in International Relations program provides students with a robust foundation in the complexities of global politics, economics, and cultures. Through a rigorous curriculum, students will develop analytical skills to understand international systems and critically evaluate global issues.</p>
              <p className='text-gray-700 mb-4'>This program prepares graduates for careers in diplomacy, international organizations, non-governmental organizations, global business, and further postgraduate studies in related fields.</p>
              <div className='mt-6'>
                <h3 className='font-semibold text-lg mb-3 text-gray-800'>Key Learning Outcomes:</h3>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Analyze the dynamics of international relations and global governance.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Understand the role of international law and organizations in global affairs.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Assess global challenges such as security, development, and environmental issues.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Develop critical research and communication skills for policy analysis.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Career Paths */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("careers")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaBriefcase className='w-6 h-6 text-yellow-600 mr-3' />
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
                <h3 className='font-semibold text-lg mb-3 text-gray-800'>Potential Employers:</h3>
                <div className='flex flex-wrap gap-4'>
                  {["United Nations", "Embassy/Consulate", "World Bank", "Red Cross", "Amnesty International", "Multinational Corporations", "Government Agencies", "Think Tanks", "International NGOs"].map((company, i) => (
                    <div key={i} className='bg-gray-100 px-4 py-2 rounded-full text-gray-800'>
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admission Requirements */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("admission")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaGraduationCap className='w-6 h-6 text-yellow-600 mr-3' />
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
                      <span>10+2 from a recognized board or equivalent with any stream</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>Minimum 55% aggregate marks</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>May require a written aptitude test and/or personal interview</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-3 text-gray-800'>Application Process:</h3>
                  <ol className='space-y-3 text-gray-700 list-decimal list-inside'>
                    <li>Fill online application form</li>
                    <li>Upload required academic and identification documents</li>
                    <li>Pay application fee</li>
                    <li>Attend counseling or interview (if applicable)</li>
                    <li>Complete final admission formalities upon selection</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className='text-center bg-yellow-700 text-white p-12 rounded-lg'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Engage with the World?</h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>Join our BS in International Relations program and become a global citizen ready to make an impact.</p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <a  href="https://siu.in8.nopaperforms.com/"  target="_blank" className='bg-white text-yellow-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center'>
              <FaFileAlt className='mr-2' /> Apply Now
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BSPage;
