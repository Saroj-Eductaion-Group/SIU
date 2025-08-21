import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaDesktop, // Icon for B.Tech IT
  FaGraduationCap,
  FaClock,
  FaCalendarAlt,
  FaBookOpen,
  FaBriefcaseMedical,
  FaUserGraduate,
  FaChevronDown,
  FaFileAlt,
  FaCloud, // For Cloud Computing
  FaDatabase, // For Data Management
  FaMobileAlt, // For Mobile Development
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BtechItPage = () => {
  const [staticSections, setStaticSections] = useState({
    programOverview: false,
    careerOpportunities: false,
    admissionProcess: false,
  });

  const toggleStaticSection = (sectionName) => {
    setStaticSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const btechItProgram = {
    id: 'btech-it',
    title: 'Bachelor of Technology (B.Tech) in Information Technology',
    duration: '4 Years (8 Semesters)',
    icon: <FaDesktop className="text-blue-600 text-2xl" />,
    description: 'The B.Tech in Information Technology program focuses on the application, design, development, and management of information systems and technology solutions. It prepares students to manage complex IT infrastructure, develop software, and solve real-world problems using technology.',
    specializations: [
      'Network Management & Security',
      'Database Systems',
      'Cloud & Virtualization',
      'Software Engineering',
      'Enterprise Resource Planning (ERP)',
      'Data Analytics & Visualization'
    ],
    highlights: [
      'Practical skills in IT infrastructure and software deployment',
      'Understanding of data management and security principles',
      'Focus on real-world IT solutions and systems integration',
      'Preparation for IT certifications',
      'Career readiness for IT roles across various industries',
      'Strong emphasis on project-based learning'
    ],
  };

  return (
    <Layout>
      <Helmet>
  <title>B.Tech in Information Technology | Saroj International University</title>
  <meta name="description" content="Enroll in the B.Tech in IT program to build skills in networking, cybersecurity, database systems, and cloud computing at Saroj International University." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaDesktop className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{btechItProgram.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Become an expert in managing and leveraging information systems to drive innovation and efficiency in the digital age.
          </p>
        </div>

        {/* Program Highlights - Static Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Technology (B.Tech)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">{btechItProgram.duration}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Varies (Annual)</p>
          </div>
        </div>

        {/* Accordion Sections for B.Tech IT Content */}
        <div className="space-y-6 mb-12"> {/* This div creates space between the individual accordion blocks */}
          {/* Section: Program Overview */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('programOverview')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBookOpen className="w-6 h-6 text-blue-600 mr-3" />
                Program Overview
              </h2>
              <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${staticSections.programOverview ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {staticSections.programOverview && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={accordionVariants}
                  className="px-6 pb-6 pt-4 border-t border-gray-100"
                >
                  <p className="text-gray-700 mb-3">{btechItProgram.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Areas of Study:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {btechItProgram.specializations.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {btechItProgram.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section: Career Opportunities */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('careerOpportunities')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBriefcaseMedical className="w-6 h-6 text-blue-600 mr-3" />
                Career Opportunities
              </h2>
              <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${staticSections.careerOpportunities ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {staticSections.careerOpportunities && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={accordionVariants}
                  className="px-6 pb-6 pt-4 border-t border-gray-100"
                >
                  <p className="text-gray-700">
                    A B.Tech in Information Technology prepares graduates for a wide array of roles critical to modern organizations. Potential career paths include:
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside mt-2">
                    <li>IT Consultant</li>
                    <li>Network Administrator/Engineer</li>
                    <li>System Analyst</li>
                    <li>Database Administrator</li>
                    <li>Cloud Administrator/Engineer</li>
                    <li>Cybersecurity Specialist</li>
                    <li>Technical Support Engineer</li>
                    <li>Software Quality Assurance Engineer</li>
                    <li>Web Developer (IT focus)</li>
                    <li>IT Project Manager</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    The IT industry is constantly expanding, offering excellent prospects for professionals who can adapt to new technologies and manage complex systems.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section: Admission Process */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('admissionProcess')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaUserGraduate className="w-6 h-6 text-blue-600 mr-3" />
                Admission Process
              </h2>
              <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${staticSections.admissionProcess ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {staticSections.admissionProcess && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={accordionVariants}
                  className="px-6 pb-6 pt-4 border-t border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Eligibility:</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>10+2 with Physics, Chemistry, and Mathematics (PCM) from a recognized board</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Minimum aggregate marks as per university/college norms (e.g., 55%)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Entrance examination score (e.g., JEE Main, State CET) may be required</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Application Process:</h3>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li>Appear for the required entrance examination</li>
                        <li>Fill online application form with entrance exam scores</li>
                        <li>Upload necessary academic and identification documents</li>
                        <li>Participate in counseling or interview rounds</li>
                        <li>Complete final admission formalities upon selection</li>
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Innovate with Information Technology?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enroll in our B.Tech IT program and become a pivotal force in the digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaFileAlt className="mr-2" /> Apply Now
            </a>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BtechItPage;