// src/services/walletAPI.js
import API from "./AdminBaseAPI";

// ================================
// ALL GET USERS 
// ================================

export const getAllUsers = () => API.get("/wallet/users");

// ================================
// CREATE WALLET BY ADMIN
// ================================
export const createWallet = (data) =>
  API.post("/wallet/create", data);
// ================================
// WALLET LIST + SEARCH
// ================================
export const getAllWallets = (page = 1, limit = 20, search = "") =>
  API.get(`/wallet`, {
    params: { page, limit, search },
  });

// ================================
// GET SINGLE WALLET + USER
// ================================
export const getSingleWallet = (walletId) =>
  API.get(`/wallet/${walletId}`);

// ================================
// CREDIT WALLET
// ================================
export const creditWallet = (walletId, data) =>
  API.post(`/wallet/${walletId}/credit`, data);

// ================================
// DEBIT WALLET
// ================================
export const debitWallet = (walletId, data) =>
  API.post(`/wallet/${walletId}/debit`, data);

// ================================
// FREEZE WALLET
// ================================
export const freezeWallet = (walletId) =>
  API.patch(`/wallet/${walletId}/freeze`);

// ================================
// UNFREEZE WALLET
// ================================
export const unfreezeWallet = (walletId) =>
  API.patch(`/wallet/${walletId}/unfreeze`);

// ================================
// UPDATE WALLET DETAILS
// ================================
export const updateWallet = (walletId, updates) =>
  API.patch(`/wallet/${walletId}/update`, updates);

// ================================
// DELETE WALLET (SOFT DELETE)
// ================================
export const deleteWallet = (walletId) =>
  API.delete(`/wallet/${walletId}`);

// ================================
// LEDGER / TRANSACTIONS
// ================================
export const getWalletTransactions = (walletId) =>
  API.get(`/wallet/${walletId}/transactions`);

// Reverse specific transaction
export const reverseTransaction = (walletId, transactionId) =>
  API.post(`/wallet/${walletId}/transactions/${transactionId}/reverse`);

// ================================
// WALLET LIMITS
// ================================
export const setWalletLimits = (walletId, limits) =>
  API.post(`/wallet/${walletId}/limits`, limits);

// ================================
// AUDIT LOGS
// ================================
export const getWalletAuditLogs = (walletId) =>
  API.get(`/wallet/${walletId}/audit-logs`);


// ================================
// EDIT TRANSACTIONS
// ================================
export const editTransactions = (walletId, transactionId, updateData) =>
  API.put(`/wallet/${walletId}/transactions/${transactionId}`, updateData);
