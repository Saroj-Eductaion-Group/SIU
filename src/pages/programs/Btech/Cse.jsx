import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLaptopCode, // Icon for B.Tech CSE
  FaGraduationCap,
  FaClock,
  FaCalendarAlt,
  FaBookOpen,
  FaBriefcaseMedical,
  FaUserGraduate,
  FaChevronDown,
  FaFileAlt,
  FaCode, // For highlights related to coding
  FaRobot, // For AI/ML opportunities
  FaNetworkWired, // For networking/cybersecurity
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BtechCsePage = () => {
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

  const btechCseProgram = {
    id: 'btech-cse',
    title: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    duration: '4 Years (8 Semesters)',
    icon: <FaLaptopCode className="text-purple-600 text-2xl" />,
    description: 'The B.Tech in Computer Science & Engineering program provides a comprehensive education in the fundamental principles of computing, software development, algorithms, and advanced technologies like AI, Machine Learning, and Data Science. It prepares students for innovative careers in the rapidly evolving tech industry.',
    specializations: [
      'Software Development',
      'Artificial Intelligence & Machine Learning',
      'Data Science',
      'Cybersecurity',
      'Cloud Computing',
      'Web & Mobile Development'
    ],
    highlights: [
      'Strong foundation in programming and algorithms',
      'Exposure to cutting-edge technologies',
      'Hands-on projects and practical learning',
      'Focus on problem-solving and critical thinking',
      'Prepares for diverse roles in the IT sector',
      'Industry-aligned curriculum'
    ],
  };

  return (
    <Layout>
      <Helmet>
  <title>B.Tech in Computer Science Engineering | Saroj International University</title>
  <meta name="description" content="Explore core computing concepts, software development, and system design through our B.Tech in Computer Science Engineering program." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <FaLaptopCode className="w-12 h-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{btechCseProgram.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Innovate the future with a strong foundation in computer science, preparing for the most in-demand roles in technology.
          </p>
        </div>

        {/* Program Highlights - Static Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Technology (B.Tech)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">{btechCseProgram.duration}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Varies (Annual)</p>
          </div>
        </div>

        {/* Accordion Sections for B.Tech CSE Content */}
        <div className="space-y-6 mb-12"> {/* This div creates space between the individual accordion blocks */}
          {/* Section: Program Overview */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('programOverview')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBookOpen className="w-6 h-6 text-purple-600 mr-3" />
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
                  <p className="text-gray-700 mb-3">{btechCseProgram.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Areas of Study:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {btechCseProgram.specializations.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {btechCseProgram.highlights.map((highlight, i) => (
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
                <FaBriefcaseMedical className="w-6 h-6 text-purple-600 mr-3" />
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
                    A B.Tech in Computer Science & Engineering opens up a vast array of career opportunities in the fast-paced technology industry. Graduates can pursue roles such as:
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside mt-2">
                    <li>Software Engineer/Developer</li>
                    <li>Data Scientist/Analyst</li>
                    <li>Machine Learning Engineer</li>
                    <li>AI Specialist</li>
                    <li>Cybersecurity Analyst</li>
                    <li>Cloud Architect/Engineer</li>
                    <li>Full Stack Developer</li>
                    <li>DevOps Engineer</li>
                    <li>UX/UI Designer</li>
                    <li>IT Consultant</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    The demand for skilled CSE professionals continues to grow, making this a highly rewarding and future-proof career path.
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
                <FaUserGraduate className="w-6 h-6 text-purple-600 mr-3" />
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
                          <span>Minimum aggregate marks as per university/college norms (e.g., 60%)</span>
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
        <div className="text-center bg-purple-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Build the Future of Technology?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our B.Tech CSE program and become a leader in innovation and software development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaFileAlt className="mr-2" /> Apply Now
            </a>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BtechCsePage;
