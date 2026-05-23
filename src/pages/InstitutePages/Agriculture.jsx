import React, { useState, useEffect } from 'react';
import { FaSeedling, FaGraduationCap, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Layout from '../../components/Layout';
// --- Data for the courses ---
const allCourses = [
  {
    id: 1,
    level: 'Undergraduate',
    name: 'B.Sc (Agriculture Science)',
    specializations: ['Crop Science', 'Soil Health', 'Agribusiness', 'Horticulture'],
    duration: '4 years',
    fee: '₹60,000 per year',
    eligibility: '10+2 with Physics, Chemistry, and Biology (PCB) with a minimum of 50% marks.',
    mode: 'Regular Mode'
  },
  {
    id: 2,
    level: 'Postgraduate',
    name: 'M.Sc (Agriculture Science)',
    specializations: ['Agronomy', 'Plant Pathology', 'Sustainable Agriculture', 'AgTech'],
    duration: '2 years',
    fee: '₹60,000 per year',
    eligibility: 'B.Sc in Agriculture or related fields with a minimum of 55% marks.',
    mode: 'Regular Mode'
  },
  {
    id: 3,
    level: 'Ph.D',
    name: 'Ph.D (Agriculture Science)',
    specializations: ['Agricultural Biotechnology', 'Climate-Smart Agriculture', 'Food Security Research'],
    duration: '3 years',
    fee: '₹110,000 per year',
    eligibility: 'M.Sc in Agriculture or a related discipline with a strong research proposal.',
    mode: 'Regular Mode'
  }
];

// --- CourseCard Sub-component ---
const CourseCard = ({ course }) => {
  const [showFee, setShowFee] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col h-full">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-blue-600 text-2xl" />
          <h4 className="text-xl font-semibold text-gray-900">{course.name}</h4>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
          {course.mode}
        </span>
      </div>

      {/* Details */}
      <p className="text-sm text-gray-600 mb-3">
        <strong className="text-gray-800">Specializations:</strong> {course.specializations.join(', ')}
      </p>
      <p className="text-sm text-gray-600 mb-5">
        <strong className="text-gray-800">Duration:</strong> {course.duration}
      </p>

      {/* Expandable Sections */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Fee Structure */}
        <div>
          <button
            onClick={() => setShowFee(!showFee)}
            className="flex justify-between items-center w-full text-sm font-medium text-blue-600 hover:underline"
          >
            View Fee Structure
            {showFee ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {showFee && (
            <div className="text-sm p-3 bg-gray-50 rounded-md mt-2 border border-gray-200">
              <strong>Annual Fee:</strong> {course.fee}
            </div>
          )}
        </div>

        {/* Eligibility Criteria */}
        <div>
          <button
            onClick={() => setShowEligibility(!showEligibility)}
            className="flex justify-between items-center w-full text-sm font-medium text-blue-600 hover:underline"
          >
            View Eligibility Criteria
            {showEligibility ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {showEligibility && (
            <div className="text-sm p-3 bg-gray-50 rounded-md mt-2 border border-gray-200">
              {course.eligibility}
            </div>
          )}
        </div>
      </div>

      {/* Apply Button */}
     <div className="mt-6">
                  <a href="https://siu.in8.nopaperforms.com/" target="/blank" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                    Apply Now
                  </a>
                </div>
    </div>
  );
};

// --- Checkbox Helper Sub-component ---
const FilterCheckbox = ({ name, label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="rounded text-blue-600 focus:ring-blue-500"
    />
    {label}
  </label>
);

// --- Main InstituteAgriculture Component ---
function InstituteAgriculture() {
  const [levelFilters, setLevelFilters] = useState({
    all: true,
    undergraduate: false,
    postgraduate: false,
    diploma: false,
    certificate: false,
    phd: false,
  });

  const [modeFilters, setModeFilters] = useState({
    regular: true,
    global: false,
  });

  const [filteredCourses, setFilteredCourses] = useState([]);

  // Handle changes to level filters
  const handleLevelFilterChange = (e) => {
    const { name, checked } = e.target;
    let newFilters = { ...levelFilters, [name]: checked };

    if (name === 'all' && checked) {
      // If 'All' is checked, uncheck others
      Object.keys(newFilters).forEach(key => {
        if (key !== 'all') newFilters[key] = false;
      });
    } else if (name !== 'all' && checked) {
      // If another is checked, uncheck 'All'
      newFilters.all = false;
    } else if (name !== 'all' && !checked) {
      // If unchecking a filter, check if any others are left. If not, check 'All'.
      const anyOtherChecked = Object.keys(newFilters)
        .filter(k => k !== 'all')
        .some(k => newFilters[k]);
      if (!anyOtherChecked) {
        newFilters.all = true;
      }
    }
    setLevelFilters(newFilters);
  };

  // Handle changes to mode filters
  const handleModeFilterChange = (e) => {
    const { name, checked } = e.target;
    setModeFilters(prev => ({ ...prev, [name]: checked }));
  };

  // Update filtered courses when filters or data change
  useEffect(() => {
    let courses = [...allCourses];

    // 1. Filter by Level
    const anyLevelChecked = !levelFilters.all && (
      levelFilters.undergraduate ||
      levelFilters.postgraduate ||
      levelFilters.diploma ||
      levelFilters.certificate ||
      levelFilters.phd
    );

    if (anyLevelChecked) {
      courses = courses.filter(course =>
        (levelFilters.undergraduate && course.level === 'Undergraduate') ||
        (levelFilters.postgraduate && course.level === 'Postgraduate') ||
        (levelFilters.phd && course.level === 'Ph.D') ||
        (levelFilters.diploma && course.level === 'Diploma') ||
        (levelFilters.certificate && course.level === 'Certificate')
      );
    }

    // 2. Filter by Mode
    const anyModeChecked = modeFilters.regular || modeFilters.global;
    if (anyModeChecked) {
      courses = courses.filter(course =>
        (modeFilters.regular && course.mode === 'Regular Mode') ||
        (modeFilters.global && course.mode === 'Global Mode')
      );
    }

    setFilteredCourses(courses);
  }, [levelFilters, modeFilters]);

  return (
    <Layout>
    <div className="relative min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Social Media Sidebar */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 hidden md:flex flex-col gap-3 bg-white p-2 rounded-r-lg shadow-md border border-gray-200">
        <a href="#" className="text-gray-600 hover:text-pink-500 p-2"><FaInstagram size={20} /></a>
        <a href="#" className="text-gray-600 hover:text-blue-700 p-2"><FaLinkedin size={20} /></a>
        <a href="#" className="text-gray-600 hover:text-blue-600 p-2"><FaFacebook size={20} /></a>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaSeedling className="text-4xl" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Saroj Institute of Agriculture Science
            </h1>
          </div>
          <p className="max-w-3xl mx-auto text-gray-600">
            A cutting-edge institution dedicated to advancing agricultural education and research. We offer industry-aligned programs that combine theoretical foundations with hands-on experience in crop science, soil health, agribusiness, and sustainable farming.
          </p>
        </header>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 my-8 border border-gray-200">
          <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800">
            <FiFilter />
            Filter Agriculture Programs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            <FilterCheckbox name="all" label="All Programs" checked={levelFilters.all} onChange={handleLevelFilterChange} />
            <FilterCheckbox name="undergraduate" label="Undergraduate" checked={levelFilters.undergraduate} onChange={handleLevelFilterChange} />
            <FilterCheckbox name="postgraduate" label="Postgraduate" checked={levelFilters.postgraduate} onChange={handleLevelFilterChange} />
            <FilterCheckbox name="diploma" label="Diploma" checked={levelFilters.diploma} onChange={handleLevelFilterChange} />
            <FilterCheckbox name="certificate" label="Certificate" checked={levelFilters.certificate} onChange={handleLevelFilterChange} />
            <FilterCheckbox name="phd" label="Ph.D" checked={levelFilters.phd} onChange={handleLevelFilterChange} />
            <FilterCheckbox name="regular" label="Regular Mode" checked={modeFilters.regular} onChange={handleModeFilterChange} />
            <FilterCheckbox name="global" label="Global Mode" checked={modeFilters.global} onChange={handleModeFilterChange} />
          </div>
        </div>

        {/* Course Cards Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">
              No programs match your selected filters.
            </p>
          )}
        </main>
      </div>
    </div>
    </Layout>
  );
}

export default InstituteAgriculture;