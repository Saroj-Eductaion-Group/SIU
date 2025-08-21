import React,{ useEffect, useRef, useState } from 'react';
import { BrainCircuit, Rocket, Cpu, Database, Atom, Sparkles, CircuitBoard, Binary, Network, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LightAIBanner = () => {
  const [hoverState, setHoverState] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const bannerRef = useRef(null);
  
  // AI Program Data
  const programs = [
    {
      title: "AI Engineering",
      icon: <BrainCircuit className="text-blue-600" />,
      desc: "Master neural networks and deep learning architectures",
      stats: "94% placement rate",
      color: "bg-gradient-to-br from-blue-100 to-blue-50"
    },
    {
      title: "Machine Learning",
      icon: <CircuitBoard className="text-green-600" />,
      desc: "Build advanced predictive models and algorithms",
      stats: "87% salary hike",
      color: "bg-gradient-to-br from-green-100 to-green-50"
    },
    {
      title: "Data Science",
      icon: <Database className="text-orange-600" />,
      desc: "Extract insights from complex datasets at scale",
      stats: "2.5x industry demand",
      color: "bg-gradient-to-br from-orange-100 to-orange-50"
    },
    {
      title: "Quantum AI",
      icon: <Atom className="text-purple-600" />,
      desc: "Pioneer the next frontier of computational intelligence",
      stats: "Emerging field",
      color: "bg-gradient-to-br from-purple-100 to-purple-50"
    }
  ];

  // Floating dots animation
  const [dots, setDots] = useState([]);
  useEffect(() => {
    const updateDots = () => {
      const dotCount = window.innerWidth < 768 ? 15 : window.innerWidth < 1024 ? 30 : 40;
      const newDots = Array.from({ length: dotCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.2 + 0.1
      }));
      setDots(newDots);
    };

    updateDots();
    window.addEventListener('resize', updateDots);
    return () => window.removeEventListener('resize', updateDots);
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="relative overflow-hidden bg-white rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-200 shadow-lg"
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      {/* Animated dots background */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-blue-100"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animation: `float ${dot.speed}s ease-in-out ${dot.delay}s infinite alternate`
          }}
        />
      ))}
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Light glow effects */}
      <div className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-blue-100 blur-xl lg:blur-3xl transition-all duration-1000 ${hoverState ? 'opacity-30' : 'opacity-10 md:opacity-20'}`} />
      <div className={`absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-100 blur-xl lg:blur-3xl transition-all duration-1000 ${hoverState ? 'opacity-30' : 'opacity-10 md:opacity-20'}`} />
      
      {/* Main content */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left content */}
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 rounded-full border border-blue-100 mb-4 sm:mb-6">
              <Sparkles className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-mono text-xs sm:text-sm tracking-wider text-blue-600">AI-DRIVEN EDUCATION</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                Transform
              </span>{' '}
              <span className="text-gray-900">Your Career</span>
              <br />
              <span className="text-gray-600 text-2xl sm:text-3xl md:text-4xl">With Cutting-Edge AI</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl">
              Industry-aligned programs designed with tech leaders to prepare you for the AI revolution.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg md:rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 flex items-center gap-2 sm:gap-3 group text-sm sm:text-base">
                <Link to='/programs'>Explore Programs</Link>
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
              {[
                { value: "94%", label: "Placement Rate" },
                { value: "3.5x", label: "Salary Hike" },
                { value: "50+", label: "Industry Partners" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400" />
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right program selector */}
          <div className="flex-1 w-full max-w-xl">
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Tabs - Stack on small screens, side by side on larger */}
              <div className="grid grid-cols-2 sm:flex border-b border-gray-200">
                {programs.map((program, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-medium flex-1 flex items-center justify-center gap-1 sm:gap-2 transition-all ${activeTab === i ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {React.cloneElement(program.icon, { className: `w-4 h-4 sm:w-5 sm:h-5 ${program.icon.props.className}` })}
                    <span className="whitespace-nowrap">{program.title}</span>
                  </button>
                ))}
              </div>
              
              {/* Program content */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className={`${programs[activeTab].color} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-gray-100`}>
                  {React.cloneElement(programs[activeTab].icon, { size: 24 })}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{programs[activeTab].title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{programs[activeTab].desc}</p>
                
                <div className="flex items-center gap-2">
                  <Zap className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-mono text-xs sm:text-sm text-gray-500">{programs[activeTab].stats}</span>
                </div>
                
                {/* Progress steps */}
                <div className="mt-6 sm:mt-8">
                  <div className="flex justify-between text-xs text-gray-500 mb-1 sm:mb-2">
                    <span>Beginner</span>
                    <span>Advanced</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(activeTab + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements - hidden on small screens */}
      <div className="hidden sm:block absolute bottom-4 left-4 md:bottom-8 md:left-8 text-blue-100">
        <Binary className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28" />
      </div>
      <div className="hidden sm:block absolute top-4 right-4 md:top-8 md:right-8 text-blue-100">
        <Network className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28" />
      </div>
      
      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default LightAIBanner;