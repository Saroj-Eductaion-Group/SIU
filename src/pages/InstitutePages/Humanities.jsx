import Layout from '../../components/Layout';
import { useState } from 'react';
import { GraduationCap, BookOpen, School, BookMarked } from 'lucide-react';

const InstituteHumanitiesEducation = () => {
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
    name: "Saroj Institute of Humanities and Education",
    description: "The Saroj Institute of Humanities and Education is dedicated to cultivating critical thinkers, educators, and scholars in the humanities. Our programs blend traditional wisdom with contemporary pedagogical approaches, preparing students to excel in education, research, and various humanities disciplines.",
    programs: [
      {
        degree: "BA (Humanities)",
        mode: "Regular Mode",
        level: "ug",
        specializations: "History, Philosophy, Literature, Cultural Studies",
        duration_in_yrs: 3,
        fees: { year1: 75000, year2: 75000, year3: 75000, total: 225000 }
      },
      {
        degree: "B.Ed",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Elementary Education, Special Education, Language Teaching",
        duration_in_yrs: 2,
        fees: { year1: 80000, year2: 80000, total: 160000 }
      },
      {
        degree: "MA (Education)",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Educational Leadership, Curriculum Design, Assessment Methods",
        duration_in_yrs: 2,
        fees: { year1: 85000, year2: 85000, total: 170000 }
      },
      {
        degree: "MA (Humanities)",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Comparative Literature, Modern History, Applied Philosophy",
        duration_in_yrs: 2,
        fees: { year1: 80000, year2: 80000, total: 160000 }
      },
      {
        degree: "Diploma in Early Childhood Education",
        mode: "Regular Mode",
        level: "diploma",
        duration_in_yrs: 1,
        fees: { total: 60000 }
      },
      {
        degree: "Certificate in Teaching Methods",
        mode: "Regular Mode",
        level: "certificate",
        duration_in_yrs: 0.5,
        fees: { total: 30000 }
      },
      {
        degree: "BA (Global Humanities)",
        mode: "Global Mode",
        level: "ug",
        specializations: "World History, International Relations, Global Literature",
        duration_in_yrs: 3,
        fees: { year1: 120000, year2: 120000, year3: 120000, total: 360000 }
      },
      {
        degree: "MA (International Education)",
        mode: "Global Mode",
        level: "pg",
        specializations: "Comparative Education, Global Pedagogy, Cross-Cultural Teaching",
        duration_in_yrs: 2,
        fees: { year1: 140000, year2: 140000, total: 280000 }
      },
      {
        degree: "Ph.D in Education",
        mode: "Regular Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 100000, year2: 100000, year3: 100000, total: 300000 }
      }
    ],
    eligibility: {
      "BA": {
        "educational_qualifications": "10+2 in any stream from recognized board",
        "minimum_marks_requirement": "50% aggregate (45% for reserved categories)",
        "selection_process": "Merit-based admission"
      },
      "B.Ed": {
        "educational_qualifications": "Bachelor's degree in any discipline",
        "minimum_marks_requirement": "50% aggregate in graduation",
        "selection_process": "Entrance exam + Interview"
      },
      "MA (Education)": {
        "educational_qualifications": "Bachelor's degree in Education or related field",
        "minimum_marks_requirement": "50% aggregate in graduation",
        "selection_process": "Written test + Teaching demonstration"
      },
      "MA (Humanities)": {
        "educational_qualifications": "Bachelor's degree in any discipline",
        "minimum_marks_requirement": "45% aggregate in graduation",
        "selection_process": "Statement of purpose + Interview"
      },
      "Diploma": {
        "educational_qualifications": "10+2 or equivalent",
        "minimum_marks_requirement": "45% aggregate marks",
        "selection_process": "Direct admission"
      },
      "Certificate": {
        "educational_qualifications": "10+2 or equivalent",
        "minimum_marks_requirement": "No minimum requirement",
        "selection_process": "Direct admission"
      },
      "Ph.D": {
        "educational_qualifications": "Master's degree in Education/Humanities or related field",
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

  return ( 
    <Layout> 
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <BookOpen className="mr-2" size={24} />
            {institute.name}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">{institute.description}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <School className="mr-2" size={18} />
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
                  <span className="font-medium">Duration:</span> {program.duration_in_yrs} {program.duration_in_yrs === 0.5 ? "year (6 months)" : program.duration_in_yrs === 1 ? "year" : "years"}
                </p>

                {/* Fees Dropdown */}
                <div className="mb-4">
                  <button 
                    onClick={() => toggleCardExpand(`fees-${index}`)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <BookMarked className="mr-1" size={14} />
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
                            program.degree.includes("B.Ed") ? "B.Ed" :
                            program.degree.includes("MA (Education)") ? "MA (Education)" :
                            program.degree.includes("MA (Humanities)") ? "MA (Humanities)" :
                            program.degree.includes("BA") ? "BA" :
                            program.degree.includes("Diploma") ? "Diploma" :
                            program.degree.includes("Certificate") ? "Certificate" : "Ph.D"
                          ].educational_qualifications
                        }</p>
                        <p><span className="font-medium">Minimum Marks:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Ed") ? "B.Ed" :
                            program.degree.includes("MA (Education)") ? "MA (Education)" :
                            program.degree.includes("MA (Humanities)") ? "MA (Humanities)" :
                            program.degree.includes("BA") ? "BA" :
                            program.degree.includes("Diploma") ? "Diploma" :
                            program.degree.includes("Certificate") ? "Certificate" : "Ph.D"
                          ].minimum_marks_requirement
                        }</p>
                        <p><span className="font-medium">Selection Process:</span> {
                          institute.eligibility[
                            program.degree.includes("B.Ed") ? "B.Ed" :
                            program.degree.includes("MA (Education)") ? "MA (Education)" :
                            program.degree.includes("MA (Humanities)") ? "MA (Humanities)" :
                            program.degree.includes("BA") ? "BA" :
                            program.degree.includes("Diploma") ? "Diploma" :
                            program.degree.includes("Certificate") ? "Certificate" : "Ph.D"
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

export default InstituteHumanitiesEducation;