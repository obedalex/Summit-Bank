import API from "../AdminBaseAPI";

/* ============================================================
   ADMIN AUTH — LOGIN
============================================================ */
export const adminLogin = async (payload) => {
  /**
   * payload = { email, password }
   */
  return await API.post("/login", payload);
};

/* ============================================================
   CREATE ADMIN ACCOUNT
============================================================ */
export const createAdmin = async (payload) => {
  /**
   * payload = { name, email, password, role }
   */
  return await API.post("/create-admin", payload);
};

/* ============================================================
   USER MANAGEMENT
============================================================ */

// Fetch all users
export const getAllUsers = async () => {
  return await API.get("/users");
};

// Get single user
export const getSingleUser = async (id) => {
  return await API.get(`/users/${id}`);
};

// Update user
export const updateUser = async (id, payload) => {
  return await API.put(`/users/${id}`, payload);
};

// Delete user
export const deleteUser = async (id) => {
  return await API.delete(`/users/${id}`);
};

/* ============================================================
   TRANSACTION MANAGEMENT
============================================================ */

// Get all transactions
export const getAllTransactions = async () => {
  return await API.get("/transactions");
};

// Update transaction status
export const updateTransactionStatus = async (id, payload) => {
  /**
   * payload = { status: "approved" | "declined" }
   */
  return await API.put(`/transactions/${id}`, payload);
};

/* ============================================================
   INVESTMENT MANAGEMENT
============================================================ */

// Get all investments
export const getAllInvestments = async () => {
  return await API.get("/investments");
};

// Update investment status
export const updateInvestmentStatus = async (id, payload) => {
  /**
   * payload = { status: "approved" | "declined" }
   */
  return await API.put(`/investments/${id}`, payload);
};

/* ============================================================
   DASHBOARD STATS
============================================================ */
export const getDashboardStats = async () => {
  return await API.get("/dashboard/stats");
};

/* ============================================================
   EXPORT DEFAULT FOR CONVENIENCE
============================================================ */
export default {
  adminLogin,
  createAdmin,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllTransactions,
  updateTransactionStatus,
  getAllInvestments,
  updateInvestmentStatus,
  getDashboardStats,
};
