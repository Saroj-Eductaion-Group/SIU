import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Home, 
  RotateCw, 
  Mail, 
  Search, 
  ArrowRight,
  Globe,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const ErrorPage = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Floating elements data
  const floatingItems = [
    { icon: <Globe className="w-8 h-8" />, delay: 0, position: 'top-20 left-10' },
    { icon: <BookOpen className="w-8 h-8" />, delay: 0.3, position: 'top-1/3 right-16' },
    { icon: <GraduationCap className="w-8 h-8" />, delay: 0.6, position: 'bottom-1/4 left-1/4' },
  ];

  // Popular links data
  const popularLinks = [
    { title: "Admissions", url: "/admissions" },
    { title: "Academic Programs", url: "/programs" },
    { title: "Student Portal", url: "/portal" },
    { title: "Faculty Directory", url: "/faculty" },
  ];

  return (
    <Layout>
    <div className=" bg-gradient-to-br from-yellow-600 to-yellow-300 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 0, opacity: 0.7 }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
            className={`absolute ${item.position} text-white/20`}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="w-40 h-40 bg-gradient-to-r from-rose-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl mx-auto">
                <AlertTriangle className="w-20 h-20 text-white" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.3, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
                className="absolute inset-0 border-4 border-rose-400/50 rounded-full -z-10"
              />
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Interactive search section */}
       

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#4f46e5' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-lg transition-all"
          >
            <Home className="w-6 h-6" />
            <span className="text-lg font-medium">Return to Homepage</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#f43f5e' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 px-8 py-4 bg-rose-500 text-white rounded-lg shadow-lg transition-all"
          >
            <RotateCw className="w-6 h-6" />
            <span className="text-lg font-medium">Reload Page</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: '#06b6d4' }}
            whileTap={{ scale: 0.98 }}
            href="mailto:support@university.edu"
            className="flex items-center gap-3 px-8 py-4 bg-cyan-500 text-white rounded-lg shadow-lg transition-all"
          >
            <Mail className="w-6 h-6" />
            <span className="text-lg font-medium">Contact Support</span>
          </motion.a>
        </motion.div>

        {/* Popular links section */}
        

        {/* Animated help section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            className="inline-block cursor-pointer"
          >
            
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg"
                >
                  <p className="text-gray-800 mb-2">
                    Our support team is available 24/7
                  </p>
                  <a 
                    href="tel:+18005551234" 
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    +1 (800) 555-1234
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </Layout>
  );
};

export default ErrorPage;