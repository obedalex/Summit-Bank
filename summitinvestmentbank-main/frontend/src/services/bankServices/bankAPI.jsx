// src/services/bankService.js
import axios from "axios";

/* ============================================================
    AXIOS INSTANCE
============================================================ */
const API = axios.create({
  baseURL: "https://summit-backend-euew.onrender.com/api/banks",
  // baseURL: "http://localhost:5000/api/banks",
  timeout: 30000,
  withCredentials: true,
});

// Attach JWT for every request
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjE3OTRiMTcwOWI3ZDNjYzE2OWRmYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NDMxOTA0LCJleHAiOjE3NjUwMzY3MDR9.r6HbrfHCZmlGvEg4ONtYbgHGLRaci8tYhE0IPSW2neg";

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ============================================================
    ADD BANK ACCOUNT  (POST /add)
============================================================ */
export const addBankAccount = (payload) => {
  // payload = { bankName, accountName, accountNumber, swiftCode, country }
  return API.post("/add", payload);
};

/* ============================================================
    GET ALL BANK LIST  (GET /allbanks)
============================================================ */
export const getAllBankList = () => {
  return API.get("/allbanks");
};

/* ============================================================
    GET USER BANK ACCOUNTS  (GET /userbanks)
============================================================ */
export const getUserBankAccounts = () => {
  return API.get("/userbanks");
};

/* ============================================================
    DELETE BANK ACCOUNT  (DELETE /:id)
============================================================ */
export const deleteBankAccount = (id) => {
  return API.delete(`/${id}`);
};

/* ============================================================
    SET DEFAULT BANK ACCOUNT (PUT /default/:id)
============================================================ */
export const setDefaultBank = (id) => {
  return API.put(`/default/${id}`);
};

/* ============================================================
    GET SUMMARY OF ALL BANKS WALLET ACCOUNTS BALANCE
============================================================ */
export const getBankSummary = async () => {
  return await API.get("/summary");
};

/* ============================================================
    EXPORT AS DEFAULT OBJECT
============================================================ */
export default {
  addBankAccount,
  getAllBankList,
  getUserBankAccounts,
  deleteBankAccount,
  setDefaultBank,
  getBankSummary
};
