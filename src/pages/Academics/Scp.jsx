import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBook, FaBalanceScale, FaChalkboardTeacher, FaUniversity, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Layout from '../../components/Layout';

const SarojCollegeOfLaw = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "LLB Graduate",
      content: "Saroj College provided me with exceptional legal education and practical training that prepared me perfectly for my career in corporate law."
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "LLM Student",
      content: "The faculty here are truly dedicated. Their mentorship has helped me publish my first research paper in constitutional law."
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "Alumni, High Court Advocate",
      content: "The moot court competitions and internship opportunities at Saroj College gave me the confidence to practice law effectively."
    }
  ];

  const programs = [
    {
      icon: <FaGraduationCap className="text-4xl mb-4 text-blue-600" />,
      title: "LLB Program",
      description: "3-year comprehensive law degree program with practical training modules.",
      features: ["Comprehensive curriculum", "Moot court training", "Internship opportunities"]
    },
    {
      icon: <FaBook className="text-4xl mb-4 text-blue-600" />,
      title: "LLM Program",
      description: "Specialized postgraduate program with multiple specialization options.",
      features: ["Multiple specializations", "Research opportunities", "Industry collaborations"]
    },
    {
      icon: <FaBalanceScale className="text-4xl mb-4 text-blue-600" />,
      title: "Diploma Courses",
      description: "Short-term diploma programs in various legal specializations.",
      features: ["Flexible schedules", "Practical focus", "Expert faculty"]
    }
  ];

  const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "1500+", label: "Alumni Network" },
    { value: "95%", label: "Pass Percentage" },
    { value: "80+", label: "Faculty Members" }
  ];

  const facultyHighlights = [
    "Former High Court Judges",
    "Renowned Legal Scholars",
    "Corporate Law Experts",
    "Human Rights Advocates",
    "International Law Specialists"
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <Layout>
      <div className="font-sans text-gray-800 overflow-x-hidden">
        
        {/* Hero Section */}
        <div className='block md:flex '>
          {/* <motion.img src='https://images.pexels.com/photos/6077797/pexels-photo-6077797.jpeg' /> */}
          <motion.img src="https://cdn.pixabay.com/photo/2019/12/18/13/05/right-4703926_640.jpg" className='w-300'   />
        <div id="home" className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-32 relative overflow-hidden md:w-450 ">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 text-center relative z-10"
          >
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Shaping the Future of <br className="hidden md:block" />Legal Professionals
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto"
            >
              Premier legal education with a perfect blend of theory and practice since 1995
            </motion.p>
          </motion.div>
          
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">About Saroj College of Law</h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-24 h-1.5 bg-blue-600 mx-auto"
              />
            </motion.div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="College Building" 
                    className="rounded-xl shadow-2xl w-full hover:shadow-xl transition duration-500 transform hover:-translate-y-2" 
                  />
                  
                </div>
              </motion.div>
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2"
              >
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700">A Legacy of Legal Excellence</h3>
                <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                  Saroj College of Law has been at the forefront of legal education, producing some of the finest legal minds in the country. Our institution combines rich tradition with innovative teaching methodologies.
                </p>
                <p className="mb-8 text-gray-700 text-lg leading-relaxed">
                  Our curriculum is designed to provide students with comprehensive knowledge of law while emphasizing practical skills through moot courts, internships, and legal aid programs. We pride ourselves on creating well-rounded legal professionals.
                </p>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-6"
                >
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      whileHover={hoverEffect}
                      className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300 border-l-4 border-blue-600"
                    >
                      <p className="text-3xl font-bold text-blue-800 mb-2">{stat.value}</p>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Our Academic Programs</h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-24 h-1.5 bg-blue-600 mx-auto"
              />
              <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
                Comprehensive legal education programs designed to meet the needs of aspiring legal professionals
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {programs.map((program, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ ...hoverEffect, y: -10 }}
                  className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-blue-600"
                >
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex justify-center"
                  >
                    {program.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-center text-blue-800">{program.title}</h3>
                  <p className="text-gray-700 mb-6 text-center">{program.description}</p>
                  <ul className="space-y-2">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Faculty Section */}
        <section id="faculty" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Our Distinguished Faculty</h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-24 h-1.5 bg-blue-600 mx-auto"
              />
              <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
                Learn from the most respected legal minds in the country
              </p>
            </motion.div>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-2/5"
              >
                <div className="relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Faculty" 
                    className="rounded-xl shadow-2xl w-full transform transition duration-500 group-hover:-translate-y-2 group-hover:shadow-xl" 
                  />
                  <div className="absolute -bottom-6 -left-6 bg-blue-700 text-white p-4 rounded-xl shadow-lg hidden md:block">
                    <div className="text-xl font-bold">15:1</div>
                    <div className="text-blue-100">Student-Faculty Ratio</div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-3/5"
              >
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700">Learn from the Best Legal Minds</h3>
                <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                  Our faculty comprises experienced legal practitioners, renowned academicians, and retired judges who bring real-world insights into the classroom. With decades of combined experience, they provide unparalleled mentorship to our students.
                </p>
                <p className="mb-8 text-gray-700 text-lg leading-relaxed">
                  The faculty at Saroj College of Law are not just teachers but mentors who guide students through their academic journey and beyond, helping them build successful legal careers.
                </p>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {facultyHighlights.map((highlight, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 border-l-2 border-blue-600"
                    >
                      <div className="flex items-center">
                        <FaChalkboardTeacher className="text-blue-600 mr-3" />
                        <span className="text-gray-800 font-medium">{highlight}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#e6f0ff] ">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-24 h-1.5 bg-blue-600 mx-auto"
              />
              <p className="mt-6 text-gray-700 max-w-3xl mx-auto text-lg">
                Hear from our students and alumni about their experiences at Saroj College of Law
              </p>
            </motion.div>
            
            <div className="max-w-5xl mx-auto text-white">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonials[activeTestimonial].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="bg-blue-700 p-10 rounded-xl shadow-xl mb-10"
                  >
                    <div className="text-2xl italic mb-8 leading-relaxed">"{testimonials[activeTestimonial].content}"</div>
                    <div className="border-t border-blue-600 pt-6">
                      <p className="font-bold text-xl">{testimonials[activeTestimonial].name}</p>
                      <p className="text-blue-300">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={tapEffect}
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 border-2 text-blue-800 p-3 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                  aria-label="Previous testimonial"
                >
                  <FaArrowLeft className="text-xl" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={tapEffect}
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white text-blue-800 p-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 border-2"
                  aria-label="Next testimonial"
                >
                  <FaArrowRight className="text-xl" />
                </motion.button>
              </div>
              
              <motion.div 
                className="flex justify-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-4 h-4 rounded-full transition duration-300 ${activeTestimonial === index ? 'bg-white w-6' : 'bg-blue-400'}`}
                    whileHover={{ scale: 1.5 }}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#f09007] text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Legal Journey?</h2>
              <p className="text-xl mb-10 text-blue-100">
                Join Saroj College of Law and become part of a legacy of legal excellence
              </p>
             
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SarojCollegeOfLaw;