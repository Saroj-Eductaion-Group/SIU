import React, {useState, useEffect, useMemo } from 'react';  
import { Helmet } from 'react-helmet';  
import Layout from '../../components/Layout';  
import { Filter, Search,  Brain, Wrench, HeartPulse, Pill, Dumbbell, Film, BookOpen, Briefcase, // Imported domain-specific icons
  Scale } from 'lucide-react';

const SIUFeeStructure = () => {
  // Domain icon mappings for use in the table headers
  const domainIcons = {
    "Artificial Intelligence": Brain,
    "Engineering": Wrench,
    "Health Sciences": HeartPulse,
    "Pharmacy": Pill,
    "Sports Science & Research": Dumbbell,
    "Film & Fashion": Film,
    "Humanities & Education": BookOpen,
    "Entrepreneurship and Business": Briefcase,
    "Law": Scale,
  };

  // Original data for Regular Mode programmes, memoized for performance
  const originalInstitutes = useMemo(() => [
    {
      name: "Saroj Institute of Artificial Intelligence (SIAI)",
      domain: "Artificial Intelligence",
      programs: [
        { degree: "B.Tech", specializations: "Artificial Intelligence & Machine Learning, Data Science, Robotics, Computer Science & Engineering", fees: { year1: 110000, year2: 110000, year3: 110000, year4: 110000, total: 440000 } },
        { degree: "M.Tech", specializations: "Artificial Intelligence & Machine Learning, Data Science, Robotics, Computer Science & Engineering", fees: { year1: 125000, year2: 125000, total: 250000 } },
        { degree: "Ph.D", specializations: "Artificial Intelligence & Machine Learning, Data Science, Robotics, Computer Science & Engineering", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    },
    {
      name: "Saroj Institute of Management & Technology with AI Integration (SIMT)",
      domain: "Engineering",
      programs: [
        { degree: "Diploma Engg.", specializations: "All fields", fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 } },
        { degree: "B.Tech", specializations: "CSE, IT, Cyber Security, IOT, EC, ME, Civil, Mechatronics, Bio-Tech, Electrical Engg", fees: { year1: 110000, year2: 110000, year3: 110000, year4: 110000, total: 440000 } },
        { degree: "M.Tech", specializations: "CSE, IT, Cyber Security, IOT, EC, ME, Civil, Mechatronics, Bio-Tech, Electrical Engg", fees: { year1: 125000, year2: 125000, total: 250000 } },
        { degree: "BCA", specializations: "AI, ML, Cyber Security", fees: { year1: 100000, year2: 100000, year3: 100000, total: 300000 } },
        { degree: "MCA", specializations: "AI, ML, Cyber Security", fees: { year1: 120000, year2: 120000, total: 240000 } },
        { degree: "Ph.D", specializations: "Computer Science, Information Technology, Engineering, Management", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    },
    {
      name: "Saroj Institute of Entrepreneurship & Business (SIEBI)",
      domain: "Entrepreneurship and Business",
      programs: [
        { degree: "BBA", specializations: "General, Banking Finance, International Business, Marketing, Insurance, Digital Marketing, Logistics & SCM HR, IT, Entrepreneurship, Retail & Start-Ups", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } },
        { degree: "BBA Hons", specializations: "General, Banking Finance, International Business", fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 } },
        { degree: "MBA", specializations: "General Business Administration", fees: { year1: 120000, year2: 120000, total: 240000 } },
        { degree: "Ph.D", specializations: "All disciplines", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } },
        { degree: "B.Com", specializations: "Commerce", fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 } },
        { degree: "M.Com", specializations: "Commerce", fees: { year1: 60000, year2: 60000, total: 120000 } },
        { degree: "BA", specializations: "General", fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 } },
        { degree: "MA", specializations: "General", fees: { year1: 60000, year2: 60000, total: 120000 } }
      ]
    },
    {
      name: "Saroj Institute of Humanities & Education with AI Integration (SIHE)",
      domain: "Humanities & Education",
      programs: [
        { degree: "BA", specializations: "General, International Relations", fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 } },
        { degree: "MA", specializations: "General, International Relations", fees: { year1: 60000, year2: 60000, total: 120000 } }
      ]
    },
    {
      name: "Saroj Institute of Basic & Health Sciences with AI Integration (SIBHS)",
      domain: "Health Sciences",
      programs: [
        { degree: "B.Sc", specializations: "Physics, Chemistry, Biology, Mathematics", fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 } },
        { degree: "B.Sc", specializations: "Data Sciences, Physiotherapy, Forensic Science, Radiology & Imaging", fees: { year1: 60000, year2: 60000, year3: 60000, total: 180000 } },
        { degree: "Diploma", specializations: "Public Health", fees: { year1: 60000, total: 60000 } },
        { degree: "M.Sc", specializations: "Physics, Biology, Chemistry, Mathematics", fees: { year1: 80000, year2: 80000, total: 160000 } },
        { degree: "M.Sc", specializations: "Data Sciences, Physiotherapy, Forensic Science, Radiology & Imaging", fees: { year1: 80000, year2: 80000, total: 160000 } },
        { degree: "Ph.D", specializations: "Basic Sciences, Health Sciences, Data Analytics", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    },
    {
      name: "Lucknow Institute of Pharmacy",
      domain: "Pharmacy",
      programs: [
        { degree: "D.Pharm", specializations: "General Diploma in Pharmacy", fees: { year1: 100000, year2: 100000, total: 200000 } },
        { degree: "B.Pharm", specializations: "Pharmacology, Pharmaceutical Chemistry, Pharmaceutics, Pharmaceutical Analysis, Clinical Pharmacy, Pharmaceutical Biotechnology, Regulatory Affairs", fees: { year1: 100000, year2: 100000, year3: 100000, year4: 100000, total: 400000 } },
        { degree: "M.Pharm", specializations: "Pharmacology, Medical Chemistry", fees: { year1: 100000, year2: 100000, total: 200000 } },
        { degree: "Ph.D", specializations: "Pharmaceutical Sciences", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    },
    {
      name: "Saroj Institute of Law with AI Integration",
      domain: "Law",
      programs: [
        { degree: "BA LLB", specializations: "Corporate Law, Intellectual Property Law, Human Rights Law, Criminal Law, Constitutional Law, Environment Law, Cyber Law, International Trade Law", fees: { year1: 75000, year2: 75000, year3: 75000, year4: 75000, year5: 75000, total: 375000 } },
        { degree: "LLM", specializations: "Corporate Law, Intellectual Property Law, Human Rights Law, Criminal Law, Constitutional Law, Environment Law, Cyber Law, International Trade Law", fees: { year1: 75000, year2: 75000, total: 150000 } },
        { degree: "Ph.D", specializations: "Legal Studies", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    },
    {
      name: "Saroj Institute of Film & Fashion",
      domain: "Film & Fashion",
      programs: [
        { degree: "B.Design", specializations: "Fashion Design, Interior Design, Visual Communication Design, Animation & Game Design", fees: { year1: 100000, year2: 100000, year3: 100000, year4: 100000, total: 400000 } },
        { degree: "BFA", specializations: "Film Making", fees: { year1: 100000, year2: 100000, year3: 100000, total: 300000 } },
        { degree: "BFA", specializations: "Acting & Drama", fees: { year1: 100000, year2: 100000, year3: 100000, total: 300000 } },
        { degree: "M.Design", specializations: "Fashion Design, Visual Communication Design, Animation & Game Design", fees: { year1: 100000, year2: 100000, total: 200000 } },
        { degree: "MFA", specializations: "Film Making", fees: { year1: 100000, year2: 100000, total: 200000 } },
        { degree: "MFA", specializations: "Acting & Drama", fees: { year1: 100000, year2: 100000, total: 200000 } },
        { degree: "Diploma", specializations: "Film/Drama/Media", fees: { year1: 100000, total: 100000 } },
        { degree: "Ph.D", specializations: "Film Studies, Fashion Design, Media & Communication", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    },
    {
      name: "Saroj Institute of Agriculture Sciences with AI Integration",
      domain: "Agriculture",
      programs: [
        { degree: "B.Sc Agriculture (Hons)", specializations: "Agriculture", fees: { year1: 60000, year2: 60000, year3: 60000, year4: 60000, total: 240000 } },
        { degree: "M.Sc Agriculture (Hons)", specializations: "Agriculture", fees: { year1: 60000, year2: 60000, total: 120000 } },
        { degree: "Ph.D", specializations: "Agriculture", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    },
    {
      name: "Saroj Institute of Sport Science & Research with AI Integration",
      domain: "Sports Science & Research",
      programs: [
        { degree: "B.Sc", specializations: "Sports Management, Applied Sports Psychology, Sports Nutritionist, Sports Coaching & Fitness", fees: { year1: 90000, year2: 90000, year3: 90000, total: 270000 } },
        { degree: "M.Sc", specializations: "Sports Management, Applied Sports Psychology, Sports Nutritionist, Sports Coaching & Fitness", fees: { year1: 90000, year2: 90000, total: 180000 } },
        { degree: "Ph.D", specializations: "Sports Science, Sports Management, Sports Psychology", fees: { year1: 110000, year2: 110000, year3: 110000, total: 330000 } }
      ]
    }
  ], []);

  const originalGlobalInstitutes = useMemo(() => [], []);

  // State for search and filter controls
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');

  // Flattens and prepares all program data for filtering and searching
  const allPrograms = useMemo(() => {
    const regular = originalInstitutes.flatMap(institute =>
      institute.programs.map(program => ({
        ...program,
        mode: 'Regular',
        instituteName: institute.name,
        domain: institute.domain,
        searchableText: `${institute.name} ${institute.domain} ${program.degree} ${program.specializations}`.toLowerCase()
      }))
    );

    const global = originalGlobalInstitutes.flatMap(institute =>
      institute.programs.map(program => ({
        ...program,
        mode: "Global",
        instituteName: institute.name,
        domain: institute.domain,
        searchableText: `${institute.name} ${institute.domain} ${program.degree} ${program.specializations}`.toLowerCase()
      }))
    );
    return [...regular, ...global];
  }, [originalInstitutes, originalGlobalInstitutes]);

  // Gets a unique list of degrees for the filter dropdown
  const uniqueDegrees = useMemo(() => {
    const degrees = new Set(allPrograms.map(p => p.degree));
    return ['All', ...Array.from(degrees).sort()];
  }, [allPrograms]);

  // Gets a unique list of domains for the filter dropdown
  const uniqueDomains = useMemo(() => {
    const domains = new Set(allPrograms.map(p => p.domain));
    return ['All', ...Array.from(domains).sort()];
  }, [allPrograms]);

  // Filters programs based on current state of search and filters
  const filteredPrograms = useMemo(() => {
    let currentPrograms = allPrograms;

    if (selectedDegree !== 'All') {
      currentPrograms = currentPrograms.filter(program => program.degree === selectedDegree);
    }

    if (selectedDomain !== 'All') {
      currentPrograms = currentPrograms.filter(program => program.domain === selectedDomain);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentPrograms = currentPrograms.filter(program =>
        program.searchableText.includes(lowerCaseSearchTerm)
      );
    }

    return currentPrograms;
  }, [allPrograms, selectedDegree, selectedDomain, searchTerm]);

  // Groups the filtered programs by mode and institute for structured rendering
  const groupedFilteredPrograms = useMemo(() => {
    const grouped = {
      Regular: {},
      Global: {}
    };

    filteredPrograms.forEach(program => {
      if (!grouped[program.mode]) {
        grouped[program.mode] = {};
      }
      if (!grouped[program.mode][program.instituteName]) {
        grouped[program.mode][program.instituteName] = [];
      }
      grouped[program.mode][program.instituteName].push(program);
    });

    return grouped;
  }, [filteredPrograms]);

  const transformProgramsToTableData = (programs) => {
    return programs.map(program => {
      if (!program.fees) return [`${program.degree} (${program.specializations})`, "N/A"];
      const semesterFee = program.fees.year1 ? `₹${(program.fees.year1 / 2).toLocaleString('en-IN')}` : "N/A";
      return [`${program.degree} (${program.specializations})`, semesterFee];
    });
  };

  // Helper function to render a table for a given institute's programs
  const renderTable = (domainTitle, data) => {
    if (data.length === 0) {
      return null;
    }

    const IconComponent = domainIcons[data[0].domain];
    return (
      <div className="overflow-x-auto bg-gray-50 p-6 rounded-xl  border border-gray-200 shadow-sm flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          {IconComponent && <IconComponent className="mr-2 w-5 h-5 text-blue-600" />}
          {data[0].instituteName}
        </h3>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-900 to-blue-800 text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Programme</th>
              <th className="px-4 py-2 text-left">Fees per Semester</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transformProgramsToTableData(data).map(([course, tuition], i) => (
              <tr key={i} className='hover:bg-blue-100'>
                <td className="px-4 py-2 text-gray-900">{course}</td>
                <td className="px-4 py-2 text-gray-700 font-semibold">{tuition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4 flex flex-wrap gap-2'>
          <a href='https://siu.in8.nopaperforms.com/' target='_blank' rel='noopener noreferrer' className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-blue-700
          text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">Apply Now</a>
          <a href='/admissions/scholarship' target='_blank' rel='noopener noreferrer' className="bg-white border border-blue-600 text-blue-700 font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">Get Scholarship!</a>
        </div>
      </div>
    );
  };

  return (
    <Layout>

   
    <div className="font-sans antialiased text-gray-900 bg-gray-100">
      <div className="min-h-screen flex items-center py-20 justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300  max-w-7xl w-full">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className='flex items-center justify-center'>
                
              </div>
              <h2 className="text-2xl text-blue-600 mt-2 font-semibold">
                Fee Structure for Session 2026–2027
              </h2>
              <p className="text-gray-600 mt-2">
                Chandsarai, Sultanpur Road, Gosaiganj, Lucknow | Phone: 9513731275
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-8 p-3 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full md:w-1/4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Degree Filter */}
              <div className="relative w-full md:w-1/4">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                >
                  {uniqueDegrees.map(degree => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>



              {/* Domain Filter (New) */}
              <div className="relative w-full md:w-1/4">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                >
                  {uniqueDomains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 ">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Conditional rendering for no results */}
            {Object.keys(groupedFilteredPrograms.Regular).length === 0 &&
              Object.keys(groupedFilteredPrograms.Global).length === 0 && (
                <div className="text-center text-gray-600 text-lg py-10">
                  No programs found matching your criteria.
                </div>
              )}

            {/* Render Regular Mode Programmes if any exist */}
            {Object.keys(groupedFilteredPrograms.Regular).length > 0 && (
              <>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                  {Object.entries(groupedFilteredPrograms.Regular).map(([instituteName, programs], index) => (
                    <div key={`regular-filtered-${index}`}>
                      {renderTable(programs[0].domain, programs)}
                    </div>
                  ))}
                  </div>
                {/* </div> */}
              </>
            )}



            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100 shadow-md">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Note:</h4>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>All fees are in Indian Rupees (₹)</li>
                <li>Fees are subject to change as per university policies</li>
                <li>Additional charges may apply for specific programs</li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
     </Layout>
  );
};

export default SIUFeeStructure;

