// src/pages/tcs/CryptographyPage.jsx

import React, { useState } from 'react';
import { BookOpen, Clock, User, BarChart2, Briefcase, ChevronRight, Award, BriefcaseBusiness, Globe, Check, X } from 'lucide-react';
import Layout from '../../components/Layout'; // Adjust path if your Layout component is elsewhere

const CryptographyPage = () => {
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const courseData = {
    id: "cryptography",
    title: "Cryptography - Practitioner's Perspective", // Derived title from previous pattern
    degree: "B.Tech-AI/ML", // Assumed
    semester: 6, // Assumed
    summary: [
      "Cryptography is the study of design and analysis of the methods used to secure information in the presence of adversaries. Cryptographic techniques are at the core of security in the cyber world. Failure to implement Cryptographic methods, or their incorrect implementation is one of the leading reasons for the vulnerabilities in web applications and security protocols.",
      "This course takes a look at the design and usage of various Cryptographic techniques used to solve practical security challenges. Students will have the ability to judge, use appropriate methods and correctly implement Cryptographic algorithms for achieving different security goals. Students will be able to take up technical/managerial roles in the software industry and the R&D sector in the area of Cryptography and Information Security.",
    ],
    prerequisites:
      "Basic Mathematics and knowledge of a programming language is useful for taking up this course.",
    syllabus: [
      {
        title: "Introduction",
        topics: [
          "Introduction and basic setting, different attack models (COA, CPA, CCA and more), Kerckhoff's law, Caesar's cipher, Substitution cipher, Brute force key search versus Cryptanalytic attacks, Caesar's cipher, Substitution cipher, Product ciphers",
          "Perfect security, Shannon's formalization, Indistinguishability-based definition of perfect security, Equivalence of different notions of perfect security, OTP, Weaknesses of perfect security",
        ],
      },
      {
        title: "Symmetric Key Encryption",
        topics: [
          "Computational security, Pseudo randomness and Stream ciphers, Stream project, Practical attacks on Stream ciphers (RC4, KeeLoq and more)",
          "PRF, PRP, Block ciphers, Iterated Block cipher design principle, Feistel construction, DES",
          "DES variants - 2DES, MITM, 3 DES, Linear and differential cryptanalysis, AES competition, AES design",
          "Block ciphers' modes of operations - ECB, CBC, CFB, OFB, Counter, and their error propagation characteristics",
        ],
      },
      {
        title: "Authentication and Integrity Protection",
        topics: [
          "Cryptographic hash functions, their security properties, design principle of MD Construction, MD4, MD4, SHA-0/1, SHA2 - and their current status, SHA3 competition and Keccak",
          "Message authentication code, Order of encryption and authentication, CBC MAC and it's weaknesses, CMAC and HMAC",
          "Lightweight block ciphers, Format Preserving Encryption (NIST SP for FPE), AEAD schemes, (their application in Disk encryption), CAESAR competition",
        ],
      },
      {
        title: "Asymmetric Key Cryptography",
        topics: [
          "Key Exchange in public setting, Merkle’s Puzzles, Diffie-Hellman key exchange",
          "Required mathematical background: GCD, Inverting elements (in a Euclidean ring), Euler’s Totient function, Euler’s theorem, Chinese Remainder theorem, Quadratic reciprocity, Coin tossing on a telephone",
          "RSA encryption, Prime numbers, Primality testing, correctness of RSA, OAEP",
          "ElGamal encryption, Elliptic curves, ECC, digital signatures",
          "Post-quantum Cryptography and migration",
          "Digital certificates and PKI, certificate expiration and revocation, PKI implementation in practice",
        ],
      },
      {
        title: "Applications and Real-life Usage",
        topics: [
          "Applied Cryptography for Blockchain, resilience against double spending",
          "Introduction to privacy enhancing techniques, K-Anonymity, Homomorphic encryption, Secure multi-party computation, differential privacy",
          "Implementation pitfalls, software vulnerabilities due to the incorrect use of Cryptography in real-life applications",
        ],
      },
    ],
    mentors: [
      {
        name: "Dr. Somitra Sanadhya",
        role: "Professor in the Department of Computer Science and Engineering, Dean for Digital Transformation, and the Chief Information Security Officer at IIT Jodhpur | Academic Expert",
        image: "/tcsMentors/Somitra.PNG", // Corrected path and extension
        description:
          "Dr. Somitra Sanadhya is a professor in the Department of Computer Science and Engineering, Dean for Digital Transformation, and the Chief Information Security Officer at IIT Jodhpur. He completed his B.Tech. degree in Computer Science and Engineering from the Indian Institute of Technology (IIT), Kanpur, in 2000, and his M.S. and Ph.D. degrees in Electrical and Computer Engineering from the University of California, Santa Barbara, in 2002 and 2005, respectively. Before joining IIT Jodhpur, he worked as a Postdoctoral Researcher at the Technion – Israel Institute of Technology, Haifa, Israel. His research interests include Cryptography, network security, and secure computation.",
      },
      {
        name: "Dr. Rajan M A",
        role: "Senior Scientist, TCS Research and Innovation | Industry Expert",
        image: "/tcsMentors/Rajan1.PNG", // Corrected path and extension
        description:
          "Dr. Rajan M A is a senior scientist in the Cyber Security and Privacy Research area at TCS Research, Bangalore since 2010. He has 22+ years of experience in the area of Cryptography, Computer networks, and formal methods. Before joining TCS Research, he worked as a Senior Research Fellow at Nanyang Technological University, Singapore, and a Postdoctoral Fellow at the National University of Singapore. He completed his Ph.D. in Computer Science from the Chennai Mathematical Institute in 2010. His research interests include Cryptography, formal methods, and privacy-enhancing technologies. He has published over 30 research papers in international journals and conferences.",
      },
    ],
    careerOutlook: [
      "As per Fortune Business Insights, the global quantum Cryptography market size was valued at US$170.4 million in 2023. The market is projected to grow from US$213.8 million in 2024 to US$1,617.5 million by 2032, exhibiting a CAGR of 28.8% during the forecast period."
    ],
    jobRoles: [
      "Technical roles in software industry (Cryptography and Information Security)",
      "Managerial roles in software industry (Cryptography and Information Security)",
      "R&D roles in Cryptography and Information Security sector",
    ],
    courseurl: "https://www.tcsion.com/courses/industry-honour-course/cryptography/", // Placeholder
    courseBanner: 'https://cdn.pixabay.com/photo/2021/05/29/15/55/ethereum-6293700_640.jpg', // Placeholder, assuming you will add this image
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
      title: "Specialisation in Cryptography"
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

export default CryptographyPage;