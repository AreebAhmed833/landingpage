import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { API_URL } from '../config';

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  resumePath: string;
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Rejected';
  createdAt: string;
}

export default function AdminDashboard() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    fetchApplications();
  }, [navigate]);

  const fetchApplications = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/jobs/applications`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      setApplications(response.data);
    } catch (error) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: Application['status']) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      await axios.put(
        `${API_URL}/api/jobs/applications/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        }
      );
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/admin/login');
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        
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
                    Applied: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                  <a
                    href={application.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 inline-block text-indigo-600 hover:text-indigo-500 ${
                      isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : ''
                    }`}
                  >
                    LinkedIn Profile
                  </a>
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
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  
                  <a
                    href={`${API_URL}/${application.resumePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 