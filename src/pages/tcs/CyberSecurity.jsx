// src/pages/tcs/AdvancedCyberSecurityPage.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const CyberSecurityPage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "advanced-cyber-security",
    title: "Advanced Cyber Security - An Application Approach",
    degree: "B.Tech-AI/ML", // Assumed
    semester: 7, // Assumed
    summary: [
      "The Advanced Cyber Security - An Application Approach course deals with Cyber Security from an information security management perspective. The course includes application security, secure software development life cycle and emphasises on the need for implementing security in the Software Development Life Cycle (SDLC) phase. The course also covers IT strategy management, business continuity planning, planning defence mechanism against cyber attacks, information security standards, information security policy management, access control management and the objectives of security control."
    ],
    prerequisites:
      "The \"Cyber Security Fundamentals\" course is a prerequisite for taking up this course.",
    syllabus: [
      {
        title: "Application Security",
        topics: [
          "Importance of application security",
          "Open Web Application Security Project (OWASP) top 10 web application vulnerabilities",
          "Secure Software Development Life Cycle (SSDLC)",
        ],
      },
      {
        title: "Data and Endpoint Security",
        topics: [
          "Data security, data security controls",
          "Endpoint security, host/endpoint security",
        ],
      },
      {
        title: "Identity and Access Management (IAM)",
        topics: [
          "Authorization, authentication",
          "Access control, access control models",
          "Privilege levels, IAM lifecycle, identity and access management process and activities",
        ],
      },
      {
        title: "Phases of a Cyber Attack",
        topics: [
          "Reconnaissance: adversary identifies and selects a target",
          "Weaponize: adversary packages an exploit into a payload designed to execute on the targeted computer/network",
          "Deliver: adversary delivers the payload to the target system",
          "Exploit: adversary code is executed on the target system",
          "Install: adversary installs remote access software that provides a persistent presence within the target environment system",
          "Command and control: adversary employs remote access mechanisms to establish a command and control channel with the compromised device",
          "Act on objectives: adversary pursues intended objectives such as data exfiltration, lateral movement to other targets",
        ],
      },
      {
        title: "Security Processes in Practice for Businesses",
        topics: [
          "Key security business processes",
          "Corporate security governance",
          "IT strategy management",
          "Portfolio, program, project management",
          "Change management",
          "Supplier (third-party management)",
          "Problem management",
          "Knowledge management",
          "Information security management",
          "Business Continuity Planning (BCP)",
          "IT operations management",
          "Overview of top 20 security controls",
        ],
      },
      {
        title: "Information Security Standards",
        topics: [
          "Information security standards - need",
          "ISO/IEC 27000 standard series",
          "ISO/IEC 27001",
          "ISO/IEC 27002",
          "ISO/IEC 27005",
          "ISO/IEC 27006",
          "SP 800 standard series",
          "SP 800 -12",
          "Standard of Good Practice (SoGP)",
          "Control Objectives for Information and Related Technology (COBIT)",
          "BSI IT-Grundschutz baseline protection",
          "BSI Standard 100-1",
          "BSI Standard 100-2",
          "BSI Standard 100-3",
        ],
      },
    ],
    mentors: [
      {
        name: "Alok Tripathi",
        role: "HoD (Tech) & Chief Controller of Examination National Institute of Electronics & Information Technology (NIELIT), HQ New Delhi | Academic Expert",
        image: "/tcsMentors/Alok_tripathi.jpg", // Corrected relative path
        description:
          "Alok Tripathi has more than 25 years of teaching and research experience in the areas of Information Security. He teaches semester courses on Cryptography, Network Security, Penetration Testing, Operating System, Distributed Systems, Compiler Design, and Discrete Mathematics. He has authored a book on “Object-Oriented Programming with C++” and published a number of research papers in international journals and conferences. He has been involved in the design and development of various software projects for government and private organizations. He is also a consultant to various government organizations in the area of cyber security.",
      },
      {
        name: "Prince Komal Boonila",
        role: "Founder & Director Synergy Systems | Industry Expert",
        image: "/tcsMentors/Prince.PNG", // Corrected relative path and assumed .jpeg extension
        description:
          "Prince Komal Boonila authored the book \"System forensics\" back in the year 2009 which deals with the in-depth investigation of a standalone system. He is also the editor-in-chief of the only digital forensics magazine available in India. He is a Certified Ethical Hacker (CEH), Certified Hacking Forensic Investigator (CHFI), and a Certified Security Analyst (ECSA). He has conducted various training programs and workshops on cyber security and digital forensics for law enforcement agencies, corporate houses, and educational institutions across India. He has also been a speaker at various national and international conferences on cyber security.",
      },
    ],
    careerOutlook: [
      "As per Fortune Business Insights, the global Cyber Security market size was valued at US$172.24 billion in 2023. The market is projected to grow from US$193.73 billion in 2024 to US$562.72 billion by 2032, exhibiting a CAGR of 14.3% during the forecast period."
    ],
    jobRoles: ["Cyber Security Analyst", "Information Security Officer", "Security Consultant", "Penetration Tester", "Security Architect"], // Added example job roles as it was an empty array
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/cyber-security-advance/", // Placeholder
    courseBanner: 'https://cdn.pixabay.com/photo/2018/05/18/11/03/cyber-security-3410923_640.jpg', // Placeholder, assuming you will add this image
  };

  // Generic features (can be adapted if specific ones for this course are provided later)
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
      title: "Specialisation in Cyber Security"
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

export default CyberSecurityPage;