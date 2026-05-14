import Layout from '../../components/Layout';
import { useState } from 'react';
import { GraduationCap, Trophy, Activity, Medal } from 'lucide-react';

const InstituteSportsScience = () => {
  const [filters, setFilters] = useState({
    all: true,
    ug: false,
    pg: false,
    diploma: false,
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
    name: "Saroj Institute of Sports Science and Research",
    description: "The Saroj Institute of Sports Science and Research is a premier institution dedicated to excellence in sports education, research, and athlete development. We offer scientifically-designed programs that blend theoretical knowledge with practical training, preparing students for careers in sports management, coaching, nutrition, and performance analysis.",
    programs: [
      {
        degree: "B.Sc in Sports Science",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Sports Physiology, Biomechanics, Sports Psychology",
        duration_in_yrs: 3,
        fees: { year1: 90000, year2: 90000, year3: 90000, total: 270000 }
      },
      {
        degree: "BS in Sports Management",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Sports Marketing, Event Management, Athlete Management",
        duration_in_yrs: 3,
        fees: { year1: 95000, year2: 95000, year3: 95000, total: 285000 }
      },
      {
        degree: "M.Sc in Sports Nutrition",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Diet Planning, Supplementation, Weight Management",
        duration_in_yrs: 2,
        fees: { year1: 110000, year2: 110000, total: 220000 }
      },
      {
        degree: "MS in Sports Analytics",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Performance Metrics, Data Visualization, Talent Scouting",
        duration_in_yrs: 2,
        fees: { year1: 120000, year2: 120000, total: 240000 }
      },
      {
        degree: "Diploma in Sports Coaching",
        mode: "Regular Mode",
        level: "diploma",
        specializations: "Technique Development, Tactical Training, Leadership",
        duration_in_yrs: 1,
        fees: { total: 85000 }
      },
      {
        degree: "BS in Sports Technology",
        mode: "Global Mode",
        level: "ug",
        specializations: "Wearable Tech, Performance Tracking, Equipment Design",
        duration_in_yrs: 3,
        fees: { year1: 140000, year2: 140000, year3: 140000, total: 420000 }
      },
      {
        degree: "MS in High Performance Coaching",
        mode: "Global Mode",
        level: "pg",
        specializations: "Elite Athlete Development, Periodization, Recovery Science",
        duration_in_yrs: 2,
        fees: { year1: 160000, year2: 160000, total: 320000 }
      },
      {
        degree: "Ph.D in Sports Science",
        mode: "Regular Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 125000, year2: 125000, year3: 125000, total: 375000 }
      }
    ],
    eligibility: {
      "B.Sc": {
        "educational_qualifications": "10+2 with Physics/Chemistry/Biology/Mathematics",
        "minimum_marks_requirement": "50% aggregate (45% for sports quota)",
        "selection_process": "Entrance test + Sports achievement evaluation"
      },
      "BS": {
        "educational_qualifications": "10+2 in any stream",
        "minimum_marks_requirement": "50% aggregate (45% for sports quota)",
        "selection_process": "Written test + Practical assessment"
      },
      "M.Sc": {
        "educational_qualifications": "Bachelor's degree in Sports Science/Physiology/Nutrition",
        "minimum_marks_requirement": "55% aggregate in graduation",
        "selection_process": "Entrance exam + Interview"
      },
      "MS": {
        "educational_qualifications": "Bachelor's degree in relevant field",
        "minimum_marks_requirement": "50% aggregate in graduation",
        "selection_process": "Case study analysis + Personal interview"
      },
      "Diploma": {
        "educational_qualifications": "10+2 or equivalent",
        "minimum_marks_requirement": "45% aggregate marks",
        "selection_process": "Direct admission with sports background preference"
      },
      "Ph.D": {
        "educational_qualifications": "Master's degree in Sports Science/related field",
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
            <Trophy className="mr-2" size={24} />
            {institute.name}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">{institute.description}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Activity className="mr-2" size={18} />
            Filter Sports Programs
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
                    <Medal className="mr-1" size={14} />
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
                  <a href="https://siu.in8.nopaperforms.com/" target="/blank" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
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

export default InstituteSportsScience;