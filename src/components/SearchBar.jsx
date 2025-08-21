import React, { useState, useEffect } from 'react';

// The main application component
export default function SearchBar() {
  // A helper function to flatten the nested navItems structure into a simple array.
  // Flattening is important so that hidden/deeply nested pages are searchable. 
  const flattenNavItems = (navItems) => {
    const flattenedList = [];

    navItems.forEach(item => {
      // Add the main nav item itself to the list.
      if (item.path) {
        flattenedList.push({
          name: item.title,
          link: item.path,
          category: 'Main Menu',
        });
      }

      // Check for and add items from subItems (standard dropdown menus).
      if (item.subItems) {
        item.subItems.forEach(subItem => {
          flattenedList.push({
            name: subItem.title,
            link: subItem.path,
            category: item.title, // Use the parent title as the category.
          });
        });
      }

      // Check for and add items from mega-menu columns.
      if (item.megaMenu && item.columns) {
        item.columns.forEach(column => {
          column.items.forEach(megaItem => {
            flattenedList.push({
              name: megaItem.title,
              link: megaItem.path,
              category: column.heading, // Use the column heading as the category.
            });
          });
        });
      }
    });
    return flattenedList;
  };
  
  // The navItems data provided by the user.
  // Note: 'programsData' is a placeholder and would need to be defined.
  const navItems = [
    {
      title: "About",
      path: "/about",
      subItems: [
        { title: "About SIU", path: "/about/about-siu" },
        { title: "Boards", path: "/about/boards" },
        { title: "Deans", path: "/about/deans" },
        { title: "Recognition", path: "/about/recognition" },
        { title: "Annual Reports", path: "/annual-account" },
        { title: "Committees", path: "/about/committees" },
        {
          title: "Public Self Disclosure",
          path: "/about/public-self-disclosure",
        },
        { title: "Act and Statutes or MoA", path: "/about/approvals-documents" },
      ],
    },
    {
      title: "Administration",
      path: "/administration",
      subItems: [
        { title: "Chancellor", path: "/chancellor" },
        { title: "Finance Commitee", path: "/administration/finance-commitee" },
        {
          title: "Academic Council",
          path: "/administration/academic-council",
        },
        {
          title: "Executive Council",
          path: "/administration/executive-council",
        },
        {
          title: "Internal Complaint Committee",
          path: "/administration/internal-complaint",
        },
      ],
    },
    {
      title: "Programs",
      megaMenu: true,
      columns: [], // programsData.columns; placeholder for user to define
    },
    {
      title: "Academics",
      path: "/academics",
      megaMenu: true,
      columns: [
        {
          heading: "INSTITUTES",
          type: "institutes",
          items: [
            { title: "Saroj Institute of Artificial Intelligence (SIAI)", path: "/academics/Saroj-Institute-of-Artificial-Intelligence" },
            { title: "Saroj Institute of Management & Technology (SIMT)", approval: "AICTE Approved", path: "/academics/Saroj-Institute-of-Management-and-Technology" },
            { title: "Saroj Institute of Basic & Health Sciences (SIBHS)", path: "/academics/Saroj-Institute-of-Basic-and-Health-Sciences" },
            { title: "Saroj Institute of Humanities & Education (SiHE)", path: "/academics/Saroj-Institute-of-Humanities-and-Education" },
            { title: "Saroj Institute of Sports Sciences & Research (SISSR)", path: "/academics/Saroj-Institute-of-Sports-Science-and-Research" },
            { title: "Saroj Institute of Entrepreneurship & Business (SIEB)", path: "/academics/Saroj-Insitute-of-Entrepreneurship-and-Business" },
            { title: "Saroj Institute of Film and Fashion (SIFF)", approval: "AICTE Approved", path: "/academics/Saroj-Institute-of-Film-and-Fashion" },
            { title: "Lucknow Institute of Pharmacy (LIP)", approval: "PCI Approved", path: "/academics/Lucknow-Institute-of-Pharmacy" },
            { title: "Saroj College of Law (SCL)", path: "/academics/saroj-college-of-law" }
          ],
        },
        {
          heading: "PROGRAMS & FEES",
          type: "fees",
          items: [
            { title: "Saroj Institute of Artificial Intelligence- Programs & Fee", path: "/academics/Saroj-Institute-of-Artificial-Intelligence" },
            { title: "Saroj Institute of Management & Technology- Programs & Fee ", path: "/academics/Saroj-Institute-of-Management-and-Technology" },
            { title: "Saroj Institute of Basic & Health Sciences- Programs & Fee ", path: "/academics/Saroj-Institute-of-Basic-and-Health-Sciences" },
            { title: "Saroj Institute of Humanities & Education- Programs & Fee ", path: "/academics/Saroj-Institute-of-Humanities-and-Education" },
            { title: "Saroj Institute of Sports Sciences & Research- Programs & Fee ", path: "/academics/Saroj-Institute-of-Sports-Science-and-Research" },
            { title: "Saroj Institute of Entrepreneurship & Business- Programs & Fee", path: "/academics/Saroj-Insitute-of-Entrepreneurship-and-Business" },
            { title: "Saroj Institute of Film and Fashion- Programs & Fee", path: "/academics/Saroj-Institute-of-Film-and-Fashion" },
            { title: "Lucknow Institute of Pharmacy- Programs & Fee", path: "/academics/Lucknow-Institute-of-Pharmacy" }
          ],
        },
        {
          heading: "ACADEMICS MENU",
          type: "academics-menu",
          items: [
            { title: "Academic Calendar", path: "/academics/academic-calendar" },
            { title: "Statutes", path: "/academics/statutes" },
            { title: "Faculty", path: "/academics/faculty" },
          ],
        },
      ],
    },
    {
      title: "Admissions",
      path: "/admissions",
      subItems: [
        { title: "Admission Process", path: "/admissions/admission-process" },
        { title: "Eligibility Criteria", path: "/admissions/admission-criteria" },
        { title: "Fee Structure", path: "/admissions/fee-structure" },
        { title: "Scholarship", path: "/admissions/scholarship" },
      ],
    },
    { title: "Contact Us", path: "/contact-us" },
  ];

  // State to hold the current search query from the input field.
  const [query, setQuery] = useState('');

  // State to hold the items that match the search query.
  const [filteredItems, setFilteredItems] = useState([]);

  // State to manage the loading status of the data.
  const [isLoading, setIsLoading] = useState(true);

  // State to handle any errors during data fetching.
  const [error, setError] = useState(null);

  // A function to handle changes in the search input field.
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // This useEffect hook processes the nav data and filters it based on the query.
  // It runs once on mount to populate the initial list.
  useEffect(() => {
    const processNavData = () => {
      try {
        // Flatten the nested navItems data structure.
        const processedData = flattenNavItems(navItems);
        
        // This simulates the data being "fetched" and then displayed.
        setFilteredItems(processedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to process navigation data.');
        setIsLoading(false);
      }
    };
    processNavData();
  }, []); // Empty dependency array ensures this runs only once on component mount.

  // This useEffect hook filters the items whenever the 'query' state changes.
  useEffect(() => {
    // If the query is empty, show all items from the processed nav data.
    if (query.trim() === '') {
      const processedData = flattenNavItems(navItems);
      setFilteredItems(processedData);
      return;
    }

    // Filter the processed data based on the search query.
    const processedData = flattenNavItems(navItems);
    const newFilteredItems = processedData.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    // Update the 'filteredItems' state with the new, filtered list.
    setFilteredItems(newFilteredItems);
  }, [query]); // Re-run when query changes.

  return (
    // Main container. It now has 'relative' positioning to serve as the reference point for the
    // absolutely positioned search results.
    <div className="relative">
      {/* Search bar container */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {/* Search icon (SVG) */}
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search for a page..."
          value={query}
          onChange={handleSearchChange}
          // Tailwind classes for styling the input field
          className="w-full py-3 pl-10 pr-4 text-gray-900 bg-gray-100 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
      </div>

      {/* This is the new search results container. 
        It is now conditionally rendered and absolutely positioned.
      */}
      {query.trim() !== '' && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-1000 p-4"
          style={{ width: '100%' }} // Ensure it stretches to the full width of its parent
        >
          {/* Conditional rendering based on loading state or error */}
          {isLoading && <p className="text-center text-gray-500 italic">Processing navigation data...</p>}
          {error && <p className="text-center text-red-500 italic">{error}</p>}
          
          {/* Show the search results if not loading and no error */}
          {!isLoading && !error && (
            filteredItems.length > 0 ? (
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto z-1000">
                {filteredItems.map(item => (
                  <li key={item.link} className="py-2">
                    <a href={item.link} className="flex flex-col justify-start items-start text-gray-800 hover:text-blue-600 transition-colors duration-200">
                      <span className="font-medium">{item.name}</span>
                      {/* Display the path link below the title */}
                      <span className="text-xs text-gray-500 mt-1">{item.link}</span>
                      {/* Display the category to provide more context */}
                      <span className="text-sm text-gray-500 mt-1">{item.category}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 italic">No results found for "{query}".</p>
            )
          )}
        </div>
      )}
    </div>
  );
}
