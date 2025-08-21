import Layout from '../../components/Layout';
import { useState } from 'react';
import { GraduationCap, FlaskConical, Microscope, HeartPulse } from 'lucide-react';

const InstituteBasicHealthSciences = () => {
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
    name: "Saroj Institute of Basic and Health Sciences",
    description: "The Saroj Institute of Basic and Health Sciences is a premier institution dedicated to advancing knowledge in fundamental sciences and healthcare disciplines. Our programs integrate rigorous academic training with hands-on practical experience, preparing students for careers in research, healthcare, and biomedical sciences.",
    programs: [
      {
        degree: "B.Sc (Basic Sciences)",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Physics, Chemistry, Mathematics, Biology",
        duration_in_yrs: 3,
        fees: { year1: 80000, year2: 80000, year3: 80000, total: 240000 }
      },
      {
        degree: "BS (Health Sciences)",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Physiotherapy, Radiology, Medical Lab Technology, Forensic Science",
        duration_in_yrs: 3,
        fees: { year1: 85000, year2: 85000, year3: 85000, total: 255000 }
      },
      {
        degree: "M.Sc (Basic Sciences)",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Advanced Physics, Organic Chemistry, Applied Mathematics, Molecular Biology",
        duration_in_yrs: 2,
        fees: { year1: 90000, year2: 90000, total: 180000 }
      },
      {
        degree: "MS (Health Sciences)",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Clinical Research, Medical Imaging, Advanced Pathology, Public Health",
        duration_in_yrs: 2,
        fees: { year1: 95000, year2: 95000, total: 190000 }
      },
      {
        degree: "Diploma in Medical Lab Technology",
        mode: "Regular Mode",
        level: "diploma",
        duration_in_yrs: 2,
        fees: { year1: 60000, year2: 60000, total: 120000 }
      },
      {
        degree: "B.Sc (Global Sciences)",
        mode: "Global Mode",
        level: "ug",
        specializations: "Biotechnology, Environmental Science, Data Science in Biology",
        duration_in_yrs: 3,
        fees: { year1: 125000, year2: 125000, year3: 125000, total: 375000 }
      },
      {
        degree: "BS (Global Health)",
        mode: "Global Mode",
        level: "ug",
        specializations: "International Public Health, Global Epidemiology, Health Informatics",
        duration_in_yrs: 3,
        fees: { year1: 130000, year2: 130000, year3: 130000, total: 390000 }
      },
      {
        degree: "Ph.D in Biological Sciences",
        mode: "Regular Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 100000, year2: 100000, year3: 100000, total: 300000 }
      },
      {
        degree: "Ph.D in Health Sciences",
        mode: "Regular Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 }
      }
    ],
    eligibility: {
      "B.Sc": {
        "educational_qualifications": "10+2 with Science (Physics, Chemistry, Biology/Mathematics)",
        "minimum_marks_requirement": "50% aggregate (45% for reserved categories)",
        "selection_process": "Merit-based admission"
      },
      "BS": {
        "educational_qualifications": "10+2 with Science (Physics, Chemistry, Biology)",
        "minimum_marks_requirement": "50% aggregate (45% for reserved categories)",
        "selection_process": "Entrance test + Interview"
      },
      "M.Sc": {
        "educational_qualifications": "B.Sc in relevant discipline",
        "minimum_marks_requirement": "55% aggregate in graduation",
        "selection_process": "Written test + Practical exam"
      },
      "MS": {
        "educational_qualifications": "Bachelor's degree in Health Sciences or related field",
        "minimum_marks_requirement": "50% aggregate in graduation",
        "selection_process": "Entrance exam + Interview"
      },
      "Diploma": {
        "educational_qualifications": "10+2 with Science",
        "minimum_marks_requirement": "45% aggregate marks",
        "selection_process": "Direct admission"
      },
      "Ph.D": {
        "educational_qualifications": "Master's degree in relevant field",
        "minimum_marks_requirement": "55% aggregate in post-graduation",
        "selection_process": "Research proposal + Interview"
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

  return ( 
    <Layout> 
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <FlaskConical className="mr-2" size={24} />
            {institute.name}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">{institute.description}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Microscope className="mr-2" size={18} />
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
                    <GraduationCap className="mr-2" size={18} />
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
                    <HeartPulse className="mr-1" size={14} />
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
                            program.degree.includes("B.Sc") ? "B.Sc" :
                            program.degree.includes("BS") ? "BS" :
                            program.degree.includes("M.Sc") ? "M.Sc" :
                            program.degree.includes("MS") ? "MS" :
                            program.degree.includes("Diploma") ? "Diploma" : "Ph.D"
                          ].educational_qualifications
                        }</p>
                        <p><span className="font-medium">Minimum Marks:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Sc") ? "B.Sc" :
                            program.degree.includes("BS") ? "BS" :
                            program.degree.includes("M.Sc") ? "M.Sc" :
                            program.degree.includes("MS") ? "MS" :
                            program.degree.includes("Diploma") ? "Diploma" : "Ph.D"
                          ].minimum_marks_requirement
                        }</p>
                        <p><span className="font-medium">Selection Process:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Sc") ? "B.Sc" :
                            program.degree.includes("BS") ? "BS" :
                            program.degree.includes("M.Sc") ? "M.Sc" :
                            program.degree.includes("MS") ? "MS" :
                            program.degree.includes("Diploma") ? "Diploma" : "Ph.D"
                          ].selection_process
                        }</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="mt-6">
                  <a href="https://siu.in8.nopaperforms.com/" target="/blank" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
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

export default InstituteBasicHealthSciences;