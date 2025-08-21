// src/pages/tcs/DesignThinkingPage.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react'; // Added X for close icon
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const DesignThinkingPage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "design-thinking",
    title: "Design Thinking - Practitioner's Perspective",
    degree: "B.Tech-AI/ML",
    semester: 1,
    summary: "The Design Thinking - Practitioner's Perspective course provides a foundation to aspiring students who want to understand design, innovation by design research and basics of design research that are essential for design consultancy and entrepreneurship. It explores how design thinking flows into iterative, back and forth stages to address the challenges and issues discovered, through a meticulous and empathetic inquiry with the user. The course familiarises students with design lifecycle, user studies, data collection, interpretation and data analysis methods along with creating design solutions, prototyping and evaluation methods and tools. Illustrated case studies, gamified user study techniques and the knowledge gained on sustainable and responsible design give students a broader understanding of the multidisciplinary subject.As per Business Research Insights Report, the Global Design Thinking Market is projected to touch US$14.9 billion by 2032 at CAGR 7.25% during the forecast period 2023-2032.The World Economic Forum ranks problem solving, critical thinking and creativity as the top three skills employees need in order to thrive in the workplace of the future.This course helps students build a foundation in the design thinking process, provides insights into the theories, contexts, principles and methods to understand user experience scenarios and issues. It helps students to systematically investigate, redefine and synthesise a given problem as an opportunity to design, to redefine and to build creative solutions. It also enables students to develop prototypes, evaluate and test solutions, create guidelines and recommendations.",
    prerequisites: "Basic knowledge of surfing the Internet and English language is required for taking up this course.",
    syllabus: [
      {
        title: "Welcome & Introduction to Course",
        topics: [
          "Onboarding process: Welcome and Course Resources",
          "What is Design Thinking: Introduction, Process, Modes",
          "It's importance in socio-economic context: WHY - Challenges, Awareness and Impact",
          "Design thinking broader businees picture: Broader aspects and impact, Multiple points of Interactions",
          "The Product Form and the content",
          "Module summary: recap, assessment/assignment",
        ],
      },
      {
        title: "Business Hypothesis Mapping: Need Analysis",
        topics: [
          "Business Goals, Design Vision & Stakeholder Mapping",
          "What is Hypothesis: Business Context and Market Analysis",
          "Archetype Creation: Persona and Customer Journey Mapping Questionnaire",
          "Market Research vs. Design Research",
          "Types of Research, Research Scenario (Business Hypothesis Mapping)",
          "Module Summary: Recap, Assessment/Assignment",
        ],
      },
      {
        title: "User Study: Data Collection & Analysis",
        topics: [
          "Field Observation and Interview Techniques",
          "Gamified User Study Techniques",
          "Data Analysis Tools",
          "Data Interpretation and Insights Generation",
          "Module Summary: Recap, Assessment/Assignment",
        ],
      },
      {
        title: "Design Solution: Ideation, Prototyping & Evaluation",
        topics: [
          "Problem Statement Refinement and HMW (How Might We) Questions",
          "Brainstorming and Ideation Techniques",
          "Prototyping Tools and Methods",
          "Usability Testing and Evaluation",
          "Module Summary: Recap, Assessment/Assignment",
        ],
      },
      {
        title: "Responsible Design & Communication",
        topics: [
          "Sustainable Design Principles",
          "Ethical Considerations in Design",
          "Design Communication and Presentation Skills",
          "Module Summary: Recap, Assessment/Assignment",
        ],
      },
    ],
    mentors: [
      {
        name: "Dr. Susmita Sharma",
        role: "Design Consultant | Academic Expert",
        image: "/tcsMentors/Susmita.jpg", // Corrected path
        description: "Dr. Susmita Sharma holds a Doctorate from Industrial Design Centre (IDC) School of Design, IIT Bombay. Her PhD thesis deals with conducting and analysing eye tracking methodology to evaluate visual perception of users for design use. Her areas of expertise include Design Research, Design and Human Computer Interaction (HCI), User Studies, Visual Perception, Form Studies, Aesthetics and Art. As an independent Design Consultant and Researcher, she has chaired sessions, organised and conducted courses/workshops at international conferences and design institutions on User Perception and Design Thinking. She uses a mixed bag of research methods for Creative Thinking, Industrial Design, User Experience Design and Information Design. Her unique blend of expertise brings forth a multidisciplinary approach to problem solving. She has published several research papers and given invited talks at various conferences and institutions. Previously, she worked at Tata Interactive Systems (TIS) as a Senior Specialist in Graphic Design; and had also been a visiting educator at various design and art schools. Currently, she is working on projects that focus on technology use for social impact, mentoring startups and academia.",
      },
      {
        name: "Karmjitsinh Bihola",
        role: "Founder, Innodesk Designovation Services | Industry Expert",
        image: "/tcsMentors/Bihola.jpg", // Corrected path
        description: "Karmjitsinh Bihola is a Design Thinker at mindset and an Entrepreneur at heart, having a Master's degree in Mechanical Engineering with a specialisation in Product Design from Stevens Institute of Technology, New Jersey, USA. Mr. Bihola is working as an evangelist to develop, implement and spread the awareness about the concept of Design Thinking, Innovation & Entrepreneurship in higher education and corporate. He has mentored 2000+ aspiring entrepreneurs and innovators to identify market needs through customer engagements, creating and validating innovative ideas through Competitive Analysis, Product Development & Testing, Value Proposition and Business Models for creating successful start-ups in their journey from Mind to Market through his very innovative initiations like Innovation Jam (Technology + Design + Management), Design Wednesday, Design Weekend, Start-up Roundtables and more. He has worked as an Assistant Professor in PG Research Centre for Industrial Design (Open Design School) at Gujarat Technological University, Ahmedabad, Gujarat from October 2014 to February 2020. He has been training faculty members for Design Thinking from Basic to Advanced level and till date he has trained 4000+ faculty members of engineering through 54 Faculty Development Program (FDP) of four days each. Mr. Bihola is an expert in curriculum and workshop modules development based on contextual needs of the stakeholders. He has developed, organised and mentored 80+ workshops like Design Weekend for students, Design Clinic for Industry, Summer and Winter School, Hack-a-thons, Design Demo Day, Design and Innovation Bootcamp for Students/Start-ups/Faculty members/Industry individuals and Government officials. He was also nominated as a Mentor of Change (MoC) for Atal Tinkering Lab, an initiative of Atal Innovation Mission. His areas of research interest include building a strong Ecosystem between Academia, Industry and Government systems through Human-Centered Design (Design Thinking), Strategic Design, Innovation and Entrepreneurship along with Children Creativity, System Thinking, Biomimicry, Product Design & Development (R&D).",
      },
    ],
    careerOutlook: [
      "The Design Thinking is a non-linear, iterative process that enables teams to understand users, challenge assumptions, redefine problems, and create innovative solutions through prototyping and testing.",
      "As per Business Research Insights Report, the Global Design Thinking Market size is projected to touch US$14.9 billion by 2032 at a CAGR of 7.25% during the forecast period.",
      "The Design Thinking Market will grow during the forecast period based on the increasing need of companies and organisations to respond to the needs of various fields, including consumers.",
    ],
    jobRoles: [
      "Design Engineer",
      "Design Strategist",
      "Industrial Product Designer",
    ],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/design-thinking/",
    courseBanner: '/tcs/DesignThinking.PNG', // Using the specified banner image
  };

  // Features data for the icon section
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
      title: "Specialisation in Design Thinking"
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
                <p className="text-xl mb-6">{courseData.summary.split('. ')[0]}.</p> {/* Displaying first sentence of summary */}
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
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-400 rounded-lg opacity-20 animate-pulse delay-300"></div>
                  <img
                    src="https://images.pexels.com/photos/7120871/pexels-photo-7120871.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
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
            <div className="md:col-span-3"> {/* Changed to col-span-3 as everything is now in main content */}
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Course Details</h2>

              {/* Course Overview (No Dropdown) */}
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Course Overview</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-2">{courseData.summary}</p>
                </div>
              </div>

              {/* Syllabus (No Dropdown functionality for topics) */}
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

              {/* Prerequisites (No Dropdown) */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Prerequisites</h3>
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

              {/* Job Roles - MOVED HERE */}
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

export default DesignThinkingPage;