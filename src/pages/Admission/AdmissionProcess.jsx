import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  FaUserEdit, 
  FaEnvelope, 
  FaUserLock, 
  FaFileAlt, 
  FaCreditCard, 
  FaFileDownload, 
  FaCheckDouble,
  FaUniversity
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const steps = [
  { 
    title: "Initial Registration",
    text: 'Submit basic details through our secure admission portal',
    icon: <FaUserEdit className="text-white text-xl" />,
    description: "Begin your academic journey by creating your applicant profile"
  },
  { 
    title: "Credentials Delivery",
    text: 'Receive secure login details via registered email',
    icon: <FaEnvelope className="text-white text-xl" />,
    description: "Check your inbox (and spam folder) for authentication details"
  },
  { 
    title: "Account Access",
    text: 'Login to your personalized admission dashboard',
    icon: <FaUserLock className="text-white text-xl" />,
    description: "Access all admission resources through your secure portal"
  },
  { 
    title: "Application Completion",
    text: 'Fill out the comprehensive application form',
    icon: <FaFileAlt className="text-white text-xl" />,
    description: "Provide academic history, extracurriculars, and personal statement"
  },
  { 
    title: "Payment Submission",
    text: 'Process your non-refundable application fee',
    icon: <FaCreditCard className="text-white text-xl" />,
    description: "Multiple secure payment options available"
  },
  { 
    title: "Document Finalization",
    text: 'Download and verify your application package',
    icon: <FaFileDownload className="text-white text-xl" />,
    description: "Retain copies for your records and future reference"
  },
  { 
    title: "Admission Review",
    text: 'Await official communication from the admissions committee',
    icon: <FaCheckDouble className="text-white text-xl" />,
    description: "Typically processed within 4-6 weeks of submission"
  }
];

const AdmissionProcess = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedStep, setExpandedStep] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);

  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(step => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const toggleExpand = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <Layout>
      <Helmet>
  <title>Admission Process | Saroj International University</title>
  <meta name="description" content="Learn about the step-by-step admission process at Saroj International University for undergraduate, postgraduate, and doctoral programs." />
</Helmet>

      <div className="bg-gradient-to-b from-blue-50 to-white py-30 px-4 lg:px-20">
        <div className="bg-white rounded-2xl max-w-5xl mx-auto shadow-2xl overflow-hidden">
          {/* Header with university branding */}
          <div className="bg-blue-800 text-white p-8 text-center">
            <div className="flex justify-center items-center mb-4">
              <FaUniversity className="text-3xl mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Academic Admission Pathway
              </h2>
            </div>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Follow our streamlined admission process designed for academic excellence and applicant convenience
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-blue-800 font-bold mb-2 flex items-center">
                  <FaCheckDouble className="mr-2" /> Process Overview
                </h3>
                <p className="text-gray-600">
                  Our 7-step admission framework ensures thorough evaluation while maintaining transparency at each stage.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-blue-800 font-bold mb-2 flex items-center">
                  <FaUniversity className="mr-2" /> Estimated Timeline
                </h3>
                <p className="text-gray-600">
                  Complete all steps in as little as 2 weeks. Most decisions rendered within 4-6 weeks of application.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-blue-800 font-bold mb-2 flex items-center">
                  <FaUserLock className="mr-2" /> Secure Processing
                </h3>
                <p className="text-gray-600">
                  All applicant data is encrypted and protected under our institutional privacy policy.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Progress connector line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-blue-200 -z-10"></div>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div 
                      className={`flex items-start gap-6 p-6 rounded-xl transition-all duration-300 cursor-pointer 
                        ${expandedStep === index ? 'bg-blue-50 shadow-md' : 'hover:bg-blue-50'}
                        ${completedSteps.includes(index) ? 'border-l-4 border-blue-600' : ''}
                      `}
                      onClick={() => toggleExpand(index)}
                      onMouseEnter={() => setShowTooltip(index)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full 
                        ${completedSteps.includes(index) ? 'bg-green-600' : 'bg-blue-700'} 
                        text-white font-bold text-lg transition-all duration-300 shadow-md`}
                      >
                        {completedSteps.includes(index) ? <FaCheckDouble /> : step.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`text-lg font-semibold 
                              ${completedSteps.includes(index) ? 'text-gray-600' : 'text-gray-800'}
                            `}>
                              {step.title}
                            </h3>
                            <p className={`mt-1 
                              ${completedSteps.includes(index) ? 'text-gray-500 line-through' : 'text-gray-600'}
                            `}>
                              {step.text}
                            </p>
                          </div>
                          <button 
                            className={`ml-4 px-3 py-1 rounded-full text-xs font-medium 
                              ${completedSteps.includes(index) 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'}
                            `}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStep(index);
                            }}
                          >
                            {completedSteps.includes(index) ? 'Completed' : 'Mark Complete'}
                          </button>
                        </div>

                        {expandedStep === index && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pl-2 border-l-2 border-blue-200"
                          >
                            <p className="text-gray-600 text-sm">{step.description}</p>
                            {index === 3 && (
                              <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-800 mb-1">Required Documents:</h4>
                                <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
                                  <li>Academic transcripts (official copies)</li>
                                  <li>Standardized test scores (if applicable)</li>
                                  <li>Two letters of recommendation</li>
                                  <li>Personal statement (500-750 words)</li>
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {showTooltip === index && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-20 top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-10 w-64"
                      >
                        <p className="text-sm text-gray-700">{step.description}</p>
                        <div className="absolute -top-1 left-4 w-3 h-3 bg-white transform rotate-45"></div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced progress tracker */}
            <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-1">Your Application Progress</h3>
                  <p className="text-blue-100">
                    {completedSteps.length === steps.length 
                      ? 'Ready for committee review!'
                      : `${steps.length - completedSteps.length} steps remaining`}
                  </p>
                </div>
                
                <div className="w-full md:w-64">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Completion</span>
                    <span className="text-sm font-bold">
                      {Math.round((completedSteps.length / steps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-900 bg-opacity-40 rounded-full h-3">
                    <motion.div 
                      className="bg-white h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                      transition={{ duration: 0.8, type: 'spring' }}
                    />
                  </div>
                </div>
              </div>

              {completedSteps.length > 0 && completedSteps.length < steps.length && (
                <div className="mt-6 pt-4 border-t border-blue-400">
                  <h4 className="font-medium mb-2">Next Recommended Step:</h4>
                  <div className="flex items-center bg-blue-700 bg-opacity-50 rounded-lg p-3">
                    <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                      {steps[completedSteps.length]?.icon}
                    </div>
                    <div>
                      <p className="font-medium">{steps[completedSteps.length]?.title}</p>
                      <p className="text-blue-100 text-sm">{steps[completedSteps.length]?.text}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <a href='https://siu.in8.nopaperforms.com/'
               target='_blank'
                rel='noopener noreferrer'
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors duration-300 shadow-md">
                Begin Your Application
              </a>
              <p className="mt-3 text-gray-500 text-sm">
                Have questions? Call us at <a href="tel:+919513731275" className="hover:text-blue-600 transition-colors duration-300 text-md">+91 9513731275</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdmissionProcess;