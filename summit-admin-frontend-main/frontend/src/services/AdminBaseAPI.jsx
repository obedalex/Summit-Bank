// src/services/axiosConfig.js
import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5001/api/admin", // 👈 base
// baseURL:"https://summit-admin-backend.onrender.com/api/admin",(previously used)
baseURL:"https://summit-bank-backend-admin.onrender.com/api/admin",
  withCredentials: true,
});

// Attach token on every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjFhZTViMzkyNDlkYmE3YzcyZTg1NCIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzY0NjAzNzA5LCJleHAiOjE3NjQ2OTAxMDl9.OlPbupXySaLLIah5QfjlFOOw4751PRVMMxBCzBUkDBs"; // 👈 your token key

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: auto-handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401
    ) {
      console.warn("❗Unauthorized — token may be expired.");
      // You can optionally logout here
    }

    return Promise.reject(error);
  }
);

export default API;
