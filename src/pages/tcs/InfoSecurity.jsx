// src/pages/tcs/InformationSecurityPage.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const InformationSecurityPage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "information-security",
    title: "Information Security - Practitioner's Perspective",
    degree: "B.Tech-AI/ML",
    semester: 6,
    summary: [
      "Information Security, a part of information risk management, is the practice of protecting information by mitigating information risks. It involves preventing or at least reducing the probability of unauthorised/inappropriate access, use, disclosure, disruption, deletion/destruction, corruption, modification, inspection, recording or devaluation of information. It may also involve reducing the adverse impacts of incidents. As per Business Research Insights, the global information security market size was US$66.80 billion in 2023 and the market is projected to touch US$97.94 billion by 2032 at a CAGR of 4.9% during the forecast period.",
      "Information Security - Practitioner's Perspective is a course in which students will learn and demonstrate their ability to identify computer and network security threats, classify the threats, and develop a security model to prevent, detect, and recover from attacks. They will also learn to encrypt and decrypt messages using block ciphers, sign and verify messages using well known signature generation. Verifying algorithms, analysing of existing authentication and key agreement protocols, and identifying their weaknesses are also a part of the course.",
    ],
    prerequisites:
      "Basic concepts of Information Systems, Computer Networks and Software Development is required for taking up this course.",
    syllabus: [
      {
        title: "Introduction to Basic Security Services",
        topics: [
          "Computer security concepts",
          "Confidentiality and integrity",
          "Security architecture for open systems",
          "Computer security trends",
        ],
      },
      {
        title: "Anatomy of an Attack",
        topics: [
          "Network mapping using ICMP (Internet Control Message Protocol) queries",
          "TCP (Transmission Control Protocol) pings",
          "TCP and UDP (User Datagram Protocol) port scanning",
          "FTP (File Transfer Protocol) bounce scanning",
          "Vulnerability scanning",
          "System and network penetration, denial-of-service - defense and response",
        ],
      },
      {
        title: "Protocols Attacks and Defence Mechanisms",
        topics: ["Network layer", "Transport layer", "Application layer"],
      },
      {
        title: "Malicious Software",
        topics: [
          "Types of malicious software (malware)",
          "Propagation - infected content, viruses, vulnerability exploit, worms and Propagation social engineering - spam email, Trojans",
          "Payload system corruption, attack agent - zombie, bots, Information theft - keyloggers, phishing, spyware, Stealth - backdoors, rootkits",
        ],
      },
      {
        title: "Cryptographic Tools",
        topics: ["Sub-Module 1, 2, 3, 4, and 5"],
      },
      {
        title: "Topics in Security",
        topics: [
          "Security auditing - security auditing architecture, security audit trail, implementation",
          "Legal and ethical aspects - cybercrime and computer crime, intellectual property, privacy, ethical issues",
        ],
      },
    ],
    mentors: [
      {
        name: "Ajit Menon",
        role: "Chief Security Officer, Tata Consultancy Services | Industry Expert",
        image: "/tcsMentors/Ajit_Menon.jpg", // Assumes image is in public/tcs/
        description:
          "Ajit Menon has been with TCS for nearly 20 years and is the Chief Security Officer, responsible for the strategy, design, deployment and governance of controls to safeguard TCS’ business interests. He is also responsible for ensuring the continuity of TCS’ business operations and customer service delivery. Under his leadership, TCS has become one of the first companies to be assessed under the ISO 27001:2013 standard.",
      },
      {
        name: "Alok Tripathi",
        role: "HoD (Tech) & Chief Controller of Examination National Institute of Electronics & Information Technology (NIELIT), HQ New Delhi | Academic Expert",
        image: "/tcsMentors/Alok_tripathi.jpg", // Assumes image is in public/tcs/
        description:
          "Alok Tripathi has more than 25 years of teaching and research experience in the areas of Information Security. He teaches semester courses on Cryptography, Network Security, Penetration Testing, Operating System Hardening, and Security Audit in NIELIT Patna. His research areas include Virtual Training Environment (VTE) for information security, and analysis and optimisation of secure fingerprinting codes for digital watermarking. He has published more than 20 research papers in reputed Journals and Conferences. He was nominated by the E-Security Division of Department of Electronics and Information Technology, Government of India, for attending expert-level trainings on information security, advance information security, and incident handling and cyber forensics at Software Engineering Institute - Carnegie Mellon University (CMU), Pittsburgh (USA).",
      },
    ],
    careerOutlook: [
      "The Information Security consulting market size is expected to see strong growth in the next few years. It will grow to US$36.66 billion in 2028 at a compound annual growth rate (CAGR) of 8.8%.",
      "The growth in the forecast period can be attributed to emerging technologies, growing use of cloud computing, digital transformation initiatives, increased remote work, demand for managed security services.",
    ],
    jobRoles: [
      "Information Security Analyst",
      "Information Security Executive",
      "Network Engineer",
    ],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/information-security/",
    courseBanner: "https://cdn.pixabay.com/photo/2018/03/17/11/32/computer-3233754_640.jpg", // Added a default banner image
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
      title: "Specialisation in Information Security"
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
                          <span className="mr-3 text-white font-semibold ">{index + 1}.</span>
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

export default InformationSecurityPage;