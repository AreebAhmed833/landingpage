import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
}

export default function AdminDashboard() {
  const { isDarkMode } = useTheme();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      // For testing purposes, use the hardcoded admin token
      const adminToken = 'admin-token';
      
      const response = await fetch('http://localhost:5002/api/jobs/applications', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: Application['status']) => {
    try {
      // For testing purposes, use the hardcoded admin token
      const adminToken = 'admin-token';
      
      const response = await fetch(`http://localhost:5002/api/jobs/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      alert('Failed to update application status');
    }
  };

  const downloadResume = (resumeUrl: string, applicantName: string) => {
    // Convert relative path to absolute URL
    const baseUrl = 'http://localhost:5002';
    const fullUrl = `${baseUrl}/${resumeUrl}`;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fullUrl;
    
    // Extract file extension from URL
    const extension = resumeUrl.split('.').pop();
    
    // Set download attribute with applicant's name
    link.download = `${applicantName.replace(/\s+/g, '_')}_resume.${extension}`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Job Applications</h1>
        
        <div className="grid gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className={`p-6 rounded-lg shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{application.jobTitle}</h2>
                  <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {application.name}
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {application.email} | {application.phone}
                  </p>
                  <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Applied: {new Date(application.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <select
                    value={application.status}
                    onChange={(e) => handleStatusChange(application._id, e.target.value as Application['status'])}
                    className={`rounded-md border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } py-2 px-3 text-sm`}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  
                  <button
                    onClick={() => downloadResume(application.resumeUrl, application.name)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Download Resume
                  </button>
                </div>
              </div>
              
              {application.coverLetter && (
                <div className="mt-4">
                  <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Cover Letter
                  </h3>
                  <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {application.coverLetter}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 