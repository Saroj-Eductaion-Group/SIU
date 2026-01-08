import React from 'react';
import Layout from '../components/Layout';

const Research = () => {
  // PDF data - now pointing to files in public/pdfs/
  const pdfDocuments = [
    {
      id: 1,
      title: 'Ordinance',
      description: 'Academic regulations and guidelines document',
      fileName: 'ordinance.pdf',
      filePath: '/pdfs/Ph.D-Ordinance.pdf',
      fileSize: '2.4 MB',
      lastUpdated: 'Updated: Jan 15, 2024'
    },
    {
      id: 2,
      title: 'Entrance Schedule',
      description: 'Entrance examination dates and timelines',
      fileName: 'entrance-schedule.pdf',
      filePath: '/pdfs/Ph.D-entrance-schedule.pdf',
      fileSize: '1.8 MB',
      lastUpdated: 'Updated: Feb 28, 2024'
    },
    {
      id: 3,
      title: 'Course Work Schedule',
      description: 'Academic calendar and coursework timeline',
      fileName: 'course-work-schedule.pdf',
      filePath: '/pdfs/course-work-schedule.pdf',
      fileSize: '3.1 MB',
      lastUpdated: 'Updated: Mar 10, 2024'
    }
  ];

  // Function to handle PDF view (opens in new tab)
  const handleViewPDF = (pdfPath, pdfName) => {
    // Open PDF in new tab
    window.open(pdfPath, '_blank');
    console.log(`Opening PDF: ${pdfName}`);
  };

  // Function to handle PDF download
  const handleDownloadPDF = (pdfPath, pdfName, event) => {
    // Prevent the default view action
    event.stopPropagation();
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Downloading PDF: ${pdfName}`);
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Research Documents
          </h1>
          <p className="text-gray-600 md:text-lg">
            Access important academic documents and schedules
          </p>
        </div>

        {/* PDF Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfDocuments.map((pdf) => (
            <div
              key={pdf.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {pdf.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {pdf.fileSize}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {pdf.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {pdf.lastUpdated}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded">
                    {pdf.fileName}
                  </div>
                </div>
              </div>

              {/* Card Footer - Two buttons for view and download */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleViewPDF(pdf.filePath, pdf.fileName)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={(e) => handleDownloadPDF(pdf.filePath, pdf.fileName, e)}
                    className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 border border-gray-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

       

      
      </div>
    </div>
    </Layout>
  );
};

export default Research;