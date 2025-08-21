import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Briefcase,
  School,
  FlaskConical,
  Pill,
  Dumbbell,
  Film,
  ChevronRight,
  ArrowRight,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Globe,
  UserCheck,
  RotateCw,
  Hand,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProgramsSection = () => {
const programs = [
  {
    id: 1,
    title: "Artificial Intelligence & Technology",
    description:
      "Cutting-edge programs in AI, ML, Data Science, and Robotics",
    degrees: [
      {
        name: "B.Tech (AI, ML, Data Science, Robotics)",
        duration: "4 Years",
        fee: "₹1,10,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 with Physics, Chemistry, Mathematics",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
      {
        name: "B.Tech Computer Science & Engineering",
        duration: "4 Years",
        fee: "₹1,10,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 with Physics, Chemistry, Mathematics",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
      {
        name: "M.Tech (AI, ML, Data Science, Robotics)",
        duration: "2 Years",
        fee: "₹1,25,000/yr",
        mode: "Regular",
        criteria: [
          "B.Tech/B.E. in relevant field",
          "Minimum 50% marks",
          "Professional certifications may be considered",
        ],
      },
      {
        name: "M.Tech Computer Science & Engineering",
        duration: "2 Years",
        fee: "₹1,25,000/yr",
        mode: "Regular",
        criteria: [
          "B.Tech/B.E. in relevant field",
          "Minimum 50% marks",
          "Professional certifications may be considered",
        ],
      },
    ],
    icon: <Cpu className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-800",
    borderColor: "border-blue-200",
    bgColor: "from-blue-50 to-blue-100",
    buttonColor:
      "from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900",
  },
  {
    id: 2,
    title: "Management & Technology",
    description: "Programs blending technology with business management",
    degrees: [
      {
        name: "B.Tech (CSE, IT, Cyber Security, IoT)",
        duration: "4 Years",
        fee: "₹1,10,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 with Physics, Chemistry, Mathematics",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
      {
        name: "BCA (AI, ML, Cyber Security)",
        duration: "3 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 from recognized board",
          "Minimum 50% marks",
          "Basic computer knowledge preferred",
        ],
      },
      {
        name: "MCA (AI, ML, Cyber Security)",
        duration: "2 Years",
        fee: "₹1,20,000/yr",
        mode: "Regular",
        criteria: [
          "Bachelor's degree in any discipline",
          "Minimum 50% marks",
          "Mathematics in 10+2 preferred",
        ],
      },
      {
        name: "M.Tech (CSE, IT, Cyber Security, IoT)",
        duration: "2 Years",
        fee: "₹1,25,000/yr",
        mode: "Regular",
        criteria: [
          "B.Tech/B.E. in relevant field",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
    ],
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-800",
    borderColor: "border-purple-200",
    bgColor: "from-purple-50 to-purple-100",
    buttonColor:
      "from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900",
  },
  {
    id: 3,
    title: "Entrepreneurship & Business",
    description:
      "Programs designed for future business leaders and entrepreneurs",
    degrees: [
      {
        name: "BBA (General, Banking, Marketing)",
        duration: "3 Years",
        fee: "₹1,10,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 from recognized board",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
      {
        name: "BBA (Logistics, HR, IT, Entrepreneurship)",
        duration: "3 Years",
        fee: "₹1,10,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 from recognized board",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
      {
        name: "BBA (Insurance, Retail, Start-Ups)",
        duration: "3 Years",
        fee: "₹1,10,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 from recognized board",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
      {
        name: "MBA",
        duration: "2 Years",
        fee: "₹1,20,000/yr",
        mode: "Regular",
        criteria: [
          "Bachelor's degree in any discipline",
          "Minimum 50% marks",
          "Entrance exam scores may be required",
        ],
      },
    ],
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-green-100 text-green-800",
    borderColor: "border-green-200",
    bgColor: "from-green-50 to-green-100",
    buttonColor:
      "from-green-600 to-green-800 hover:from-green-700 hover:to-green-900",
  },
  {
    id: 4,
    title: "Humanities & Education",
    description: "Programs in arts, commerce, and education",
    degrees: [
      {
        name: "BA",
        duration: "3 Years",
        fee: "₹60,000/yr",
        mode: "Regular",
        criteria: ["10+2 from recognized board", "Minimum 50% marks"],
      },
      {
        name: "B.Com",
        duration: "3 Years",
        fee: "₹60,000/yr",
        mode: "Regular",
        criteria: ["10+2 from recognized board", "Minimum 50% marks"],
      },
      {
        name: "B.Ed",
        duration: "2 Years",
        fee: "₹60,000/yr",
        mode: "Regular",
        criteria: [
          "Bachelor's degree in any discipline",
          "Minimum 50% marks",
        ],
      },
      {
        name: "MA",
        duration: "2 Years",
        fee: "₹60,000/yr",
        mode: "Regular",
        criteria: [
          "Bachelor's degree in any discipline",
          "Minimum 50% marks",
        ],
      },
    ],
    icon: <School className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-800",
    borderColor: "border-yellow-200",
    bgColor: "from-yellow-50 to-yellow-100",
    buttonColor:
      "from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900",
  },
  {
    id: 5,
    title: "Basic & Health Sciences",
    description: "Programs in pure sciences and health-related fields",
    degrees: [
      {
        name: "B.Sc (Physics, Chemistry, Biology, Math)",
        duration: "3 Years",
        fee: "₹80,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 with relevant science subjects",
          "Minimum 50% marks",
        ],
      },
      {
        name: "BS (Data Science, Physiotherapy)",
        duration: "3 Years",
        fee: "₹80,000/yr",
        mode: "Regular",
        criteria: ["10+2 with relevant subjects", "Minimum 50% marks"],
      },
      {
        name: "M.Sc (Physics, Chemistry, Biology, Math)",
        duration: "2 Years",
        fee: "₹80,000/yr",
        mode: "Regular",
        criteria: ["B.Sc in relevant subject", "Minimum 50% marks"],
      },
      {
        name: "MS (Data Science, Physiotherapy)",
        duration: "2 Years",
        fee: "₹80,000/yr",
        mode: "Regular",
        criteria: [
          "Bachelor's degree in relevant field",
          "Minimum 50% marks",
        ],
      },
    ],
    icon: <FlaskConical className="w-5 h-5" />,
    color: "bg-red-100 text-red-800",
    borderColor: "border-red-200",
    bgColor: "from-red-50 to-red-100",
    buttonColor:
      "from-red-600 to-red-800 hover:from-red-700 hover:to-red-900",
  },
  {
    id: 6,
       title: "Pharmacy",
    description: "Programs in pharmaceutical sciences",
    degrees: [
      {
        name: "B.Pharm",
        duration: "4 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 with Physics, Chemistry, Biology/Mathematics",
          "Minimum 50% marks",
        ],
      },
      {
        name: "D.Pharm",
        duration: "2 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: [
          "10+2 with Physics, Chemistry, Biology/Mathematics",
          "Minimum 50% marks",
        ],
      },
      {
        name: "M.Pharm",
        duration: "2 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: ["B.Pharm degree", "Minimum 50% marks"],
      },
      {
        name: "Ph.D (Pharmacy)",
        duration: "3-5 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: ["M.Pharm or equivalent", "Minimum 55% marks"],
      },
    ],
    icon: <Pill className="w-5 h-5" />,
    color: "bg-indigo-100 text-indigo-800",
    borderColor: "border-indigo-200",
    bgColor: "from-indigo-50 to-indigo-100",
    buttonColor:
      "from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900",
  },
  {
    id: 7,
    title: "Sports Science",
    description: "Programs in sports science and research",
    degrees: [
      {
        name: "BS (Sports Science)",
        duration: "3 Years",
        fee: "₹90,000/yr",
        mode: "Regular",
        criteria: ["10+2 from recognized board", "Minimum 50% marks"],
      },
      {
        name: "MS (Sports Science)",
        duration: "2 Years",
        fee: "₹90,000/yr",
        mode: "Regular",
        criteria: [
          "Bachelor's degree in any discipline",
          "Minimum 50% marks",
        ],
      },
    ],
    icon: <Dumbbell className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-800",
    borderColor: "border-orange-200",
    bgColor: "from-orange-50 to-orange-100",
    buttonColor:
      "from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900",
  },
  {
    id: 8,
    title: "Film & Fashion",
    description: "Creative programs in film, fashion, and media",
    degrees: [
      {
        name: "B.Sc (Film Making, Cinematography)",
        duration: "3 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: ["10+2 from recognized board", "Minimum 50% marks"],
      },
      {
        name: "BA (Acting, Journalism, PR)",
        duration: "3 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: ["10+2 from recognized board", "Minimum 50% marks"],
      },
      {
        name: "Diploma (Film Making, Acting)",
        duration: "1 Year",
        fee: "₹1,00,000",
        mode: "Regular",
        criteria: ["10+2 from recognized board", "Minimum 50% marks"],
      },
      {
        name: "M.Sc (Film Making, Cinematography)",
        duration: "2 Years",
        fee: "₹1,00,000/yr",
        mode: "Regular",
        criteria: [
          "Bachelor's degree in any discipline",
          "Minimum 50% marks",
        ],
      },
    ],
    icon: <Film className="w-5 h-5" />,
    color: "bg-pink-100 text-pink-800",
    borderColor: "border-pink-200",
    bgColor: "from-pink-50 to-pink-100",
    buttonColor:
      "from-pink-600 to-pink-800 hover:from-pink-700 hover:to-pink-900",
  },
];


  const [activeTab, setActiveTab] = useState(programs[0].id);
  const [hoveredProgram, setHoveredProgram] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [expandedDegree, setExpandedDegree] = useState(null);

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      const interval = setInterval(() => {
        setActiveTab((prev) => {
          const currentIndex = programs.findIndex((p) => p.id === prev);
          const nextIndex = (currentIndex + 1) % programs.length;
          return programs[nextIndex].id;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, programs]);

  const currentProgram = programs.find((program) => program.id === activeTab);

  const toggleDegreeExpand = (index) => {
    setExpandedDegree(expandedDegree === index ? null : index);
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl text-left font-funneldisplay font-bold text-gray-900 mb-3">
            Our Academic Programs
          </h2>
          <p className="text-base md:text-lg font-funneldisplay text-left text-gray-600 max-w-4xl">
            Explore our diverse range of undergraduate, postgraduate, and
            doctoral programs designed to shape future leaders.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Program Categories - Left Side */}
          <div className="lg:w-1/3">
            <div
              className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
              onMouseEnter={() => setIsAutoRotating(false)}
              onMouseLeave={() => setIsAutoRotating(true)}
            >
              <span className="font-medium text-gray-700 flex items-center gap-2 text-sm">
                <Hand className="w-4 h-4" />
                Program Categories
              </span>
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  isAutoRotating
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isAutoRotating ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Auto
                  </>
                ) : (
                  "Manual"
                )}
              </button>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {programs.map((program) => (
                <motion.div
                  key={program.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => {
                      setActiveTab(program.id);
                      setIsAutoRotating(false);
                      setExpandedDegree(null);
                    }}
                    onMouseEnter={() => setHoveredProgram(program.id)}
                    onMouseLeave={() => setHoveredProgram(null)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 border
                      ${
                        activeTab === program.id
                          ? `${program.color} shadow-md border-transparent`
                          : `bg-white hover:bg-gray-50 ${program.borderColor}`
                      }
                      ${
                        hoveredProgram === program.id &&
                        hoveredProgram !== activeTab
                          ? "ring-2 ring-opacity-50 ring-gray-300"
                          : ""
                      }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activeTab === program.id
                          ? "bg-white text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {program.icon}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <span className="font-medium text-sm block truncate">
                        {program.title}
                      </span>
                      <span className="text-xs text-gray-500 line-clamp-1">
                        {program.description}
                      </span>
                    </div>
                    <span
                      className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                        activeTab === program.id
                          ? "bg-white text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {program.degrees.length} programs
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Explore All Programs Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/programs"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-sm"
              >
                Explore All Programs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Program Details - Right Side */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProgram.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-200"
              >
                <div
                  className={`p-5 ${currentProgram.color} flex items-start gap-4`}
                >
                  <div className="p-2 rounded-lg bg-white text-blue-700 shadow-sm">
                    {currentProgram.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {currentProgram.title}
                    </h3>
                    <p className="text-xs opacity-90 mt-1">
                      {currentProgram.description}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentProgram.degrees.map((degree, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        className={`border rounded-lg p-4 transition-all shadow-sm ${
                          expandedDegree === index
                            ? `bg-gradient-to-b ${currentProgram.bgColor} border-transparent shadow-md`
                            : "bg-white border-gray-200 hover:shadow-md"
                        }`}
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => toggleDegreeExpand(index)}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-semibold text-base mb-1 text-gray-800">
                              {degree.name}
                            </h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                degree.mode.includes("Global")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {degree.mode}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3 opacity-70" />
                              {degree.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 opacity-70" />
                              {degree.fee}
                            </span>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedDegree === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <h5 className="font-semibold text-xs flex items-center gap-2 mb-1 text-gray-700">
                                  <ClipboardList className="w-3 h-3" />
                                  Eligibility Criteria
                                </h5>
                                <ul className="space-y-1 text-xs text-gray-700">
                                  {degree.criteria.map((item, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-green-500 mt-0.5">
                                        ✓
                                      </span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://siu.in8.nopaperforms.com/"
                              >
                                <button
                                  className={`mt-3 w-full py-1.5 bg-gradient-to-r ${currentProgram.buttonColor} text-white rounded-md transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg font-medium text-sm`}
                                >
                                  Apply Now
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {expandedDegree !== index && (
                          <button
                            className="mt-2 w-full py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors flex items-center justify-center gap-1 text-xs font-medium"
                            onClick={() => toggleDegreeExpand(index)}
                          >
                            View Details
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      Admission Process Overview
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-700 flex items-center gap-2 text-sm">
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                            1
                          </span>
                          Regular Mode
                        </h5>
                        <ul className="space-y-2 text-xs text-gray-700">
                          <li className="flex items-start gap-2">
                            <div className="bg-blue-100 text-blue-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold">1</span>
                            </div>
                            <span>
                              Submit online application with required documents
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-blue-100 text-blue-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold">2</span>
                            </div>
                            <span>
                              Appear for entrance exam (if applicable)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-blue-100 text-blue-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold">3</span>
                            </div>
                            <span>
                              Attend personal interview/counseling session
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-700 flex items-center gap-2 text-sm">
                          <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                            2
                          </span>
                          Global Mode
                        </h5>
                        <ul className="space-y-2 text-xs text-gray-700">
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold">1</span>
                            </div>
                            <span>Complete regular admission process</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold">2</span>
                            </div>
                            <span>
                              Submit additional documents for international
                              study
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-green-100 text-green-800 rounded-full p-0.5 flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold">3</span>
                            </div>
                            <span>Complete visa and travel formalities</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <a
                        href="https://siu.in8.nopaperforms.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 px-4 py-2 bg-gradient-to-r ${currentProgram.buttonColor} text-white rounded-md transition-all flex items-center justify-center gap-1 shadow-md hover:shadow-lg font-medium text-sm`}
                      >
                        Start Application
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      {/* <button className="flex-1 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-md transition-all flex items-center justify-center gap-1 font-medium text-sm">
                        <Globe className="w-4 h-4" />
                        Global Mode Info
                      </button> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
