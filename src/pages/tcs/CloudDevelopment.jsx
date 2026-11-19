// src/pages/tcs/CloudComputingPage.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const CloudDevelopmentPage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "cloud-computing",
    title: "Applied Cloud Computing",
    degree: "B.Tech-AI/ML",
    semester: 7,
    summary: [
      "Cloud Computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user. The term is generally used to describe data centres available to many users over the internet. Large clouds, predominant today, often have functions distributed over multiple locations from central servers. If the connection to the user is relatively close, it may be designated as an edge server.",
      "Gartner forecasts worldwide public cloud end-user spending to total US$723 billion in 2025. Cloud use cases continue to expand with increasing focus on distributed, hybrid, cloud-native, and multicloud environments supported by a cross-cloud framework, making the public cloud services market achieve a 21.5% growth in 2025, with 90% of organisations predicted to adopt a hybrid cloud approach through 2027.",
      "Further, the Cloud Computing market is projected to grow to US$2,291.59 billion by 2032, exhibiting a CAGR of 16.5% during the forecast period (2024-2032), as per Fortune Business Insights.",
      " Applied Cloud Computing is a course which gives students an understanding of Cloud Computing and teaches them to store, manage, process, share and collaborate on data and information with high speed and accuracy. Cloud Computing is one of the latest technological changes from local servers to using the network of remote servers.",
    ],
    prerequisites:
      "Basic concepts of any DBMS software is required for this course.",
    syllabus: [
      {
        title: "Introduction to Cloud Computing",
        topics: [
          "Recent trends in computing: Grid, cluster, distributed, utility, and cloud computing",
          "Evolution of cloud computing",
          "Cloud computing (NIST Model): Introduction to cloud computing, history, CSPs",
          "Properties, characteristics, and disadvantages",
          "Benefits, risks, and challenges of cloud computing",
          "Cloud computing vs cluster computing vs grid computing",
          "Open standards",
        ],
      },
      {
        title: "Cloud Computing Architecture",
        topics: [
          "Cloud computing stack",
          "Services provided at various levels, types of cloud services - public, private, and hybrid",
          "Role of networks in cloud computing",
          "Service models (XaaS)",
          "Deployment models",
        ],
      },
      {
        title: "Infrastructure as a Service (IaaS)",
        topics: [
          "Infrastructure as a Service (IaaS)",
          "Resource virtualization",
          "Examples",
        ],
      },
      {
        title: "Platform as a Service (PaaS)",
        topics: [
          "Introduction to PaaS",
          "Cloud platform and management",
          "Examples",
        ],
      },
      {
        title: "Software as a Service (SaaS)",
        topics: [
          "Introduction to SaaS",
          "Web services",
          "Web 2.0",
          "Web OS",
          "API and API gateway",
          "Microservices",
          "Case Study on SaaS",
        ],
      },
      {
        title: "Service Management in Cloud Computing",
        topics: [
          "Service Level Agreements (SLAs)",
          "Billing and accounting",
          "Comparing scaling hardware",
          "Economics of scaling",
          "Managing data",
        ],
      },
      {
        title: "Cloud Security",
        topics: [
          "Infrastructure security",
          "Data security and storage",
          "Identity and access management",
          "Access control",
          "Trust, reputation, and risk",
          "Authentication in cloud computing",
        ],
      },
      {
        title: "Case Studies",
        topics: [
          "Kubernetes (K8s) - Amazon Web Services (AWS), Database Migration Service (DMS) - cloud extract, transform, load (ETL) ,Amazon SageMaker - platform to build, train, and deploy machine learning models quickly",
          "Cloud-based analytics database - Amazon Redshift, Snowflake, and Google BigQuery",
        ],
      },
    ],
    mentors: [
      {
        name: "Deval Bhavsar",
        role: "Cloud Automation and DevOps Consultant, Tata Consultancy Services | Industry Expert",
        image: "/tcsMentors/Deval.jpg", // Corrected path
        description:
          "In his 20 year career, Deval Bhavsar has worked on multi-million dollar cloud assessments and migration initiatives for major customers in the US, UK and Canada, including strategic initiatives like DevOps Modernization, DevSecOps Implementation and Cloud Migration of legacy systems.He has enabled CXOs to enhance organisational landscape for technology upgrades, cost optimisation and service desk optimisation with AI/ML offering of Cloud PaaS Services.With certifications from Microsoft and Google, he has handled different technology stacks and Cloud service providers including Microsoft Azure, AWS and Google Cloud in his work tenure.",
      }, 
      {
        name: "Dr. Tarachand Amgoth",
        role: "Assistant Professor, IIT Dhanbad | Academic Expert",
        image: "/tcsMentors/Tarachand.jpg", // Corrected path
        description:
          "Dr. Tarachand Amgoth has completed his B.Tech degree in Computer Science and Engineering from the Jawaharlal Nehru Technological University (JNTU) Hyderabad in 2002, M.Tech in Computer Science Engineering from the National Institute of Technology (NIT), Rourkela in 2006, and PhD from the Indian Institute of Technology (Indian School of Mines), Dhanbad in 2015. Presently, he is an Assistant Professor in the Department of Computer Science and Engineering, IIT (ISM), Dhanbad. His current research interests include Wireless Sensor Networks (WSNs), Cloud Computing, Fog/Edge Computing, Serverless Computing and Internet of Things (IoT). He has contributed more than 50 publications in reputed international journals and conferences. Currently, he is working on a project titled 'Interoperability Issues in Fog-Cloud Infrastructure for IoT Applications', sponsored by the Department of Science and Technology (DST), Science and Engineering Research Board (SERB), Government of India. He has published several journals on IoT and Cloud Computing. He has about 15 years of teaching experience and has taught courses on Internet of Things and Cloud Computing to B.Tech and M.Tech students.",
      },
    ],
    careerOutlook: [
      "The US Bureau of Labor Statistics (BLS) forecasts that Cloud Computing employment opportunities will grow by 15% in the 10 years between 2021 and 2031. This growth rate is considerably faster than the average for other occupations.",
      "The Cloud Computing market size is estimated at US$0.68 trillion in 2024, and is expected to reach US$1.44 trillion by 2029, growing at a CAGR of 16.40% during the forecast period (2024-2029).",
      "According to a Grand View Research report, the global Cloud Computing market was estimated at US$602.31 billion in 2023, with a CAGR of 21.2% from 2024 to 2030.",
    ],
    jobRoles: [
      "Cloud Junior Developer",
      "Cloud Software Engineer",
      "Cloud Architect",
    ],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/cloud-computing/",
    courseBanner: '/tcs/cloudComputing.PNG', // Assumes image is in public/tcs/
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
      title: "Specialisation in Cloud Development "
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
                {/* Displaying the first paragraph of summary, as summary is an array */}
                <p className="text-xl mb-6">{courseData.summary[0]}</p>
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
                    src="https://cdn.pixabay.com/photo/2017/03/18/05/38/cloud-computing-2153286_640.png"
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
          {/* Changed grid to col-span-3 for main content */}
          <div className="grid md:grid-cols-3 gap-8">
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
                {/* Prerequisites is a string, not an array */}
                <p className="text-gray-700">{courseData.prerequisites}</p>
              </div>

              {/* Mentors - NEW LAYOUT */}
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
                    <ul className="space-y-3">
                      {courseData.careerOutlook.map((outlook, index) => (
                        <li key={index} className="text-gray-700 text-base">
                          <Check className="h-5 w-5 text-green-500 mr-2 inline-block align-top" />
                          {outlook}
                        </li>
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

export default CloudDevelopmentPage;