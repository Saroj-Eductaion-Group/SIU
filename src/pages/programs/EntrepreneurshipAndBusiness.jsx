import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLightbulb,      // For entrepreneurship ideas
  FaChartLine,      // For business growth/strategy
  FaHandshake,      // Main icon for business/partnerships
  FaUniversity,     // General academic icon, or could be specific to business like FaBriefcase
  FaFileAlt,        // For 'View Program Details' and 'Start Application'
  FaChevronDown,    // For expand/collapse
  // New icons for categories/levels if needed:
  FaUserGraduate,   // For undergraduate programs
  FaBriefcase,      // General business icon
  FaBuilding,       // For corporate/industry focus
  FaDollarSign      // Could be for finance/economics within business
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const EntrepreneurshipAndBusiness = () => {
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const [filters, setFilters] = useState({
    level: 'all', // Default to 'all' for initial display
  });

  const allPrograms = [ // Renamed 'programs' to 'allPrograms' for consistency
    {
      id: 'bba-entrepreneurship',
      title: 'BBA in Entrepreneurship',
      duration: '3 Years',
      level: 'undergraduate', // Added level for filtering
      icon: <FaLightbulb className="text-yellow-500 text-2xl" />,
      description: 'Develop comprehensive business acumen and practical skills to launch and grow successful ventures from ideation to execution.',
      highlights: [
        'Business Plan Development & Validation',
        'Startup Financing & Fundraising',
        'Market Research & Feasibility Analysis',
        'Innovation & Design Thinking',
        'Legal Aspects of Business'
      ]
    },
    {
      id: 'mba-innovation',
      title: 'MBA in Innovation Management',
      duration: '2 Years',
      level: 'postgraduate', // Added level for filtering
      icon: <FaChartLine className="text-yellow-600 text-2xl" />,
      description: 'Advanced training for aspiring leaders focusing on driving innovation, managing change, and fostering a culture of creativity within organizations.',
      highlights: [
        'Corporate Innovation Strategies',
        'Technology Commercialization',
        'Disruptive Technologies & Business Models',
        'Product Development & Management',
        'Intellectual Property Rights'
      ]
    },
    {
      id: 'bcom-finance',
      title: 'B.Com in Finance & Accounting',
      duration: '3 Years',
      level: 'undergraduate',
      icon: <FaDollarSign className="text-yellow-500 text-2xl" />,
      description: 'A strong foundation in financial principles, accounting practices, and economic analysis for a career in finance.',
      highlights: [
        'Financial Reporting & Analysis',
        'Investment Management',
        'Corporate Finance',
        'Taxation & Auditing',
        'Financial Markets & Institutions'
      ]
    },
    {
      id: 'pg-diploma-business-analytics',
      title: 'PG Diploma in Business Analytics',
      duration: '1 Year',
      level: 'postgraduate', // Note: Often considered postgraduate, check your institution's classification
      icon: <FaChartLine className="text-yellow-700 text-2xl" />,
      description: 'Equip yourself with data-driven decision-making skills using modern analytical tools and techniques.',
      highlights: [
        'Statistical Modeling',
        'Machine Learning for Business',
        'Data Visualization',
        'Predictive Analytics',
        'Business Intelligence Tools'
      ]
    },
    {
      id: 'executive-mba',
      title: 'Executive MBA (for experienced professionals)',
      duration: '1.5 Years',
      level: 'postgraduate', // Or a separate 'executive' level if you wish
      icon: <FaBriefcase className="text-yellow-600 text-2xl" />,
      description: 'Designed for mid-career professionals to enhance leadership and strategic management skills.',
      highlights: [
        'Strategic Leadership',
        'Global Business Environment',
        'Operations Management',
        'Digital Transformation',
        'Executive Coaching'
      ]
    }
    // You can add 'doctoral' or 'diploma' level programs here if applicable
  ];

  const filteredPrograms = allPrograms.filter(program => {
    return filters.level === 'all' || program.level === filters.level;
  });

  const handleFilterChange = (level) => {
    setFilters({ level });
    // Optionally close all expanded programs when filter changes
    setExpandedPrograms({}); 
  };

  const levelFilters = [
    { label: 'All Programs', value: 'all' },
    { label: 'Undergraduate', value: 'undergraduate' },
    { label: 'Postgraduate', value: 'postgraduate' },
    { label: 'Diploma', value: 'diploma' },
    // Only include Doctoral if you have programs for it:
    // { label: 'Doctoral', value: 'doctoral' }, 
  ];

  return (
    <Layout>
      <Helmet>
  <title>Entrepreneurship & Business Programs | Saroj International University</title>
  <meta name="description" content="Develop business acumen, leadership, and startup strategies with our Entrepreneurship and Business programs at Saroj International University." />
</Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <FaHandshake className="text-5xl text-yellow-600" /> {/* Main icon for the page */}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Entrepreneurship & Business Programs</h1>
          <p className="text-xl text-gray-600">Empowering future business leaders and innovators through dynamic programs.</p>
          <p className="text-gray-500 mt-2">
            Total Programs Available: <span className="font-semibold">{filteredPrograms.length}</span>{' '}
            <span className="text-sm">(Including all levels)</span>
          </p>
        </motion.div>

         
        {/* Filter and Program List Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-12"
        >
          {/* Header for Filter Bar - Using a golden/yellow theme */}
          <div className="bg-black rounded-t-xl px-8 py-6 text-white flex items-center">
            <FaUniversity className="text-3xl text-white mr-4" /> {/* Icon for this section header */}
            <div>
              <h2 className="text-2xl font-bold">Our Business & Entrepreneurship Programs</h2>
              <p className="text-yellow-100 mt-1">Building the next generation of business innovators and strategists</p>
            </div>
          </div>

            {/* Unsplash Image added here */}
            <div className="flex justify-center width:full relative h-64 overflow-hidden shadown-md ">
            <img 
              src="https://plus.unsplash.com/premium_photo-1661764256397-af154e87b1b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3N8ZW58MHwwfDB8fHww" 
              alt="AI and Technology Banner" 
              className="w-full h-full object-cover " // Added styling
            /></div>


          {/* Filter Buttons */}
          <div className="bg-white p-4 rounded-b-xl shadow-inner-top flex flex-wrap gap-2 justify-start border-b border-gray-100">
            {levelFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${filters.level === filter.value 
                    ? 'bg-yellow-600 text-white shadow-md' // Active state for Business
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Program List */}
          <div className="p-8">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div key={program.id} className="mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <button
                    onClick={() => setExpandedPrograms(prev => ({
                      ...prev,
                      [program.id]: !prev[program.id]
                    }))}
                    className="w-full text-left flex justify-between items-center py-2" // Aligned items
                  >
                    <div className="flex items-center">
                      {program.icon}
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
                        <div className="text-gray-600 text-sm flex items-center gap-2">
                          <span>{program.duration}</span>
                          {/* Small tags for program levels */}
                          {program.level === 'undergraduate' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">UG</span>}
                          {program.level === 'postgraduate' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">PG</span>}
                          {program.level === 'diploma' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Diploma</span>}
                          {program.level === 'doctoral' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Doctoral</span>}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedPrograms[program.id] ? 180 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedPrograms[program.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pl-12 bg-gray-50 p-4 rounded-lg border border-gray-100"
                      >
                        <p className="text-gray-700 mb-3">{program.description}</p>
                        <h4 className="font-medium text-gray-800 mb-2">Program Highlights:</h4>
                        <ul className="space-y-2 text-gray-700 list-disc list-inside">
                          {program.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 hidden">•</span> {/* Hide default bullet, keep if you prefer */}
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex gap-4">
                              <a  href="https://siu.in8.nopaperforms.com/" target="_blank"
                               className="text-white bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md text-sm font-medium"   >
                            Apply Now
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No programs match the selected filter criteria.</p>
              </div>
            )}
          </div>

          <div className="px-8 py-6 bg-yellow-50 border-t border-gray-200 text-center">
            <motion.a 
             href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center justify-center mx-auto w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileAlt className="mr-2" /> 
              <span>
                Start Application
                </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default EntrepreneurshipAndBusiness;