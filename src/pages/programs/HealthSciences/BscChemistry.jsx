import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFlask, // Main icon for Chemistry
  FaGraduationCap,
  FaClock,
  FaCalendarAlt,
  FaBookOpen,
  FaBriefcaseMedical, // Can be used for pharmaceutical/research careers
  FaUserGraduate,
  FaChevronDown,
  FaFileAlt,
  FaAtom, // For molecular/atomic structure
  FaPrescriptionBottleAlt, // For pharmaceuticals/biochemistry
  FaIndustry, // For industrial chemistry
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BscChemistryPage = () => { // Correct component name
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

  const bscChemistryProgram = { // Corrected program details for Chemistry
    id: 'bsc-chemistry',
    title: 'Bachelor of Science (B.Sc) in Chemistry',
    duration: '3 Years (6 Semesters)',
    icon: <FaFlask className="text-teal-600 text-2xl" />, // Using teal for chemistry for distinction
    description: 'The B.Sc in Chemistry program offers a comprehensive study of the composition, structure, properties, and reactions of matter. Students gain extensive theoretical knowledge and practical laboratory skills essential for understanding the chemical world around us. The curriculum covers organic, inorganic, physical, analytical, and biochemistry, preparing students for diverse scientific and industrial roles.',
    specializations: [
      'Organic Chemistry',
      'Inorganic Chemistry',
      'Physical Chemistry',
      'Analytical Chemistry',
      'Biochemistry',
      'Environmental Chemistry',
      'Industrial Chemistry'
    ],
    highlights: [
      'Extensive hands-on laboratory training',
      'Strong foundation in core chemical principles',
      'Development of analytical and problem-solving skills',
      'Preparation for postgraduate studies and research',
      'Understanding of chemical applications in various industries',
      'Focus on safety and ethical practices in chemical sciences'
    ],
  };

  return (
    <Layout>
      <Helmet>
  <title>B.Sc. in Chemistry | Saroj International University</title>
  <meta name="description" content="Study molecular science, organic/inorganic chemistry, and lab techniques in the B.Sc. in Chemistry program at Saroj International University." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-100 p-4 rounded-full"> {/* Using teal background */}
              <FaFlask className="w-12 h-12 text-teal-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{bscChemistryProgram.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the fundamental building blocks of matter and unlock countless possibilities in science, industry, and research with a B.Sc in Chemistry.
          </p>
        </div>

        {/* Program Highlights - Static Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Science (B.Sc)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">{bscChemistryProgram.duration}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Annual Admission</p>
          </div>
        </div>

        {/* Accordion Sections for B.Sc Chemistry Content */}
        <div className="space-y-6 mb-12">
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
                  className="px-6 pb-6 pt-4 border-t border-gray-100"
                >
                  <p className="text-gray-700 mb-3">{bscChemistryProgram.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Areas of Study:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bscChemistryProgram.specializations.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bscChemistryProgram.highlights.map((highlight, i) => (
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
                <FaBriefcaseMedical className="w-6 h-6 text-teal-600 mr-3" />
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
                    A B.Sc in Chemistry opens up a wide range of career opportunities in various sectors. Graduates can pursue roles such as:
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside mt-2">
                    <li>Chemist (Analytical, Organic, Inorganic, Physical)</li>
                    <li>Research Scientist in Pharmaceuticals/Biotechnology</li>
                    <li>Quality Control/Assurance Specialist</li>
                    <li>Environmental Scientist/Consultant</li>
                    <li>Forensic Scientist</li>
                    <li>Materials Scientist</li>
                    <li>Food and Beverage Chemist</li>
                    <li>Toxicologist</li>
                    <li>Laboratory Manager/Technician</li>
                    <li>Science Educator/Lecturer</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    The strong analytical skills and practical experience gained are highly valued in both scientific and non-scientific fields.
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
                          <span>10+2 with Chemistry, Physics, and/or Biology from a recognized board</span>
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
        <div className="text-center bg-teal-700 text-white p-12 rounded-lg"> {/* Using teal background */}
          <h2 className="text-3xl font-bold mb-4">Start Your Chemical Discovery Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our B.Sc Chemistry program to unlock the secrets of matter and contribute to scientific advancement.
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

export default BscChemistryPage;