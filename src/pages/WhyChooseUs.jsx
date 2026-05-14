import React from 'react';
import { useInView } from 'react-intersection-observer';

// --- IMPORTANT: Replace these with your actual image paths ---
import sustainabilityImage from '../assets/1.jpg'; // Example path
import richHistoryImage from '../assets/2.jpg';    // Example path
import visitPennImage from '../assets/3.jpg';      // Example path
// Add more images as needed for all 6 items or adjust data

const featuresData = [
  {
    id: 1,
    image: sustainabilityImage,
    title: 'Sustainability',
    description: 'SIU is dedicated to promoting a sustainable culture and implementing environmentally conscious policies.',
  },
  {
    id: 2,
    image: richHistoryImage,
    title: 'A Rich History',
    description: 'As a leading university, SIU has a history of academic excellence and shares strong ties with its community and the nation.',
  },
  {
    id: 3,
    image: visitPennImage,
    title: 'Visit SIU',
    description: 'We invite you to spend time on campus and see the many ways our diverse community brings excitement and discovery to SIU\'s grand buildings and state of the art facilities.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-blue-50 bg-opacity-70 py-8 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl sm:text-5xl font-extrabold text-gray-900 mb-6 sm:mb-8 relative pb-2">
          <span>EXPLORE </span><span className="text-blue-500">SIU</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });

            return (
              <div
                key={feature.id}
                ref={ref}
                className={`bg-white rounded-lg shadow-md overflow-hidden
                            transform transition-all duration-700 ease-out
                            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;