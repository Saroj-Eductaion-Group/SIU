import React, { useEffect, useRef } from 'react';

const HiringPartnersSection = () => {
  const logos = [
    { id: 1, src: '/companyLogos/1.png', alt: 'HCL' },
    { id: 2, src: '/companyLogos/2.png', alt: 'IBM' },
    { id: 3, src: '/companyLogos/3.png', alt: 'Infosys' },
    { id: 4, src: '/companyLogos/4.png', alt: 'MAX' },
    { id: 5, src: '/companyLogos/5.png', alt: 'TCS' },
    { id: 6, src: '/companyLogos/6.png', alt: 'Wipro' },
    { id: 7, src: '/companyLogos/7.png', alt: 'Accenture' },
    { id: 8, src: '/companyLogos/8.png', alt: 'Cognizant' },
  ];



  const containerRef = useRef(null);
  const angleRef = useRef(0);
  const radius = 160;
  const speed = 0.005;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const logoElements = container.querySelectorAll('.logo-item');
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    const animate = () => {
      angleRef.current += speed;

      logoElements.forEach((logo, index) => {
        const angle = angleRef.current + (index * (2 * Math.PI / logoElements.length));
        const x = centerX + Math.cos(angle) * radius - logo.offsetWidth / 2;
        const y = centerY + Math.sin(angle) * radius - logo.offsetHeight / 2;
        
        const scale = 0.8 + 0.2 * Math.sin(angle);
        const opacity = 0.7 + 0.3 * Math.sin(angle);
        
        logo.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        logo.style.opacity = opacity;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-10 bg-blue-50 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 font-funneldisplay">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Esteemed Hiring Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Saroj International University collaborates with industry leaders to bridge 
            the gap between academia and the professional world.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Why Partner With Us?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Industry-Ready Graduates</h4>
                    <p className="text-gray-600">
                      Our curriculum is co-designed with industry leaders to ensure immediately applicable skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Custom Talent Pipeline</h4>
                    <p className="text-gray-600">
                      Work with us to develop specialized training programs for your specific needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Research Collaboration</h4>
                    <p className="text-gray-600">
                      Access cutting-edge university research and innovation projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          
          </div>

          {/* Right Logo Carousel */}
          <div className="lg:w-1/2 relative h-96 w-full">
            <div 
              ref={containerRef}
              className="relative w-full h-full"
            >
              {logos.map((logo) => (
                <div 
                  key={logo.id}
                  className="logo-item absolute w-28 h-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    willChange: 'transform, opacity'
                  }}
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className="w-full h-full object-contain  transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Center Stats */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white p-6 rounded-full shadow-xl border border-gray-100 text-center w-40 h-40 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">50+</span>
                <p className="text-gray-600 text-sm mt-2">Global Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringPartnersSection;