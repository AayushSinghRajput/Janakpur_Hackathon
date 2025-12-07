import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// NGO Login
const login = async (credentials) => {
  try {
    const response = await api.post('/ngo/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'Login failed');
    }
  }
};

// NGO Register
const register = async (details) => {
  try {
    const response = await api.post('/ngo/register', details);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'Registration failed');
    }
  }
};

// Get NGOs by incident type
const getNGOsByIncidentType = async (incidentType) => {
  try {
    console.log(`🔍 Fetching NGOs for incident type: ${incidentType}`);
    
    const response = await api.get(`/ngo/incident/${incidentType}`);
    
    if (response.data.success) {
      console.log(`✅ Found ${response.data.data.length} NGOs`);
      return {
        success: true,
        data: response.data.data,
        count: response.data.count
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to fetch NGOs'
      };
    }
  } catch (error) {
    console.error('❌ Error fetching NGOs:', error);
    
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Server error',
        status: error.response.status
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'No response from server. Please check your connection.'
      };
    } else {
      return {
        success: false,
        message: error.message || 'Unknown error occurred'
      };
    }
  }
};

// Get all NGOs
const getAllNGOs = async () => {
  try {
    const response = await api.get('/ngo');
    
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
        count: response.data.count
      };
    } else {
      return {
        success: false,
        message: response.data.message
      };
    }
  } catch (error) {
    console.error('❌ Error fetching all NGOs:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export default { 
  login, 
  register, 
  getNGOsByIncidentType, 
  getAllNGOs 
};