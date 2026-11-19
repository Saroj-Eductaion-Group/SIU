import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import your logo images (replace these with your actual image paths)
import ugcLogo from '/approvalLogos/ugc.png'
import internationalLogo from '/approvalLogos/aicte.png'
import industryLogo from '/approvalLogos/pci.png'

const ApprovalsSection = () => {
  const certificates = [
    {
  id: 1,
  name: "UGC Recognition",
  logo: ugcLogo,
  description: "Saroj International University is recognized by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956, affirming its status as a legitimate higher education institution in India.",
  authority: "University Grants Commission",
  link: "/about/recognition"
},

{
  id: 2,
  name: "AICTE Approval",
  logo: internationalLogo,
  description: "The university is approved by the All India Council for Technical Education (AICTE) to offer technical and professional programs in compliance with national standards.",
  authority: "All India Council for Technical Education",
  link: "/about/aicte-approval"
},

{
  id: 3,
  name: "PCI Approval",
  logo: industryLogo,
  description: "The university is approved by the Pharmacy Council of India (PCI) to offer pharmacy programs, ensuring compliance with national standards for pharmaceutical education.",
  authority: "Pharmacy Council of India",
  link: "/about/lip-pharmacy-council"
}

  ];

  const [activeCertificate, setActiveCertificate] = useState(certificates[0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate certificates
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const currentIndex = certificates.findIndex(cert => cert.id === activeCertificate.id);
        const nextIndex = (currentIndex + 1) % certificates.length;
        setActiveCertificate(certificates[nextIndex]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeCertificate, isAutoPlaying]);

  const handleCertificateClick = (certificate) => {
    setActiveCertificate(certificate);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const navigateCertificate = (direction) => {
    const currentIndex = certificates.findIndex(cert => cert.id === activeCertificate.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + certificates.length) % certificates.length;
    } else {
      newIndex = (currentIndex + 1) % certificates.length;
    }
    
    setActiveCertificate(certificates[newIndex]);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-12 bg-gray-50 font-funneldisplay">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold max-w-7xl mx-auto mb-8 py-6">Approvals & Certificates</h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Certificate List - Now 50% width */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-blue-800 text-white">
              <h3 className="text-xl font-semibold">Our Recognitions</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {certificates.map((certificate) => (
                <li 
                  key={certificate.id}
                  className={`p-4 cursor-pointer transition-colors duration-200 flex items-center gap-3
                    ${activeCertificate.id === certificate.id ? ' bg-yellow-100 ' : 'hover:bg-gray-50'}`}
                  onClick={() => handleCertificateClick(certificate)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className={`p-2 rounded-full ${activeCertificate.id === certificate.id ? 'bg-yellow-200' : 'bg-yellow-200'}`}>
                    <img 
                      src={certificate.logo} 
                      alt={certificate.name} 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className={`font-medium ${activeCertificate.id === certificate.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {certificate.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel - Certificate Details - Now 50% width */}
          <div className="lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div className="h-full flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-indigo-100">
                      <img 
                        src={activeCertificate.logo} 
                        alt={activeCertificate.name} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{activeCertificate.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigateCertificate('prev')}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => navigateCertificate('next')}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Next certificate"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{activeCertificate.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Issuing Authority</h4>
                      <p className="font-medium text-gray-800">{activeCertificate.authority}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <a 
                  href={activeCertificate.link} 
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View official document
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApprovalsSection;