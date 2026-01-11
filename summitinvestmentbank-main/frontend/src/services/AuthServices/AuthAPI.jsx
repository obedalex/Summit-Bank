import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "https://summit-bank-backend-1.onrender.com",
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


export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);

  // Save token for future requests
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res;
};



