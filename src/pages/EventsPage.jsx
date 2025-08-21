import React from 'react';

// Import your event images
import eventImage1 from '../assets/event1.jpg';
import eventImage2 from '../assets/event1.jpg';
import eventImage3 from '../assets/event1.jpg';
import eventImage4 from '../assets/event1.jpg';

const UpcomingEvents = () => {
  const events = [
    {
      date: { day: '15', month: 'JUN' },
      title: 'Annual Tech Conference',
      location: 'Virtual Event',
      description:
        'Join leading tech minds from around the world to discuss trends, breakthroughs, and innovations in technology.',
      image: eventImage1,
      actionText: 'Learn More',
    },
    {
      date: { day: '22', month: 'JUL' },
      title: 'Innovators Summit',
      location: 'Convention Center, City',
      description:
        'A gathering of creative entrepreneurs and startup founders to share ideas, experiences, and pitches.',
      image: eventImage2,
      actionText: 'Register Now',
    },
    {
      date: { day: '10', month: 'AUG' },
      title: 'Web Development Workshop',
      location: 'Online Webinar',
      description:
        'Hands-on workshop for beginners and professionals focusing on modern web development tools and techniques.',
      image: eventImage3,
      actionText: 'View Details',
    },
    {
      date: { day: '05', month: 'SEP' },
      title: 'AI & Robotics Expo',
      location: 'Exhibition Hall, Town',
      description:
        'Explore the latest in artificial intelligence and robotics through demos, keynotes, and tech displays.',
      image: eventImage4,
      actionText: 'Find Out More',
    },
  ];

  return (
    <div className="bg-blue-50 py-11 px-4 sm:px-6 lg:px-8 pb-30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 overflow-hidden">
          <h2 className="text-center text-2xl sm:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4 relative pb-2">
            <span>UPCOMING <span className="text-blue-500">EVENTS</span></span>
          </h2>
          <p className="mt-1 max-w-xl mx-auto text-xl text-gray-600">
            Don't miss out on our exciting events!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-2xl"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="text-center p-3 bg-blue-600 text-white rounded-lg mr-4 flex-shrink-0">
                    <div className="text-2xl font-bold leading-none">{event.date.day}</div>
                    <div className="text-xs uppercase">{event.date.month}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">{event.title}</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2">{event.location}</p>
                <p className="text-gray-600 text-md mb-4">{event.description}</p>
                <a
                  href="#"
                  className="block text-center text-blue-600 font-semibold py-2 transition-colors hover:text-blue-800"
                >
                  {event.actionText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
