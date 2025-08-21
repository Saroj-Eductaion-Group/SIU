import React, { useState } from "react";
import { GraduationCap, Globe, User2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";

const criteria = [
  {
    title: "Undergraduate Programs (Indian Nationals)",
    description: "Successful completion of Class 12th from any recognized board in India.",
    icon: <User2 className="w-5 h-5" />,
    details: [
      "Minimum 50% aggregate marks required (45% for reserved categories)",
      "Valid score in SIU Entrance Test or JEE Main/CUET",
      "Science stream required for B.Tech programs"
    ]
  },
  {
    title: "Undergraduate Programs (Foreign Nationals)",
    description: "Submission of a certificate equivalent to Class 12th from the respective country.",
    icon: <Globe className="w-5 h-5" />,
    details: [
      "Equivalence certificate from Association of Indian Universities",
      "English proficiency test scores (IELTS/TOEFL) if applicable",
      "Valid student visa required"
    ]
  },
  {
    title: "Postgraduate Programs (Indian Nationals)",
    description: "Graduation from any recognized university in India.",
    icon: <GraduationCap className="w-5 h-5" />,
    details: [
      "Minimum 55% aggregate marks in graduation",
      "Valid score in SIU PET or GATE/CAT/MAT (for specific programs)",
      "Relevant bachelor's degree for specialized programs"
    ]
  },
  {
    title: "Postgraduate Programs (Foreign Nationals)",
    description: "Submission of a degree awarded by a university in the respective country.",
    icon: <Globe className="w-5 h-5" />,
    details: [
      "Degree equivalence certificate from AIU",
      "Minimum 3.0 GPA or equivalent",
      "Research proposal required for PhD programs"
    ]
  },
];

const additionalNotes = [
  "Applicants currently appearing for their final year graduation exams in 2024 are also eligible to apply for Postgraduate programs.",
  "The university reserves the right to assess a candidate's capability through Group Discussion/Personal Interview (GD/PI) before final admission.",
  "Applicants must be at least 17 years old by 31st December of the academic year for which they are applying.",
  "Special scholarships available for meritorious students and sportspersons.",
  "Lateral entry options available for diploma holders in selected programs."
];

const AdmissionCriteria = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTab, setActiveTab] = useState("undergraduate");

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <Layout>
      <Helmet>
  <title>Eligibility Criteria | Saroj International University</title>
  <meta name="description" content="Check the eligibility requirements for various courses offered at Saroj International University across different academic disciplines." />
</Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with animated underline */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-blue-900 mb-3">Admission Criteria</h1>
            <div className="relative inline-block">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pre-qualification examination criteria for our programs
              </p>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-lg shadow p-1">
              <button
                className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === "undergraduate" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-50"}`}
                onClick={() => setActiveTab("undergraduate")}
              >
                Undergraduate
              </button>
              <button
                className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === "postgraduate" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-50"}`}
                onClick={() => setActiveTab("postgraduate")}
              >
                Postgraduate
              </button>
            </div>
          </div>

          {/* Criteria Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {criteria
              .filter(item => 
                activeTab === "undergraduate" 
                  ? item.title.includes("Undergraduate")
                  : item.title.includes("Postgraduate")
              )
              .map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleCard(idx)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${expandedCard === idx ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          {React.cloneElement(item.icon, { className: `${expandedCard === idx ? 'text-blue-600' : 'text-gray-600'} w-5 h-5` })}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-blue-600">
                        {expandedCard === idx ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedCard === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Detailed Requirements:</h4>
                          <ul className="space-y-2">
                            {item.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="flex-shrink-0 mt-1 mr-2">
                                  <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                                <span className="text-sm text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>

          {/* Additional Notes */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <Info className="text-blue-600 w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Important Notes</h3>
              </div>
              
              <div className="space-y-3">
                {additionalNotes.map((note, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start p-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <span className="flex-shrink-0 mt-1 mr-3 text-blue-500">
                      •
                    </span>
                    <p className="text-gray-700">{note}</p>
                  </div>
                ))}
              </div>

           
            </div>
          </motion.div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a href='https://siu.in8.nopaperforms.com/'
               target='_blank'
                rel='noopener noreferrer' className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
                Begin Your Application
              </a>
            </motion.div>
            <p className="mt-4 text-gray-600 text-sm">
              Applications for 2025 intake are now open
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdmissionCriteria;