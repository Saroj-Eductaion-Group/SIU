import Layout from '../../components/Layout';
import { useState } from 'react';
import { GraduationCap, FlaskConical, Pill } from 'lucide-react';

const InstitutePharmacy = () => {
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
    name: "Lucknow Institute of Pharmacy",
    description: "The Lucknow Institute of Pharmacy is a premier institution offering comprehensive pharmaceutical education and research programs. We provide cutting-edge training in drug discovery, formulation development, clinical pharmacy, and regulatory affairs, preparing students for rewarding careers in the pharmaceutical industry and healthcare sector.",
    programs: [
      {
        degree: "B.Pharm",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Pharmacology, Pharmaceutical Chemistry, Pharmaceutics, Pharmaceutical Analysis, Clinical Pharmacy, Pharmaceutical Biotechnology, Regulatory Affairs",
        duration_in_yrs: 4,
        fees: { year1: 100000, year2: 100000, year3: 100000, year4: 100000, total: 400000 }
      },
      {
        degree: "D.Pharm",
        mode: "Regular Mode",
        level: "diploma",
        specializations: "Pharmacology, Pharmaceutical Chemistry, Pharmaceutics, Pharmaceutical Analysis, Clinical Pharmacy, Pharmaceutical Biotechnology, Regulatory Affairs",
        duration_in_yrs: 2,
        fees: { year1: 90000, year2: 90000, total: 180000 }
      },
      {
        degree: "M.Pharm (Pharmacology)",
        mode: "Regular Mode",
        level: "pg",
        duration_in_yrs: 2,
        fees: { year1: 100000, year2: 100000, total: 200000 }
      },
      {
        degree: "M.Pharm (Medical Chemistry)",
        mode: "Regular Mode",
        level: "pg",
        duration_in_yrs: 2,
        fees: { year1: 90000, year2: 90000, total: 180000 }
      },
      {
        degree: "Ph.D",
        mode: "Regular Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 125000, year2: 125000, year3: 125000, total: 375000 }
      },
      {
        degree: "B.Pharm",
        mode: "Global Mode",
        level: "ug",
        specializations: "Pharmacology, Pharmaceutical Chemistry, Pharmaceutics, Pharmaceutical Analysis, Clinical Pharmacy, Pharmaceutical Biotechnology, Regulatory Affairs",
        duration_in_yrs: 4,
        fees: { year1: 150000, year2: 150000, year3: 150000, year4: 150000, total: 600000 }
      },
      {
        degree: "D.Pharm",
        mode: "Global Mode",
        level: "diploma",
        specializations: "Pharmacology, Pharmaceutical Chemistry, Pharmaceutics, Pharmaceutical Analysis, Clinical Pharmacy, Pharmaceutical Biotechnology, Regulatory Affairs",
        duration_in_yrs: 2,
        fees: { year1: 140000, year2: 140000, total: 280000 }
      },
      {
        degree: "M.Pharm (Pharmacology)",
        mode: "Global Mode",
        level: "pg",
        duration_in_yrs: 2,
        fees: { year1: 150000, year2: 150000, total: 300000 }
      },
      {
        degree: "M.Pharm (Medical Chemistry)",
        mode: "Global Mode",
        level: "pg",
        duration_in_yrs: 2,
        fees: { year1: 140000, year2: 140000, total: 280000 }
      },
      {
        degree: "Ph.D",
        mode: "Global Mode",
        level: "phd",
        duration_in_yrs: 3,
        fees: { year1: 200000, year2: 200000, year3: 200000, total: 600000 }
      }
    ],
    eligibility: {
      "B.Pharm": {
        "educational_qualifications": "10+2 with Physics, Chemistry, and Biology/Mathematics from a recognized board.",
        "minimum_marks_requirement": "Minimum 50% aggregate marks (45% for reserved categories)",
        "selection_process": "Based on entrance exam score followed by counseling"
      },
      "D.Pharm": {
        "educational_qualifications": "10+2 with Physics, Chemistry, and Biology/Mathematics from a recognized board.",
        "minimum_marks_requirement": "Minimum 50% aggregate marks (45% for reserved categories)",
        "selection_process": "Based on merit in qualifying examination"
      },
      "M.Pharm": {
        "educational_qualifications": "B.Pharm degree from a PCI approved institution with minimum required marks.",
        "minimum_marks_requirement": "Minimum 55% aggregate marks in B.Pharm",
        "selection_process": "Based on GPAT score or university entrance test"
      },
      "Ph.D": {
        "educational_qualifications": "Master's degree in Pharmacy or relevant field from recognized university.",
        "minimum_marks_requirement": "Minimum 55% aggregate marks in post-graduation",
        "selection_process": "Based on entrance test and interview"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <FlaskConical className="mr-2" size={24} />
            {institute.name}
          </h1>
          <p className="text-gray-600">{institute.description}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Pill className="mr-2" size={18} />
            Filter Pharmacy Programs
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
                  <span className="font-medium">Duration:</span> {program.duration_in_yrs} years
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
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').replace('year', 'Year ')}:</span>
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
                          institute.eligibility[program.degree.includes("M.Pharm") ? "M.Pharm" : 
                          program.degree.includes("B.Pharm") ? "B.Pharm" :
                          program.degree.includes("D.Pharm") ? "D.Pharm" : "Ph.D"
                        ].educational_qualifications}</p>
                        <p><span className="font-medium">Minimum Marks:</span> {
                          institute.eligibility[program.degree.includes("M.Pharm") ? "M.Pharm" : 
                          program.degree.includes("B.Pharm") ? "B.Pharm" :
                          program.degree.includes("D.Pharm") ? "D.Pharm" : "Ph.D"
                        ].minimum_marks_requirement}</p>
                        <p><span className="font-medium">Selection Process:</span> {
                          institute.eligibility[program.degree.includes("M.Pharm") ? "M.Pharm" : 
                          program.degree.includes("B.Pharm") ? "B.Pharm" :
                          program.degree.includes("D.Pharm") ? "D.Pharm" : "Ph.D"
                        ].selection_process}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="mt-6">
                  <a href="https://siu.in8.nopaperforms.com/" target="/blank" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
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

export default InstitutePharmacy;