// src/pages/tcs/DeepLearningNeuralNetworkPage.jsx

import React from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const DlPage = () => {

  const courseData = {
    id: "deep-learning-and-neural-network",
    title: "Application of Deep Learning and Neural Network",
    degree: "B.Tech-AI/ML",
    semester: 5,
    summary: [
      "Deep Learning (also known as deep structure learning or hierarchical learning) is a part of the broader family of machine learning methods that is based on artificial neural networks.",
      "As per Grand View Research, the global Deep Learning market size was valued at US$49.6 billion in 2022 and is expected to expand at a compound annual growth rate (CAGR) exceeding 33.5% from 2023 to 2030 reaching US$526.7 billion.",
      "Application of Deep Learning and Neural Networks is a course that teaches the basic and advanced concepts of deep learning and neural networks supported by industry relevant business case studies. The course uses Python as the programming environment. Datasets required for the case studies can be obtained from the internet.",
      "The course leverages the following to assist learners in building their practical and applied skills",
      "Object identification and recognition using Convolutional Neural Networks (CNN)",
      "Face recognition using CNN (ResNet, VGG19)",
      "Sentence similarity using embeddings from Word2Vec, LASER",
      "Sentiment Analysis of tweets from social media using Long Short-Term Memory Networks (LSTM) and CNN",
      "Similar question detection using Siamese networks",
    ],
    prerequisites: [
      {
        title: "Mathematics ",
        topics: [
          "Linear Algebra: Matrices and Vectors",
          "Calculus: Differentiation, Partial Derivatives, and Gradient",
          "Statistics: Normal Distribution, Probability",
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
      'Completing the course "TCS iON Industry Honour Certification - Artificial Intelligence for Real-World Application" is highly recommended.', // Standalone string
    ],
    syllabus: [
      {
        title: "Preliminaries",
        topics: ["Introduction", "Machine learning"],
      },
      {
        title: "Basics of Neural Networks",
        topics: [
          "Artificial neural networks",
          "Popular networks",
          "Popular tools",
          "Case studies",
          "The human brain",
        ],
      },
      {
        title: "Deep Neural Networks - 1",
        topics: [
          "Introduction to Deep Learning (DL)",
          "Convolutional Neural Networks (CNN)",
          "Modern CNN architectures",
          "Image classification using CNN",
        ],
      },
      {
        title: "Deep Neural Networks - 2",
        topics: [
          "Recurrent Neural Networks (RNN) & LSTM",
          "Word vector representations",
          "Sentiment analysis",
          "Sentence classification",
          "Application in Natural Language Processing (NLP)",
        ],
      },
      {
        title: "Emerging Trends",
        topics: [
          "Attention mechanisms and memory networks",
          "Embeddings from LASER",
        ],
      },
    ],

    careerOutlook: [
      "The global Deep Learning (DL) market size was valued at US$17.60 billion in 2023 and is projected to grow from US$24.53 billion in 2024 to US$298.38 billion by 2032.",
      "The Deep Learning market size will grow at a CAGR of 7.3% during the forecast period (2024-2031).",
    ],
    // No 'mentors' array provided in the JSON, so the section will be omitted.
    // No 'jobRoles' array provided in the JSON, so the section will be omitted.
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/deep-learning-neural-networks/",
    courseBanner: 'https://cdn.pixabay.com/photo/2023/01/20/05/23/artificial-intelligence-7730758_640.jpg', // Assumes image is in public/tcs/
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
      title: "Specialisation in Deep Learning"
    }
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{courseData.title}</h1>
                {/* Displaying the first summary point in hero */}
                <p className="text-xl mb-6">{courseData.summary[0].split('.')[0]}.</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                    <BookOpen className="mr-2 h-5 w-5" />
                    <span>{courseData.degree}</span>
                  </div>
                 
                </div>
                <div className="button-slide">    
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
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-400 rounded-lg opacity-20 animate-pulse delay-300 "></div>
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
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Course Details</h2>

              {/* Course Overview (No Dropdown) */}
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Course Overview</h3>
                <div className="prose max-w-none">
                  {courseData.summary.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-2">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Syllabus (No Dropdown) */}
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

              {/* Prerequisites (Structured to handle both objects and strings) */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Prerequisites</h3>
                <div className="space-y-4">
                  {courseData.prerequisites.map((prereq, index) => (
                    <div key={index}>
                      {typeof prereq === 'string' ? (
                        <p className="text-gray-700">{prereq}</p>
                      ) : (
                        <>
                          <h4 className="font-semibold text-gray-800 mb-2">{prereq.title}</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {prereq.topics.map((topic, i) => (
                              <li key={i} className="text-gray-700">{topic}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

<div>

             {/* Career Outlook */}
              {courseData.careerOutlook && courseData.careerOutlook.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5 text-blue-600" />
                    Career Outlook
                  </h3>
                  <ul className="space-y-3">
                    {courseData.careerOutlook.map((outlook, index) => (
                      <li key={index} className="text-sm text-gray-700">{outlook}</li>
                    ))}
                  </ul>
                </div>
              )}

         
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DlPage;