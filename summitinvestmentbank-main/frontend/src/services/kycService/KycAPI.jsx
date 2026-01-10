// src/services/kycService.js
import axios from "axios";

const API = axios.create({
  baseURL:  "https://summit-backend-euew.onrender.com", // e.g. http://localhost:5000
  timeout: 30000,
  withCredentials:true
});



// Attach token to every request
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjE3OTRiMTcwOWI3ZDNjYzE2OWRmYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NDMxOTA0LCJleHAiOjE3NjUwMzY3MDR9.r6HbrfHCZmlGvEg4ONtYbgHGLRaci8tYhE0IPSW2neg";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const submitKYC = (formData, onUploadProgress) =>
  API.post("/api/kyc/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });

export const getKycStatus = () => API.get("/api/kyc/status");

export default API;
