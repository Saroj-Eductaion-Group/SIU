import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen, Clock, IndianRupee, GraduationCap, Filter, X, Info, UserCheck, Bookmark, Calendar, Award, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursePage = ({ universityData = { university: '', institutes: [] } }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCourses, setExpandedCourses] = useState({});
  const [filters, setFilters] = useState({
    institute: [],
    mode: []
  });
  const [showFilters, setShowFilters] = useState(true);
  const [activeDegreeTab, setActiveDegreeTab] = useState('all');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  // Safely extract all filter options
  const allInstitutes = [...new Set(universityData.institutes?.map(i => i.name) || [])];
  const allModes = [...new Set(universityData.institutes?.flatMap(i => i.programs?.map(p => p.mode)) || [])];

  // Group degree types by category
  const degreeCategories = {
    all: 'All Degrees',
    btech: 'B.Tech',
    mtech: 'M.Tech',
    bca: 'BCA',
    mca: 'MCA',
    bsc: 'B.Sc',
    msc: 'M.Sc',
    bpharm: 'B.Pharm',
    mpharm: 'M.Pharm',
    phd: 'Ph.D',
    diploma: 'Diploma'
  };

  // Flatten all programs with institute info
  const allPrograms = universityData.institutes?.flatMap(institute => 
    institute.programs?.map(program => ({
      ...program,
      instituteName: institute.name,
      eligibility: institute.eligibility?.[program.degree] || {}
    })) || []
  ) || [];

  // Apply filters and search
  const filteredPrograms = allPrograms.filter(program => {
    if (!program) return false;
    
    const matchesSearch = 
      (program.degree?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (program.mode?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (
        program.specializations &&
        (
          (typeof program.specializations === 'string' && program.specializations.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (Array.isArray(program.specializations) && program.specializations.some(s => 
            typeof s === 'string' ? s.toLowerCase().includes(searchTerm.toLowerCase()) :
            JSON.stringify(s).toLowerCase().includes(searchTerm.toLowerCase())
          ))
        )
      ) ||
      (program.instituteName?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilters = 
      (filters.institute.length === 0 || filters.institute.includes(program.instituteName)) &&
      (filters.mode.length === 0 || filters.mode.includes(program.mode));
    
    return matchesSearch && matchesFilters;
  });

  // Filter by degree tab
  const filteredByDegree = filteredPrograms.filter(program => {
    if (activeDegreeTab === 'all') return true;
    if (!program?.degree) return false;

    const selectedDegree = degreeCategories[activeDegreeTab];
    return program.degree.toLowerCase().includes(selectedDegree.toLowerCase());
  });

  // Filter by category tab
  const tabGroups = {
    all: filteredByDegree,
    undergraduate: filteredByDegree.filter(p => p?.degree?.includes('B.') || p?.degree?.includes('Diploma')),
    postgraduate: filteredByDegree.filter(p => p?.degree?.includes('M.') || p?.degree?.includes('MS')),
    doctorate: filteredByDegree.filter(p => p?.degree?.includes('Ph.D') || p?.degree?.includes('Doctorate'))
  };

  const toggleCourse = (programId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [programId]: !prev[programId]
    }));
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const formatCurrency = (amount) => {
    if (!amount) return "Not Available";
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const renderSpecializations = (specializations) => {
    if (!specializations) return "Not specified";
    
    if (typeof specializations === 'string') {
      return specializations;
    }
    
    if (Array.isArray(specializations)) {
      return (
        <ul className="list-disc pl-5 space-y-1">
          {specializations.map((item, index) => (
            <li key={index}>
              {typeof item === 'object' ? (
                <>
                  <span className="font-medium">{item.name}:</span> {item.duration}
                </>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      );
    }
    
    return "Specializations information available";
  };

  const renderFees = (fees) => {
    if (!fees) return <span className="text-gray-500">Fee structure not available</span>;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(fees).map(([key, value]) => (
          key !== 'total' && (
            <div key={key} className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium capitalize text-gray-700">{key.replace('year', 'Year ')}</div>
              <div className="text-lg font-semibold text-blue-600">{formatCurrency(value)}</div>
            </div>
          )
        ))}
        <div className="sm:col-span-2 bg-blue-50 p-3 rounded-lg">
          <div className="font-bold text-gray-800">Total Program Fees</div>
          <div className="text-xl font-bold text-blue-700">{formatCurrency(fees.total)}</div>
        </div>
      </div>
    );
  };

  const renderEligibility = (eligibility) => {
    if (!eligibility || Object.keys(eligibility).length === 0) {
      return <div className="text-gray-500">Eligibility criteria not specified</div>;
    }

    return (
      <div className="space-y-4">
        {eligibility.educational_qualifications && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="flex items-center font-semibold text-blue-800 mb-2">
              <Bookmark className="mr-2 h-5 w-5" />
              Educational Qualifications
            </h4>
            <p className="text-gray-700">{eligibility.educational_qualifications}</p>
          </div>
        )}
        
        {eligibility.minimum_marks_requirement && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="flex items-center font-semibold text-green-800 mb-2">
              <Award className="mr-2 h-5 w-5" />
              Minimum Marks Requirement
            </h4>
            <p className="text-gray-700">{eligibility.minimum_marks_requirement}</p>
          </div>
        )}
        
        {eligibility.selection_process && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="flex items-center font-semibold text-purple-800 mb-2">
              <UserCheck className="mr-2 h-5 w-5" />
              Selection Process
            </h4>
            <p className="text-gray-700">{eligibility.selection_process}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {universityData.institutes?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">
              {universityData.university || 'University Programs'}
            </h1>
            <p className="text-xl text-gray-600">
              Explore {allPrograms.length} programs across {universityData.institutes.length} institutes
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search programs by name, specialization, or institute..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-600" />
                <span>Filters</span>
                {Object.values(filters).flat().length > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Object.values(filters).flat().length}
                  </span>
                )}
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <Layers className="h-5 w-5 mr-2 text-blue-600" />
                      Institute
                    </h3>
                    <div className="space-y-2">
                      {allInstitutes.map(institute => (
                        <label key={institute} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.institute.includes(institute)}
                            onChange={() => toggleFilter('institute', institute)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">{institute}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Program Mode
                    </h3>
                    <div className="space-y-2">
                      {allModes.map(mode => (
                        <label key={mode} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.mode.includes(mode)}
                            onChange={() => toggleFilter('mode', mode)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {Object.values(filters).flat().length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => setFilters({ institute: [], mode: [] })}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Degree Type Tabs */}
          <div className="mb-4 overflow-x-auto">
            <div className="inline-flex rounded-md shadow-sm">
              {Object.entries(degreeCategories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveDegreeTab(key)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${activeDegreeTab === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  } ${key === 'all' ? 'rounded-l-md' : ''} ${key === 'diploma' ? 'rounded-r-md' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{tabGroups[activeCategoryTab]?.length || 0}</span> of <span className="font-semibold">{allPrograms.length}</span> programs
            </div>
            
            <div className="flex overflow-x-auto pb-2 sm:pb-0">
              <div className="inline-flex rounded-md shadow-sm">
                {Object.entries({
                  all: 'All Programs',
                  undergraduate: 'Undergraduate',
                  postgraduate: 'Postgraduate',
                  doctorate: 'Doctorate'
                }).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategoryTab(key)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${activeCategoryTab === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                    } ${key === 'all' ? 'rounded-l-md' : ''} ${key === 'doctorate' ? 'rounded-r-md' : ''}`}
                  >
                    {label} ({tabGroups[key]?.length || 0})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Programs List */}
          <div className="space-y-4">
            {tabGroups[activeCategoryTab]?.length > 0 ? (
              tabGroups[activeCategoryTab].map((program, index) => {
                const programId = `${program.instituteName}-${program.degree}-${program.mode}-${index}`;
                const isExpanded = expandedCourses[programId];

                return (
                  <div key={programId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-blue-200 transition-all duration-200">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <GraduationCap className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-gray-800">
                                  {program.degree}
                                </h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  {program.mode}
                                </span>
                              </div>
                              
                              <p className="text-blue-600 font-medium">
                                {program.instituteName}
                              </p>
                              
                              <div className="mt-2">
                                <p className="text-gray-700">
                                  <span className="font-medium">Specializations:</span> 
                                  <div className="mt-1">
                                    {renderSpecializations(program.specializations)}
                                  </div>
                                </p>
                              </div>
                              
                              <div className="mt-3 flex flex-wrap gap-2">
                                <div className="flex items-center text-xs bg-gray-100 px-3 py-1.5 rounded-full">
                                  <Clock className="mr-1 h-3 w-3 text-blue-500" />
                                  {program.duration_in_yrs} year{program.duration_in_yrs > 1 ? 's' : ''}
                                </div>
                                <div className="flex items-center text-xs bg-gray-100 px-3 py-1.5 rounded-full">
                                  <IndianRupee className="mr-1 h-3 w-3 text-blue-500" />
                                  Total: {formatCurrency(program.fees?.total || 0)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                          <button
                            onClick={() => toggleCourse(programId)}
                            className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${
                              isExpanded
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="mr-1 h-4 w-4" />
                                Less Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-1 h-4 w-4" />
                                More Details
                              </>
                            )}
                          </button>
                          
                          <Link 
                          to="https://siu.in8.nopaperforms.com/"
                          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                            <Info className="mr-1 h-4 w-4" />
                            Apply Now
                          </Link>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                                Program Details
                              </h4>
                              {renderEligibility(program.eligibility)}
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <IndianRupee className="mr-2 h-5 w-5 text-blue-600" />
                                Fee Structure
                              </h4>
                              {renderFees(program.fees)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow border border-gray-200">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">No matching programs found</h3>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filters. You can search by program name, specialization, or institute.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ institute: [], mode: [] });
                    setActiveDegreeTab('all');
                    setActiveCategoryTab('all');
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800">No program data available</h2>
          <p className="mt-2 text-gray-600">Please check back later or contact the university</p>
        </div>
      )}
    </div>
  );
};

export default CoursePage;