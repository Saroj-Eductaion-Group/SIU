import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBriefcase, // Main BBA icon, also for career section title
  FaChartLine, // For general business, analytics, strategy
  FaUserTie, // For management, corporate roles
  FaGraduationCap, // General academic, also for admission process
  FaClock, // For duration
  FaUniversity, // For programs/education
  FaFileAlt, // For details/application
  FaChevronDown, // For accordions
  FaCalendarAlt, // For intake
  FaGlobe, // For Global Mode
  FaHome, // For Regular Mode
  FaChartBar, // For fees
  FaDollarSign, // For finance specific BBA icon
  FaBuilding, // For general BBA specializations
  FaHandshake, // For HR, negotiation
  FaShoppingCart, // For Retail, Marketing
  FaLightbulb, // For Entrepreneurship
  FaTruck, // For Logistics/SCM
  FaCode, // For IT
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BBAPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    career: false, // Initialize career section as closed
    admission: false, // Initialize admission section as closed
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
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

  const bbaPrograms = [
    {
      id: 'gen-banking-finance-marketing-etc',
      title: 'BBA (General, Banking Finance, International Business, Marketing, Insurance, Digital Marketing, IT, Entrepreneurship)',
      duration: '3 Years (6 Semesters)',
      icon: <FaBuilding className="text-blue-500 text-2xl" />,
      description: 'A comprehensive BBA program covering a wide array of essential business disciplines, designed to provide a strong foundation for diverse career paths in the corporate world. This program offers flexibility with both domestic and international study options.',
      specializations: [
        'General Management',
        'Banking Finance',
        'International Business',
        'Marketing',
        'Insurance',
        'Digital Marketing',
        'Information Technology',
        'Entrepreneurship'
      ],
      highlights: [
        'Interdisciplinary business education',
        'Develops core management competencies',
        'Exposure to various industry sectors',
        'Enhances entrepreneurial mindset',
        'Prepares for dynamic roles in finance, marketing, and more'
      ],
      modes: [
        {
          modeName: 'Regular Mode',
          modeDescription: 'Totally domestic and Full-time - Offline',
          fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 }
        },
        {
          modeName: 'Global Mode',
          modeDescription: 'Students will be going to study in International Destination in each Year',
          fees: { year1: 160000, year2: 160000, year3: 160000, total: 480000 }
        }
      ]
    },
    {
      id: 'logistics-scm-hr-it',
      title: 'BBA (Logistics & SCM, HR, IT, Entrepreneurship)',
      duration: '3 Years (6 Semesters)',
      icon: <FaChartLine className="text-green-500 text-2xl" />,
      description: 'This specialized BBA program focuses on the critical areas of supply chain management, human resources, and the technological and entrepreneurial aspects of business. It is designed for students aiming for careers in operational excellence and talent management.',
      specializations: [
        'Logistics & Supply Chain Management',
        'Human Resources',
        'Information Technology',
        'Entrepreneurship'
      ],
      highlights: [
        'Specialized knowledge in supply chain and HR',
        'Understanding of business technology applications',
        'Skills for managing people and operations efficiently',
        'Fosters innovative and entrepreneurial thinking',
        'Industry-relevant curriculum for specialized roles'
      ],
      modes: [
        {
          modeName: 'Regular Mode',
          modeDescription: 'Totally domestic and Full-time - Offline',
          fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 }
        },
        {
          modeName: 'Global Mode',
          modeDescription: 'Students will be going to study in International Destination in each Year',
          fees: { year1: 160000, year2: 160000, year3: 160000, total: 480000 }
        }
      ]
    },
    {
      id: 'insurance-retail-startups',
      title: 'BBA (Insurance, Retail & Start-Ups)',
      duration: '3 Years (6 Semesters)',
      icon: <FaUserTie className="text-red-500 text-2xl" />,
      description: 'A focused BBA program for students interested in the dynamic sectors of insurance, retail, and the booming startup ecosystem. This program equips students with the specialized knowledge and skills to thrive in these evolving industries.',
      specializations: [
        'Insurance',
        'Retail Management',
        'Start-Up Management'
      ],
      highlights: [
        'Deep dive into insurance and retail operations',
        'Skills for launching and managing new ventures',
        'Understanding market trends in specialized sectors',
        'Practical approach to business development',
        'Networking opportunities within specific industries'
      ],
      modes: [
        {
          modeName: 'Regular Mode',
          modeDescription: 'Totally domestic and Full-time - Offline',
          fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 }
        },
        {
          modeName: 'Global Mode',
          modeDescription: 'Students will be going to study in International Destination in each Year',
          fees: { year1: 160000, year2: 160000, year3: 160000, total: 480000 }
        }
      ]
    }
  ];

  // Data for the new Career Opportunities section
  const bbaCareerRoles = [
    {
      title: 'Marketing Manager',
      icon: <FaShoppingCart className="text-orange-500 text-xl" />,
      description: 'Develop and execute marketing strategies, branding, and promotional activities for products or services.'
    },
    {
      title: 'Financial Analyst',
      icon: <FaDollarSign className="text-green-500 text-xl" />,
      description: 'Analyze financial data, prepare reports, and provide insights for investment decisions and business planning.'
    },
    {
      title: 'Human Resources Specialist',
      icon: <FaHandshake className="text-purple-500 text-xl" />,
      description: 'Manage talent acquisition, employee relations, training, and development within an organization.'
    },
    {
      title: 'Operations Manager',
      icon: <FaTruck className="text-red-500 text-xl" />,
      description: 'Oversee daily operations, optimize processes, and ensure efficient resource allocation and supply chain management.'
    },
    {
      title: 'Business Development Executive',
      icon: <FaBriefcase className="text-blue-500 text-xl" />,
      description: 'Identify new business opportunities, build client relationships, and drive growth for the company.'
    },
    {
      title: 'Entrepreneur/Startup Founder',
      icon: <FaLightbulb className="text-yellow-500 text-xl" />,
      description: 'Launch and manage new ventures, innovate business models, and navigate the challenges of a startup ecosystem.'
    }
  ];

  const topBBARecruiters = [
    'TATA Group', 'Reliance Industries', 'ICICI Bank', 'HDFC Bank', 'Infosys',
    'Wipro', 'Amazon', 'Flipkart', 'Deloitte', 'PwC', 'KPMG', 'EY',
    'Various MNCs & Startups'
  ];


  return (
    <Layout>
      <Helmet>
  <title>Bachelor of Business Administration (BBA) | Saroj International University</title>
  <meta name="description" content="Earn your BBA from Saroj International University and gain a strong foundation in management, leadership, marketing, and entrepreneurship." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaBriefcase className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Bachelor of Business Administration (BBA) Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore a range of BBA specializations to build a strong foundation in business management and leadership, preparing for dynamic careers in the corporate world.
          </p>
        </div>

        {/* Program Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Business Administration (BBA)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">3 Years (6 Semesters)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Varies by specialization (Annual)</p>
          </div>
        </div>

        {/* Available BBA Programs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="bg-blue-700 px-8 py-6 flex items-center">
            <FaUniversity className="text-3xl text-white mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-white">Our BBA Program Specializations</h2>
              <p className="text-blue-100 mt-1">Foundational and specialized pathways in Business Administration</p>
            </div>
          </div>
          <div className="p-8">
            {bbaPrograms.map((program) => (
              <div key={program.id} className="mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <button
                  onClick={() => toggleSection(program.id)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    {program.icon}
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
                      <p className="text-gray-600 text-sm">{program.duration}</p>
                    </div>
                  </div>
                  <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections[program.id] ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedSections[program.id] && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={accordionVariants}
                      className="px-6 pb-6 pl-14 bg-gray-50 rounded-lg mt-2"
                    >
                      <p className="text-gray-700 mb-3">{program.description}</p>
                      <h4 className="font-semibold text-gray-800 mb-2">Specializations Offered:</h4>
                      <ul className="space-y-2 text-gray-700 list-disc list-inside">
                        {program.specializations.map((spec, i) => (
                          <li key={i}>{spec}</li>
                        ))}
                      </ul>
                      <h4 className="font-semibold text-gray-800 mb-2 mt-4">Key Features:</h4>
                      <ul className="space-y-2 text-gray-700 list-disc list-inside">
                        {program.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
 
                  
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Career Opportunities Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <button
            onClick={() => toggleSection('career')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBriefcase className="w-6 h-6 text-blue-600 mr-3" />
              Career Opportunities
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.career ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {expandedSections.career && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={accordionVariants}
                className="px-6 pb-6"
              >
                <p className="text-gray-700 mb-6">
                  A Bachelor of Business Administration (BBA) degree prepares graduates for a wide range of roles across various industries. The program builds fundamental business knowledge and practical skills highly valued by employers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> {/* Grid layout for career roles */}
                  {bbaCareerRoles.map((role, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-start text-left">
                      <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                        {role.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{role.title}</h3>
                      <p className="text-gray-600 text-sm">{role.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-lg text-gray-800 mb-3">Top Recruiters:</h3>
                <div className="flex flex-wrap gap-3">
                  {topBBARecruiters.map((recruiter, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Admission Requirements */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <button
            onClick={() => toggleSection('admission')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaGraduationCap className="w-6 h-6 text-blue-600 mr-3" />
              Admission Process
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.admission ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.admission && (
            <div className="px-6 pb-6">
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
        <div className="text-center bg-blue-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Lead in the Business World?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our BBA programs to develop essential business acumen, leadership skills, and a strategic mindset.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://siu.in8.nopaperforms.com/" target="_blank"
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

export default BBAPage;