import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { FiFileText, FiChevronDown, FiChevronUp, FiEye, FiX } from "react-icons/fi";
import { Rocket, Stars } from "lucide-react";

const Boards = () => {
  const [expandedGovernance, setExpandedGovernance] = useState(false);
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [activePdf, setActivePdf] = useState(null);
  const [particles, setParticles] = useState([]);

  // Board of Governance Members - FULL DATA
  const governanceMembers = [
    { name: "Shri. Sunil Singh", role: "Chancellor" },
    { name: "Prof. (Dr.) Raju Ch. V. Voleti", role: "Officiating Vice-Chancellor" },
    { name: "Prof. (Dr.) Girish Kumar Tripathi", role: "Pro Vice-Chancellor (I/C)" },
    { name: "Smt. Rachna Singh", role: "Member nominated by the Society" },
    { name: "Prof. (Dr.) R.P. Singh", role: "Vice Chancellor at Adani University, Ex-Regional officer AICTE" },
    { name: "Shri. Siddharth Sirohi", role: "Vice President, Tata Tele Services LTD" },
    { name: "Adv. Ameet Mehta", role: "Managing Partner, Solicis Lex-IVPD, Mumbai" },
    { name: "CA Rajkumar Gupta", role: "Raj K SRI and Sons" },
    { name: "Prof. (Dr.) R.K. Khandal", role: "Former VC, AKTU" },
    { name: "Prof. (Dr.) B.S. Panwar", role: "Ex-Professor, IIT Delhi" },
    { name: "Prof. (Dr.) R.K. Khar", role: "Ex-Professor, Jamia Hamdard" },
    { name: "Prof. (Dr.) Amit Kumar Sharma", role: "Director Admin, SSITM Aligarh" },
    { name: "Dr. Dinesh Kumar Singh", role: "AP, SMRU, Lucknow" },
    { name: "Prof. (Dr.) Ankit Gandhi", role: "PVC, UOT Jaipur" },
    { name: "Shri. Kaptan Singh", role: "Chairman, Maharaja Surajmal Sansthan" },
    { name: "Shri U.S. Tomar", role: "Ex-Registrar, AKTU" },
    { name: "Shri. Madhukar Jately", role: "Ex-MLC, UP" },
    { name: "Shri. Amit Kumar Upadhyay", role: "Registrar – Secretary" }
  ];

  // Board of Studies Members - FULL DATA
  const boardOfStudies = {
    "Pharmacy": [
      { name: "Smt Anshika Shukla", role: "Head of Department - Chairman" },
      { name: "Prof. (Dr.) Girish Kumar Tripathi", role: "Faculty Member" },
      { name: "Dr. Charu Mishra", role: "Assistant Professor" },
      { name: "Shri Sangeeta Bharti", role: "Assistant Professor" },
      { name: "Prof. (Dr.) Mukul Singh", role: "Dean GNIOP, Greater Noida" },
      { name: "Dr. Gaurav Jain", role: "DIPSAR, New Delhi" },
      { name: "Dr. Satywan Singh", role: "Ex-Director, CDRI" },
      { name: "Dr. Ravikant Dubey", role: "Senior Manager, CIPLA Lab" },
      { name: "Mr. Surya Pratap", role: "First Year BP Student" },
      { name: "Mr. Alfiya Qureshi", role: "First Year BP Student" }
    ],
    "Engineering and AI": [
      { name: "Dr. Shivi Chaturvedi", role: "Head of Department - Chairman" },
      { name: "Shri Ashish Das", role: "Associate Professor" },
      { name: "Dr. Avnita Dixit", role: "Faculty Member" },
      { name: "Shri Sameer Bajpai", role: "Assistant Professor" },
      { name: "Prof. (Dr.) Ajay Kaul", role: "Director CS Dept., SMVDU" },
      { name: "Dr. Dileep Yadav", role: "RML, Ayodhya" },
      { name: "Dr. Gaurish Kumar Tripathi", role: "Ad Director, DRDO" },
      { name: "Er. Arun Kumar Upadhayay", role: "VP, Barclays" },
      { name: "Mr. Abhishek Kapri", role: "B.Tech CS First Year" },
      { name: "Mr. Karan Singh", role: "B.Tech ME First Year" }
    ],
    "Management": [
      { name: "Smt Meenu Chaudhary", role: "Head of Department - Chairman" },
      { name: "Smt. Shruti Tiwari", role: "Assistant Professor" },
      { name: "Prof. (Dr.) Mukesh Chaudhary", role: "Faculty Member" },
      { name: "Prof. (Dr.) OP Pathak", role: "Faculty Member" },
      { name: "Dr. Sangeeta Sahu", role: "Lucknow University" },
      { name: "Prof. (Dr.) Hari Govind Mishra", role: "SMVDU" },
      { name: "Shri Vishal Bhat", role: "Vice President, Tata TeleServices" },
      { name: "Shri Tejendra Pratap Singh", role: "DGM, Analytics, Tata Tele Services" },
      { name: "Shri Yasir Ali", role: "Strategic Planner, Emidlife Insurance" },
      { name: "Mr. Shivali Thakur", role: "MBA First Year" },
      { name: "Mr. Ankit Kumar Singh", role: "MBA First Year" }
    ],
    "Basic Sciences": [
      { name: "Dr. SK Mishra", role: "Head of Department - Chairman" },
      { name: "Prof. (Dr.) Rakhi Shardar", role: "Faculty Member" },
      { name: "Prof. (Dr.) Gaurav Singhal", role: "Faculty Member" },
      { name: "Dr Neeraj Dixit", role: "Faculty Member" },
      { name: "Prof. (Dr.) Vinay Dhiman", role: "Central University of Jammu" },
      { name: "Prof. (Dr.) Sunil Kumar Wanchoo", role: "Dean, SMVDU" },
      { name: "Mr. Anil Kumar", role: "M.Sc First Year" }
    ],
    "Film and Fashion": [
      { name: "Shri Tarun Mathur", role: "Head of Department - Chairman" },
      { name: "Shri Hari Singh", role: "Faculty Member" },
      { name: "Shri Bhushan Agarwal", role: "Faculty Member" },
      { name: "Shri Nitin Mane", role: "FTI Pune" },
      { name: "Shri Kabir Lal", role: "FTI Pune" },
      { name: "Shri Partho Ghosh", role: "Film Director" },
      { name: "Shri Subhash Kale", role: "Director, Real Touch Studio" },
      { name: "Ms. Alyna", role: "First Year Designing" },
      { name: "Ms. Kashish Arora", role: "First Year Designing" }
    ]
  };

  // Particle effect for PDF viewer
  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
      }));
      setParticles(newParticles);
    };

    createParticles();

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const toggleDepartment = (department) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [department]: !prev[department]
    }));
  };

  const showPdfDocument = (pdfType) => {
    setActivePdf(pdfType);
    document.body.style.overflow = "hidden";
  };

  const hidePdfDocument = () => {
    setActivePdf(null);
    document.body.style.overflow = "auto";
  };

  return (
    <Layout>
      <Helmet>
        <title>Boards | Saroj International University</title>
        <meta
          name="description"
          content="Explore the academic and administrative boards that govern Saroj International University, ensuring quality education and institutional integrity."
        />
      </Helmet>

      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        {/* Interactive background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-blue-200/30"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </div>

        {/* Glowing elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-100/50 blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                University Boards
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto flex items-center justify-center">
              <Rocket className="mr-2 h-5 w-5 text-blue-500" />
              Governance and Academic Leadership
            </p>
          </div>

          {/* Board of Governance */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-t-lg p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Board of Governance</h1>
                <button
                  onClick={() => showPdfDocument('governance')}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <FiEye />
                  View Official Document
                </button>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-b-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(expandedGovernance ? governanceMembers : governanceMembers.slice(0, 6)).map((member, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium text-lg text-blue-800">{member.name}</h3>
                      <p className="text-gray-600">{member.role}</p>
                    </div>
                  ))}
                </div>
                
                {governanceMembers.length > 6 && (
                  <button
                    onClick={() => setExpandedGovernance(!expandedGovernance)}
                    className="mt-6 flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {expandedGovernance ? (
                      <>
                        <FiChevronUp /> View Less
                      </>
                    ) : (
                      <>
                        <FiChevronDown /> View All {governanceMembers.length} Members
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Board of Studies */}
          <section>
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-t-lg p-6 shadow-lg mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Board of Studies</h1>
                <button
                  onClick={() => showPdfDocument('studies')}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <FiEye />
                  View Official Document
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(boardOfStudies).map(([department, members]) => (
                <div key={department} className="bg-white/80 backdrop-blur-lg rounded-lg shadow-md overflow-hidden">
                  <div className="bg-blue-700 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">{department}</h2>
                    <button
                      onClick={() => toggleDepartment(department)}
                      className="text-white/80 hover:text-white text-sm font-medium"
                    >
                      {expandedDepartments[department] ? 'Show Less' : 'Show All'}
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(expandedDepartments[department] ? members : members.slice(0, 4)).map((member, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <h3 className="font-medium text-blue-800">{member.name}</h3>
                          <p className="text-gray-600 text-sm">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Light-themed PDF Preview Modal */}
        {activePdf && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-white/80 backdrop-blur-sm transition-opacity"
              onClick={hidePdfDocument}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full h-full lg:w-6/12 lg:h-11/12 max-w-6xl bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transform transition-all max-h-[90vh] flex flex-col border border-gray-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center">
                  <FiFileText className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800 truncate max-w-md">
                    {activePdf === 'governance' ? 'Board of Governance' : 'Board of Studies'}
                  </h3>
                </div>
                <button
                  onClick={hidePdfDocument}
                  className="p-1 rounded-full hover:bg-gray-200/50 transition-colors duration-200 text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Stars className="h-12 w-12 text-gray-200 animate-pulse" />
                </div>
                <iframe
                  src={`/pdfs/board_of_${activePdf}.pdf#toolbar=0`}
                  className="w-full h-full border-0 relative z-10"
                  title="PDF Preview"
                ></iframe>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50/50">
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                  Saroj International University Document
                </div>
                <button
                  onClick={hidePdfDocument}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Boards;