import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/Layout";
import { FaRunning, FaBasketballBall, FaHeartbeat, FaTrophy, FaChevronDown, FaFileAlt, FaGraduationCap, FaUserGraduate, FaBook, FaUserMd, FaFlask, FaBriefcase, FaChalkboardTeacher } from "react-icons/fa";
import { Helmet } from "react-helmet";

const SportsScience = () => {
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const [activeFilter, setActiveFilter] = useState("All Programs");

  const programs = [
    {
      id: "bs-sports-science",
      title: "BS in Sports Science",
      duration: "4 Years",
      icon: <FaRunning className='text-red-500 text-2xl' />,
      description: "Scientific study of human performance in sports, integrating physiology, biomechanics, and nutrition to optimize athletic potential.",
      highlights: ["Exercise physiology", "Biomechanics of sport", "Sports nutrition principles", "Athlete assessment and training"],
      category: "Undergraduate",
    },
{
      id: 'ms-sports-management',
      title: 'MS in Sports Nutrition',
      duration: '2 Years',
      icon: <FaHeartbeat className="text-red-600 text-2xl" />,
      description: 'Advanced study of nutritional strategies for athletes and active individuals, focusing on metabolic demands, supplementation, and performance enhancement.',
      highlights: [
        'Metabolic demands of exercise',
        'Supplementation science',
        'Weight management for athletes',
        'Clinical sports nutrition',
        'Research methodologies in nutrition'
      ],
      category: 'Postgraduate'
    },
  ];

  const toggleProgram = (programId) => {
    setExpandedPrograms((prev) => ({
      ...prev,
      [programId]: !prev[programId],
    }));
  };

  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  const filteredPrograms = programs.filter((program) => {
    if (activeFilter === "All Programs") return true;
    return program.category === activeFilter;
  });

  return (
    <Layout>
      <Helmet>
        <title>Sports Science Programs | Saroj International University</title>
        <meta name='description' content='Excel in athletic performance, sports coaching, and physical fitness through our comprehensive Sports Science programs.' />
      </Helmet>

      <div className='container mx-auto px-4 py-12 max-w-6xl'>
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='text-center mb-16'>
          <div className='flex justify-center mb-4'>
            <FaTrophy className='text-5xl text-red-600' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>Sports Science Programs</h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>Advancing human performance and well-being through scientific study and practical application.</p>
          <p className='text-lg text-gray-700 mt-4'>
            Total Programs Available: <span className='font-semibold text-red-700'>{programs.length}</span>
            <span className='block text-sm text-gray-500 mt-1'>(Including Undergraduate and Postgraduate programs)</span>
          </p>
        </motion.div>

        {/* Programs Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className='bg-white rounded-xl shadow-md overflow-hidden mb-12'>
          {/* Section Header */}
          <div className='bg-black px-8 py-6 flex items-center'>
            <FaBasketballBall className='text-3xl text-white mr-4' />
            <div>
              <h2 className='text-2xl font-bold text-white'>Our Sports Science Programs</h2>
              <p className='text-red-100 mt-1'>Optimizing athletic potential and health</p>
            </div>
          </div>

          {/* Unsplash Image added here */}
          <div className='flex justify-center width:full relative h-64 overflow-hidden shadown-md '>
            <img
              src='https://images.unsplash.com/photo-1638149054027-67447dce1aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXRobGV0ZXN8ZW58MHwwfDB8fHww'
              alt='AI and Technology Banner'
              className='w-full h-full object-cover ' // Added styling
            />
          </div>

          {/* Programs Filter */}
          <div className='px-8 py-4 bg-gray-50 border-b border-gray-200'>
            <div className='flex flex-wrap gap-4'>
              {["All Programs", "Undergraduate", "Postgraduate", "Diploma", "Ph.D"].map((filterName) => (
                <button key={filterName} onClick={() => setActiveFilter(filterName)} className={`px-4 py-2 rounded-md transition-colors ${activeFilter === filterName ? "bg-red-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                  {filterName}
                </button>
              ))}
            </div>
          </div>

          {/* Programs List */}
          <div className='p-8'>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div key={program.id} className='mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0'>
                  <button onClick={() => toggleProgram(program.id)} className='w-full text-left flex justify-between items-start'>
                    <div className='flex items-center'>
                      {program.icon}
                      <div className='ml-4'>
                        <h3 className='text-xl font-semibold text-gray-800'>{program.title}</h3>
                        <div className='flex items-center mt-1'>
                          <span className='text-gray-600 mr-3'>{program.duration}</span>
                          {program.category === "Undergraduate" && <span className='text-xs bg-red-100 text-red-800 px-2 py-1 rounded'>UG</span>}
                          {program.category === "Postgraduate" && <span className='text-xs bg-red-200 text-red-800 px-2 py-1 rounded'>PG</span>}
                          {program.category === "Diploma" && <span className='text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded'>Diploma</span>}
                          {program.category === "Ph.D" && <span className='text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded'>Ph.D</span>}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedPrograms[program.id] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className='ml-4'>
                      <FaChevronDown className='w-5 h-5 text-gray-500' />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedPrograms[program.id] && (
                      <motion.div initial='closed' animate='open' exit='closed' variants={accordionVariants} className='mt-4 pl-12'>
                        <p className='text-gray-700 mb-3'>{program.description}</p>
                        <h4 className='font-medium text-gray-800 mb-2'>Program Highlights:</h4>
                        <ul className='space-y-2 text-gray-700'>
                          {program.highlights.map((highlight, i) => (
                            <li key={i} className='flex items-start'>
                              <span className='mr-2'>•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      
                      <div className="mt-4 flex gap-4">
                              <a  href="https://siu.in8.nopaperforms.com/" target="_blank"
                               className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"   >
                            Apply Now
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-600 py-8'>No programs found for this filter.</p>
            )}
          </div>

          {/* Admission Info */}
          <div className='px-8 py-6 bg-gray-50 border-t border-gray-200'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Admission Requirements</h3>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h4 className='font-medium text-gray-700 mb-2'>Undergraduate Programs:</h4>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>10+2 with Science (Physics, Chemistry, Biology/Math) or equivalent with minimum 50% marks.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Aptitude test (if applicable)</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Sports proficiency assessment / Interview</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-medium text-gray-700 mb-2'>Postgraduate Programs:</h4>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Relevant bachelor's degree in Sports Science, Nutrition, or related field with minimum 55% marks.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Research proposal (for MS programs with thesis component)</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Entrance exam and interview</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

     

    

          {/* CTA */}
          <div className='flex items-center px-8 py-6 bg-red-50'>
            <motion.a href='https://siu.in8.nopaperforms.com/' target='_blank' className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center justify-center mx-auto w-fit' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <FaFileAlt className='mr-2' /> <span>Start Application</span>
            </motion.a>
          
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SportsScience;
