// src/pages/tcs/InnovationEntrepreneurshipPage1.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const InnovationEntrepreneurshipPage1 = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "innovation-and-entrepreneurship1",
    title: "Innovation and Entrepreneurship",
    degree: "B.Tech-Data Science & Engineering",
    semester: 8,
    summary: [
      "By 2022, Innovation will be ranked #1 among the most important skills to be demanded by employers (Source: World Economic Forum, 2020). Knowledge for Innovation and Entrepreneurship are part of the essential 21st century skills and mindset that enables students to meet with future challenges and market competitions. Innovation and Entrepreneurship are not just words or events, it's an ongoing, iterative, non-linear process. In the era where knowledge is power, innovation and entrepreneurship are the drivers of growth - the key to build a strong economy and nation. Let us learn about these 21st century skills, mindset, and attitude to contribute towards building #Aatmanirbhar Bharat.",
      "Innovation and Entrepreneurship is a hands-on, action-oriented, practical-based learning course that will imbibe the required mindset, attitude and skills through enhancing creativity, curiosity, persistence and grit, problem solving, leadership, business acumen and more, among learners. The course involves a structured and thoughtful scientific process for innovation and creating a startup venture by identifying real market needs and business opportunities by validating ideas and converting them into actionable, marketable, impactful solutions. This course helps learners understand that the innovation process is not linear or step-by-step, but iterative, intuitive, non-linear, and need-based. 'Learning by Doing' approach is what students learn during this course which enables them with the common process that entrepreneurs take to build successful ventures.",
      "Hands-On",
      "A practical hands-on team-based project will be an integral part of this course while going through the learning modules, and students will have to apply real-world scenarios to understand the Innovation and Entrepreneurial journey.",
    ],
    prerequisites:
      "Basic knowledge of surfing the Internet and English language is required for taking up this course.",
    syllabus: [
      {
        title: "Why Innovation and Entrepreneurship",
        topics: [
          "Innovation and entrepreneurship are intertwined - WHY, WHAT, HOW",
          "Various terminologies used in innovation and entrepreneurship, types of entrepreneurships",
          "Effectuation - know yourself as an entrepreneur, traits of an entrepreneur, why start-ups fail",
        ],
      },
      {
        title: "Design Thinking - Problem and Opportunity Discovery",
        topics: [
          "Business goals and opportunity discovery, design research vs market research",
          "Selecting best research methods, research plan, fieldwork",
          "Research data prioritization/mapping - tools and techniques, Reframe challenge based on customer needs and hypothesis validation, design challenge summary",
        ],
      },
      {
        title: "Design Thinking - Solution Development",
        topics: [
          "Creativity, invention, innovation, various thinking approaches for enhancing creativity",
          "Creative personality, myths of creativity",
          "Types of innovation, innovation matrix, innovation management",
          "Ideation tools - brainstorming, mind map, SCAMPER, random entry",
          "Product architecture and prototyping - conceptualization, prioritizing ideas, product goals and profile, user experience goals, parameters, and weightage",
        ],
      },
      {
        title:
          "Intellectual Property Rights (IPR) and Legal Aspects, Company Structure, Human Resources (HR), Operational",
        topics: [
          "Intellectual property rights and understanding legal aspects for start-ups, Types of IPR and process for protecting IP",
          "Choosing the right legal structure, permits, registrations, and compliances",
          "Hiring a competent team, co-founder selection, and conflict management",
        ],
      },
      {
        title: "Value Proposition and Business Model",
        topics: [
          "Understanding value proposition canvas (VPC) and business model canvas (BMC), Pivoting solutions based on customer's jobs, pain, and gain points",
          "9 building blocks of BMC, Creating VPC and BMC",
          "One-page business plan, Bermuda Triangle",
        ],
      },
      {
        title: "Financial and Revenue Strategies",
        topics: [
          "Investment and funding ways",
          "Introduction to financial statements, cap table, due diligence, term sheet, equity, exit strategy, Profit and loss statement, balance sheet, cash flow, cost-volume-profit (CVP) and break-even analysis, and capital budgeting",
          "Understanding investor's mindset - do's and don'ts, when to approach investors",
        ],
      },
      {
        title: "Marketing and Sales Strategies",
        topics: [
          "Identifying the target market, total available market (TAM), serviceable available market (SAM), serviceable obtainable market (SOM)",
          "Branding, digital marketing, and social media strategies",
        ],
      },
      {
        title: "Pitch Deck",
        topics: [
          "Start-up pitch, components of a pitch, creating an effective presentation",
          "Go-to-market (GTM) strategy, do's and don'ts",
        ],
      },
    ],
    mentors: [
      {
        name: "Karmjitsinh Bihola",
        role: "Founder, Innodesk Designovation Services | Industry Expert",
        image: "/tcsMentors/Bihola.jpg", // Assumes image is in public/tcs/
        description:
          "Karmjitsinh Bihola is a Design Thinker at mindset and an Entrepreneur at heart, having a Master’s degree in Mechanical Engineering with a specialisation in Product Design from Stevens Institute of Technology, New Jersey, USA. Mr. Bihola is working as an evangelist to develop, implement and spread the awareness about the concept of Design Thinking, Innovation & Entrepreneurship in higher education and corporate. He has mentored 2000+ aspiring entrepreneurs and innovators to identify market needs through customer engagements, creating and validating innovative ideas through Competitive Analysis, Product Development & Testing, Value Proposition and Business Models for creating successful start-ups in their journey from Mind to Market through his very innovative initiations like Innovation Jam (Technology + Design + Management), Design Wednesday, Design Weekend, Start-up Roundtables and more. He has worked as an Assistant Professor in PG Research Centre for Industrial Design (Open Design School) at Gujarat Technological University, Ahmedabad, Gujarat from October 2014 to February 2020. He has been training faculty members for Design Thinking from Basic to Advanced level and till date he has trained 4000+ faculty members of engineering through 54 Faculty Development Program (FDP) of four days each. Mr. Bihola is an expert in curriculum and workshop modules development based on contextual needs of the stakeholders. He has developed, organised and mentored 80+ workshops like Design Weekend for students, Design Clinic for Industry, Summer and Winter School, Hack-a-thons, Design Demo Day, Design and Innovation Bootcamp for Students/Start-ups/Faculty members/Industry individuals and Government officials. He was also nominated as a Mentor of Change (MoC) for Atal Tinkering Lab, an initiative of Atal Innovation Mission. His areas of research interest include building a strong Ecosystem between Academia, Industry and Government systems through Human-Centered Design (Design Thinking), Strategic Design, Innovation and Entrepreneurship along with Children Creativity, System Thinking, Biomimicry, Product Design & Development (R&D).",
      },
      {
        name: "Dr. Prakash Apte",
        role: "Founder and President, APTennovate (ROBUST Innovation Training and Consultancy) | Academic Expert",
        image: "/tcsMentors/Apte.jpg", // Assumes image is in public/tcs/
        description:
          "Dr. Prakash Apte has 50+ years of industry and academic experience as a Scientist and Innovation Catalyst. He has held prestigious positions in esteemed institutions like Indian Institute of Technology Bombay (IIT Bombay) and Tata Institute of Fundamental Research (TIRF), Mumbai. Dr. Prakash has been credited with the Design and Fabrication of first Integrated Circuit TTL-7420 in India (1972) and MEMS sensor in India (1979).",
      },
    ],
    jobRoles: [
      "Entrepreneur",
      "Business Strategist",
      "Design and Innovation Manager",
      "Innovation Strategist",
      "Innovation and Business Consultant",
      "CIO (Chief Innovation Officer)",
      "Design Researcher",
    ],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/entrepreneurship-innovation/",
    courseBanner: 'https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg', // Assumes image is in public/tcs/
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
      title: "Specialisation in Innovation & Entrepreneurship"
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
                <p className="text-xl mb-6">{courseData.summary[0].split('. ')[0]}.</p> {/* Displaying first sentence of first summary point */}
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
                    src={courseData.courseBanner} // Using the provided course banner
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

              {/* Career Outlook - This page doesn't have careerOutlook data, so this section is omitted */}
              {/* If it were to be added, it would follow the structure from InformationSecurityPage */}

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

export default InnovationEntrepreneurshipPage1;