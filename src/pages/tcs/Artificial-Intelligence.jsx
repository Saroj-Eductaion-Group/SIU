import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react'; // Added X for close icon
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const ArtificialIntelligencePage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "artificial-intelligence",
    title: "Artificial Intelligence for Real World application",
    degree: "B.Tech-AI/ML",
    semester: 3,
    summary: [
      "Artificial Intelligence (AI) is an area of Computer Science that emphasises on the creation of intelligent machines which work and react like humans.",
      "According to a New IDC Spending Guide, the worldwide spending on Artificial Intelligence forecast to reach US$632 billion in 2028. As per PwC's Global Artificial Intelligence study, AI could contribute up to US$15.7 trillion to the global economy in 2030.",
      "Artificial Intelligence for Real-World Application (AI) as a course will prepare students to gain an edge. This course will help students understand Artificial Intelligence (AI), Machine Learning (ML), Deep Learning (DL), TensorFlow and Natural Language Processing (NLP). The course is offered in phygital mode which includes lectures, hands-on learning and industry inputs. The students will work on mini projects to gain real-world experience. Python 3.x and its associated packages will be used to implement the AI/ML concepts and algorithms.",
    ],
    prerequisites: [
      "Knowledge of Object-Oriented Programming System (OOPs)",
      "Basic knowledge of Sensors (optional)",
    ],
    syllabus: [
      {
        title: "Introduction to Artificial Intelligence (AI)",
        topics: [
          "History of AI",
          "Tools to be used for AI programming and its overview",
          "What is cognitive science and the problem of perception",
          "Applications of AI",
        ],
      },
      {
        title: "Search",
        topics: [
          "Intelligent agents, uninformed search",
          "Search Techniques 1 - search space, state space search",
          "Search Techniques 2 - heuristic search, and pattern-directed search",
          "Planning, control strategies and implementation, constraint satisfaction",
          "Problem solving by heuristic search, A* algorithm, AO* algorithm",
          "Adversarial search, game playing",
        ],
      },
      {
        title: "Reasoning",
        topics: [
          "Proposition and first-order logic",
          "Rule-based systems, semantic net, conceptual graph, inference and deduction",
          "Resolution refutation, answer extraction",
          "Reasoning under uncertainty - probabilistic reasoning, belief networks",
        ],
      },
      {
        title: "Machine Learning",
        topics: [
          "Basic concepts",
          "Linear models, perceptrons",
          "Introduction to supervised learning and k-nearest neighbors (KNN), decision trees",
          "Advanced models - support vector machine (SVM), ensemble classifiers",
          "Introduction to unsupervised learning and clustering methods",
        ],
      },
      {
        title: "Neural Network",
        topics: [
          "Introduction to neural networks",
          "Backpropagation",
          "Training neural nets using Keras",
          "Regularization, batch normalization, dropout",
        ],
      },
      {
        title: "Deep Learning",
        topics: [
          "Introduction to convolutional neural networks (CNN)",
          "Introduction to natural language processing (NLP) and toolkits",
        ],
      },
      {
        title: "Time Series Analysis",
        topics: [
          "Introduction to time series",
          "Stationary time series",
          "Smoothing time series",
          "Autocorrelation functions",
          "Autoregressive integrated moving average (ARIMA) models",
          "Signal transformations",
          "Deep learning and time series analysis",
        ],
      },
    ],
    mentors: [
      {
        name: "Dr. Manjira Sinha",
        role: "Senior Scientist,Tata Consultancy Services | Industry Expert",
        image: "/tcsMentors/Sinha.jpg", // Corrected path
        description:
          "Dr. Manjira Sinha serves as a senior scientist at TCS Research and Innovation, where she leverages her training as an Natural Language Processing (NLP) researcher to address various industry challenges related to text mining, as well as to explore research areas such as language comprehension and psycholinguistics. In addition to her research, she teaches courses on Machine Learning and Natural Language Processing and is deeply passionate about assistive and augmentative technologies. Her work spans both research and development in this field, and she also instructs a course aimed at raising awareness among young engineering students about disabilities, emphasising how their technical skills can be utilised to develop innovative assistive solutions.",
      },
      {
        name: "Dr. Sachin Tripathi",
        role: "Associate Professor, Department of Computer Science and Engineering, IIT Dhanbad | Academic Expert",
        image: "/tcsMentors/Tripathi.jpg", // Corrected path
        description:
          "Dr. Sachin Tripathi holds a B.Tech degree in CSE from Kanpur University, India. He completed his M.Tech and PhD in computer science and engineering from the esteemed Indian Institute of Technology (ISM), Dhanbad, India. Currently, he serves as an Associate Professor and also holds the position of Head of the Department of CSE Department at the Indian Institute of Technology (ISM), Dhanbad, India. With over eighteen years of experience in teaching computer science subjects, he specialises in Artificial Intelligence. Throughout his career, he has made significant contributions to the field of research and has authored more than 100 research papers, which have been published in prestigious journals like IEEE Transactions on Industrial Informatics, IEEE Transactions on Wireless Communications, IEEE Transactions on Instrumentation and Measurement, and Applied Soft Computing, among others. Additionally, he has authored a book titled 'Enhancements on Internet Applications: Multicast, Secure E-Mail Messaging, and E-Business'. He also holds the position of an Associate Editor at 'International Journal of Communication Systems,' published by Wiley. His research interests primarily revolve around Artificial Intelligence, Network security, ad-hoc and Sensor Networks.",
      },
    ],
    careerOutlook: [
      "The demand for AI specialists will grow by 40% from 2023 to 2027.",
      "LinkedIn's 'Jobs on the Rise' report highlights AI and ML as the top skills driving job growth, with a 75% increase in postings over the past four years. This trend shows no signs of slowing down, with experts predicting a 200% surge in AI-ML job opportunities by 2030.",
      "According to the Future of Jobs Report 2023, 'Demand for AI and ML specialists is expected to grow by 40%, or 1 million jobs, as the usage of AI and ML drives continued industry transformation'.",
    ],
    jobRoles: [
      "Artificial Intelligence Junior Developer",
      "Artificial Intelligence Assistant System Engineer",
    ],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/artificial-intelligence/",
    courseBanner: '/tcs/AI-FOR-REAL-WORLD.png', // Assumes image is in public/tcs/
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
      title: "Specialisation in Artificial Intelligence"
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
                    src="https://cdn.pixabay.com/photo/2022/04/04/16/41/technology-7111795_640.jpg"
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
                <div className="text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {courseData.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
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

export default ArtificialIntelligencePage;