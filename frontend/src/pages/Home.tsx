import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Hero Section with Enhanced Animation */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-transparent"></div>
          {/* Floating particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${
                  i % 2 === 0 ? '#8B5CF6' : '#3B82F6'
                }, transparent)`,
                width: Math.random() * 20 + 10 + 'px',
                height: Math.random() * 20 + 10 + 'px',
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative px-4 py-32 mx-auto max-w-7xl sm:py-40 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="mb-8 text-5xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
            >
              Welcome to NEOVANNCE
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="max-w-3xl mx-auto mt-6 text-xl leading-relaxed text-gray-300 md:text-2xl"
            >
              Empowering businesses through innovative digital solutions
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col justify-center gap-6 mt-12 sm:flex-row"
            >
              <Link
                to="/contact"
                className="px-8 py-4 text-lg font-medium text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-lg shadow-purple-500/25"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 text-lg font-medium text-purple-400 transition-all duration-300 transform border-2 border-purple-500 rounded-full hover:bg-purple-500/10 backdrop-blur-sm hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto transform translate-y-1"
          >
            <path
              d="M0 200V0C480 100 960 100 1440 0V200H0Z"
              fill="#1F2937"
            />
          </svg>
        </div>
      </div>

      {/* Features Section with Enhanced Design */}
      <div className="py-32 bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl font-extrabold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Our Features
            </h2>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-300">
              Discover what makes us different and how we can help transform your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 mt-20 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Innovative Solutions',
                description: 'Cutting-edge technology solutions tailored for modern businesses',
                icon: '💡',
                gradient: 'from-purple-500 to-blue-500'
              },
              {
                title: 'Expert Team',
                description: 'Highly skilled professionals dedicated to your success',
                icon: '👥',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock assistance for all your needs',
                icon: '🛟',
                gradient: 'from-cyan-500 to-purple-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute transition-all duration-300 opacity-50 -inset-1 rounded-xl bg-gradient-to-r group-hover:opacity-100 blur-lg"></div>
                <div className="relative p-8 transition-all duration-300 transform bg-gray-800 border border-gray-700 rounded-xl hover:border-gray-600 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="mb-6 text-5xl">{feature.icon}</div>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-24 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="max-w-2xl mx-auto mb-12 text-xl text-gray-300">
              Join the growing number of businesses that trust NEOVANNCE for their digital transformation journey.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl"
            >
              Get Started Today
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;