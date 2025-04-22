const fetch = require('node-fetch');

// Test the basic API endpoint
async function testBasicEndpoint() {
  try {
    console.log('Testing basic API endpoint...');
    const response = await fetch('http://localhost:5002/');
    const data = await response.json();
    console.log('Basic API response:', data);
    return true;
  } catch (error) {
    console.error('Error testing basic API endpoint:', error);
    return false;
  }
}

// Test the applications endpoint with admin token
async function testApplicationsEndpoint() {
  try {
    console.log('Testing applications endpoint...');
    // Use the hardcoded admin token
    const adminToken = 'admin-token';
    
    const response = await fetch('http://localhost:5002/api/jobs/applications', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    
    if (!response.ok) {
      console.error('Applications endpoint error:', response.status, response.statusText);
      const errorData = await response.json();
      console.error('Error details:', errorData);
      return false;
    }
    
    const data = await response.json();
    console.log('Applications response:', data);
    return true;
  } catch (error) {
    console.error('Error testing applications endpoint:', error);
    return false;
  }
}

// Run the tests
async function runTests() {
  console.log('Starting API tests...');
  
  const basicTest = await testBasicEndpoint();
  console.log('Basic API test:', basicTest ? 'PASSED' : 'FAILED');
  
  const applicationsTest = await testApplicationsEndpoint();
  console.log('Applications API test:', applicationsTest ? 'PASSED' : 'FAILED');
  
  console.log('Tests completed.');
}

runTests(); 