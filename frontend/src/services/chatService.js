import axios from 'axios';

const API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:8000/api';

// Create axios instance for chat API with CORS headers
const chatApi = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to true if using cookies/sessions
});

// Generate a unique session ID for each chat session
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get session ID from localStorage or create new one
const getSessionId = () => {
  let sessionId = localStorage.getItem('chatSessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('chatSessionId', sessionId);
  }
  return sessionId;
};

// Send message to chat API
export const sendChatMessage = async (message) => {
  try {
    const sessionId = getSessionId();
    
    console.log(`📤 Sending chat message to ${API_URL}/chat`);
    console.log(`Session ID: ${sessionId}`);
    console.log(`Message: ${message}`);
    
    const payload = {
      session_id: sessionId,
      message: message
    };
    
    console.log('Payload:', payload);
    
    // Try to send with error handling for CORS
    const response = await chatApi.post('/chat', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Add mode for fetch-like behavior
      mode: 'cors',
    });
    
    console.log('✅ Chat response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Chat API error:', error);
    
    // Log detailed error info
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
      
      if (error.response.status === 405) {
        throw new Error('CORS issue: Backend not allowing OPTIONS requests. Please check CORS configuration.');
      }
      throw new Error(error.response.data?.detail || `Chat error: ${error.response.status}`);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
      throw new Error('No response from chat server. Please check if the chat service is running.');
    } else {
      console.error('Request setup error:', error.message);
      throw new Error(error.message || 'Failed to send message.');
    }
  }
};

// Test chat connection
export const testChatConnection = async () => {
  try {
    // Use OPTIONS request to test CORS
    await chatApi.options('/chat');
    return { connected: true, message: 'Chat service is running with CORS enabled' };
  } catch (error) {
    // If OPTIONS fails, try GET
    try {
      await chatApi.get('/health');
      return { connected: true, message: 'Chat service is running (CORS may be limited)' };
    } catch (getError) {
      console.warn('Chat service not available:', getError.message);
      return { 
        connected: false, 
        message: 'Chat service not available. Using fallback responses.',
        error: getError.message 
      };
    }
  }
};

// Get chat history (if your backend supports it)
export const getChatHistory = async () => {
  try {
    const sessionId = getSessionId();
    const response = await chatApi.get(`/chat/history/${sessionId}`);
    return response.data;
  } catch (error) {
    console.warn('Could not fetch chat history:', error.message);
    return null;
  }
};

// Clear chat session
export const clearChatSession = () => {
  localStorage.removeItem('chatSessionId');
  console.log('🗑️ Chat session cleared');
  return generateSessionId();
};

export default {
  sendChatMessage,
  testChatConnection,
  getChatHistory,
  clearChatSession,
  getSessionId
};