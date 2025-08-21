import React, { useState } from 'react';
import Layout from '../../../components/Layout'; // Default import for Layout
import { motion, AnimatePresence, number, createScopedAnimate, numberValueTypes } from 'framer-motion';
import {
  FaBookReader, // Main icon for Arts/Humanities
  FaGraduationCap, // General academic
  FaClock, // For duration
  FaUniversity, // For programs/education
  FaFileAlt, // For details/application
  FaChevronDown, // For accordions
  FaCalendarAlt, // For intake
  FaLanguage, // For Language (used for English Lit)
  FaBriefcase, // For career opportunities
  FaPencilAlt, // Icon for content/writing
  FaLightbulb, // Icon for policy/research
  FaUsers, // Icon for social/community
  FaTheaterMasks, // Icon for performing arts (if acting is part of BA)
  FaChartLine // Icon for economics/analytics
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { useReducer } from 'react';
import { AppleIcon, Diff, Navigation, Origami } from 'lucide-react';

const BAPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    admission: false,
    career: false, // Added for career opportunities
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
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

  const baPrograms = [
    {
      id: 'acting-advertising',
      title: 'BA (Acting & Drama, Advertising, Journalism, PR Events)',
      duration: '3 Years (6 Semesters)',
      // Explicitly mention both modes for clarity in the main program card
      mode: 'Regular Mode & Global Mode - Full-time - Offline',
      icon: <FaBookReader className="text-purple-500 text-2xl" />,
      description: 'A dynamic undergraduate program for aspiring professionals in media, entertainment, and communication, blending creative arts with strategic communication skills. This program is available in both **Regular Mode** and **Global Mode** to suit diverse student needs.',
      specializations: [
        'Acting & Drama',
        'Advertising',
        'Journalism',
        'PR Events'
      ],
      highlights: [
        'Practical training in acting and drama techniques',
        'In-depth understanding of advertising and PR strategies',
        'Skills development in journalism and content creation',
        'Event management and coordination experience',
        'Industry-relevant curriculum and hands-on projects'
      ],
      careerOpportunities: [
        'Actor/Performer',
        'Advertising Executive',
        'Journalist/Reporter',
        'Public Relations Specialist',
        'Event Manager',
        'Content Creator',
        'Media Planner',
        'Brand Manager'
      ]
    },
    {
      id: 'history-econ-lang-polsci',
      title: 'BA (History, Economics, Language, Political Science)',
      duration: '3 Years (6 Semesters)',
      mode: 'Regular Mode - Totally domestic and Full-time - Offline',
      icon: <FaBookReader className="text-purple-500 text-2xl" />,
      description: 'A comprehensive undergraduate program offering a deep dive into social sciences, preparing students for diverse careers or further academic pursuits.',
      specializations: [
        'History',
        'Economics',
        'Language',
        'Political Science'
      ],
      highlights: [
        'Interdisciplinary approach to social studies',
        'Focus on critical thinking and analytical skills',
        'In-depth study of historical events and economic theories',
        'Development of linguistic and communication abilities',
        'Understanding of political systems and global affairs'
      ],
      careerOpportunities: [
        'Civil Services',
        'Economist',
        'Historian/Archivist',
        'Policy Analyst',
        'Journalist/Editor',
        'Researcher',
        'International Relations Specialist',
        'Educator'
      ]
    },
    {
      id: 'ba-english-literature',
      title: 'BA in English Literature',
      duration: '3 Years (6 Semesters)',
      mode: 'Regular Mode - Full-time - Offline',
      icon: <FaLanguage className="text-purple-500 text-2xl" />,
      description: 'Explore literary traditions across cultures and historical periods, developing strong analytical and communication skills.',
      specializations: [
        'English Literature'
      ],
      highlights: [
        'Critical Theory and Literary Analysis',
        'Creative Writing Workshops',
        'Survey of World Literature & Genres',
        'Research Methodologies & Academic Writing'
      ],
      careerOpportunities: [
        'Content Writer/Editor',
        'Journalist',
        'Publisher',
        'Academic/Researcher',
        'Teacher',
        'Lexicographer',
        'Scriptwriter',
        'Public Relations'
      ]
    },
    {
      id: 'ba-sociology',
      title: 'BA in Sociology',
      duration: '3 Years (6 Semesters)',
      mode: 'Regular Mode - Full-time - Offline',
      icon: <FaUniversity className="text-purple-500 text-2xl" />,
      description: 'Study human behavior, social structures, and cultural patterns to understand societal dynamics.',
      specializations: [
        'Sociology'
      ],
      highlights: [
        'Social Stratification & Inequality',
        'Research Methods in Sociology',
        'Urban Sociology & Rural Development',
        'Social Problems & Social Change'
      ],
      careerOpportunities: [
        'Social Worker',
        'Market Researcher',
        'Human Resources Specialist',
        'Policy Analyst',
        'Community Development Officer',
        'Counselor',
        'Urban Planner',
        'Demographer'
      ]
    }
  ];

  // Specific BA Career Roles for the general career opportunities section, reflecting image layout
  const generalBACareerRoles = [
    {
      title: 'Content Creator/Writer',
      icon: <FaPencilAlt className="text-red-500 text-xl" />,
      description: 'Develop engaging content for various platforms, including articles, blogs, marketing materials, and digital media.'
    },
    {
      title: 'Policy Analyst',
      icon: <FaLightbulb className="text-green-500 text-xl" />,
      description: 'Research, analyze, and evaluate policies for government agencies, think tanks, or advocacy groups.'
    },
    {
      title: 'Social Worker/Community Developer',
      icon: <FaUsers className="text-blue-500 text-xl" />,
      description: 'Work to improve the well-being of individuals, families, and communities through support and resource provision.'
    },
    {
      title: 'Journalist/Editor',
      icon: <FaBookReader className="text-yellow-500 text-xl" />, // Reusing FaBookReader for relevance
      description: 'Investigate, write, and present news and stories for print, broadcast, or digital media.'
    },
    {
      title: 'Public Relations Specialist',
      icon: <FaBriefcase className="text-purple-500 text-xl" />,
      description: 'Manage the public image and communication strategies for individuals, organizations, or brands.'
    },
    {
      title: 'Marketing Executive',
      icon: <FaChartLine className="text-teal-500 text-xl" />,
      description: 'Develop and implement marketing campaigns, analyze market trends, and manage brand promotion.'
    }
  ];

  const topBARecruiters = [
    'Publishing Houses', 'Media Organizations', 'NGOs', 'Government Agencies',
    'Marketing Firms', 'Educational Institutions', 'Human Resources Departments',
    'Event Management Companies'
  ];

  return (
    <Layout>
      <Helmet>
  <title>Bachelor of Arts (BA) in Humanities | Saroj International University</title>
  <meta name="description" content="Explore diverse disciplines in humanities and social sciences through the BA program at Saroj International University." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <FaBookReader className="w-12 h-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Bachelor of Arts (BA) Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore diverse fields in humanities and social sciences, fostering critical thinking and analytical skills for a holistic education.
          </p>
        </div>

        {/* Program Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Arts (BA)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">3 Years (6 Semesters)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">Varies by specialization (Annual)</p>
          </div>
        </div>

        {/* Available BA Programs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="bg-purple-700 px-8 py-6 flex items-center">
            <FaUniversity className="text-3xl text-white mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-white">Our BA Program Specializations</h2>
              <p className="text-purple-100 mt-1">Diverse pathways in Humanities and Social Sciences</p>
            </div>
          </div>
          <div className="p-8">
            {baPrograms.map((program) => (
              <div key={program.id} className="mb-6 last:mb-0 border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <button
                  onClick={() => toggleSection(program.id)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    {program.icon}
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
                      <p className="text-gray-600 text-sm">{program.duration} • {program.mode}</p>
                    </div>
                  </div>
                  <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections[program.id] ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedSections[program.id] && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={accordionVariants}
                      className="px-6 pb-6 pl-14 bg-gray-50 rounded-lg mt-2"
                    >
                      <p className="text-gray-700 mb-3">{program.description}</p>
                      <h4 className="font-semibold text-gray-800 mb-2">Specializations Offered:</h4>
                      <ul className="space-y-2 text-gray-700 list-disc list-inside">
                        {program.specializations.map((spec, i) => (
                          <li key={i}>{spec}</li>
                        ))}
                      </ul>
                      <h4 className="font-semibold text-gray-800 mb-2 mt-4">Key Features:</h4>
                      <ul className="space-y-2 text-gray-700 list-disc list-inside">
                        {program.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                     
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* New Career Opportunities Section - General overview, mimicking image layout */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <button
            onClick={() => toggleSection('career')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaGraduationCap className="w-6 h-6 text-purple-600 mr-3" /> {/* Using FaGraduationCap as in the image's "Admission Process" */}
              Career Opportunities
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.career ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {expandedSections.career && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={accordionVariants}
                className="px-6 pb-6"
              >
                <p className="text-gray-700 mb-6">
                  A Bachelor of Arts degree equips graduates with highly transferable skills, opening doors to diverse career paths across various sectors. The emphasis on critical thinking, communication, research, and analytical abilities makes BA graduates valuable assets in today's dynamic job market.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> {/* Grid layout as in image */}
                  {generalBACareerRoles.map((role, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-start text-left">
                      <div className="p-3 bg-white rounded-full shadow-sm mb-4">
                        {role.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{role.title}</h3>
                      <p className="text-gray-600 text-sm">{role.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-lg text-gray-800 mb-3">Top Recruiters:</h3>
                <div className="flex flex-wrap gap-3">
                  {topBARecruiters.map((recruiter, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Admission Requirements */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <button
            onClick={() => toggleSection('admission')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaGraduationCap className="w-6 h-6 text-purple-600 mr-3" />
              Admission Process
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.admission ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.admission && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">Eligibility:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>10+2 from a recognized board or equivalent</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Minimum 50% aggregate marks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>May require an aptitude test or interview for certain specializations</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">Application Process:</h3>
                  <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                    <li>Fill online application form</li>
                    <li>Upload required academic and identification documents</li>
                    <li>Pay application fee</li>
                    <li>Attend counseling or interview (if applicable)</li>
                    <li>Complete final admission formalities upon selection</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-purple-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore the Arts & Humanities?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enroll in our BA programs to cultivate critical thinking, creativity, and a deep understanding of human society.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://siu.in8.nopaperforms.com/" target="_blank"
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

export default BAPage;

