// src/pages/tcs/StatisticsRPythonPage.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const StatisticsPage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "statistics-r-python",
    title: "Statistics using R and Python",
    degree: "B.Tech-AI/ML",
    semester: 2,
    summary: [
      "Statistics using R and Python is envisaged to act as a prerequisite for Data Analytics and Artificial Intelligence courses. As per Emergen Research, The global Python market is expected to reach US$100.6 million in 2030 with revenue CAGR of 44.8% during the period upto 2030.",
      "Also, The U.S. Bureau of Labor Statistics predicts a 31% increase in employment for statisticians, from 2021-2031, who often require R programming skills.",
      "The course provides a thorough understanding of the basic concepts of Statistics from the applications standpoint, as well as implementation of statitical concepts in Python programming and R programming. Through this course, learners will get acquainted with the application of statistical concepts and will be able to perform statistical operations with Python programming and R programming.",
    ],
    prerequisites:
      "Basic knowledge of Statistics and any computer programming language.",
    syllabus: [
      {
        title: "Introduction to Python and Pandas",
        topics: [
          "Introduction to Python, Python installation, variables and operators, reading data from keyboard, Data types - numbers, lists, dictionary",
          "Decision making Loops - for, while; Loop control statements - break, continue, pass",
          "Introduction to Pandas - Pandas Installation, data structures - series, data frame",
          "Reading from csv files, loc(), iloc() function, descriptive statistics, inserting columns into DataFrame, deleting columns from DataFrame, concatenating DataFrame, writing back to csv files, reading from excel files",
          "Merging or joining DataFrame",
          "Group by and aggregate functions",
          "Connecting Python to MySQL",
        ],
      },
      {
        title: "Introduction to R Programming",
        topics: [
          "Introduction to R programming, R programming installation and running, Variables, Operators, Data Types, Decision making, Loops, Functions, Reading from csv files, writing back to csv files, reading from excel files,Packages - installation, loading",
          "Introduction to dplyr Library, dplyr functions, arrange, join, select, rename, filter, summarize, Pipe operator, group_by, do, join, if, across",
          "Connecting R to MySQL",
        ],
      },
      {
        title: "Data Visualization and Elementary Statistics",
        topics: [
          "Data Visualization - bar charts, grouped bar charts, stacked bar charts, histogram, line charts, pie charts, box plots, scatter plots, density plots, strip charts, QQ plots - implementation in both Python and R",
          "Probability distributions - binomial, Poisson, normal, exponential, chi-squared, student's ",
          "F distribution and Uniform distribution",
          "Z-Test, one sample Z-Test, two sample Z-Test, F-Test, Student's t-Test - implementation of tests in Python and R",
        ],
      },
      {
        title: "Tests of Hypothesis and Non-parametric Tests",
        topics: [
          "Tests of Hypothesis - population mean with known variance, population with unknown variance, population proportion, goodness of fit, chi-square test",
          "Implementation of tests in Python and R",
          "Non-parametric tests - one-sample test, two-sample test - two-sample sign test with binomial distribution, two-sample sign test with normal approximation",
          "Wilcoxon signed-rank test, Mann-Whitney-Wilcoxon test, Kolmogorov-Smirnov test, K-Samples test - Kruskal-Wallis H test - implementation of tests in Python and R",
        ],
      },
      {
        title: "ANOVA and Multivariate Analysis",
        topics: [
          "Analysis of variance - one-way ANOVA, Two-way ANOVA",
          "ANOVA - implementation in Python and R",
          "Multivariate Analysis - correlation, covariance, forecasting - simple moving average, weighted moving average, simple exponential smoothing implementation in Python and R",
          "Regression - simple linear regression, multiple linear regression, polynomial regression, logistic regression, poisson regression",
        ],
      },
      {
        title: "Advanced Graphs, Case Studies, and Discussion",
        topics: [
          "Advanced graphs - lattice graphs, ggplot2 graphs, probability graphs, mosaic graphs, correlograms; implementation in Python and R",
          "Case studies and discussion",
        ],
      },
    ],
    mentors: [
      {
        name: "Dr. Jeeva Jose",
        role: "Associate Professor Baselios Poulose II Catholicos College | Academic Expert",
        image: "/tcsMentors/Jeeva.jpg", // Assumes image is in public/tcs/
        description:
          "Dr. Jeeva Jose is the author of 15 technical books and a well-known trainer for various programming languages and data science. Her books are mainly in the areas of data mining, C, Java, Python, R Programming, Android, PHP and MySQL, Machine Learning and Internet of Things. The books 'Introduction to Computing and Problem Solving with Python', 'Taming Python by Programming', 'Internet of Things', 'Machine Learning using Python' and 'Beginner's Guide for Data Analysis Using R Programming' are recommended by AICTE in their model curriculum. More than 75 universities and a few autonomous colleges are using these books as their recommended book of study in the syllabus. She is in the higher education field since 2000 with good national and international exposure. She was the Principal Investigator for two research projects funded by UGC and one funded by KSCSTE. She has published 25 research papers in various refereed journals and conference proceedings. She has been a key resource for more than 100 training programmes, which includes, International, national and state level workshops, conferences and short-term courses. She is a recipient of the ACM-W Scholarship provided by Association for Computing Machinery, New York for Young Women Research Scholars from developing countries. She is providing her service to many universities and autonomous colleges as a member in board of academic committee, chairperson for question paper setting, subject expert for sanctioning new courses and faculty recruitments.",
      },
      {
        name: "Ankur Sharma",
        role: "Data Science Architect and Quant Consultant, Tata Consultancy Services | Industry Expert",
        image: "/tcsMentors/Ankur_Sharma.jpg", // Assumes image is in public/tcs/
        description:
          "Ankur Sharma has 20+ years of experience working in BFSI, Utilities, Telecom and Retail. Currently, he is working as a Data Science Architect and Principal Quant at Tata Consultancy Services, Gandhinagar. During his tenure, he has worked in various roles in companies like ITC Limited and Bharti Airtel Limited and has provided consultancy to various fortune 500 companies. He is a certified Professional Scrum Master. He has earned his M.Tech degree in Data Analytics from BITS, Pilani and holds a Postgraduate Diploma in Enterprise Management from IIT Delhi and gained an Executive MBA degree from Karnatak University. He has earned his MBB (Advance and Applied Statistics) certification from Indian Institute of Statistics, Bangalore and Project Management professional certification from PMI, USA.",
      },
    ],
    careerOutlook: [
      "The demand for ML specialists will grow by 45% from 2025 to 2027.",
      "The most required Python libraries for ML engineers are TensorFlow, Keras, and scikit-learn.",
      "LinkedIn's “Jobs on the Rise” report highlights AI and ML as the top skills driving job growth, with a 75% increase in postings over the past four years. This trend shows no signs of slowing down, with experts predicting a 200% surge in ML job opportunities by 2030.",
      "According to the Future of Jobs Report 2024, “Demand for AI and machine learning specialists is expected to grow by 40%, or 1 million jobs, as the usage of AI and machine learning drives continued industry transformation.”.",
    ],
    jobRoles: ["Data Analyst", "Data Scientist", "DevOps Engineer"],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/statistics-using-r-python/",
    courseBanner: '/tcs/R-Python.png', // Assumes image is in public/tcs/
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
      title: "Specialisation in Statistics"
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
                {/* Displaying the first summary point in hero */}
                <p className="text-xl mb-6">{courseData.summary[0].split('.')[0]}.</p>
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
                    src="https://cdn.pixabay.com/photo/2016/11/05/08/15/analytics-1799648_640.png"
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
                <p className="text-gray-700">{courseData.prerequisites}</p>
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

export default StatisticsPage;