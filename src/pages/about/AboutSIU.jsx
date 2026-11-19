import { useState } from 'react';
import { 
  GraduationCap, Globe, BookOpen, Lightbulb, 
  BarChart2, HeartHandshake, ArrowRight, ChevronDown,
  Library, ShieldCheck, Users, Globe2, Clock, Calendar
} from 'lucide-react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AboutSIU = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [hoveredTimeline, setHoveredTimeline] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      question: "What makes SIU's teaching methodology unique?",
      answer: "Our pedagogy blends traditional lectures with experiential learning, including case studies, simulations, and industry projects. We emphasize 'learning by doing' with our state-of-the-art labs and innovation centers where students can apply theoretical knowledge to real-world challenges."
    },
    {
      question: "How does SIU support international students?",
      answer: "We offer comprehensive support including visa assistance, airport pickup, orientation programs, language support, cultural integration activities, and dedicated international student advisors to ensure a smooth transition to life at SIU and in the country."
    },
    {
      question: "What career services are available to students?",
      answer: "Our Career Development Center provides resume workshops, mock interviews, career counseling, networking events, and internship placements. We host over 200 companies annually for campus recruitment and maintain strong alumni connections for mentorship opportunities."
    }
  ];

  const timelineData = [
    {
      year: "2005",
      title: "University Founded",
      description: "Established with three schools and 200 students in our inaugural class.",
      icon: <Library className="w-5 h-5" />
    },
    {
      year: "2010",
      title: "First International Partnership",
      description: "Signed collaboration agreements with universities in Europe and North America.",
      icon: <Globe2 className="w-5 h-5" />
    },
    {
      year: "2015",
      title: "Research Excellence Award",
      description: "Recognized nationally for groundbreaking work in sustainable technologies.",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Implemented comprehensive online learning infrastructure and virtual labs.",
      icon: <Users className="w-5 h-5" />
    },
    {
      year: "2023",
      title: "Campus Expansion",
      description: "Opened new 50-acre sustainable campus with cutting-edge facilities.",
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  return (
    <Layout>
     <Helmet>
  <title>About Us | Saroj International University</title>
  <meta 
    name="description" 
    content="Discover the story of Saroj International University — our mission, vision, leadership, and commitment to academic excellence in global higher education." 
  />
</Helmet>

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-800 to-blue-500 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Redefining <span className="text-yellow-300">Higher Education</span> for the 21st Century
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                At Saroj International University, we don't just educate students - we transform lives. 
                Our innovative approach combines academic rigor with real-world relevance, preparing 
                graduates to thrive in an increasingly complex global landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                
                <Link to="/programs" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 flex items-center">
                  Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                <div className="absolute inset-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20 p-10">
                  <BookOpen className="w-32 h-32 text-yellow-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white transform skew-y-2 -mb-10 z-0"></div>
      </section>

      {/* Mission/Vision/Values Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Guiding Principles</h2>
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-white p-1 shadow-md">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-6 py-2 rounded-full transition ${activeTab === 'mission' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-6 py-2 rounded-full transition ${activeTab === 'vision' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Vision
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`px-6 py-2 rounded-full transition ${activeTab === 'values' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Values
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
            {activeTab === 'mission' && (
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-10 h-10 text-yellow-500 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Saroj International University exists to challenge conventional education paradigms. We cultivate 
                    intellectual curiosity through rigorous academic programs that emphasize both depth of knowledge 
                    and interdisciplinary connections.
                  </p>
                  <p>
                    Our faculty-student mentorship model fosters critical thinking and creativity, while our 
                    industry partnerships ensure curriculum relevance. We measure our success not just by degrees 
                    conferred, but by the societal impact of our graduates.
                  </p>
                  <p>
                    The university maintains special commitment to accessibility, with need-blind admissions and 
                    robust scholarship programs ensuring opportunity for all qualified students regardless of 
                    economic circumstances.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <BarChart2 className="w-10 h-10 text-blue-500 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    By 2030, Saroj International University will be recognized among the world's most innovative 
                    institutions of higher learning - a model for how universities can drive both individual 
                    transformation and societal progress.
                  </p>
                  <p>
                    We envision a campus where boundaries between disciplines blur, where students from all 
                    backgrounds collaborate on solutions to global challenges, and where learning continues 
                    far beyond graduation through lifelong education initiatives.
                  </p>
                  <p>
                    Our graduates will be distinguished not just by their technical competencies, but by 
                    their ethical leadership, cultural fluency, and commitment to sustainable development.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <HeartHandshake className="w-10 h-10 text-red-500 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Values</h3>
                </div>
                <div className="grid gap-8">
                  <div className="flex items-start bg-blue-50 p-6 rounded-lg hover:bg-blue-100 transition">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Transformative Education</h4>
                      <p className="text-gray-600">
                        We believe education should fundamentally expand perspectives and capabilities. 
                        Our programs challenge students to grow intellectually, emotionally, and ethically.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-green-50 p-6 rounded-lg hover:bg-green-100 transition">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Global Citizenship</h4>
                      <p className="text-gray-600">
                        We prepare students to engage thoughtfully with diverse cultures and address 
                        transnational challenges through curriculum, study abroad, and international collaborations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start bg-purple-50 p-6 rounded-lg hover:bg-purple-100 transition">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Lifelong Learning</h4>
                      <p className="text-gray-600">
                        Education doesn't end at graduation. We foster intellectual curiosity and 
                        provide alumni with continuing education opportunities throughout their careers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      

      {/* Academic Philosophy */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Academic Philosophy</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Future-Ready Curriculum</h3>
              </div>
              <p className="text-gray-600">
                Our academic programs evolve continuously to anticipate industry trends and societal needs. 
                All undergraduates complete a core curriculum emphasizing data literacy, design thinking, 
                and ethical reasoning, while graduate programs focus on cutting-edge specialization.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Experiential Learning</h3>
              </div>
              <p className="text-gray-600">
                Every SIU student engages in hands-on learning through research projects, internships, 
                entrepreneurship incubators, or community initiatives. Our "Learning Lab" approach 
                ensures theoretical knowledge is immediately applied to real challenges.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <Globe2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Global Perspectives</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Internationalization is woven throughout the SIU experience. All programs include 
              comparative global perspectives, language study options, and opportunities for 
              international collaboration - whether through study abroad, virtual exchanges, 
              or multinational research teams.
            </p>
            <Link to="/programs/" className="text-blue-600 font-medium hover:text-blue-800 transition flex items-center">
              Explore Global Programs <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Begin Your SIU Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Discover how Saroj International University can help you achieve your academic and professional goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
            to="https://siu.in8.nopaperforms.com/"
            className="bg-primary text-white hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center">
             Apply Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
            to="/contact-us"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center">
              Contact Us<Users className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default AboutSIU;