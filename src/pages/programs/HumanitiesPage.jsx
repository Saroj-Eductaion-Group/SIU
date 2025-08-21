import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, FaHistory, FaLanguage, FaGlobe, 
  FaChevronDown, FaFileAlt,
  FaPencilAlt, 
  FaQuoteLeft, 
  FaUserFriends 
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const HumanitiesPage = () => {
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const [filters, setFilters] = useState({
    level: 'all', 
  });

  const allPrograms = [ 
    {
      id: 'english-literature',
      title: 'BA in English Literature',
      duration: '3 Years',
      level: 'undergraduate', 
      icon: <FaBook className="text-yellow-500 text-2xl" />,
      description: 'Explore literary traditions across cultures and historical periods, developing strong analytical and communication skills.',
      highlights: [
        'Critical Theory and Literary Analysis',
        'Creative Writing Workshops (Poetry, Prose)',
        'Survey of World Literature & Genres',
        'Research Methodologies & Academic Writing',
        'Cultural Studies & Interdisciplinary Approaches'
      ]
    },
    {
      id: 'history',
      title: 'MA in History',
      duration: '2 Years',
      level: 'postgraduate', 
      icon: <FaHistory className="text-yellow-600 text-2xl" />,
      description: 'Advanced study of historical events, interpretations, and methodologies, preparing for academic or research careers.',
      highlights: [
        'Historiography & Historical Theory',
        'Archival Research & Oral History',
        'Specialized Period Studies (e.g., Ancient, Medieval, Modern)',
        'Thesis Writing & Presentation',
        'Public History & Digital Humanities'
      ]
    },
    {
      id: 'linguistics',
      title: 'BA in Linguistics',
      duration: '3 Years',
      level: 'undergraduate',
      icon: <FaLanguage className="text-yellow-500 text-2xl" />,
      description: 'Understand the structure, evolution, and use of human language, from phonetics to semantics.',
      highlights: [
        'Phonetics & Phonology',
        'Syntax & Semantics',
        'Sociolinguistics & Psycholinguistics',
        'Language Acquisition',
        'Computational Linguistics Basics'
      ]
    },
    {
      id: 'philosophy',
      title: 'MA in Philosophy',
      duration: '2 Years',
      level: 'postgraduate',
      icon: <FaPencilAlt className="text-yellow-700 text-2xl" />, 
      description: 'Engage with fundamental questions about existence, knowledge, values, reason, mind, and language.',
      highlights: [
        'Ethics & Political Philosophy',
        'Epistemology & Metaphysics',
        'History of Western Philosophy',
        'Logic & Critical Thinking',
        'Philosophical Argumentation & Writing'
      ]
    },
    {
      id: 'diploma-creative-writing',
      title: 'Diploma in Creative Writing',
      duration: '1 Year',
      level: 'diploma',
      icon: <FaBook className="text-yellow-400 text-2xl" />,
      description: 'Practical, intensive program designed to hone your skills in various forms of creative writing.',
      highlights: [
        'Fiction & Short Story Writing',
        'Poetry & Playwriting',
        'Memoir & Non-fiction',
        'Critique & Workshop Sessions',
        'Publishing & Literary Industry Insights'
      ]
    }
  ];

  const filteredPrograms = allPrograms.filter(program => {
    return filters.level === 'all' || program.level === filters.level;
  });

  const handleFilterChange = (level) => {
    setFilters({ level });
    setExpandedPrograms({});  
  };

  const levelFilters = [
    { label: 'All Programs', value: 'all' },
    { label: 'Undergraduate', value: 'undergraduate' },
    { label: 'Postgraduate', value: 'postgraduate' },
    { label: 'Diploma', value: 'diploma' },
  ];

  return (
    <Layout>
      <Helmet>
  <title>Humanities Programs | Saroj International University</title>
  <meta name="description" content="Study literature, sociology, psychology, history, and more through our diverse humanities programs at Saroj International University." />
</Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <FaLanguage className="text-5xl text-yellow-600" /> 
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Humanities Programs</h1>
          <p className="text-xl text-gray-600">Exploring human culture, thought, and creativity through diverse disciplines.</p>
          <p className="text-gray-500 mt-2">
            Total Programs Available: <span className="font-semibold">{filteredPrograms.length}</span>{' '}
            <span className="text-sm">(Including all levels)</span>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-12"
        >
          <div className="bg-black rounded-t-xl px-8 py-6 text-white flex items-center">
            <FaGlobe className="text-3xl text-white mr-4" /> 
            <div>
              <h2 className="text-2xl font-bold">Humanities & Liberal Arts</h2>
              <p className="text-yellow-100 mt-1">Understanding the human experience through critical inquiry and diverse perspectives.</p>
            </div>
          </div>

           {/* Unsplash Image added here */}
            <div className="flex justify-center width:full relative h-64 overflow-hidden shadown-md ">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JhZHVhdGlvbnxlbnwwfDB8MHx8fDA%3D" 
               
              className="w-full h-full object-cover " // Added styling
            /></div>

          <div className="bg-white p-4 rounded-b-xl shadow-inner-top flex flex-wrap gap-2 justify-start border-b border-gray-100">
            {levelFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${filters.level === filter.value 
                    ? 'bg-yellow-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div key={program.id} className="mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <button
                    onClick={() => setExpandedPrograms(prev => ({
                      ...prev,
                      [program.id]: !prev[program.id]
                    }))}
                    className="w-full text-left flex justify-between items-center py-2" 
                  >
                    <div className="flex items-center">
                      {program.icon}
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
                        <div className="text-gray-600 text-sm flex items-center gap-2">
                          <span>{program.duration}</span>
                          {program.level === 'undergraduate' && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">UG</span>}
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
                              <span className="mr-2 hidden">•</span> 
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

          <div className="flex items-center px-8 py-6 bg-yellow-50 border-t border-gray-200">
            <motion.a 
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="  bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center justify-center mx-auto w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >

              <FaFileAlt className="mr-2" /> <span> Start Application
                </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default HumanitiesPage;