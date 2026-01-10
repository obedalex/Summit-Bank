import axios from "axios";

const API = axios.create({
  baseURL:  "https://summit-backend-euew.onrender.com", // e.g. http://localhost:5000
//   baseURL:"http://localhost:5000",
  timeout: 30000,
  withCredentials:true
});



// Attach token to every request
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token") ||
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjE3OTRiMTcwOWI3ZDNjYzE2OWRmYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzYzODgzMzc5LCJleHAiOjE3NjQ0ODgxNzl9.Zjp6SkzWMO31kWAOj18fINqnb27gAvET92h6pz4w770";
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjE3OTRiMTcwOWI3ZDNjYzE2OWRmYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NDMxOTA0LCJleHAiOjE3NjUwMzY3MDR9.r6HbrfHCZmlGvEg4ONtYbgHGLRaci8tYhE0IPSW2neg"

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ==========================
// WALLET API SERVICE
// ==========================


// create new wallet ... note for a user,note : you only have one main wallet

export const createWallet = (data)=>API.post("api/wallet/create",data)


// get the main wallet
export const getWallet =()=>API.get("api/wallet")

// credit the main wallet with money
export const creditWallet = (data)=>API.post("api/wallet/credit",data)


// credit the main wallet with money
export const debitWallet = (data)=>API.post("api/wallet/debit",data)