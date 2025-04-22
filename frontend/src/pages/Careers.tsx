import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Define job interface
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: string;
}

// Mock job data
const JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'We are seeking an experienced Full Stack Developer to join our engineering team and help build scalable web applications.',
    requirements: [
      '5+ years experience with React and Node.js',
      'Strong understanding of TypeScript',
      'Experience with cloud platforms (AWS/Azure)',
      'Excellent problem-solving skills',
      'Strong communication abilities'
    ],
    responsibilities: [
      'Design and implement new features',
      'Optimize application performance',
      'Write clean, maintainable code',
      'Mentor junior developers',
      'Participate in code reviews'
    ]
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description: 'Looking for a creative UI/UX Designer to create beautiful and functional user interfaces for our products.',
    requirements: [
      'At least 3 years of UI/UX design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio showing web/mobile designs',
      'Understanding of user-centered design principles',
      'Experience with design systems'
    ],
    responsibilities: [
      'Create user-centered designs',
      'Develop and maintain design systems',
      'Create wireframes and prototypes',
      'Conduct user research',
      'Collaborate with developers'
    ]
  },
  {
    id: '3',
    title: 'Product Marketing Manager',
    department: 'Marketing',
    location: 'On-site',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    description: 'Join our marketing team to develop and execute product marketing strategies that drive growth.',
    requirements: [
      '4+ years of product marketing experience',
      'Strong analytical and strategic thinking',
      'Excellent communication skills',
      'Experience with market research',
      "Bachelor's degree in Marketing or related field"
    ],
    responsibilities: [
      'Develop marketing strategies',
      'Create product messaging and positioning',
      'Conduct market research',
      'Work with sales team',
      'Track and analyze marketing metrics'
    ]
  }
];

export default function Careers() {
  const { isDarkMode } = useTheme();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!selectedJob) {
        throw new Error('No job selected');
      }

      if (!formData.resume) {
        throw new Error('Resume is required');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('jobId', selectedJob.id);
      formDataToSend.append('jobTitle', selectedJob.title);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('coverLetter', formData.coverLetter || '');
      formDataToSend.append('resume', formData.resume);

      const response = await fetch('http://localhost:5002/api/jobs/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: ''
      });
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      // Show more specific error message
      alert(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Join Our Team
            </h1>
            <p className={`mt-6 text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Be part of something extraordinary. We're looking for talented individuals to help us shape the future of digital innovation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Job Listings */}
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Open Positions
            </h2>
            {JOBS.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl shadow-lg cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                } transition-all duration-200`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {job.title}
                    </h3>
                    <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {job.salary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded-full">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                      {job.location}
                    </span>
                  </div>
                </div>
                <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Job Details & Application Form */}
          <div className={`rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            {selectedJob ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedJob.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Requirements
                      </h3>
                      <ul className={`mt-2 list-disc pl-5 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Responsibilities
                      </h3>
                      <ul className={`mt-2 list-disc pl-5 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {selectedJob.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className={`mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'border-gray-300 text-gray-900'
                          } focus:ring-purple-500 focus:border-purple-500`}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className={`mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'border-gray-300 text-gray-900'
                          } focus:ring-purple-500 focus:border-purple-500`}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          className={`mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'border-gray-300 text-gray-900'
                          } focus:ring-purple-500 focus:border-purple-500`}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="resume" className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          Resume *
                        </label>
                        <input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          required
                          className={`mt-1 block w-full ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFormData({ ...formData, resume: file });
                          }}
                        />
                        <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          PDF, DOC, or DOCX (max 5MB)
                        </p>
                      </div>

                      <div>
                        <label htmlFor="coverLetter" className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          Cover Letter
                        </label>
                        <textarea
                          id="coverLetter"
                          rows={4}
                          className={`mt-1 block w-full rounded-md shadow-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'border-gray-300 text-gray-900'
                          } focus:ring-purple-500 focus:border-purple-500`}
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          placeholder="Tell us why you're interested in this position..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                        ${isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>

                    {submitStatus === 'success' && (
                      <div className="p-4 text-green-800 rounded-md bg-green-50">
                        Application submitted successfully! We'll be in touch soon.
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-4 text-red-800 rounded-md bg-red-50">
                        Error submitting application. Please try again.
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            ) : (
              <div className="py-12 text-center">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Select a Position
                </h2>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Click on a job listing to view details and apply
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 