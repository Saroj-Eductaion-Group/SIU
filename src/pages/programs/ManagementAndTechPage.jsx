import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrochip, FaRobot, FaDatabase,FaLaptopCode, FaBusinessTime, FaChartBar, FaNetworkWired, FaChevronDown, FaFileAlt, FaFilter, FaLightbulb, FaTools } from 'react-icons/fa'; // Added FaTools for the main icon
import { MdPrecisionManufacturing, MdSecurity, MdElectricalServices, MdScience, MdOutlineDevicesOther } from 'react-icons/md';

import { Helmet } from 'react-helmet';

const ManagementAndTechPage = () => {
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const [filters, setFilters] = useState({
    level: 'all', // Default to 'all' for initial display
    category: 'all',
    duration: 'all'
  });

  const allPrograms = [
    // B.Tech Programs
    {
      id: 'btech-cse',
      title: 'B.Tech - CSE',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <FaLaptopCode className="text-blue-500 text-xl" />,
      description: 'Focus on computer systems, programming, and software development.',
      highlights: ['Programming', 'Data Structures', 'Algorithms', 'Databases', 'AI & ML']
    },
    {
      id: 'btech-it',
      title: 'B.Tech - IT',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <FaNetworkWired className="text-blue-500 text-xl" />,
      description: 'Study of information systems, networking, and technology infrastructure.',
      highlights: ['Networks', 'Database Systems', 'Web Technologies', 'Cloud', 'Cybersecurity']
    },
    {
      id: 'btech-cyber-security',
      title: 'B.Tech - Cyber Security',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <MdSecurity className="text-red-500 text-xl" />,
      description: 'Training in protecting systems from cyber threats and attacks.',
      highlights: ['Ethical Hacking', 'Information Security', 'Cryptography', 'Firewalls', 'Forensics']
    },
    {
      id: 'btech-iot',
      title: 'B.Tech - IOT',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <MdOutlineDevicesOther className="text-green-500 text-xl" />,
      description: 'Learn about interconnected devices and smart technologies.',
      highlights: ['Embedded Systems', 'Wireless Sensor Networks', 'IoT Platforms', 'Cloud Integration']
    },
    {
      id: 'btech-ece',
      title: 'B.Tech - Electronics & Communication',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <FaMicrochip className="text-purple-500 text-xl" />,
      description: 'Electronics and communication systems design and analysis.',
      highlights: ['Signal Processing', 'Analog/Digital Electronics', 'VLSI', 'Telecom Systems']
    },
    {
      id: 'btech-mechanical',
      title: 'B.Tech - Mechanical Engineering',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <MdPrecisionManufacturing className="text-gray-600 text-xl" />,
      description: 'Design, manufacture, and maintenance of mechanical systems.',
      highlights: ['Thermodynamics', 'CAD/CAM', 'Mechanics', 'Fluid Dynamics']
    },
    {
      id: 'btech-civil',
      title: 'B.Tech - Civil Engineering',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <FaDatabase className="text-green-800 text-xl" />,
      description: 'Design and development of infrastructure and construction projects.',
      highlights: ['Structural Engineering', 'Surveying', 'Construction Management', 'Geotech']
    },
    {
      id: 'btech-mechtronics',
      title: 'B.Tech - Mechtronics',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <FaRobot className="text-indigo-500 text-xl" />,
      description: 'Integration of mechanical, electronic, and software engineering.',
      highlights: ['Robotics', 'Control Systems', 'Sensors & Actuators', 'AI Integration']
    },
    {
      id: 'btech-biotech',
      title: 'B.Tech - Bio-Tech',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <MdScience className="text-pink-500 text-xl" />,
      description: 'Biological and technological studies applied to medicine and agriculture.',
      highlights: ['Genetics', 'Microbiology', 'Bioprocess', 'Bioinformatics']
    },
    {
      id: 'btech-electrical',
      title: 'B.Tech - Electrical Engineering',
      level: 'undergraduate',
      category: 'tech',
      duration: '4 Years',
      icon: <MdElectricalServices className="text-yellow-600 text-xl" />,
      description: 'Study of electrical systems, machines, and power generation.',
      highlights: ['Power Systems', 'Control Engineering', 'Circuit Analysis', 'Energy Systems']
    },
  
    // M.Tech Programs
    {
      id: 'mtech-cse',
      title: 'M.Tech - CSE',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <FaLaptopCode className="text-blue-700 text-xl" />,
      description: 'Advanced computer science with focus on research and specialization.',
      highlights: ['Machine Learning', 'Advanced Algorithms', 'Big Data', 'AI Research']
    },
    {
      id: 'mtech-it',
      title: 'M.Tech - IT',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <FaNetworkWired className="text-blue-700 text-xl" />,
      description: 'Deep dive into IT systems, architecture, and innovation.',
      highlights: ['IT Governance', 'Cybersecurity', 'Cloud Systems', 'Enterprise Solutions']
    },
    {
      id: 'mtech-cyber-security',
      title: 'M.Tech - Cyber Security',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <MdSecurity className="text-red-700 text-xl" />,
      description: 'Advanced techniques in cybersecurity, threat detection, and response.',
      highlights: ['Network Security', 'Pen Testing', 'Data Privacy', 'Cyber Laws']
    },
    {
      id: 'mtech-iot',
      title: 'M.Tech - IOT',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <MdOutlineDevicesOther className="text-green-700 text-xl" />,
      description: 'Design and management of smart, connected IoT systems.',
      highlights: ['IoT Architectures', 'Edge Computing', 'AI in IoT', 'Security in IoT']
    },
    {
      id: 'mtech-ece',
      title: 'M.Tech - Electronics & Communication',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <FaMicrochip className="text-purple-700 text-xl" />,
      description: 'Specialized ECE studies in VLSI, telecom, and embedded systems.',
      highlights: ['Digital Signal Processing', 'VLSI Design', 'Embedded Systems']
    },
    {
      id: 'mtech-mechanical',
      title: 'M.Tech - Mechanical Engineering',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <MdPrecisionManufacturing className="text-gray-700 text-xl" />,
      description: 'In-depth mechanical systems, thermal sciences, and R&D.',
      highlights: ['Finite Element Analysis', 'Heat Transfer', 'Design Optimization']
    },
    {
      id: 'mtech-civil',
      title: 'M.Tech - Civil Engineering',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <FaDatabase className="text-green-900 text-xl" />,
      description: 'Specialized topics in structural, water resource, and transportation engineering.',
      highlights: ['Advanced Structural Design', 'GIS & Remote Sensing', 'Soil Mechanics']
    },
    {
      id: 'mtech-mechtronics',
      title: 'M.Tech - Mechtronics',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <FaRobot className="text-indigo-700 text-xl" />,
      description: 'Interdisciplinary robotics, automation, and intelligent systems.',
      highlights: ['AI & Robotics', 'Automation Systems', 'IoT in Mechatronics']
    },
    {
      id: 'mtech-biotech',
      title: 'M.Tech - Bio-Tech',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <MdScience className="text-pink-700 text-xl" />,
      description: 'Advanced biotechnology techniques in healthcare and agriculture.',
      highlights: ['Genomics', 'Biopharma', 'Industrial Biotech']
    },
    {
      id: 'mtech-electrical',
      title: 'M.Tech - Electrical Engineering',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <MdElectricalServices className="text-yellow-700 text-xl" />,
      description: 'Advanced research in power systems and electrical design.',
      highlights: ['Smart Grids', 'Advanced Control Systems', 'Sustainable Energy']
    },
  
    // Diploma Programs
    {
      id: 'diploma-civil',
      title: 'Diploma - Civil Engineering',
      level: 'diploma',
      category: 'tech',
      duration: '3 Years',
      icon: <FaDatabase className="text-green-600 text-xl" />,
      description: 'Foundation in construction and infrastructure technology.',
      highlights: ['Surveying', 'Structural Basics', 'Construction Materials']
    },
    {
      id: 'diploma-electrical',
      title: 'Diploma - Electrical Engineering',
      level: 'diploma',
      category: 'tech',
      duration: '3 Years',
      icon: <MdElectricalServices className="text-yellow-500 text-xl" />,
      description: 'Basics of electric circuits, machines, and systems.',
      highlights: ['Basic Circuits', 'Transformers', 'Motors & Generators']
    },
    {
      id: 'diploma-mechanical',
      title: 'Diploma - Mechanical Engineering',
      level: 'diploma',
      category: 'tech',
      duration: '3 Years',
      icon: <MdPrecisionManufacturing className="text-gray-500 text-xl" />,
      description: 'Mechanical systems and manufacturing fundamentals.',
      highlights: ['Engineering Drawing', 'Workshop Tech', 'Mechanics']
    },
    {
      id: 'diploma-cs',
      title: 'Diploma - Computer Science',
      level: 'diploma',
      category: 'tech',
      duration: '3 Years',
      icon: <FaLaptopCode className="text-blue-400 text-xl" />,
      description: 'Introductory computing, coding, and system design.',
      highlights: ['Programming Basics', 'OOP', 'Database Fundamentals']
    },
  
    // BCA Program
    {
      id: 'bca-ai-ml-cyber',
      title: 'BCA - AI, ML, Cyber Security',
      level: 'undergraduate',
      category: 'tech',
      duration: '3 Years',
      icon: <FaLaptopCode className="text-blue-600 text-xl" />,
      description: 'Computer applications with a focus on AI, ML, and cybersecurity.',
      highlights: ['Python Programming', 'AI Basics', 'Machine Learning', 'Cyber Laws']
    },
  
    // MCA Program
    {
      id: 'mca-ai-ml-cyber',
      title: 'MCA - AI, ML, Cyber Security',
      level: 'postgraduate',
      category: 'tech',
      duration: '2 Years',
      icon: <FaLaptopCode className="text-blue-800 text-xl" />,
      description: 'Advanced computer applications with AI, ML, and security focus.',
      highlights: ['Deep Learning', 'AI Project Development', 'Security Auditing']
    },
  ];

  const filteredPrograms = allPrograms.filter(program => {
    return (
      (filters.level === 'all' || program.level === filters.level) &&
      (filters.category === 'all' || program.category === filters.category) &&
      (filters.duration === 'all' ||
        (filters.duration === 'short' && (program.duration.includes('1') || program.duration.includes('2'))) || // Assuming 1 & 2 years are 'short'
        (filters.duration === 'medium' && program.duration.includes('3')) ||
        (filters.duration === 'long' && program.duration.includes('4'))
      )
    );
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
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
  <title>Management & Technology Programs | Saroj International University</title>
  <meta name="description" content="Combine leadership skills with technical knowledge in our interdisciplinary Management and Technology programs." />
</Helmet>

      <div className="container mx-auto max-w-6xl py-12">
        {/* NEW TOP HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4 text-5xl text-gray-700">
            {/* Icon relevant to Management & Technology - using FaTools as a generic representation */}
            <FaTools />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Management & Technology Programs</h1>
          <p className="text-xl text-gray-600 mb-2">Innovating the future through strategic leadership and cutting-edge technology.</p>
          <p className="text-md text-gray-500">Total Programs Available: {allPrograms.length} (including all levels)</p>
        </motion.div>
        {/* END NEW TOP HEADER SECTION */}


        {/* Black Banner/Card with text, image, and filters */}
        <div className="bg-black rounded-t-xl shadow-lg overflow-hidden mb-0"> {/* Adjusted rounded-xl for full card */}
          <div className="px-8 py-6 text-white">
            <div className="flex items-center">
              <FaBusinessTime className="text-3xl text-white mr-4" /> {/* Icon changed */}
              <div>
                <h2 className="text-2xl font-bold">Our Management & Technology  Programs</h2> {/* Text updated */}
                <p className="text-gray-300 mt-1">Building the next generation of technology leaders and innovators through industry-aligned education.</p> {/* Text updated */}
              </div>
            </div>
          </div>

          {/* Image Section - Directly below the header */}
          <div className="w-full relative h-64 overflow-hidden ">
            <img
              src="https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5mb3JtYXRpb24lMjB0ZWNobm9sb2d5fGVufDB8MHwwfHx8MA%3D%3D"
              alt="AI and Technology Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Filter Buttons Section - Directly below the image */}
          <div className="bg-white p-4 shadow-md flex flex-wrap gap-2 justify-start"> {/* Kept shadow-md for this section */}
            {levelFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange('level', filter.value)}
                className={`px-4 py-2 rounded-b-lg text-sm font-medium transition-colors duration-200
                  ${filters.level === filter.value
                    ? 'bg-orange-500 text-white' // Orange active state from image
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          
          </div>
        </div>

        {/* Programs List Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-b--xl shadow-md overflow-hidden mb-12" // Original styling for program list container
        >
          <div className="p-8">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div key={program.id} className="mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <button
                    onClick={() => setExpandedPrograms(prev => ({
                      ...prev,
                      [program.id]: !prev[program.id]
                    }))}
                    className="w-full text-left flex justify-between items-center" // Changed items-start to items-center
                  >
                    <div className="flex items-center">
                      {program.icon} {/* Program-specific icon */}
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
                        <div className="flex items-center mt-1"> {/* Container for duration and badge */}
                            <p className="text-gray-600 text-sm">{program.duration}</p>
                            {/* Level Badge Styling */}
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold  
                                ${program.level === 'undergraduate' ? 'bg-orange-100 text-orange-600' :
                                  program.level === 'postgraduate' ? 'bg-purple-100 text-purple-600' :
                                  program.level === 'diploma' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {program.level === 'undergraduate' ? 'UG' :
                                 program.level === 'postgraduate' ? 'PG' :
                                 program.level === 'diploma' ? 'Diploma' : ''}
                            </span>
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
                        className="mt-4 pl-12"
                      >
                        <p className="text-gray-700 mb-3">{program.description}</p>
                        <h4 className="font-medium text-gray-800 mb-2">Program Highlights:</h4>
                        <ul className="space-y-2 text-gray-700">
                          {program.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        
                         <div className="mt-4 flex gap-4">
                              <a  href="https://siu.in8.nopaperforms.com/" target="_blank"
                               className="text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-medium"   >
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
                <p className="text-gray-500">No programs match your filter criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>

          <div className="px-8 py-6 bg-orange-50 border-t border-gray-200 text-center">
            <motion.a
             href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className=" bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex items-center justify-center mx-auto w-fit"
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

export default ManagementAndTechPage;