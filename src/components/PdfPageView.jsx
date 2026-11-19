import { useState, useEffect } from "react";
import { Eye, X, Download, FileText, Stars, Rocket } from "lucide-react";

const PdfViewer = ({ pdfFiles }) => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [particles, setParticles] = useState([]);

  // Create interactive particles
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

  const openPreview = (pdf) => {
    setSelectedPdf(pdf);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setIsModalOpen(false);
    setSelectedPdf(null);
    document.body.style.overflow = "auto";
  };

  return (
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
              Saroj International University
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto flex items-center justify-center">
            <Rocket className="mr-2 h-5 w-5 text-blue-500" />
            Access the future of education
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-gray-200/70">
          <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/70">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              University Documents
            </h3>
          </div>
          <ul className="divide-y divide-gray-200/70">
            {pdfFiles.map((pdf, index) => (
              <li
                key={index}
                className="hover:bg-blue-50/30 transition-colors duration-150 group"
              >
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100/50 flex items-center justify-center group-hover:bg-blue-100/70 transition-colors">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {pdf.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {pdf.path.replace("/pdfs/", "")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPreview(pdf)}
                    className="ml-4 flex-shrink-0 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Light-themed PDF Preview Modal */}
      {isModalOpen && (
        <div className="fixed  inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-white/80 backdrop-blur-sm transition-opacity"
            onClick={closePreview}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full h-full lg:w-6/12 lg:h-11/12 max-w-6xl bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden transform transition-all max-h-[90vh] flex flex-col border border-gray-200/70">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/70 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800 truncate max-w-md">
                  {selectedPdf?.name}
                </h3>
              </div>
              <button
                onClick={closePreview}
                className="p-1 rounded-full hover:bg-gray-200/50 transition-colors duration-200 text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1  overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Stars className="h-12 w-12 text-gray-200 animate-pulse" />
              </div>
              <iframe
                src={`${selectedPdf?.path}#toolbar=0`}
                className="w-full h-full border-0 relative z-10"
                title="PDF Preview"
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200/70 bg-gray-50/50">
              <div className="text-sm text-gray-500 flex items-center">
                <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                Saroj International University Document
              </div>
              <div className="flex space-x-3">
                {/* <a
                  href={selectedPdf?.path}
                  download
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 hover:text-blue-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a> */}
                <button
                  onClick={closePreview}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
