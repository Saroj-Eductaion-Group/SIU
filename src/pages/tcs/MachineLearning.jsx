// src/pages/tcs/MachineLearningPage.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const MachineLearningPage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "machine-learning",
    title: "Machine Learning for Real World application",
    degree: "B.Tech-AI/ML",
    semester: 4,
    summary: [
      "Machine Learning (ML) is an application of Artificial Intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. Machine Learning focusses on the development of computer programs that can access data and learn from it.",
      "As per Fortune Business Insights, the global ML market is expected to grow from US$26.03 billion in 2023 to US$225.91 billion by 2030, exhibiting a CAGR of 36.2% during the forecast period.",
      "Machine Learning for Real-World Application is a course that teaches the basic and advanced concepts of Machine Learning supported by industry relevant business case studies. The course uses Python as the programming environment. Datasets required for the case studies can be obtained from the internet. This state-of-the-art course is available for engineering students who aspire to take part in knowledge building and make computers capable of taking intelligent decisions in several areas such as smart home applications, providing bank loans to customers, business analytics including share market predictions, sentiment analysis, security and surveillance, real estate businesses and more.",
    ],
    prerequisites: [
      {
        title: "Mathematics and Statistics",
        topics: [
          "Linear Algebra: Matrices and Vectors",
          "Calculus: Differentiation, Partial Derivatives, and Gradient",
          "Statistics: Descriptive Statistics, Normal Distribution, Probability",
        ],
      },
      {
        title: "Python",
        topics: [
          "Basic Programming",
          "Data Processing using NumPy, SciPy, Matplotlib, and Pandas",
          "Basic usage of Scikit, Scikit-learn packages in Python",
        ],
      },
      'Completing the course "TCS iON Industry Honour Certification - Artificial Intelligence for Real-World Application" is highly recommended.',
    ],
    syllabus: [
      {
        title: "Basics of Statistics",
        topics: ["Linear algebra", "Mathematical statistics"],
      },
      {
        title: "Basics of Machine Learning",
        topics: [
          "Introduction",
          "Supervised learning",
          "Unsupervised learning",
          "Reinforcement learning",
        ],
      },
      {
        title: "Machine Learning Methodology (CRISP DM)",
        topics: [
          "Data understanding",
          "Data preparation",
          "Exploratory data analysis",
        ],
      },
      {
        title: "Key Concepts in Machine Learning",
        topics: [
          "Data sample",
          "Model selection",
          "Regression algorithms",
          "Model validation",
          "Model deployment",
          "Imbalance in data",
        ],
      },
      {
        title: "Machine Learning Algorithms with Real-Life Use Cases",
        topics: ["Unsupervised algorithms", "Classification algorithms"],
      },
    ],
     mentors: [
      {
        name: "Dr. Gaurav Harit",
        role: "Associate Professor Department of Computer Science and Engineering, IIT Jodhpur | Academic Expert",
        image: "/tcsMentors/Gaurav.jpg", // Assumes image is in public/tcs/
        description:
          "Dr. Gaurav Harit is currently an Associate Professor in the Department of Computer Science and Engineering at IIT Jodhpur since 2010. He worked as a faculty member of Department of Computer Science and Engineering at IIT Kharagpur from 2008-2010. He holds a B.E. (Electrical) degree from Jai Narayan Vyas University, Jodhpur, and M.Tech and PhD degrees from the Department of Electrical Engineering at IIT Delhi. His research interests include applications of machine learning to image and video analysis. He has over 60 publications in various conferences and journals. More details are available at http://home.iitj.ac.in/~gharit/",
      },
      {
        name: "Sangameshwar Patil",
        role: "Senior Scientist TCS Research | Industry Expert",
        image: "/tcsMentors/Sangameshwar_Patil.jpg", // Assumes image is in public/tcs/
        description:
          "Sangameshwar Patil is currently a Senior Scientist at TRDDC, TCS Research, Pune. He had earlier stints as a software engineer at IBM and Motorola and Project Leader at C-DAC. He received his M.Tech (Computer Science) from Indian Statistical Institute, Kolkata and B.E. (Mechanical Engg.) from Govt. College of Engg., Pune. His research interests are in Machine Learning, Natural Language Processing, and Software Analytics. He has received TCS Young Innovator Award and TCS SRL Star Award for his work. He has multiple patents as well as research publications in reputed conferences and journals. Their details are available on his Google Scholar profile. https://scholar.google.co.in/citations?user=PEzAWAwAAAAJ&hl=en",
      },
    ],
    careerOutlook: [
      "The demand for ML specialists will grow by 40% from 2023 to 2027.",
      "The most required Python libraries for ML engineers are TensorFlow, Keras, and scikit-learn.",
      "LinkedIn's 'Jobs on the Rise' report highlights AI and ML as the top skills driving job growth, with a 75% increase in postings over the past four years. This trend shows no signs of slowing down, with experts predicting a 200% surge in ML job opportunities by 2030.",
      "According to the Future of Jobs Report 2023, 'Demand for AI and ML specialists is expected to grow by 40%, or 1 million jobs, as the usage of AI and ML drives continued industry transformation'.",
    ],
    jobRoles: [
      "Software Engineer",
      "Software Developer",
      "Machine Learning Designer",
      "Data Scientist",
      "Computational Linguist",
    ],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/machine-learning/",
    courseBanner: 'https://cdn.pixabay.com/photo/2018/12/06/10/45/algorithm-3859539_640.jpg', // Assumes image is in public/tcs/
  };

  // Features data (reused from your DesignThinkingPage structure)
  const features = [
    {
      icon: <BriefcaseBusiness className="w-8 h-8 text-orange-600" />,
      title: "Assured Internship and Placement"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "TCS Certifications"
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "Specialisation in Machine Learning"
    }
  ];

  const openMentorModal = (mentor) => {
    setSelectedMentor(mentor);
    setShowMentorModal(true);
  };

  const closeMentorModal = () => {
    setShowMentorModal(false);
    setSelectedMentor(null);
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{courseData.title}</h1>
                <p className="text-xl mb-6">{courseData.summary[0].split('. ')[0]}.</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                    <BookOpen className="mr-2 h-5 w-5" />
                    <span>{courseData.degree}</span>
                  </div>
                 
                </div>
                 <div class="button-slide">    
                                <a 
                                  href={courseData.courseurl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center bg-white text-blue-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                                  >
                                  Enroll Now
                                  <ChevronRight className="ml-2 h-5 w-5" />
                                </a>
                                    </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400 rounded-lg opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-400 rounded-lg opacity-20 animate-pulse delay-300"></div>
                  <img
                    src={courseData.courseBanner}
                    alt={courseData.title}
                    className="relative z-10 w-full h-auto rounded-lg shadow-2xl border-4 border-white slide-up"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Icon Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
 <div
    
      key={index}
      className="group border-orange-600 border-l-2 flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm transition hover:bg-orange-50 hover:text-orange-800 hover:shadow-md"
    >
      <div className="mb-4 p-3 rounded-full bg-orange-50 transition group-hover:bg-orange-100">
        {feature.icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 transition group-hover:text-orange-700">
        {feature.title}
      </h3>
    </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content spans all columns now */}
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Course Details</h2>

              {/* Course Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Course Overview</h3>
                <div className="prose max-w-none">
                  {courseData.summary.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-2">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Syllabus */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Syllabus</h3>
                <div className="space-y-4">
                  {courseData.syllabus.map((module, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-orange-800 to-orange-600">
                        <div className="flex items-center">
                          <span className="mr-3 text-white font-semibold">{index + 1}.</span>
                          <h4 className="text-lg font-medium text-left text-white">{module.title}</h4>
                        </div>
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <ul className="space-y-2 pl-5">
                          {module.topics.map((topic, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Prerequisites</h3>
                <div className="text-gray-700 space-y-4">
                  {courseData.prerequisites.map((prereq, index) => (
                    typeof prereq === 'string' ? (
                      <p key={index}>{prereq}</p>
                    ) : (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-800 mb-2">{prereq.title}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {prereq.topics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Mentors - New Layout */}
              {courseData.mentors && courseData.mentors.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                    <User className="mr-2 h-6 w-6 text-blue-600" />
                    Our Mentors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courseData.mentors.map((mentor, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                        <div className="p-6 flex flex-col items-center text-center">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100 shadow-md"
                          />
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h4>
                          <p className="text-md text-blue-700 mb-3">{mentor.role}</p>
                          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                            {mentor.description}
                          </p>
                          <button
                            onClick={() => openMentorModal(mentor)}
                            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                          >
                            Read More
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Outlook */}
              {courseData.careerOutlook && courseData.careerOutlook.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                    <BarChart2 className="mr-2 h-6 w-6 text-blue-600" />
                    Career Outlook
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <ul className="space-y-3 list-disc pl-5">
                      {courseData.careerOutlook.map((outlook, index) => (
                        <li key={index} className="text-gray-700">{outlook}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Job Roles */}
              {courseData.jobRoles && courseData.jobRoles.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                    <Briefcase className="mr-2 h-6 w-6 text-blue-600" />
                    Potential Job Roles
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="flex flex-wrap gap-3">
                      {courseData.jobRoles.map((role, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-md font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Detail Modal */}
      {showMentorModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-6">
            <button
              onClick={closeMentorModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
            >
              <X className="h-7 w-7" />
            </button>
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={selectedMentor.image}
                alt={selectedMentor.name}
                className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-blue-200 shadow-lg"
              />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{selectedMentor.name}</h3>
              <p className="text-xl text-blue-700 mb-4">{selectedMentor.role}</p>
            </div>
            <div className="prose max-w-none text-gray-800 leading-relaxed">
              <p>{selectedMentor.description}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MachineLearningPage;