import axios from 'axios';

import { useAppStore } from '@/stores/app';

let request = 0;
let response = 0;

// Base API configuration
// In development, Vite proxy will forward /api to http://localhost:3000
// In production, set VITE_API_BASE_URL environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'X-User-Id': 'assessment-user'
  }
});

// Request interceptor (optional - for adding auth tokens, etc.)
api.interceptors.request.use((config) => {
  request++

  const appStore = useAppStore();
  appStore.setLoading(true);

  setTimeout(() => {
    if(response !== 0 && request !== 0){
      appStore.setLoading(false);
      response = 0
      request = 0
    }
  }, 5000)

  return config;
},
(error) => {
  const appStore = useAppStore();

  setTimeout(()=> {
    appStore.setLoading(false);
  }, 1500)
    
  response = 0
  request = 0

  return Promise.reject(error);
});

// Response interceptor (optional - for error handling)
api.interceptors.response.use((res) => {
  response++

  const appStore = useAppStore();

  if(response === request){
    setTimeout(()=> {
      (appStore.setLoading(false), response = 0, request = 0);
    }, 1500)
  } 

  return res.data;
}, 
(error) => {
  const appStore = useAppStore();

  setTimeout(()=> { appStore.setLoading(false); }, 1500)

  response = 0
  request = 0
// Handle common errors
  if (error.response) {
    // Server responded with error status
    return Promise.reject(error.response.data);
  } else if (error.request) {
    // Request made but no response received
    return Promise.reject({ error: { message: 'Network error', code: 'NETWORK_ERROR' } });
  } else {
    // Something else happened
    return Promise.reject(error);
  }
});

export default api;

// Example: Campaign API service
// TODO: Create services/campaignService.js for campaign-specific API calls
// You can import this api instance there
