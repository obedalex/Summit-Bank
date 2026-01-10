const router = require("express").Router();

const adminAuth = require("../../auth/adminAuth");
const {
  loginAdmin,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllTransactions,
  updateTransactionStatus,
  getAllInvestments,
  updateInvestmentStatus,
  getDashboardStats,
  createAdmin,
  
} = require("../../controller/adminController/adminController");

//signup admin
router.post("/create-admin", createAdmin);

// Login
router.post("/login",loginAdmin);

// =======================================================
// USER MANAGEMENT
// =======================================================

// Get all users
router.get("/users",adminAuth, getAllUsers);

// Get single user
router.get("/users/:id",adminAuth, getSingleUser);

// Update user
router.put("/users/:id",adminAuth, updateUser);

// Delete user
router.delete("/users/:id",adminAuth, deleteUser);

// =======================================================
// TRANSACTION MANAGEMENT
// =======================================================

// Get all transactions
router.get("/transactions",adminAuth, getAllTransactions);

// Update transaction status
router.put("/transactions/:id",adminAuth,updateTransactionStatus);

// =======================================================
// INVESTMENT MANAGEMENT
// =======================================================

// Get all investments
router.get("/investments",adminAuth, getAllInvestments);

// Update investment status
router.put("/investments/:id", adminAuth,updateInvestmentStatus);

// =======================================================
// DASHBOARD STATISTICS
// =======================================================

router.get("/dashboard/stats",adminAuth, getDashboardStats);

module.exports = router;
