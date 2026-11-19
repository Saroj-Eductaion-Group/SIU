import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiTwitter, FiBookOpen } from 'react-icons/fi';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet';

const ChancellorPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const stats = [
    { value: "25+", label: "Years of Experience" },
    { value: "50+", label: "Publications" },
    { value: "10k+", label: "Students Impacted" },
  ];

  return (
    <Layout >
      <Helmet>
  <title>Chancellor | Saroj International University</title>
  <meta name="description" content="Know more about the Chancellor of Saroj International University and their vision for institutional growth and excellence." />
</Helmet>

    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 sm:text-6xl">
            Chancellor's Vision
          </h1>
          <p className="mt-4 text-xl text-indigo-700 font-medium">
            Saroj International University
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-16"
        >
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-indigo-500 to-indigo-700 p-8 flex flex-col items-center justify-center">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                className="h-64 w-64 rounded-full object-cover border-4 border-white shadow-lg mb-6"
                src="/chancellor.jpg" 
                alt="Shri. Sunil Singh"
              />
              <h2 className="text-2xl font-bold text-white">Shri. Sunil Singh</h2>
              <p className="text-indigo-100">Chancellor</p>
              
              
            </div>

            <div className="md:w-2/3 p-8 md:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="prose prose-lg text-gray-700 max-w-none"
              >
                <p className="mb-6 text-lg">
                  <span className="text-indigo-600 font-semibold">Dear Students, Educators, and Stakeholders,</span>
                </p>
                
                <p className="mb-6">
                  It gives me immense pleasure to welcome you to <span className="font-semibold text-indigo-700">Saroj International University</span>, a beacon of knowledge and a nurturing ground for future leaders. Since our inception, we have remained steadfast in our mission to impart quality education, develop practical skills, and instill a sense of responsibility in our students.
                </p>
                
                <div className="relative mb-8 pl-6 border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-lg">
                  <FiBookOpen className="absolute -left-3 top-4 bg-white text-indigo-600 p-1 rounded-full border-2 border-indigo-500" size={24} />
                  <p className="italic text-indigo-800">
                    "Education at our university is not just about obtaining degrees; it's about shaping character, developing critical thinking, and preparing individuals for real-world challenges."
                  </p>
                </div>
                
                <p className="mb-6">
                  Our dedicated faculty, state-of-the-art facilities, and industry-driven curriculum aim to provide a holistic learning experience that prepares students for a successful future.
                </p>
                
                <p className="mb-8">
                  I firmly believe that education is the key to empowerment, and at Saroj International University, we strive to ignite the spark of curiosity, creativity, and courage in every learner. I invite you to be a part of this remarkable journey of knowledge, growth, and transformation.
                </p>
                
                <div className="border-t pt-6">
                  <p className="text-gray-600">
                    Warm Regards,
                  </p>
                  <p className="text-xl font-semibold text-indigo-800">
                    Shri. Sunil Singh
                  </p>
                  <p className="text-indigo-600">
                    Chancellor, Saroj International University
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <p className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Message Section */}

      </motion.div>
    </div>
    </Layout>
  );
};

export default ChancellorPage;