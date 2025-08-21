import Layout from '../../components/Layout'; 
import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const InstituteFilmFashion = () => {
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
    name: "Saroj Institute of Film & Fashion",
    description: "The Saroj Institute of Film & Fashion is a creative hub offering cutting-edge programs in design, film-making, media, and performing arts. Our institute nurtures artistic talent with industry-focused training, state-of-the-art facilities, and experienced faculty from the entertainment and fashion industries.",
     programs: [
      {
        degree: "B.Design",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Fashion Design, Interior Design, Visual Communication Design, Animation & Game Design",
        duration_in_yrs: 4,
        fees: { year1: 100000, year2: 100000, year3: 100000, year4: 100000, total: 400000 }
      },
      {
        degree: "B.Sc",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Film Making, Script, Direction, Audiography, Script Writing, Cinematography",
        duration_in_yrs: 3,
        fees: { year1: 100000, year2: 100000, year3: 100000, total: 300000 }
      },
      {
        degree: "BA",
        mode: "Regular Mode",
        level: "ug",
        specializations: "Acting & Drama, Advertising, Journalism, PR Events",
        duration_in_yrs: 3,
        fees: { year1: 100000, year2: 100000, year3: 100000, total: 300000 }
      },
      {
        degree: "M.Design",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Fashion Design, Visual Communication Design, Animation & Game Design",
        duration_in_yrs: 2,
        fees: { year1: 100000, year2: 100000, total: 200000 }
      },
      {
        degree: "M.Sc",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Film Making, Script Writing, Cinematography",
        duration_in_yrs: 2,
        fees: { year1: 100000, year2: 100000, total: 200000 }
      },
      {
        degree: "MA",
        mode: "Regular Mode",
        level: "pg",
        specializations: "Acting & Drama, Advertising, Journalism, PR Events",
        duration_in_yrs: 2,
        fees: { year1: 100000, year2: 100000, total: 200000 }
      },
      {
        degree: "Diploma",
        mode: "Regular Mode",
        level: "diploma",
        specializations: "Film/Drama/Media",
        duration_in_yrs: 1,
        fees: { year1: 100000, total: 100000 }
      },
      {
        degree: "B.Design",
        mode: "Global Mode",
        level: "ug",
        specializations: "Fashion Design, Interior Design, Visual Communication Design, Animation & Game Design",
        duration_in_yrs: 4,
        fees: { year1: 150000, year2: 150000, year3: 150000, year4: 150000, total: 600000 }
      },
      {
        degree: "B.Sc",
        mode: "Global Mode",
        level: "ug",
        specializations: "Film Making, Script, Direction, Audiography, Script Writing, Cinematography",
        duration_in_yrs: 3,
        fees: { year1: 150000, year2: 150000, year3: 150000, total: 450000 }
      },
      {
        degree: "BA",
        mode: "Global Mode",
        level: "ug",
        specializations: "Acting & Drama, Advertising, Journalism, PR Events",
        duration_in_yrs: 3,
        fees: { year1: 150000, year2: 150000, year3: 150000, total: 450000 }
      },
      {
        degree: "M.Design",
        mode: "Global Mode",
        level: "pg",
        specializations: "Fashion Design, Visual Communication Design, Animation & Game Design",
        duration_in_yrs: 2,
        fees: { year1: 150000, year2: 150000, total: 300000 }
      },
      {
        degree: "M.Sc",
        mode: "Global Mode",
        level: "pg",
        specializations: "Film Making, Script Writing, Cinematography",
        duration_in_yrs: 2,
        fees: { year1: 150000, year2: 150000, total: 300000 }
      },
      {
        degree: "MA",
        mode: "Global Mode",
        level: "pg",
        specializations: "Acting & Drama, Advertising, Journalism, PR Events",
        duration_in_yrs: 2,
        fees: { year1: 150000, year2: 150000, total: 300000 }
      }
    ],
    eligibility: {
      "B.Design": {
        "educational_qualifications": "Applicants should have successfully completed their higher secondary education (12th grade) from a recognized board or institution.",
        "minimum_marks_requirement": "Candidates are required to have a minimum percentage of 50% in the Higher Secondary Examination."
      },
      "B.Sc": {
        "educational_qualifications": "Applicants should have successfully completed their higher secondary education (12th grade) from a recognized board or institution.",
        "minimum_marks_requirement": "Candidates are required to have a minimum percentage of 50% in the Higher Secondary Examination."
      },
      "BA": {
        "educational_qualifications": "Applicants should have successfully completed their higher secondary education (12th grade) from a recognized board or institution.",
        "minimum_marks_requirement": "Candidates are required to have a minimum percentage of 50% in the Higher Secondary Examination."
      },
      "M.Design": {
        "educational_qualifications": "Applicants should have completed a bachelor's degree or its equivalent in any discipline from a recognized university or institution.",
        "minimum_marks_requirement": "Candidates should have a minimum aggregate score of 50% in their Bachelor's degree."
      },
      "M.Sc": {
        "educational_qualifications": "Applicants should have completed a bachelor's degree or its equivalent in any discipline from a recognized university or institution.",
        "minimum_marks_requirement": "Candidates should have a minimum aggregate score of 50% in their Bachelor's degree."
      },
      "MA": {
        "educational_qualifications": "Applicants should have completed a bachelor's degree or its equivalent in any discipline from a recognized university or institution.",
        "minimum_marks_requirement": "Candidates should have a minimum aggregate score of 50% in their Bachelor's degree."
      },
      "Diploma": {
        "educational_qualifications": "Applicants should have successfully completed their higher secondary education (12th grade) from a recognized board or institution.",
        "minimum_marks_requirement": "Candidates are required to have a minimum percentage of 50% in the Higher Secondary Examination."
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
      (filters.diploma && program.level === "diploma")
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
            <GraduationCap className="mr-2" size={24} />
            {institute.name}
          </h1>
          <p className="text-gray-600">{institute.description}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <GraduationCap className="mr-2" size={18} />
            Filter Courses
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* ... (keep the same filter checkboxes as before) */}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <GraduationCap className="mr-2" size={18} />
                    {program.degree}
                  </h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {program.mode}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Specializations:</span> {program.specializations}
                </p>
                
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
                {institute.eligibility[program.degree.split(' ')[0]] && (
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
                          <p><span className="font-medium">Educational Qualifications:</span> {institute.eligibility[program.degree.split(' ')[0]].educational_qualifications}</p>
                          <p><span className="font-medium">Minimum Marks:</span> {institute.eligibility[program.degree.split(' ')[0]].minimum_marks_requirement}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

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

export default InstituteFilmFashion;