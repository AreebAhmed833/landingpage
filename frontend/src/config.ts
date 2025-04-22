// API configuration
const isDevelopment = import.meta.env.MODE === 'development';
const API_URL = import.meta.env.VITE_API_URL || (isDevelopment ? 'http://localhost:5002' : 'https://your-render-backend-url.onrender.com');

export { API_URL }; 