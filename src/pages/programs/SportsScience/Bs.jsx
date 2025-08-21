import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRunning, // Main icon for Sports Science
  FaGraduationCap,
  FaClock,
  FaCalendarAlt,
  FaBookOpen,
  FaBriefcaseMedical, // Can be used for sports medicine/rehab careers
  FaUserGraduate,
  FaChevronDown,
  FaFileAlt,
  FaHeartbeat, // For physiology/health
  FaDumbbell, // For strength/conditioning
  FaBrain, // For sports psychology
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BsSportsSciencePage = () => {
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

  const bsSportsScienceProgram = {
    id: 'bs-sports-science',
    title: 'Bachelor of Science (B.S.) in Sports Science',
    duration: '3 Years (6 Semesters)',
    icon: <FaRunning className="text-orange-600 text-2xl" />,
    description: 'The B.S. in Sports Science program offers a comprehensive understanding of the scientific principles underpinning human performance, exercise, and health. It integrates various disciplines including physiology, biomechanics, nutrition, and psychology to prepare students for diverse roles in the sports, fitness, and health industries.',
    specializations: [
      'Exercise Physiology',
      'Sports Biomechanics',
      'Sports Nutrition',
      'Sports Psychology',
      'Strength & Conditioning',
      'Sports Management & Coaching'
    ],
    highlights: [
      'Scientific understanding of human movement and performance',
      'Practical application of exercise and training principles',
      'Knowledge of injury prevention and rehabilitation',
      'Development of coaching and leadership skills',
      'Preparation for advanced studies or professional certifications',
      'Focus on health, wellness, and athletic development'
    ],
  };

  return (
    <Layout>
      <Helmet>
  <title>Bachelor of Science (BS) in Sports | Saroj International University</title>
  <meta name="description" content="Join the BS in Sports program at Saroj International University to build a career in sports science, coaching, fitness training, and athletic performance management." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 p-4 rounded-full">
              <FaRunning className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{bsSportsScienceProgram.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the science behind human performance, exercise, and health to empower athletes and promote well-being.
          </p>
        </div>

        {/* Program Highlights - Static Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Science (B.S.)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">{bsSportsScienceProgram.duration}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Varies (Annual)</p>
          </div>
        </div>

        {/* Accordion Sections for B.S. Sports Science Content */}
        <div className="space-y-6 mb-12"> {/* This div creates space between the individual accordion blocks */}
          {/* Section: Program Overview */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleStaticSection('programOverview')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
            >
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaBookOpen className="w-6 h-6 text-orange-600 mr-3" />
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
                  <p className="text-gray-700 mb-3">{bsSportsScienceProgram.description}</p>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Areas of Study:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bsSportsScienceProgram.specializations.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mb-2 mt-4">Program Highlights:</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {bsSportsScienceProgram.highlights.map((highlight, i) => (
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
                <FaBriefcaseMedical className="w-6 h-6 text-orange-600 mr-3" />
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
                    A B.S. in Sports Science opens doors to a variety of exciting careers in health, fitness, and professional sports. Graduates can pursue roles such as:
                  </p>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside mt-2">
                    <li>Exercise Physiologist</li>
                    <li>Strength and Conditioning Coach</li>
                    <li>Sports Coach</li>
                    <li>Fitness Manager/Trainer</li>
                    <li>Sports Nutritionist (with further certification)</li>
                    <li>Clinical Exercise Specialist</li>
                    <li>Rehabilitation Assistant</li>
                    <li>Sports Data Analyst</li>
                    <li>Wellness Program Coordinator</li>
                    <li>Sports Administrator</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    This program also provides an excellent foundation for postgraduate studies in sports medicine, physical therapy, or exercise science.
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
                <FaUserGraduate className="w-6 h-6 text-orange-600 mr-3" />
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
                          <span>10+2 from a recognized board or equivalent, preferably with Science subjects</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Minimum aggregate marks as per university/college norms (e.g., 50%)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>May require a basic fitness assessment or interview</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800">Application Process:</h3>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li>Fill online application form</li>
                        <li>Upload required academic and identification documents</li>
                        <li>Attend counseling or interview (if applicable)</li>
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
        <div className="text-center bg-orange-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Innovate the World of Sports and Health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our B.S. Sports Science program and contribute to human performance and well-being.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://siu.in8.nopaperforms.com/"  target="_blank"
              className="bg-white text-orange-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaFileAlt className="mr-2" /> Apply Now
            </a>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BsSportsSciencePage;