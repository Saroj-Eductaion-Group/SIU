import logo from "../assets/logo.png";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import programsData from "../assets/json/programs.json";

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
    // path: "/programs",
    megaMenu: true,
    columns: programsData.columns,
  },
  {
    title: "Academics",
    path: "/academics",
    megaMenu: true, // Mark Academics for mega menu
    columns: [
      // ACADEMIA LAYOUT
      {
        heading: "INSTITUTES",
        type: "institutes", // Custom type to identify this column
        items: [{ title: "Saroj Institute of Artificial Intelligence (SIAI)" , path: "/academics/Saroj-Institute-of-Artificial-Intelligence"}, { title: "Saroj Institute of Management & Technology (SIMT)", approval: "AICTE Approved", path: "/academics/Saroj-Institute-of-Management-and-Technology" }, { title: "Saroj Institute of Basic & Health Sciences (SIBHS)", path: "/academics/Saroj-Institute-of-Basic-and-Health-Sciences" }, { title: "Saroj Institute of Humanities & Education (SiHE)" , path: "/academics/Saroj-Institute-of-Humanities-and-Education"}, { title: "Saroj Institute of Sports Sciences & Research (SISSR)" ,path: "/academics/Saroj-Institute-of-Sports-Science-and-Research" }, { title: "Saroj Institute of Entrepreneurship & Business (SIEB)" , path: "/academics/Saroj-Insitute-of-Entrepreneurship-and-Business"}, { title: "Saroj Institute of Film and Fashion (SIFF)", approval: "AICTE Approved", path: "/academics/Saroj-Institute-of-Film-and-Fashion" }, { title: "Lucknow Institute of Pharmacy (LIP)", approval: "PCI Approved", path: "/academics/Lucknow-Institute-of-Pharmacy"},{ title: "Saroj College of Law (SCL)" , path: "/academics/saroj-college-of-law"}],
      },
      {
        heading: "PROGRAMS & FEES",
        type: "fees", // Custom type for fee structure
        items: [{ title: "Saroj Institute of Artificial Intelligence- Programs & Fee", path: "/academics/Saroj-Institute-of-Artificial-Intelligence" }, { title: "Saroj Institute of Management & Technology- Programs & Fee " , path: "/academics/Saroj-Institute-of-Management-and-Technology"}, { title: "Saroj Institute of Basic & Health Sciences- Programs & Fee ", path: "/academics/Saroj-Institute-of-Basic-and-Health-Sciences" }, { title: "Saroj Institute of Humanities & Education- Programs & Fee ", path: "/academics/Saroj-Institute-of-Humanities-and-Education" }, { title: "Saroj Institute of Sports Sciences & Research- Programs & Fee ",path: "/academics/Saroj-Institute-of-Sports-Science-and-Research"  }, { title: "Saroj Institute of Entrepreneurship & Business- Programs & Fee", path: "/academics/Saroj-Insitute-of-Entrepreneurship-and-Business"}, { title: "Saroj Institute of Film and Fashion- Programs & Fee", path: "/academics/Saroj-Institute-of-Film-and-Fashion" }, { title: "Lucknow Institute of Pharmacy- Programs & Fee" ,path: "/academics/Lucknow-Institute-of-Pharmacy"}],
      },
      {
        heading: "ACADEMICS MENU",
        type: "academics-menu", // Custom type for remaining academics items
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
  // { title: "Research and development", path: "/rnd" },

  { title: "Contact Us", path: "/contact-us" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const toggleMobileSubmenu = (index) => {
    setOpenMobileSubmenu(openMobileSubmenu === index ? null : index);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
    setOpenMobileSubmenu(null);
  };

  return (
    <div ref={navRef} className='sticky top-0 z-[999]'>
      <nav className='  bg-white text-gray-600 shadow-md'>
        <div className='max-w-8xl mx-auto px-4 py-2'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='flex items-center' onClick={closeAllMenus}>
              <img src={logo} alt='SIU logo' className='h-auto w-48' />
            </Link>

            {/* Desktop Header UL */}
            <ul className='xl:flex hidden font-outfit space-x-2 text-lg items-center' ref={menuRef}>
              {navItems.map((item, index) => (
                <li key={`${item.path}-${index}`} className='relative' onMouseEnter={() => toggleSubmenu(index)} onMouseLeave={() => setOpenSubmenu(null)}>
                  {item.subItems || item.megaMenu ? (
                    <div className='relative'>
                      <button
                        className={`flex items-center px-2 py-1 relative
                                  before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
                                  before:bg-orange-500 before:transition-all before:duration-300
                                  hover:before:w-full ${openSubmenu === index ? "text-orange-500" : ""}`}
                        aria-haspopup='true'
                        aria-expanded={openSubmenu === index}>
                        {item.title}
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${openSubmenu === index ? "rotate-180" : ""}`} />
                      </button>

                      {item.subItems && !item.megaMenu && (
                        <div className={`absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100 ${openSubmenu === index ? "block" : "hidden"}`}>
                          {item.subItems.map((subItem, subIndex) =>
                            subItem.target ? (
                              <a
                                key={`${subItem.path}-${subIndex}`}
                                href={subItem.path}
                                target={subItem.target}
                                rel={subItem.rel}
                                className='block px-4 py-2 hover:bg-gray-100 relative
                                        before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
                                        before:bg-orange-500 before:transition-all before:duration-300
                                        hover:before:w-full'
                                onClick={closeAllMenus}>
                                {subItem.title}
                              </a>
                            ) : (
                              <Link
                                key={`${subItem.path}-${subIndex}`}
                                to={subItem.path}
                                className='block px-4 py-2 hover:bg-gray-100 relative
                                        before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
                                        before:bg-orange-500 before:transition-all before:duration-300
                                        hover:before:w-full'
                                onClick={closeAllMenus}>
                                {subItem.title}
                              </Link>
                            )
                          )}
                        </div>
                      )}

                      {item.megaMenu && item.title === "Programs" && (
                        <div
                          // Apply scroll to the entire mega menu container
                          className={`absolute left-1/2 -translate-x-2/3 mt-1 w-[1200px] bg-white rounded-md shadow-lg p-6 z-50 border border-gray-200 ${openSubmenu === index ? "block" : "hidden"} max-h-[700px] overflow-y-auto`}>
                          <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white'></div>

                          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                            {/* Left column: TCS Academia and Collaboration */}
                            <div>
                              {item.columns.map(
                                (column, colIndex) =>
                                  (column.heading === "COLLABORATION" || column.heading === "TCS ACADEMIA") && (
                                    <div key={`${column.heading}-${colIndex}`} className='relative'>
                                      <h3 className='font-bold text-sm text-blue-800 mb-3 pb-2 border-b-2 border-orange-500 relative'>
                                        {column.heading}
                                        <span className='absolute bottom-0 left-0 w-1/8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent'></span>
                                      </h3>
                                      <ul className='space-y-2'>
                                        {column.items.map((subItem, subItemIndex) => (
                                          <li key={`${subItem.path}-${subItemIndex}`} className='mb-1'>
                                            {subItem.collaboration_link ? (
                                              <Link to={subItem.path}  className='text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm flex items-center justify-between group' onClick={closeAllMenus}>
                                                <div className='flex items-start'>
                                                  <span className='w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                                                  {subItem.title}
                                                </div>
                                                <ArrowRight size={16} color='orange' className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                              </Link>
                                            ) : (
                                              <Link to={subItem.path} className='text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm flex items-center justify-between group' onClick={closeAllMenus}>
                                                <div className='flex items-start'>
                                                  <span className='w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                                                  {subItem.title}
                                                </div>
                                                <ArrowRight size={16} color='orange' className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                              </Link>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )
                              )}
                            </div>

                            {/* Right column: College Courses (main program categories) */}
                            <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
                              {item.columns.map(
                                (column, colIndex) =>
                                  column.heading !== "COLLABORATION" &&
                                  column.heading !== "TCS ACADEMIA" && (
                                    <div key={`${column.heading}-${colIndex}`} className='relative'>
                                      <h3 className='font-bold text-sm text-blue-800 mb-3 pb-2 border-b-2 border-orange-500 relative'>
                                        {column.heading}
                                        <span className='absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-transparent'></span>
                                      </h3>
                                      <ul className='space-y-2'>
                                        {/* Slice to show only the first 2 items */}
                                        {column.items.slice(0, 2).map((subItem, subItemIndex) => (
                                          <li key={`${subItem.path}-${subItemIndex}`} className='mb-1'>
                                            <Link to={subItem.path} className='text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm flex items-center justify-between group' onClick={closeAllMenus}>
                                              <div className='flex items-start'>
                                                <span className='w-1 h-1 bg-orange-500 rounded-full mt-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                                                {subItem.title}
                                              </div>
                                              <ArrowRight size={16} color='orange' className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                            </Link>
                                          </li>
                                        ))}
                                        {/* View all programs section for each individual category (only if more than 2 items) */}
                                        {column.items.length > 2 && (
                                          <li key={`${column.heading}-view-all-desktop-right`} className=' text-sm '>
                                            <Link
                                              to={`/programs/${column.heading.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} // Dynamic link based on heading
                                              className='text-orange-500 hover:underline flex items-center'
                                              onClick={closeAllMenus}>
                                              View all programs
                                              <ArrowRight size={16} className='ml-1' />
                                            </Link>
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                  )
                              )}
                            </div>

                            {/* View all programs ultimate button */}
                            <div className='flex flex-row justify-end items-end col-span-full mt-4'>
                              {" "}
                              {/* col-span-full to make it take full width */}
                              <Link to='/programs' onClick={closeAllMenus}>
                                <button
                                  className='inline-flex items-center justify-center bg-blue-700 text-white font-semibold px-10
                                py-3 rounded-sm shadow-lg hover:bg-blue-800 transition duration-300 text-base sm:text-sm'>
                                  View all Programs{" "}
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* // ACADEMIA LAYOUT */}
                      {item.megaMenu && item.title === "Academics" && (
                        // ACADEMIA LAYOUT
                        <div className={`absolute left-1/2 -translate-x-3/4 mt-1 w-[1100px] bg-white rounded-md shadow-lg p-6 z-50 border border-gray-200 ${openSubmenu === index ? "block" : "hidden"} max-h-[600px] overflow-y-auto`}>
                          <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white'></div>
                          <div className='grid grid-cols-3 gap-x-8 gap-y-4'>
                            {item.columns.map((column, colIndex) => (
                              <div key={`${column.heading}-${colIndex}`} className='relative'>
                                <h3 className='font-bold text-sm text-blue-800 mb-3 pb-2 border-b-2 border-orange-500 relative'>
                                  {column.heading}
                                  <span className='absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-orange-500 to-transparent'></span>
                                </h3>
                                <ul className='space-y-2'>
                                  {column.type === "institutes" &&
                                    column.items.map((subItem, subItemIndex) => (
                                      <li key={`${subItem.path}-${subItemIndex}`} className='mb-1'>
                                        <Link to={subItem.path} className='text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm flex items-center justify-between group' onClick={closeAllMenus}>
                                          <div className='flex items-start'>
                                            <span className='w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                                            {subItem.title}
                                            {subItem.approval && <span className='ml-2 text-xs text-green-600 font-medium'>({subItem.approval})</span>}
                                          </div>
                                          <ArrowRight size={16} color='orange' className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                        </Link>
                                      </li>
                                    ))}
                                  {column.type === "fees" &&
                                    column.items.map((subItem, subItemIndex) => (
                                      <li key={`${subItem.path}-${subItemIndex}`} className='mb-1'>
                                        <Link to={subItem.path} className='text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm flex items-center justify-between group' onClick={closeAllMenus}>
                                          <div className='flex items-start'>
                                            <span className='w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                                            {subItem.title}
                                          </div>
                                          <ArrowRight size={16} color='orange' className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                        </Link>
                                      </li>
                                    ))}
                                  {column.type === "academics-menu" &&
                                    column.items.map((subItem, subItemIndex) => (
                                      <li key={`${subItem.path}-${subItemIndex}`} className='mb-1'>
                                        <Link to={subItem.path} className='text-gray-700 hover:text-orange-500 transition-colors duration-200 text-sm flex items-center justify-between group' onClick={closeAllMenus}>
                                          <div className='flex items-start'>
                                            <span className='w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                                            {subItem.title}
                                          </div>
                                          <ArrowRight size={16} color='orange' className='opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className='px-2 py-1 relative
                                  before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5
                                  before:bg-orange-500 before:transition-all before:duration-300
                                  hover:before:w-full'
                      onClick={closeAllMenus}>
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              {/* Apply Now Button - Desktop */}
              <li className='ml-4 flex items-center justify-center'>
                <a href='https://siu.in8.nopaperforms.com/' target='_blank' rel='noopener noreferrer' className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition duration-300 cursor-pointer'>
                 <span >Apply Now</span>
               <ArrowRight className="h-6 w-6 text-white ml-2" />
                </a> 
               
              </li>
            
                
            </ul>

            <button className='xl:hidden p-2 rounded-md hover:bg-gray-100' onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
              {mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>

          {/* Mobile Menu (unchanged for these specific requests) */}
          <div className={`xl:hidden fixed inset-0 bg-white z-[888] transition-all duration-300 ease-in-out overflow-y-auto ${mobileMenuOpen ? "translate-y-20 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
            <ul className='pt-4 pb-20 px-4 space-y-2 '>
              {navItems.map((item, index) => (
                <li key={`${item.path}-${index}-mobile`} className=''>
                  {/* For Programs (megaMenu), show as simple link */}
                  {item.megaMenu && item.title === "Programs" ? (
                    <Link to={item.path} className='block px-3 py-3 hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium' onClick={closeAllMenus}>
                      {item.title}
                    </Link>
                  ) : /* For Academics (megaMenu), show expanded menu */
                  item.megaMenu && item.title === "Academics" ? (
                    <>
                      <button onClick={() => toggleMobileSubmenu(index)} className='flex items-center justify-between w-full px-3 py-3 hover:bg-gray-50 rounded-md transition-colors duration-200' aria-haspopup='true' aria-expanded={openMobileSubmenu === index}>
                        <span className='font-medium'>{item.title}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openMobileSubmenu === index ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`${openMobileSubmenu === index ? "max-h-[2000px]" : "max-h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
                        <div className='pl-4 mt-1 space-y-4'>
                          {item.columns.map((column, colIndex) => (
                            <div key={`${column.heading}-${colIndex}-mobile`} className='space-y-2'>
                              <h4 className='font-bold text-sm text-blue-800 border-b border-orange-500 pb-1'>{column.heading}</h4>
                              <ul className='space-y-1'>
                                {column.items.map((subItem, subItemIndex) => (
                                  <li key={`${subItem.path}-${subItemIndex}-mobile`}>
                                    <Link
                                      to={subItem.path || "#"} // Fallback to '#' if path is undefined
                                      className='block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200'
                                      onClick={closeAllMenus}>
                                      <div className='flex items-center justify-between'>
                                        <span>
                                          {subItem.title}
                                          {subItem.approval && <span className='ml-2 text-xs text-green-600 font-medium'>({subItem.approval})</span>}
                                        </span>
                                        <ArrowRight size={16} className='text-orange-500 opacity-70' />
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : /* For regular items with submenus */
                  item.subItems ? (
                    <>
                      <button onClick={() => toggleMobileSubmenu(index)} className='flex items-center justify-between w-full px-3 py-3 hover:bg-gray-50 rounded-md transition-colors duration-200' aria-haspopup='true' aria-expanded={openMobileSubmenu === index}>
                        <span className='font-medium'>{item.title}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openMobileSubmenu === index ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`${openMobileSubmenu === index ? "max-h-screen" : "max-h-0"} overflow-hidden transition-all duration-300 ease-in-out`}>
                        <ul className='pl-4 mt-1 space-y-1'>
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={`${subItem.path}-${subIndex}-mobile`}>
                              {subItem.target ? (
                                <a href={subItem.path} target={subItem.target} rel={subItem.rel} className='block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200' onClick={closeAllMenus}>
                                  {subItem.title}
                                </a>
                              ) : (
                                <Link to={subItem.path} className='block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200' onClick={closeAllMenus}>
                                  {subItem.title}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    /* For simple items without submenus */
                    <Link to={item.path} className='block px-3 py-3 hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium' onClick={closeAllMenus}>
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              {/* Apply Now Button - Mobile */}
              <li className='mt-4'>
                <a href='https://siu.in8.nopaperforms.com/' target='_blank' rel='noopener noreferrer'>
                  <button className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md transition duration-300'>Apply Now</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
