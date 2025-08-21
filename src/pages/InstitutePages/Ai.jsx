import Layout from '../../components/Layout';
import { useState } from 'react';
import { GraduationCap, Cpu, BrainCircuit, Bot, Binary, Network } from 'lucide-react';

const InstituteArtificialIntelligence = () => {
  const [filters, setFilters] = useState({
    all: true,
    ug: false,
    pg: false,
    diploma: false,
    certificate: false,
    regular: true,
    global: false
  });

  const [expandedCards, setExpandedCards] = useState({});

  const toggleCardExpand = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const institute = {
    name: "Saroj Institute of Artificial Intelligence",
    description: "The Saroj Institute of Artificial Intelligence is a cutting-edge institution dedicated to advancing AI education and research. We offer industry-aligned programs that combine theoretical foundations with hands-on experience in machine learning, deep learning, robotics, and cognitive computing, preparing students for leadership roles in the AI revolution.",
    programs: [
      {
        degree: "B.Tech (AI & Machine Learning)",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Computer Vision, Natural Language Processing, Robotics, Neural Networks",
        duration_in_yrs: 4,
        fees: { year1: 120000, year2: 120000, year3: 120000, year4: 120000, total: 480000 }
      },
      {
        degree: "M.Tech (Artificial Intelligence)",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Deep Learning, Reinforcement Learning, AI Ethics, Autonomous Systems",
        duration_in_yrs: 2,
        fees: { year1: 130000, year2: 130000, total: 260000 }
      },
      {
        degree: "BCA (AI & Data Science)",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Predictive Analytics, Big Data, AI Programming, Business Intelligence",
        duration_in_yrs: 3,
        fees: { year1: 95000, year2: 95000, year3: 95000, total: 285000 }
      },
      {
        degree: "MCA (AI Specialization)",
        mode: "Regular Mode",
        level: "pg",
        specializations: "AI Architecture, Cloud AI, Edge Computing, AI Security",
        duration_in_yrs: 2,
        fees: { year1: 110000, year2: 110000, total: 220000 }
      },
      {
        degree: "Diploma in AI Applications",
        mode: "Regular Mode",
        level: "diploma",
        specializations: "Chatbots, Computer Vision, AI for IoT, Smart Systems",
        duration_in_yrs: 1,
        fees: { total: 90000 }
      },
      {
        degree: "Certificate in Machine Learning",
        mode: "Regular Mode",
        level: "certificate",
        duration_in_yrs: 0.5,
        fees: { total: 45000 }
      },
      {
        degree: "B.Sc (Cognitive Science)",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Human-AI Interaction, Neural Science, Computational Psychology",
        duration_in_yrs: 3,
        fees: { year1: 85000, year2: 85000, year3: 85000, total: 255000 }
      },
      {
        degree: "M.Sc (AI & Robotics)",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Autonomous Systems, Humanoid Robotics, Swarm Intelligence",
        duration_in_yrs: 2,
        fees: { year1: 115000, year2: 115000, total: 230000 }
      },
      {
        degree: "Ph.D in Artificial Intelligence",
        mode: "Regular Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 140000, year2: 140000, year3: 140000, total: 420000 }
      },
      {
        degree: "B.Tech (Global AI Systems)",
        mode: "Global Mode",
        level: "ug",
        specializations: "International AI Standards, Global AI Policy, Multinational AI Systems",
        duration_in_yrs: 4,
        fees: { year1: 180000, year2: 180000, year3: 180000, year4: 180000, total: 720000 }
      },
      {
        degree: "M.Tech (Global AI Research)",
        mode: "Global Mode",
        level: "pg",
        specializations: "Cross-border AI Ethics, International AI Collaboration, Global AI Infrastructure",
        duration_in_yrs: 2,
        fees: { year1: 190000, year2: 190000, total: 380000 }
      }
    ],
    eligibility: {
      "B.Tech": {
        "educational_qualifications": "10+2 with Physics, Chemistry, Mathematics",
        "minimum_marks_requirement": "65% aggregate (60% for reserved categories)",
        "selection_process": "JEE Main score or University AI Aptitude Test"
      },
      "M.Tech": {
        "educational_qualifications": "B.Tech/B.E in CS/IT/ECE or M.Sc in Computer Science",
        "minimum_marks_requirement": "60% aggregate in graduation",
        "selection_process": "GATE score or University Entrance Test"
      },
      "BCA": {
        "educational_qualifications": "10+2 with Mathematics",
        "minimum_marks_requirement": "55% aggregate marks",
        "selection_process": "Mathematics Aptitude Test + Coding Assessment"
      },
      "MCA": {
        "educational_qualifications": "Bachelor's degree with Mathematics at 10+2 or graduation level",
        "minimum_marks_requirement": "55% aggregate in graduation",
        "selection_process": "NIMCET or University AI Entrance Test"
      },
      "Diploma": {
        "educational_qualifications": "10+2 in any stream",
        "minimum_marks_requirement": "50% aggregate marks",
        "selection_process": "Basic Programming Test + Interview"
      },
      "Certificate": {
        "educational_qualifications": "10+2 or equivalent",
        "minimum_marks_requirement": "No minimum requirement",
        "selection_process": "Direct admission"
      },
      "B.Sc": {
        "educational_qualifications": "10+2 with Science (Physics+Mathematics/Biology)",
        "minimum_marks_requirement": "55% aggregate marks",
        "selection_process": "Cognitive Ability Test"
      },
      "M.Sc": {
        "educational_qualifications": "B.Sc in Computer Science/Mathematics/Psychology",
        "minimum_marks_requirement": "55% aggregate in graduation",
        "selection_process": "Written Test + Technical Interview"
      },
      "Ph.D": {
        "educational_qualifications": "Master's degree in CS/AI/Mathematics/Cognitive Science",
        "minimum_marks_requirement": "60% aggregate in post-graduation",
        "selection_process": "Research Proposal + Technical Presentation"
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    
    if (name === 'all') {
      setFilters({
        all: checked,
        ug: checked,
        pg: checked,
        diploma: checked,
        certificate: checked,
        phd: checked,
        regular: checked,
        global: checked
      });
    } else {
      const newFilters = {
        ...filters,
        [name]: checked,
        all: false
      };
      setFilters(newFilters);
    }
  };

  const filteredPrograms = institute.programs.filter(program => {
    if (filters.all) return true;
    
    const levelMatch = (
      (filters.ug && program.level === "ug") ||
      (filters.pg && program.level === "pg") ||
      (filters.diploma && program.level === "diploma") ||
      (filters.certificate && program.level === "certificate") ||
      (filters.phd && program.level === "phd")
    );
    
    const modeMatch = (
      (filters.regular && program.mode === "Regular Mode") ||
      (filters.global && program.mode === "Global Mode")
    );
    
    return levelMatch && modeMatch;
  });

  const getProgramIcon = (degree) => {
    if (degree.includes("B.Tech") || degree.includes("M.Tech")) return <Cpu size={18} className="mr-2" />;
    if (degree.includes("BCA") || degree.includes("MCA")) return <Binary size={18} className="mr-2" />;
    if (degree.includes("B.Sc") || degree.includes("M.Sc")) return <BrainCircuit size={18} className="mr-2" />;
    if (degree.includes("Diploma")) return <Network size={18} className="mr-2" />;
    if (degree.includes("Certificate")) return <Bot size={18} className="mr-2" />;
    if (degree.includes("Ph.D")) return <BrainCircuit size={18} className="mr-2" />;
    return <GraduationCap size={18} className="mr-2" />;
  };

  return ( 
    <Layout> 
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <BrainCircuit className="mr-2" size={24} />
            {institute.name}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">{institute.description}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Cpu className="mr-2" size={18} />
            Filter AI Programs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="all"
                name="all"
                checked={filters.all}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="all" className="ml-2 text-sm text-gray-700">
                All Programs
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ug"
                name="ug"
                checked={filters.ug}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="ug" className="ml-2 text-sm text-gray-700">
                Undergraduate
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pg"
                name="pg"
                checked={filters.pg}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="pg" className="ml-2 text-sm text-gray-700">
                Postgraduate
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="diploma"
                name="diploma"
                checked={filters.diploma}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="diploma" className="ml-2 text-sm text-gray-700">
                Diploma
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="certificate"
                name="certificate"
                checked={filters.certificate}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="certificate" className="ml-2 text-sm text-gray-700">
                Certificate
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="phd"
                name="phd"
                checked={filters.phd}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="phd" className="ml-2 text-sm text-gray-700">
                Ph.D
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="regular"
                name="regular"
                checked={filters.regular}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="regular" className="ml-2 text-sm text-gray-700">
                Regular Mode
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="global"
                name="global"
                checked={filters.global}
                onChange={handleFilterChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="global" className="ml-2 text-sm text-gray-700">
                Global Mode
              </label>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    {getProgramIcon(program.degree)}
                    {program.degree}
                  </h3>
                  <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                    program.mode === "Global Mode" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {program.mode}
                  </span>
                </div>
                
                {program.specializations && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Specializations:</span> {program.specializations}
                  </p>
                )}
                
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Duration:</span> {program.duration_in_yrs} {program.duration_in_yrs === 0.5 ? "year (6 months)" : program.duration_in_yrs === 1 ? "year" : "years"}
                </p>

                {/* Fees Dropdown */}
                <div className="mb-4">
                  <button 
                    onClick={() => toggleCardExpand(`fees-${index}`)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Fee Structure
                    <svg 
                      className={`ml-1 h-4 w-4 transform ${expandedCards[`fees-${index}`] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCards[`fees-${index}`] && program.fees && (
                    <div className="mt-2 bg-gray-50 p-3 rounded">
                      <h4 className="text-md font-medium text-gray-700 mb-1">Fee Structure (INR):</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {Object.entries(program.fees).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className="capitalize">{key === "total" ? "Total Fees" : `Year ${key.slice(-1)}`}:</span>
                            <span>₹{value.toLocaleString('en-IN')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Eligibility Dropdown */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => toggleCardExpand(`eligibility-${index}`)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Eligibility Criteria
                    <svg 
                      className={`ml-1 h-4 w-4 transform ${expandedCards[`eligibility-${index}`] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCards[`eligibility-${index}`] && (
                    <div className="mt-2 bg-gray-50 p-3 rounded">
                      <h4 className="text-md font-medium text-gray-700 mb-2">Eligibility:</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p><span className="font-medium">Educational Qualifications:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Tech") ? "B.Tech" :
                            program.degree.includes("M.Tech") ? "M.Tech" :
                            program.degree.includes("BCA") ? "BCA" :
                            program.degree.includes("MCA") ? "MCA" :
                            program.degree.includes("Diploma") ? "Diploma" :
                            program.degree.includes("Certificate") ? "Certificate" :
                            program.degree.includes("B.Sc") ? "B.Sc" :
                            program.degree.includes("M.Sc") ? "M.Sc" : "Ph.D"
                          ].educational_qualifications
                        }</p>
                        <p><span className="font-medium">Minimum Marks:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Tech") ? "B.Tech" :
                            program.degree.includes("M.Tech") ? "M.Tech" :
                            program.degree.includes("BCA") ? "BCA" :
                            program.degree.includes("MCA") ? "MCA" :
                            program.degree.includes("Diploma") ? "Diploma" :
                            program.degree.includes("Certificate") ? "Certificate" :
                            program.degree.includes("B.Sc") ? "B.Sc" :
                            program.degree.includes("M.Sc") ? "M.Sc" : "Ph.D"
                          ].minimum_marks_requirement
                        }</p>
                        <p><span className="font-medium">Selection Process:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Tech") ? "B.Tech" :
                            program.degree.includes("M.Tech") ? "M.Tech" :
                            program.degree.includes("BCA") ? "BCA" :
                            program.degree.includes("MCA") ? "MCA" :
                            program.degree.includes("Diploma") ? "Diploma" :
                            program.degree.includes("Certificate") ? "Certificate" :
                            program.degree.includes("B.Sc") ? "B.Sc" :
                            program.degree.includes("M.Sc") ? "M.Sc" : "Ph.D"
                          ].selection_process
                        }</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="mt-6">
                  <a href="https://siu.in8.nopaperforms.com/" target="/blank" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default InstituteArtificialIntelligence;