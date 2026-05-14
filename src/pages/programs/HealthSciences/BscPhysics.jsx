import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaAtom, // Main icon for Physics
  FaGraduationCap,
  FaClock,
  FaCalendarAlt,
  FaBookOpen,
  FaBriefcaseMedical, // Can be used for research/technical careers
  FaUserGraduate,
  FaChevronDown,
  FaFileAlt,
  FaFlask, // For experimental physics
  FaMicroscope, // For research aspects
  FaSatelliteDish, // For applied physics/space
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BscPhysicsPage = () => {
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

  const bscPhysicsProgram = {
    id: 'bsc-physics',
    title: 'Bachelor of Science (B.Sc) in Physics',
    duration: '3 Years (6 Semesters)',
    icon: <FaAtom className="text-indigo-600 text-2xl" />,
    description: 'The B.Sc in Physics program offers a comprehensive study of the fundamental laws governing the universe, from subatomic particles to cosmic phenomena. Students develop strong analytical and problem-solving skills through theoretical and practical learning. The curriculum covers classical mechanics, electromagnetism, quantum mechanics, thermodynamics, and modern physics.',
    specializations: [
      'Theoretical Physics',
      'Experimental Physics',
      'Astrophysics',
      'Condensed Matter Physics',
      'Nuclear Physics',
      'Materials Science'
    ],
    highlights: [
      'Comprehensive understanding of physical principles',
      'Development of analytical and quantitative skills',
      'Hands-on laboratory experience',
      'Preparation for advanced studies and scientific careers',
      'Enhancement of critical thinking abilities',
      'Versatile skills applicable to technology and research sectors'
    ],
  };

  return (
    <Layout>
      <Helmet>
  <title>B.Sc. in Physics | Saroj International University</title>
  <meta name="description" content="Gain a strong understanding of classical and modern physics, quantum mechanics, and research methodologies in our B.Sc. in Physics program." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-4 rounded-full">
              <FaAtom className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{bscPhysicsProgram.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the fundamental nature of reality and develop skills for scientific and technological careers with a B.Sc in Physics.
          </p>
        </div>

        {/* Program Highlights - Static Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-indigo-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Science (B.Sc)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-indigo-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">{bscPhysicsProgram.duration}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-indigo-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Annual Admission</p>
          </div>
        </div>

        {/* Accordion Sections for B.Sc Physics Content */}
        <div className="space-y-6 mb-12">
          {/* Section: Program Overview */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('programOverview')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBookOpen className="w-6 h-6 text-indigo-600 mr-3" />
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
                  <p className="text-gray-700 mb-3">{bscPhysicsProgram.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Areas of Study:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bscPhysicsProgram.specializations.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bscPhysicsProgram.highlights.map((highlight, i) => (
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
                <FaBriefcaseMedical className="w-6 h-6 text-indigo-600 mr-3" />
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
                    A B.Sc in Physics provides a strong foundation for diverse career paths in science, technology, and beyond. Graduates can pursue:
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside mt-2">
                    <li>Research Scientist in government and private labs</li>
                    <li>Data Analyst/Scientist</li>
                    <li>Science Communicator/Journalist</li>
                    <li>Physics Teacher/Professor</li>
                    <li>Technical Consultant</li>
                    <li>Quality Control Engineer</li>
                    <li>Medical Physicist</li>
                    <li>Meteorologist</li>
                    <li>Materials Scientist</li>
                    <li>Energy Sector Specialist</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    The analytical and problem-solving skills developed in this program are highly valued across multiple industries.
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
                <FaUserGraduate className="w-6 h-6 text-indigo-600 mr-3" />
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
                          <span>10+2 with Physics, Chemistry, and Mathematics</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Minimum 50% aggregate marks (varies by institution)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Some universities may require entrance exams</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Application Process:</h3>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li>Complete online application form</li>
                        <li>Submit academic transcripts and required documents</li>
                        <li>Pay application fee</li>
                        <li>Attend counseling session if required</li>
                        <li>Complete enrollment upon admission offer</li>
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-indigo-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Begin Your Journey in Physics</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our B.Sc Physics program to develop a deep understanding of the physical world and its applications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
               href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaFileAlt className="mr-2" /> Apply Now
            </a>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BscPhysicsPage;