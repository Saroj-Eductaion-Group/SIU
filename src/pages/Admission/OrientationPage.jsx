// src/components/Orientation.jsx
import React from 'react';
import Layout from '../../components/Layout';
import Img1 from '../../assets/orientation/O1.jpeg'
import Img2 from '../../assets/orientation/O2.jpeg'
import Img3 from '../../assets/orientation/O3.jpeg'
import Img4 from '../../assets/orientation/O4.jpeg'
import Img5 from '../../assets/orientation/O5.jpeg'
import Img6 from '../../assets/orientation/O6.jpeg'
import Img7 from '../../assets/orientation/O7.jpeg'
import Img9 from '../../assets/orientation/O9.jpeg'




const OrientationPage = () => {
  return (
    <Layout> 
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Orientation Program 2025-26gi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Day 1 Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Day 1: Welcome & Introduction</h3>
            <p className="text-gray-600 mb-4">
              Join us for a day of introductions, team-building exercises, and essential information to get you started on your journey.
            </p>

            <div className='flex grid grid-cols-1 md:grid-cols-2 gap-4'>
              <img 
              src= { Img1 }
              alt="Day 1 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />

               <img 
              src= { Img2 }
              alt="Day 1 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />

               <img 
              src= { Img3 }
              alt="Day 1 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />

               <img 
              src= { Img4 }
              alt="Day 1 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />
             </div>

          </div>

          {/* Day 2 Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Day 2: Workshops & Activities</h3>
            <p className="text-gray-600 mb-4">
              Dive deeper with hands-on workshops and fun activities designed to help you connect with your peers and mentors.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <img 
              src= { Img5 }
              alt="Day 2 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />

            <img 
              src= { Img6 }
              alt="Day 2 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />

            <img 
              src= { Img7 }
              alt="Day 2 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />

            <img 
              src= { Img9 }
              alt="Day 2 Orientation" 
              className="w-full h-auto rounded-lg object-cover" 
            />  
            </div>

          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default OrientationPage;