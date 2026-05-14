import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBriefcase,
  FaDollarSign,
  FaGraduationCap,
  FaClock,
  FaUniversity,
  FaFileAlt,
  FaChevronDown,
  FaCalendarAlt,
  FaBookOpen,     // For Program Overview
  FaBriefcaseMedical, // For Career Opportunities
  FaUserGraduate, // For Admission Process
  FaChartLine,    // For Finance specific highlights/topics
  FaHandshake,    // For Finance opportunities
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BBAFinancePage = () => {
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

  // Data for BBA Finance program, tailored for this specific page
  const bbaFinanceProgram = {
    id: 'bba-finance',
    title: 'Bachelor of Business Administration (BBA) in Financial Management',
    duration: '3 Years (6 Semesters)',
    icon: <FaDollarSign className="text-teal-600 text-2xl" />,
    description: 'The BBA in Financial Management program is designed to equip students with a robust understanding of financial markets, investment strategies, corporate finance, and risk management. This specialization prepares students for lucrative careers in banking, investment, and financial planning sectors. The program is available in both Regular Mode (domestic, full-time, offline) and Global Mode (full-time, offline, with an international study destination each year).',
    specializations: [
      'Financial Markets & Institutions',
      'Investment Analysis & Portfolio Management',
      'Corporate Finance',
      'Risk Management',
      'Financial Planning & Wealth Management',
      'Banking Operations'
    ],
    highlights: [
      'In-depth knowledge of financial concepts and theories',
      'Practical skills in financial modeling and analysis',
      'Understanding of global economic trends and their financial impact',
      'Preparation for financial certifications (e.g., NISM, CFA)',
      'Career readiness for roles in banking, investment, and financial services'
    ],
  };

  return (
    <Layout>
      <Helmet>
  <title>BBA in Finance | Saroj International University</title>
  <meta name="description" content="Specialize in finance with our BBA program and learn investment analysis, financial planning, and corporate finance principles." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-100 p-4 rounded-full">
              <FaDollarSign className="w-12 h-12 text-teal-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{bbaFinanceProgram.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the intricacies of finance and investment, preparing for a high-impact career in the global financial sector.
          </p>
        </div>

        {/* Program Highlights - Kept as static boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Business Administration (BBA)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">{bbaFinanceProgram.duration}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Varies (Annual)</p>
          </div>
        </div>

        {/* Accordion Sections for BBA Finance Content - Now separate blocks */}
        <div className="space-y-6 mb-12"> {/* This div creates space between the individual accordion blocks */}
          {/* Section: Program Overview */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('programOverview')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBookOpen className="w-6 h-6 text-teal-600 mr-3" />
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
                  className="px-6 pb-6 pt-4 border-t border-gray-100">  
                  <p className="text-gray-700 mb-3">{bbaFinanceProgram.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Areas of Study:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bbaFinanceProgram.specializations.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bbaFinanceProgram.highlights.map((highlight, i) => (
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
                <FaHandshake className="w-6 h-6 text-teal-600 mr-3" />
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
                    A BBA in Financial Management opens doors to a variety of roles in the dynamic financial sector. Graduates are prepared for positions in:
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside mt-2">
                    <li>Investment Banking</li>
                    <li>Financial Analysis</li>
                    <li>Portfolio Management</li>
                    <li>Risk Management</li>
                    <li>Corporate Finance</li>
                    <li>Wealth Management</li>
                    <li>Retail Banking</li>
                    <li>Financial Consulting</li>
                    <li>Equity Research</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    This program also provides a solid foundation for pursuing professional certifications like CFA (Chartered Financial Analyst) or further studies like an MBA in Finance.
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
                <FaUserGraduate className="w-6 h-6 text-teal-600 mr-3" />
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
                          <span>10+2 from a recognized board or equivalent</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Minimum 50% aggregate marks</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>May require an aptitude test or interview</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Application Process:</h3>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li>Fill online application form</li>
                        <li>Upload required academic and identification documents</li>
                        <li>Attend counseling or interview (if applicable)</li>
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
        <div className="text-center bg-teal-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Shape the Financial Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enroll in our BBA in Financial Management to build expertise in a high-demand global sector.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-white text-teal-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaFileAlt className="mr-2" /> Apply Now
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BBAFinancePage;