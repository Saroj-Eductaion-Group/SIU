import { useState } from 'react';
import  Layout  from '../../../components/Layout'; // Assuming Layout is one level up
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaRobot,
  FaDatabase,       // Primary icon for Data Science
  FaChartLine,      // For analytics/insights
  FaLaptopCode,     // For programming/tech
  FaGraduationCap,  // General academic
  FaCalendarAlt,    // For dates (though removed for important dates section)
  FaClock,          // For duration
  FaBookOpen,       // For overview
  FaBriefcase,      // For careers
  FaChevronDown,    // For accordions
  FaExternalLinkAlt, // For external links
  FaLightbulb,FaFileAlt       // For innovation/insights
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const BtechDataSciencePage = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    careers: false,
    admission: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Animation variants (reused from previous component)
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

  const careerPaths = [
    {
      title: 'Data Analyst',
      description: 'Interpret data, analyze results using statistical techniques and provide ongoing reports.',
      icon: <FaChartLine className="w-6 h-6 text-green-600" />
    },
    {
      title: 'Machine Learning Engineer',
      description: 'Develop and deploy machine learning models and intelligent systems.',
      icon: <FaLaptopCode className="w-6 h-6 text-purple-600" />
    },
    {
      title: 'Data Scientist',
      description: 'Design and implement predictive models and advanced analytical solutions.',
      icon: <FaDatabase className="w-6 h-6 text-green-600" />
    },
    {
      title: 'Business Intelligence Developer',
      description: 'Build data models and interactive dashboards to support business decision-making.',
      icon: <FaLightbulb className="w-6 h-6 text-red-600" />
    },
    {
      title: 'Big Data Engineer',
      description: 'Design, build, and maintain large-scale data processing systems.',
      icon: <FaRobot className="w-6 h-6 text-yellow-600" /> // Using robot for large scale automation/processing
    }
  ];

  return (
    <Layout>
      <Helmet>
  <title>B.Tech in Data Science | Saroj International University</title>
  <meta name="description" content="Join the B.Tech in Data Science program at Saroj International University and learn data analytics, big data tools, and predictive modeling." />
</Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <FaDatabase className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">B.Tech in Data Science</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A specialized program focused on extracting insights from data, developing predictive models, and mastering data-driven decision-making.
          </p>
        </div>

        {/* Program Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="font-semibold text-lg">Degree Awarded</h3>
            </div>
            <p className="text-gray-700">Bachelor of Technology (B.Tech)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaClock className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="font-semibold text-lg">Duration</h3>
            </div>
            <p className="text-gray-700">4 Years (8 Semesters)</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="font-semibold text-lg">Intake</h3>
            </div>
            <p className="text-gray-700">60 Seats (Annual)</p>
          </div>
        </div>

        {/* Program Overview */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBookOpen className="w-6 h-6 text-green-600 mr-3" />
              Program Overview
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.overview ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.overview && (
            <div className="px-6 pb-6">
              <p className="text-gray-700 mb-4">
                Our B.Tech in Data Science is a cutting-edge program designed to equip students with a robust understanding of data analysis, statistical modeling, and machine learning techniques. You will learn to extract meaningful insights from vast datasets and solve complex real-world problems.
              </p>
              <p className="text-gray-700 mb-4">
                The curriculum is highly practical, emphasizing hands-on experience with modern data science tools and platforms. Students will engage in numerous projects, case studies, and collaborate with industry experts to build a strong portfolio.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Key Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Strong foundation in Statistics, Mathematics, and Computer Science</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Extensive training in Python, R, SQL, and big data technologies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Focus on Machine Learning, Deep Learning, and Predictive Analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Real-world projects and industry collaborations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Dedicated labs and resources for data processing and analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Career Paths */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <button
            onClick={() => toggleSection('careers')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBriefcase className="w-6 h-6 text-green-600 mr-3" />
              Career Opportunities
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.careers ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.careers && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerPaths.map((career, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      {career.icon}
                      <h3 className="font-semibold text-lg ml-3">{career.title}</h3>
                    </div>
                    <p className="text-gray-700">{career.description}</p>
                     
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Top Recruiters:</h3>
                <div className="flex flex-wrap gap-4">
                  {['Google', 'Microsoft', 'Amazon', 'Deloitte', 'Accenture', 'TCS', 'IBM', 'Fractal Analytics', 'Mu Sigma', 'EY'].map((company, i) => (
                    <div key={i} className="bg-gray-100 px-4 py-2 rounded-full text-gray-800">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admission Requirements */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <button
            onClick={() => toggleSection('admission')}
            className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaGraduationCap className="w-6 h-6 text-green-600 mr-3" />
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
                      <span>10+2 with Physics, Chemistry, and Mathematics/Statistics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Minimum 60% aggregate in 10+2</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Valid JEE Main score or University Entrance Test</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">Application Process:</h3>
                  <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                    <li>Fill online application form</li>
                    <li>Upload required documents</li>
                    <li>Pay application fee</li>
                    <li>Appear for counseling (if applicable)</li>
                    <li>Complete admission formalities</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-green-700 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Master the World of Data?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our B.Tech in Data Science program and become a leader in the data-driven future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
                        href="https://siu.in8.nopaperforms.com/"  target="_blank"
                        className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                      >
                        <FaFileAlt className="mr-2" /> Apply Now
                      </a>
          
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BtechDataSciencePage;
