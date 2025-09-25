// src/components/Orientation.jsx
import React from 'react';
import Layout from '../../components/Layout';
import Img1 from '../../assets/orientation/O1.jpeg';
import Img2 from '../../assets/orientation/O2.jpeg';
import Img3 from '../../assets/orientation/O3.jpeg';
import Img4 from '../../assets/orientation/O4.jpeg';
import Img5 from '../../assets/orientation/O5.jpeg';
import Img6 from '../../assets/orientation/O6.jpeg';
import Img7 from '../../assets/orientation/O7.jpeg';
import Img8 from '../../assets/orientation/O8.jpeg';

const OrientationPage = () => {
  return (
    <Layout> 
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        {/* Animated Header Section */}
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold from-blue-900 mb-4">
              Orientation Program 2025-26
            </h2>
            <p className="text-xl text-blue-800 animate-slide-up delay-100">
              Welcome to your new academic journey at Saroj International University
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in delay-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-blue-800 font-semibold">Students</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in delay-300">
              <div className="text-3xl font-bold text-blue-600 mb-2">250+</div>
              <div className="text-blue-800 font-semibold">Faculty</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in delay-400">
              <div className="text-3xl font-bold text-blue-600 mb-2">45+</div>
              <div className="text-blue-800 font-semibold">Programs</div>
            </div>
          </div>
        </div>

        {/* Orientation Days Grid */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Day 1 Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-500 animate-slide-up delay-500">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Day 1: Welcome & Introduction
                </h3>
              </div>
              
              <p className="text-blue-800 text-lg mb-6 leading-relaxed">
                Join us for a day of introductions, team-building exercises, and essential information to get you started on your journey at India's Gateway to Next-Gen Education.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={Img1}
                  alt="Day 1 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
                <img 
                  src={Img2}
                  alt="Day 1 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
                <img 
                  src={Img3}
                  alt="Day 1 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
                <img 
                  src={Img4}
                  alt="Day 1 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>

              <button className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Explore Day 1 Schedule
              </button>
            </div>

            {/* Day 2 Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-500 animate-slide-up delay-700">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Day 2: Workshops & Activities
                </h3>
              </div>
              
              <p className="text-blue-800 text-lg mb-6 leading-relaxed">
                Dive deeper with hands-on workshops and fun activities designed to help you connect with your peers and mentors while exploring Caring Arts Research.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={Img5}
                  alt="Day 2 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
                <img 
                  src={Img6}
                  alt="Day 2 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
                <img 
                  src={Img7}
                  alt="Day 2 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
                <img 
                  src={Img8}
                  alt="Day 2 Orientation" 
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>

              <button className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Explore Day 2 Schedule
              </button>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mt-12 animate-fade-in delay-1000">
            <div className="bg-[#f08f07] rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">Your Future Starts Here</h3>
              <p className="text-xl mb-6 opacity-90">
                Join a vibrant community of learners and innovators at one of the world's most forward-looking universities.
              </p>
              <button className="bg-white text-[#f08f07] px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transform hover:scale-110 transition-all duration-300">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to Tailwind config */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </Layout>
  );
};

export default OrientationPage;