import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPills, FaFlask, FaMedkit, FaUserMd, // Existing icons
  FaChevronDown, FaFileAlt, 
  FaGraduationCap, // Used for program general icon
  FaSyringe, // A new icon for a "Doctoral" level or similar if needed
  FaStethoscope // Good for general health sciences header
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const PharmacyPage = () => {
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const [filters, setFilters] = useState({
    level: 'all', // Default to 'all' for initial display
  });

  const allPrograms = [ // Renamed 'programs' to 'allPrograms' for consistency
    {
      id: 'pharmd',
      title: 'Doctor of Pharmacy (PharmD)',
      duration: '6 Years',
      level: 'doctoral', // Added level for filtering
      icon: <FaPills className="text-green-500 text-2xl" />,
      description: 'Comprehensive clinical training in pharmaceutical care, preparing you for direct patient interaction.',
      highlights: [
        'Pharmacotherapy & Patient Care',
        'Extensive Clinical Rotations',
        'Medication Therapy Management',
        'Interprofessional Healthcare Team Collaboration',
        'Capstone Research Project'
      ]
    },
    {
      id: 'bpharm',
      title: 'Bachelor of Pharmacy (BPharm)',
      duration: '4 Years',
      level: 'undergraduate', // Added level for filtering
      icon: <FaFlask className="text-green-600 text-2xl" />,
      description: 'Foundational knowledge in pharmaceutical sciences, covering drug discovery, development, and delivery.',
      highlights: [
        'Pharmaceutical Chemistry & Analysis',
        'Pharmacology & Toxicology',
        'Pharmaceutics & Dosage Form Design',
        'Biopharmaceutics & Pharmacokinetics',
        'Industrial Pharmacy & Quality Control'
      ]
    },
    {
      id: 'mpharm-pharma',
      title: 'Master of Pharmacy (M.Pharm) - Pharmaceutics',
      duration: '2 Years',
      level: 'postgraduate',
      icon: <FaPills className="text-green-700 text-2xl" />,
      description: 'Advanced studies in drug formulation, development, and manufacturing processes.',
      highlights: [
        'Advanced Drug Delivery Systems',
        'Novel Drug Formulations',
        'Quality Assurance & Regulatory Affairs',
        'Biopharmaceutical Product Development',
        'Research Thesis'
      ]
    },
    {
      id: 'mpharm-pharma-chem',
      title: 'Master of Pharmacy (M.Pharm) - Pharmaceutical Chemistry',
      duration: '2 Years',
      level: 'postgraduate',
      icon: <FaFlask className="text-green-700 text-2xl" />,
      description: 'Specialized master\'s program focusing on the design, synthesis, and analysis of medicinal compounds.',
      highlights: [
        'Medicinal Chemistry',
        'Drug Design & Synthesis',
        'Spectroscopy & Analytical Techniques',
        'Pharmacoinformatics',
        'Research in Drug Discovery'
      ]
    },
    {
      id: 'diploma-pharmacy',
      title: 'Diploma in Pharmacy (D.Pharm)',
      duration: '2 Years',
      level: 'diploma',
      icon: <FaUserMd className="text-green-400 text-2xl" />,
      description: 'A practical-oriented program for aspiring pharmacy assistants and technicians, focusing on dispensing and patient support.',
      highlights: [
        'Pharmacology Basics',
        'Drug Storage & Dispensing',
        'Hospital & Community Pharmacy',
        'Pharmaceutical Jurisprudence',
        'Practical Training'
      ]
    },
    // Add more programs as needed for different levels
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
    { label: 'Doctoral', value: 'doctoral' },
  ];

  return (
    <Layout>
      <Helmet>
  <title>Pharmacy Programs | Saroj International University</title>
  <meta name="description" content="Discover top-tier programs in Pharmaceutical Sciences including B.Pharm and D.Pharm at Saroj International University." />
</Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <FaMedkit className="text-5xl text-green-600" /> {/* Main icon for the page */}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pharmacy Programs</h1>
          <p className="text-xl text-gray-600">Training healthcare professionals in medication therapy and pharmaceutical sciences.</p>
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
          {/* Header for Filter Bar - Using a dark green theme */}
          <div className="bg-black rounded-t-xl px-8 py-6 text-white flex items-center">
            <FaStethoscope className="text-3xl text-white mr-4" /> {/* Icon for this section header */}
            <div>
              <h2 className="text-2xl font-bold">Our Pharmacy Programs</h2>
              <p className="text-green-100 mt-1">From foundational diplomas to advanced doctoral degrees</p>
            </div>
          </div>

         {/* Unsplash Image added here */}
            <div className="flex justify-center width:full relative h-64 overflow-hidden shadown-md ">
            <img 
              src="https://images.unsplash.com/photo-1740592754365-2117f5977528?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNpbmUlMjBncmVlbiUyMHRhYmxldHNhfGVufDB8MHwwfHx8MA%3D%3D" 
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
                    ? 'bg-green-600 text-white shadow-md' // Active state for Pharmacy
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
                          {program.level === 'diploma' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Diploma</span>}
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
                               className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"   >
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

          <div className="px-8 py-6 bg-green-50 border-t border-gray-200 text-center">
            <motion.a 
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className=" bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center justify-center mx-auto w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileAlt className="mr-2" /><span>
                Start Application
                </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PharmacyPage;