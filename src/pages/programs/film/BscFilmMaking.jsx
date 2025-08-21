import { useState } from "react";
import Layout from "../../../components/Layout"; // Adjusted import path
import {
  FaVideo, // Main icon for Film Making
  FaFilm, // Alternative film icon
  FaCameraRetro, // For cinematography
  FaEdit, // For editing
  FaUserTie, // For directing/producing
  FaGraduationCap, // General academic
  FaClock, // For duration
  FaUniversity, // For programs/education
  FaFileAlt, // For details/application
  FaChevronDown, // For accordions
  FaCalendarAlt, // For intake dates
  FaChartLine,
  FaBuilding, // For fees structure
} from "react-icons/fa";
import { Helmet } from "react-helmet";

const BscFilmMakingPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    careers: false,
    admission: false,
    fees: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const accordionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const careerPaths = [
    {
      title: "Film Director",
      description: "Lead the creative vision and execution of film and video projects.",
      icon: <FaUserTie className='w-6 h-6 text-orange-600' />,
    },
    {
      title: "Cinematographer",
      description: "Capture the visual aesthetic and lighting for films and other media.",
      icon: <FaCameraRetro className='w-6 h-6 text-yellow-600' />,
    },
    {
      title: "Film Editor",
      description: "Assemble raw footage into a cohesive and engaging final product.",
      icon: <FaEdit className='w-6 h-6 text-red-600' />,
    },
    {
      title: "Producer",
      description: "Oversee the business and logistical aspects of film production.",
      icon: <FaBuilding className='w-6 h-6 text-brown-600' />, // Using building for production houses
    },
    {
      title: "Sound Designer/Engineer",
      description: "Create and mix audio elements to enhance the storytelling.",
      icon: <FaFilm className='w-6 h-6 text-gray-600' />, // Generic film icon for audio in film
    },
  ];

  return (
    <Layout>
      <Helmet>
  <title>B.Sc. in Film Making | Saroj International University</title>
  <meta name="description" content="Dive into cinematic storytelling, production, and direction with a B.Sc. in Film Making from Saroj International University." />
</Helmet>

      <div className='max-w-6xl mx-auto px-4 py-12'>
        <div className='text-center mb-16'>
          <div className='flex justify-center mb-6'>
            <div className='bg-orange-100 p-4 rounded-full'>
              <FaVideo className='w-12 h-12 text-orange-600' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>B.Sc. in Film Making</h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>A dynamic program covering the art and craft of cinematic storytelling, from pre-production to post-production.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaGraduationCap className='w-6 h-6 text-orange-600 mr-3' />
              <h3 className='font-semibold text-lg'>Degree Awarded</h3>
            </div>
            <p className='text-gray-700'>Bachelor of Science (B.Sc.)</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaClock className='w-6 h-6 text-orange-600 mr-3' />
              <h3 className='font-semibold text-lg'>Duration</h3>
            </div>
            <p className='text-gray-700'>3 Years (6 Semesters)</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border border-gray-100'>
            <div className='flex items-center mb-4'>
              <FaCalendarAlt className='w-6 h-6 text-orange-600 mr-3' />
              <h3 className='font-semibold text-lg'>Intake</h3>
            </div>
            <p className='text-gray-700'>60 Seats (Annual)</p>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("overview")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaUniversity className='w-6 h-6 text-orange-600 mr-3' />
              Program Overview
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.overview ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.overview && (
            <div className='px-6 pb-6'>
              <p className='text-gray-700 mb-4'>The B.Sc. in Film Making program offers a comprehensive exploration of the filmmaking process, from conceptualization and script development to production, post-production, and distribution. Students will gain hands-on experience with industry-standard equipment and software.</p>
              <p className='text-gray-700 mb-4'>This program nurtures creative vision and technical proficiency, preparing graduates for diverse roles in the film, television, and digital media industries. It emphasizes practical projects, collaborative work, and storytelling.</p>
              <div className='mt-6'>
                <h3 className='font-semibold text-lg mb-3 text-gray-800'>Key Learning Outcomes:</h3>
                <ul className='space-y-2 text-gray-700'>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Master film production techniques including directing, cinematography, and editing.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Develop strong storytelling abilities across various cinematic genres.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Gain proficiency in professional filmmaking equipment and software.</span>
                  </li>
                  <li className='flex items-start'>
                    <span className='mr-2'>•</span>
                    <span>Understand the business and distribution aspects of the film industry.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Removed Curriculum Structure section */}

        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("careers")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaBuilding className='w-6 h-6 text-orange-600 mr-3' />
              Career Opportunities
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.careers ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.careers && (
            <div className='px-6 pb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {careerPaths.map((career, index) => (
                  <div key={index} className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'>
                    <div className='flex items-center mb-4'>
                      {career.icon}
                      <h3 className='font-semibold text-lg ml-3'>{career.title}</h3>
                    </div>
                    <p className='text-gray-700'>{career.description}</p>
                   
                  </div>
                ))}
              </div>
              <div className='mt-8'>
                <h3 className='font-semibold text-lg mb-3 text-gray-800'>Potential Employers:</h3>
                <div className='flex flex-wrap gap-4'>
                  {["Film Production Houses", "TV Networks", "Advertising Agencies", "Digital Media Companies", "Post-Production Studios", "Broadcasting Companies"].map((company, i) => (
                    <div key={i} className='bg-gray-100 px-4 py-2 rounded-full text-gray-800'>
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <button onClick={() => toggleSection("admission")} className='w-full text-left p-6 flex justify-between items-center hover:bg-gray-50'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
              <FaGraduationCap className='w-6 h-6 text-orange-600 mr-3' />
              Admission Process
            </h2>
            <FaChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.admission ? "rotate-180" : ""}`} />
          </button>

          {expandedSections.admission && (
            <div className='px-6 pb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='font-semibold text-lg mb-3 text-gray-800'>Eligibility:</h3>
                  <ul className='space-y-3 text-gray-700'>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>10+2 from a recognized board or equivalent (any stream)</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>Minimum 50% aggregate marks</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-2'>•</span>
                      <span>Portfolio submission and/or aptitude test/interview may be required</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-semibold text-lg mb-3 text-gray-800'>Application Process:</h3>
                  <ol className='space-y-3 text-gray-700 list-decimal list-inside'>
                    <li>Fill online application form.</li>
                    <li>Upload required academic documents and creative portfolio (if applicable).</li>
                    <li>Pay application fee.</li>
                    <li>Attend interview/audition (if required).</li>
                    <li>Complete final admission formalities upon selection.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
 

        <div className='text-center bg-orange-700 text-white p-12 rounded-lg'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Bring Stories to Life on Screen?</h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>Join our B.Sc. in Film Making program and start your journey towards a career in cinematic arts.</p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <a  href="https://siu.in8.nopaperforms.com/"  target="_blank" className='bg-white text-orange-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center'>
              <FaFileAlt className='mr-2' /> Apply Now
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BscFilmMakingPage;
