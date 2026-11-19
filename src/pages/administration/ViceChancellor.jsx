import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiBook, FiAward, FiBriefcase, FiGlobe } from 'react-icons/fi';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet';

const ViceChancellorPage = () => {
  const [activeTab, setActiveTab] = useState('message');

  const tabs = [
    { id: 'message', label: 'Message' },
    { id: 'about', label: 'About VC' },
    { id: 'achievements', label: 'Achievements' },
  ];

  const stats = [
    { icon: <FiBriefcase size={24} />, value: "25+", label: "Years Experience" },
    { icon: <FiBook size={24} />, value: "12+", label: "Books Published" },
    { icon: <FiAward size={24} />, value: "50+", label: "Research Papers" },
    { icon: <FiGlobe size={24} />, value: "5+", label: "Countries Worked" },
  ];

  return (
    <Layout>
      <Helmet>
  <title>Vice Chancellor | Saroj International University</title>
  <meta name="description" content="Meet the Vice Chancellor of Saroj International University and read their message on leadership, innovation, and academic excellence." />
</Helmet>

    <div className="min-h-screen pt-22 bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-600 sm:text-5xl">
            Vice Chancellor's Leadership
          </h1>
          <p className="mt-4 text-xl text-blue-700 font-medium">
            Saroj International University
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
        >
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-blue-700 to-blue-900 p-8 flex flex-col items-center justify-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
              <motion.img 
                whileHover={{ scale: 1.03 }}
                className="h-64 w-64 rounded-full object-cover border-4 border-white shadow-lg mb-6"
                src="/VC.jpeg" 
                alt="Dr. Rajiv Mishra"
              />
              <h2 className="text-2xl font-bold text-white">Dr. Rajiv Mishra</h2>
              <p className="text-blue-200">Vice Chancellor</p>
              
              
              
              {/* Stats for Mobile */}
              <div className="md:hidden grid grid-cols-2 gap-4 mt-8 w-full">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-blue-600 bg-opacity-30 p-3 rounded-lg text-center">
                    <div className="text-amber-300 flex justify-center">{stat.icon}</div>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-blue-100">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-2/3 p-6 md:p-8">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                      activeTab === tab.id
                        ? 'text-amber-600 border-b-2 border-amber-600'
                        : 'text-gray-600 hover:text-blue-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'message' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="prose prose-lg text-gray-700 max-w-none"
                  >
                    <p className="mb-6 text-lg">
                      <span className="text-blue-800 font-semibold">Welcome to Saroj International University (SIU),</span> a place where knowledge meets purpose and innovation shapes the future.
                    </p>
                    
                    <div className="relative mb-8 pl-6 border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg">
                      <p className="italic text-blue-800">
                        "The leadership team at Saroj International University (SIU) is committed to upholding and promoting the mission of the University to educate and develop innovative, industry-friendly entrepreneurial and responsible business leaders."
                      </p>
                    </div>
                    
                    <p className="mb-6">
                      As Vice Chancellor, it is both an honor and a privilege to lead an institution that stands as a beacon of academic excellence, research innovation, and community impact. At Saroj International University (SIU), we are committed to nurturing a vibrant intellectual environment that empowers students, inspires faculty, and engages with the world beyond our campus.
                    </p>
                    
                    <p className="mb-6">
                      Our university is more than just a place of learning, it is a dynamic hub where diverse perspectives are welcomed, critical thinking is encouraged, and lifelong connections are forged. Through our world-class programs, cutting-edge research, and strong industry and global partnerships, we prepare our students not only to thrive in their careers but to become thoughtful, ethical leaders in a rapidly changing world.
                    </p>
                    
                    <p className="mb-6">
                      We believe in the transformative power of education. Whether you are a prospective student, researcher, partner, or visitor, I invite you to explore our community, engage with our mission, and discover how Saroj International University (SIU) can be part of your journey.
                    </p>
                    
                    <div className="border-t pt-6">
                      <p className="text-gray-600">
                        Warm regards,
                      </p>
                      <p className="text-xl font-semibold text-blue-800">
                        Dr. Rajiv Mishra
                      </p>
                      <p className="text-blue-600">
                        Vice Chancellor, Saroj International University (SIU)
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'about' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="prose prose-lg text-gray-700 max-w-none"
                  >
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">About Dr. Rajiv Mishra</h3>
                    
                    <p className="mb-6">
                      With extensive experience in both industry and academia, Dr. Rajiv Mishra has worked with prestigious organizations including Hindustan Times, Star TV, Lok Sabha TV as CEO, and Samsung as Vice President (South West Asia). He has also established several academies across India.
                    </p>
                    
                    <p className="mb-6">
                      Dr. Mishra served Amity University for over 8 years as Director and managed Amity TV as CEO, demonstrating his versatile leadership capabilities across education and media sectors.
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-blue-800 mb-3">Educational Background</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-amber-600 mr-2">•</span>
                          PhD in Digital Marketing
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-600 mr-2">•</span>
                          Graduation Certificate Course in Multi Media from University of California (UCLA), USA
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-600 mr-2">•</span>
                          Masters in Broadcasting from International Academy of Broadcasting (IAB), Switzerland
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'achievements' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-blue-800 mb-6">Professional Achievements</h3>
                    
                    <div className="grid gap-6 mb-8">
                      <div className="bg-white p-6 border-l-4 border-amber-500 shadow-sm rounded-r-lg">
                        <h4 className="font-bold text-blue-800 mb-2">Research Contributions</h4>
                        <p className="text-gray-700">
                          Dr. Mishra has an extensive research portfolio including books, research papers in national and international journals, and editorial page articles in newspapers and magazines.
                        </p>
                      </div>
                      
                      <div className="bg-white p-6 border-l-4 border-blue-500 shadow-sm rounded-r-lg">
                        <h4 className="font-bold text-blue-800 mb-2">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {['Digital Marketing', 'OTT Platforms', 'DTH Technology', 'Multicasting', 'Triple Play', 'FMCG', 'Electronic Goods', 'Media Management'].map((item, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 border-l-4 border-amber-500 shadow-sm rounded-r-lg">
                        <h4 className="font-bold text-blue-800 mb-2">Educational Leadership</h4>
                        <p className="text-gray-700">
                          His commitment to higher education is reflected in his ingenuity, perseverance, and unwavering dedication to shaping the future of youth through education mentoring and eclectic pedagogy.
                        </p>
                      </div>
                    </div>

                    {/* Stats for Desktop */}
                    <div className="hidden md:grid grid-cols-4 gap-4 mt-8">
                      {stats.map((stat, index) => (
                        <motion.div 
                          whileHover={{ y: -5 }}
                          key={index} 
                          className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100"
                        >
                          <div className="text-amber-600 flex justify-center mb-2">{stat.icon}</div>
                          <p className="text-2xl font-bold text-blue-800">{stat.value}</p>
                          <p className="text-sm text-blue-600">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Message Section */}
        
      </div>
    </div>
    </Layout>
  );
};

export default ViceChancellorPage;