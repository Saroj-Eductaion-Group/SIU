import Layout from '../../components/Layout';
import { useState } from 'react';
import { GraduationCap, Cpu, Rocket, Code, Server } from 'lucide-react';

const InstituteManagementTechnology = () => {
  const [filters, setFilters] = useState({
    all: true,
    ug: false,
    pg: false,
    diploma: false,
    phd: false,
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
    name: "Saroj Institute of Management and Technology",
    description: "The Saroj Institute of Management and Technology is a premier institution offering cutting-edge programs in engineering, computer applications, and management. With state-of-the-art labs, industry collaborations, and expert faculty, we prepare students for leadership roles in technology and business sectors.",
    programs: [
      {
        degree: "B.Tech",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Computer Science, Information Technology, Electronics, Mechanical, Civil, AI & ML",
        duration_in_yrs: 4,
        fees: { year1: 110000, year2: 110000, year3: 110000, year4: 110000, total: 440000 }
      },
      {
        degree: "MBA",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Finance, Marketing, HR, Operations, Business Analytics",
        duration_in_yrs: 2,
        fees: { year1: 125000, year2: 125000, total: 250000 }
      },
      {
        degree: "MCA",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Cloud Computing, Data Science, Cyber Security",
        duration_in_yrs: 2,
        fees: { year1: 100000, year2: 100000, total: 200000 }
      },
      {
        degree: "BCA",
        mode: "Regular Mode",
        level: "ug",
        specializations: "AI, Machine Learning, Blockchain",
        duration_in_yrs: 3,
        fees: { year1: 90000, year2: 90000, year3: 90000, total: 270000 }
      },
      {
        degree: "M.Tech",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Computer Science, Data Engineering, Robotics",
        duration_in_yrs: 2,
        fees: { year1: 120000, year2: 120000, total: 240000 }
      },
      {
        degree: "Diploma in Engineering",
        mode: "Regular Mode",
        level: "diploma",
        specializations: "Computer, Mechanical, Electrical, Civil",
        duration_in_yrs: 3,
        fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 }
      },
      {
        degree: "B.Tech (Global)",
        mode: "Global Mode",
        level: "ug",
        specializations: "IoT, Cyber Security, Cloud Technology",
        duration_in_yrs: 4,
        fees: { year1: 160000, year2: 160000, year3: 160000, year4: 160000, total: 640000 }
      },
      {
        degree: "MBA (Global)",
        mode: "Global Mode",
        level: "pg",
        specializations: "International Business, Digital Marketing, FinTech",
        duration_in_yrs: 2,
        fees: { year1: 150000, year2: 150000, total: 300000 }
      },
      {
        degree: "Ph.D in Computer Science",
        mode: "Regular Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 130000, year2: 130000, year3: 130000, total: 390000 }
      }
    ],
    eligibility: {
      "B.Tech": {
        "educational_qualifications": "10+2 with Physics, Chemistry, Mathematics",
        "minimum_marks_requirement": "60% aggregate (55% for reserved categories)",
        "selection_process": "JEE Main score or University Entrance Test"
      },
      "MBA": {
        "educational_qualifications": "Bachelor's degree in any discipline",
        "minimum_marks_requirement": "50% aggregate in graduation",
        "selection_process": "CAT/MAT/XAT score or University Entrance Test"
      },
      "MCA": {
        "educational_qualifications": "Bachelor's degree with Mathematics at 10+2 or graduation level",
        "minimum_marks_requirement": "50% aggregate in graduation",
        "selection_process": "NIMCET or University Entrance Test"
      },
      "BCA": {
        "educational_qualifications": "10+2 in any stream with Mathematics",
        "minimum_marks_requirement": "50% aggregate marks",
        "selection_process": "Merit-based admission"
      },
      "M.Tech": {
        "educational_qualifications": "B.Tech/B.E in relevant discipline",
        "minimum_marks_requirement": "60% aggregate in graduation",
        "selection_process": "GATE score or University Entrance Test"
      },
      "Diploma": {
        "educational_qualifications": "10th standard pass",
        "minimum_marks_requirement": "45% aggregate marks",
        "selection_process": "Merit-based admission"
      },
      "Ph.D": {
        "educational_qualifications": "Master's degree in relevant field",
        "minimum_marks_requirement": "55% aggregate in post-graduation",
        "selection_process": "Written Test + Interview"
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
    if (degree.includes("MBA")) return <Rocket size={18} className="mr-2" />;
    if (degree.includes("MCA") || degree.includes("BCA")) return <Code size={18} className="mr-2" />;
    if (degree.includes("Diploma")) return <Cpu size={18} className="mr-2" />;
    if (degree.includes("Ph.D")) return <Server size={18} className="mr-2" />;
    return <GraduationCap size={18} className="mr-2" />;
  };

  return ( 
    <Layout> 
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Cpu className="mr-2" size={24} />
            {institute.name}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">{institute.description}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Cpu className="mr-2" size={18} />
            Filter Programs
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
                  <span className="font-medium">Duration:</span> {program.duration_in_yrs} year{program.duration_in_yrs !== 1 ? 's' : ''}
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
                            program.degree.includes("MBA") ? "MBA" :
                            program.degree.includes("MCA") ? "MCA" :
                            program.degree.includes("BCA") ? "BCA" :
                            program.degree.includes("M.Tech") ? "M.Tech" :
                            program.degree.includes("Diploma") ? "Diploma" : "Ph.D"
                          ].educational_qualifications
                        }</p>
                        <p><span className="font-medium">Minimum Marks:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Tech") ? "B.Tech" :
                            program.degree.includes("MBA") ? "MBA" :
                            program.degree.includes("MCA") ? "MCA" :
                            program.degree.includes("BCA") ? "BCA" :
                            program.degree.includes("M.Tech") ? "M.Tech" :
                            program.degree.includes("Diploma") ? "Diploma" : "Ph.D"
                          ].minimum_marks_requirement
                        }</p>
                        <p><span className="font-medium">Selection Process:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Tech") ? "B.Tech" :
                            program.degree.includes("MBA") ? "MBA" :
                            program.degree.includes("MCA") ? "MCA" :
                            program.degree.includes("BCA") ? "BCA" :
                            program.degree.includes("M.Tech") ? "M.Tech" :
                            program.degree.includes("Diploma") ? "Diploma" : "Ph.D"
                          ].selection_process
                        }</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="mt-6">
                  <a href="https://siu.in8.nopaperforms.com/" target="/blank" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
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

export default InstituteManagementTechnology;