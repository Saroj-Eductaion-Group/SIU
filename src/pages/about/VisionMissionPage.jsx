import React from 'react';
import Layout from '../../components/Layout'; // Assuming you have a Layout component
import { Helmet } from 'react-helmet';

const VisionMissionPage = () => {
  return (
    <Layout>
      <Helmet>
  <title>Vision & Mission | Saroj International University</title>
  <meta name="description" content="Understand the core vision and mission that drive Saroj International University's pursuit of excellence in education, research, and innovation." />
</Helmet>

      {/* Overall page background - light blue theme */}
      <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center">

        {/* Main page title */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
            Our Mission & Vision
          </h1>
          <p className="text-xl text-blue-600 font-semibold">
            Guiding Principles of Saroj International University
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-12 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center md:space-x-10">
            {/* Mission Image */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              {/* Replace with your actual Mission image */}
              <img
                src="https://media.istockphoto.com/id/994786356/photo/double-exposure-of-a-businessman-and-stairs-success-of-business-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=jDxJhC5uiiPvEvLVa-VxjP0yAmDHhNZsCck8To30LMA="
                alt="Saroj International University Mission"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
            {/* Mission Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center justify-center md:justify-start">
                <span className="text-blue-600 mr-3">
                  {/* Example icon, consider using a proper icon library like Font Awesome */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our Mission is to offer highest quality of learning and educational services to the students for
                developing them as a global citizen with knowledge, skills and integrity, cultivating research
                ecosystem to accelerate and amplify effective and impactful solutions to diverse segments of population.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-12 max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-10">
            {/* Vision Image */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              {/* Replace with your actual Vision image */}
              <img
                src="https://plus.unsplash.com/premium_photo-1669904022334-e40da006a0a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWlzc2lvbnxlbnwwfDB8MHx8fDA%3D"
                alt="Saroj International University Vision"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
            {/* Vision Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center justify-center md:justify-start">
                <span className="text-blue-600 mr-3">
                  {/* Example icon, consider using a proper icon library like Font Awesome */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684L12 9l-2 2m0 0l-2 2m2-2l2 2m-2-2L9 9m3-9h5.72a2 2 0 012 2v2a1 1 0 01-.684.948L15 12l-2 2m0 0l-2 2m0 0l-2 2m2-2l2 2m-2-2L9 9" />
                  </svg>
                </span>
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                The vision of Saroj International University is to educate, empower and excel through innovation,
                impactful research, collaboration and leadership to develop the students as informed, engaged and
                successful global citizens.
              </p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default VisionMissionPage;