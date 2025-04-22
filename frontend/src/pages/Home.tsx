import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section with Animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100/30'}`}></div>
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-400'}`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 500,
                opacity: 0.1
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 500,
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Logo size="large" className="mx-auto mb-8" />
            <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome to NEOVANNCE
            </h1>
            <p className={`mt-6 text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Empowering businesses through innovative digital solutions
            </p>
            <div className="flex justify-center gap-4 mt-10">
              <Link
                to="/contact"
                className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                }`}
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10'
                    : 'border-2 border-purple-500 text-purple-600 hover:bg-purple-50'
                }`}
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className={`text-3xl font-extrabold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Features
            </h2>
            <p className={`mt-4 text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Discover what makes us different
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 mt-20 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Innovative Solutions',
                description: 'Cutting-edge technology solutions for modern businesses',
                icon: '💡'
              },
              {
                title: 'Expert Team',
                description: 'Highly skilled professionals dedicated to your success',
                icon: '👥'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock assistance for all your needs',
                icon: '🛟'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-white hover:bg-gray-50'
                } transition-all duration-300`}
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`mt-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;