import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRunning, // Main icon for Sports Science (can be adjusted for MS)
  FaGraduationCap,
  FaClock,
  FaCalendarAlt,
  FaBookOpen,
  FaBriefcaseMedical, // Can be used for advanced sports medicine/rehab careers
  FaUserGraduate,
  FaChevronDown,
  FaFileAlt,
  FaFlask, // For research/laboratory focus
  FaChartLine, // For performance analysis
  FaUserMd, // For clinical or advanced roles
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const MsSportsSciencePage = () => {
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

  const msSportsScienceProgram = {
    id: 'ms-sports-science',
    title: 'Master of Science (M.S.) in Sports Science',
    duration: '2 Years (4 Semesters)',
    icon: <FaRunning className="text-emerald-600 text-2xl" />, // Using emerald for a slight distinction
    description: 'The M.S. in Sports Science program offers advanced theoretical knowledge and practical skills in specialized areas of sports science. It focuses on research methodologies, performance analysis, advanced coaching, and the physiological and psychological aspects of elite athletic performance. This program is ideal for professionals seeking to deepen their expertise or pursue research-oriented careers in sports and exercise.',
    specializations: [
      'Advanced Exercise Physiology',
      'Sports Biomechanics and Injury Prevention',
      'Sports Nutrition for Performance',
      'Applied Sports Psychology',
      'Performance Analysis & Technology',
      'Research Methods in Sport Science'
    ],
    highlights: [
      'In-depth study of cutting-edge sports science topics',
      'Emphasis on research and evidence-based practice',
      'Development of advanced analytical and critical thinking skills',
      'Preparation for doctoral studies or senior professional roles',
      'Opportunities for practical application in elite sports settings',
      'Interdisciplinary approach to human performance'
    ],
  };

  return (
    <Layout>
      <Helmet>
  <title>Master of Science (MS) in Sports | Saroj International University</title>
  <meta name="description" content="Advance your expertise in sports science, performance analysis, and athletic training with the MS in Sports program at Saroj International University." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-100 p-4 rounded-full">
              <FaRunning className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{msSportsScienceProgram.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advance your expertise in sports science, pushing the boundaries of human performance, health, and research.
          </p>
        </div>

        {/* Program Highlights - Static Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-emerald-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Master of Science (M.S.)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-emerald-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">{msSportsScienceProgram.duration}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-emerald-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Varies (Annual)</p>
          </div>
        </div>

        {/* Accordion Sections for M.S. Sports Science Content */}
        <div className="space-y-6 mb-12"> {/* This div creates space between the individual accordion blocks */}
          {/* Section: Program Overview */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('programOverview')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBookOpen className="w-6 h-6 text-emerald-600 mr-3" />
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
                  <p className="text-gray-700 mb-3">{msSportsScienceProgram.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Areas of Study:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {msSportsScienceProgram.specializations.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {msSportsScienceProgram.highlights.map((highlight, i) => (
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
                <FaBriefcaseMedical className="w-6 h-6 text-emerald-600 mr-3" />
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
                    An M.S. in Sports Science prepares graduates for advanced and specialized roles in sports organizations, research institutions, and healthcare. Potential career paths include:
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside mt-2">
                    <li>Sports Scientist</li>
                    <li>High-Performance Manager</li>
                    <li>Exercise Physiologist (Clinical/Research)</li>
                    <li>Strength and Conditioning Specialist (Elite Level)</li>
                    <li>Sports Nutrition Consultant (with additional certification)</li>
                    <li>Biomechanist</li>
                    <li>Sports Psychologist (with additional licensing)</li>
                    <li>Researcher/Academician in Sports Science</li>
                    <li>Performance Analyst</li>
                    <li>Product Development in Sports Technology</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    This master's program is a stepping stone for leadership roles and doctoral studies in related fields.
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
                <FaUserGraduate className="w-6 h-6 text-emerald-600 mr-3" />
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
                          <span>Bachelor's degree in Sports Science, Exercise Science, Physical Education, or a related field from a recognized university</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Minimum aggregate marks or GPA as per university/college norms (e.g., 55% or equivalent)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Statement of Purpose (SOP) and Letters of Recommendation (LORs) may be required</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Application Process:</h3>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li>Fill online application form</li>
                        <li>Upload academic transcripts, degree certificates, SOP, and LORs</li>
                        <li>Attend interview or entrance examination (if applicable)</li>
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
        <div className="text-center bg-emerald-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Lead in Sports Science Research and Practice?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enroll in our M.S. Sports Science program and shape the future of human performance and well-being.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaFileAlt className="mr-2" /> Apply Now
            </a>
             
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MsSportsSciencePage;