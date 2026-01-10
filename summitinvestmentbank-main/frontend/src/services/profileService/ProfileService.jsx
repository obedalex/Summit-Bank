import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "https://summit-backend-euew.onrender.com",
  timeout: 30000,
  withCredentials: true
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

// Fetch user data
export const getUserProfile = () => API.get("/api/user/profile");

// Update profile intro + image
export const updateUserProfile = (data) =>
  API.put("/api/user/profile/update", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Set or update withdraw PIN
export const updatePin = (data) =>
  API.post("/api/user/set-pin", data);
