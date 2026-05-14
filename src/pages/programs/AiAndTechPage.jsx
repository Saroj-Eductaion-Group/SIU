import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, // Keep FaRobot imported
  FaLaptopCode, 
  FaBrain, 
  FaDatabase, 
  FaUniversity, 
  FaGlobeAmericas,
  FaFileAlt,
  FaGraduationCap,
  FaChevronDown
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const AiAndTechPage = () => {
  const [expandedCourses, setExpandedCourses] = useState({});
  const [expandedAdmission, setExpandedAdmission] = useState({
    regular: false,
    global: false
  });
  const [filters, setFilters] = useState({
    programType: 'all', // New state for filtering
  });

  const toggleCourse = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const toggleAdmission = (type) => {
    setExpandedAdmission(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleFilterChange = (type) => {
    setFilters({ programType: type });
    setExpandedCourses({}); // Close all expanded courses when filter changes
  };

  // Animation variants
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

  const arrowVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 }
  };

  const allCourses = [
    {
      id: 'btech-ai',
      title: 'B.Tech (AI, ML, Data Science, Robotics)',
      duration: '4 Years',
      icon: <FaBrain className="text-blue-500 mr-3 text-xl" />,
      programType: 'btech',
      highlights: [
        'Comprehensive curriculum covering AI fundamentals',
        'Hands-on projects with industry datasets',
        'Specializations in ML or Robotics'
      ],
      detailsLink: '/programs/btech-ai-ml'
    },
    {
      id: 'btech-cse',
      title: 'B.Tech Computer Science & Engineering',
      duration: '4 Years',
      icon: <FaLaptopCode className="text-blue-500 mr-3 text-xl" />,
      programType: 'btech',
      highlights: [
        'Core computer science principles',
        'Electives in AI/ML technologies',
        'Industry-aligned capstone project'
      ],
      detailsLink: '/programs/btech-cse'
    },
    {
      id: 'mtech-ai',
      title: 'M.Tech (AI, ML, Data Science, Robotics)',
      duration: '2 Years',
      icon: <FaDatabase className="text-blue-500 mr-3 text-xl" />,
      programType: 'mtech',
      highlights: [
        'Advanced AI algorithms and techniques',
        'Research opportunities with faculty',
        'Industry internship component'
      ],
      detailsLink: '/programs/mtech-ai-ml'
    },
    {
      id: 'mtech-cse',
      title: 'M.Tech Computer Science & Engineering',
      duration: '2 Years',
      icon: <FaLaptopCode className="text-blue-500 mr-3 text-xl" />,
      programType: 'mtech',
      highlights: [
        'Specialized tracks available',
        'Thesis or project-based options',
        'Cutting-edge research facilities'
      ],
      detailsLink: '/programs/mtech-cse'
    }
  ];

  const filteredCourses = allCourses.filter(course => {
    return filters.programType === 'all' || course.programType === filters.programType;
  });

  const programTypeFilters = [
    { label: 'All Programs', value: 'all' },
    { label: 'B.Tech', value: 'btech' },
    { label: 'M.Tech', value: 'mtech' },
  ];

  return (
    <Layout>
      <Helmet>
  <title>Artificial Intelligence & Technology Programs | Saroj International University</title>
  <meta name="description" content="Explore cutting-edge programs in Artificial Intelligence, Data Science, Computer Engineering, and IT at Saroj International University." />
</Helmet>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* TOPMOST ICON */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8" // Center the icon and add bottom margin
        >
          <FaRobot className="text-6xl text-blue-600" /> {/* Larger and prominent icon */}
        </motion.div>
        {/* --- */}

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Artificial Intelligence & Technology Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our cutting-edge programs in AI, ML, Data Science, and Robotics designed to shape future technology leaders.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-12"
        >
          {/* Section Header (removed FaRobot from here) */}
          <div className="bg-black px-8 py-6 flex items-center">
            <FaLaptopCode className="text-3xl text-white mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-white">Artificial Intelligence & Technology</h2>
              <p className="text-blue-100 mt-1">Cutting-edge programs in AI, ML, Data Science, and Robotics</p>
            </div>
          </div>

          {/* Unsplash Image added here */}
          <div className="flex justify-center w-full relative h-64 overflow-hidden shadow-md">
            <img 
              src="https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QVJUSUZJQ0lBTCUyMElOVEVMTElHRU5DRXxlbnwwfDB8MHx8fDA%3D" 
              alt="AI and Technology Banner" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Filter Buttons */}
          <div className="bg-white p-4 rounded-b-xl shadow-inner-top flex flex-wrap gap-2 justify-start border-b border-gray-100">
            {programTypeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                  ${filters.programType === filter.value 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Programs List */}
          <div className="p-8">
            {filteredCourses.length > 0 ? (
              <div className="">
                {filteredCourses.map((course) => (
                  <div key={course.id} className=" overflow-hidden">
                    <button
                      onClick={() => toggleCourse(course.id)}
                      className="w-full p-6 text-left flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center mb-2">
                          {course.icon}
                          <h4 className="text-lg font-bold text-gray-800">{course.title}</h4>
                        </div>
                        <div className="flex items-center text-gray-600 pl-9">
                          <span className="mr-4">{course.duration}</span>
                        </div>
                      </div>
                      <motion.div
                        variants={arrowVariants}
                        animate={expandedCourses[course.id] ? "open" : "closed"}
                      >
                        <FaChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedCourses[course.id] && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={accordionVariants}
                          className="px-6 pb-6 pl-14"
                        >
                          <ul className="space-y-2 text-gray-700 mb-4">
                            {course.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                         <div className="mt-4 flex gap-4">
                              <a  href="https://siu.in8.nopaperforms.com/" target="_blank"
                               className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"   >
                            Apply Now
                          </a>
                        </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No programs match the selected filter criteria.</p>
              </div>
            )}
          </div>

      

          {/* CTA Button */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 text-center">
            <motion.a 
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center justify-center mx-auto w-fit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileAlt className="mr-2" /> <span> 
                Start Application
                </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AiAndTechPage;