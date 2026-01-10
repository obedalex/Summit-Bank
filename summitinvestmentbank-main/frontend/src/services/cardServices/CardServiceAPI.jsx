// src/services/kycService.js
import axios from "axios";

const API = axios.create({
  baseURL:  "https://summit-backend-euew.onrender.com", // e.g. http://localhost:5000
    // baseURL: "http://localhost:5000",

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

// ==========================
// CARDS API SERVICE
// ==========================

/* ============================================================
    GET SUMMARY OF ALL Card WALLET ACCOUNTS BALANCE
============================================================ */
export const getCardSummary = async () => {
  return await API.get("/api/cards/summary");
};

// Create a new card
export const createCard = (data) => API.post("/api/cards/create", data);

// Get all user cards
export const getUserCards = () => API.get("/api/cards/my-cards");

// Get details of a single card
export const getCardById = (cardId) => API.get(`/api/cards/${cardId}`);

// Delete card
export const deleteCard = (cardId) => API.delete(`/api/cards/${cardId}`);

// Freeze card
export const freezeCard = (cardId) => API.put(`/api/cards/${cardId}/freeze`);

// Unfreeze card
export const unfreezeCard = (cardId) => API.put(`/api/cards/${cardId}/unfreeze`);

// Set card as default
export const setDefaultCard = (cardId) => API.put(`/api/cards/${cardId}/default`);

// Deposit money to card
export const depositToCard = (cardId, data) =>
  API.post(`/api/cards/${cardId}/deposit`, data);

// Withdraw money from card
export const withdrawFromCard = (cardId, data) =>
  API.post(`/api/cards/${cardId}/withdraw`, data);

// Transfer between card & wallet
export const transferBetweenCardAndWallet = (data) =>
  API.post("/api/cards/transfer", data);

// Get card transaction history
export const getCardTransactions = (cardId) =>
  API.get(`/api/cards/${cardId}/transactions`);
