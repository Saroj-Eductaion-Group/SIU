import React from 'react';
import Layout from '../../components/Layout'; // Assuming you have a Layout component
import { Helmet } from 'react-helmet';

// TimelineItem component for individual entries
const TimelineItem = ({ title, content, isLeft, index }) => {
  return (
    <div className="relative mb-8 flex w-full">
      {/* Circle Marker */}
      {/* On small screens, circle is always on the left side of the content. */}
      {/* On medium screens and up, it's centered if isLeft is true, or on the right if isLeft is false */}
      <div className="absolute left-4 md:left-1/2 top-0 transform -translate-y-1/2
                  w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold z-10
                  md:-translate-x-1/2">
        {/* Optional: You can add a number or icon here like {index + 1} */}
      </div>

      {/* Content card */}
      {/* On small screens, it's always full width and pushed to the right of the line. */}
      {/* On medium screens and up, it becomes half width and alternates left/right. */}
      <div className={`w-full pl-12 // Mobile: full width, padding for left line
                     md:w-1/2 md:px-4 // Medium+: half width, reset padding for centering
                     ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} // Medium+: alternating text alignment
                    `}>
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
          <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};


const HistoryPage = () => {
  const timelineData = [
    {
      title: "Inception & Dedication (2001)",
      content: "Since its inception, Saroj Educational Group under the aegis of Smt. Saroj Singh Shikshan Sansthan, has been dedicated to providing quality education and fostering a culture of academic excellence. Our journey is marked by significant milestones and a relentless commitment to empowering students with knowledge and skills that shape their future."
    },
    {
      title: "Evolution & Holistic Approach",
      content: "Right from the inception in 2001, Saroj Educational Group began as a humble initiative with a vision to revolutionize the educational landscape. Over the years, we have evolved into a renowned institution known for its academic rigor, innovative teaching methods, and holistic approach to education."
    },
    {
      title: "Inclusivity & Accessibility",
      content: "As pursuit of excellence continued, the group laid its strong academic foundation for Saroj International University upon the principles of inclusivity and accessibility. We believe in providing equal opportunities to all students, irrespective of their backgrounds and their academic specialization. Our inclusive environment fosters diversity, enriching the learning experience for every individual."
    },
    {
      title: "Experienced Faculty & Mentorship",
      content: "Driven by a team of experienced educators and professionals, Saroj International University has consistently raised the bar in academic excellence. Our faculty members are not only learned teachers but mentors who inspire and guide students to realize their full potential. Through a blend of theoretical knowledge and practical application, we prepare our students to excel in their chosen fields and make meaningful contributions to society."
    },
    {
      title: "Innovation & State-of-the-Art Facilities",
      content: "Innovation lies at the heart of each of our Institutes' in Saroj International University. We continuously strive to adapt to the evolving educational landscape and embrace emerging technologies and teaching methodologies. Our state-of-the-art facilities and modern infrastructure provide students with a conducive environment for learning and exploration."
    },
    {
      title: "Holistic Development Beyond Academics",
      content: "Beyond academics, Saroj International University is committed to nurturing well-rounded individuals. We offer a wide range of extracurricular activities, sports programs, and community engagement initiatives to foster personal growth and development. Through these experiences, students cultivate essential life skills such as leadership, teamwork, and resilience."
    },
    {
      title: "Legacy of Student & Alumni Achievement",
      content: "As we reflect on our journey, we take pride in the achievements of our students and alumni who have excelled in various fields and made significant contributions to society. Their success is a testament to the values instilled at Saroj International University and the transformative power of education."
    },
    {
      title: "Shaping Future Leaders & Innovators",
      content: "Looking ahead, we remain dedicated to our mission of shaping the future leaders and innovators of tomorrow. With a steadfast commitment to excellence and a passion for learning, Saroj International University continues to inspire, educate, and empower generations of students to reach new heights of success."
    },
    {
      title: "A Way of Life: Excellence",
      content: "Join us in this extraordinary journey of learning, discovery, and growth at Saroj International University – where excellence is a way of life!"
    }
  ];

  return (
    <Layout>
      <Helmet>
  <title>Our History | Saroj International University</title>
  <meta name="description" content="Discover the journey and milestones of Saroj International University, from its founding to its growth as a center of higher education." />
</Helmet>

            {/* Overall page background - light blue theme */}
      <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        {/* Main content container for title */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
            Our Journey Through Time
          </h1>
          <p className="text-xl text-blue-600 font-semibold">
            A Glimpse into the History of Saroj Educational Group
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connecting timeline points */}
          {/* On small screens, line is on the left. On medium screens and up, it's centered. */}
          <div className="absolute left-5 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400"></div>

          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              title={item.title}
              content={item.content}
              isLeft={index % 2 === 0} // Alternates content left and right for desktop
              index={index} // Pass index for potential numbering
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;