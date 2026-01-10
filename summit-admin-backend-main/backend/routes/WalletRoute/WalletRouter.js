const router = require("express").Router();
const adminAuth = require("../../auth/adminAuth");

const {
  getAllUsers,
  createWallet,
  adminGetAllWallets,
  adminGetSingleWallet,
  adminCreditWallet,
  adminDebitWallet,
  adminFreezeWallet,
  adminUnfreezeWallet,
  adminUpdateWallet,
  adminDeleteWallet,
  adminViewWalletTransactions,
  adminReverseTransaction,
  adminSetWalletLimits,
  adminViewWalletAuditLogs,
  adminEditWalletTransactions
} = require("../../controller/WalletController/WalletController");

// ===========================================
// ADMIN WALLET ROUTES
// ===========================================

//get all users
router.get("/users",adminAuth,getAllUsers)
//create a wallet by admin
router.post("/create",adminAuth,createWallet)

// Get all wallets (pagination + search)
router.get("/", adminAuth, adminGetAllWallets);

// Get single wallet + user info
router.get("/:walletId", adminAuth, adminGetSingleWallet);

// Credit wallet
router.post("/:walletId/credit", adminAuth, adminCreditWallet);

// Debit wallet
router.post("/:walletId/debit", adminAuth, adminDebitWallet);

// Freeze wallet
router.patch("/:walletId/freeze", adminAuth, adminFreezeWallet);

// Unfreeze wallet
router.patch("/:walletId/unfreeze", adminAuth, adminUnfreezeWallet);

// Update wallet details
router.patch("/:walletId/update", adminAuth, adminUpdateWallet);

// Soft delete wallet
router.delete("/:walletId", adminAuth, adminDeleteWallet);

// View wallet transactions
router.get("/:walletId/transactions", adminAuth, adminViewWalletTransactions);

// Reverse a specific transaction
router.post(
  "/:walletId/transactions/:transactionId/reverse",
  adminAuth,
  adminReverseTransaction
);

// Set wallet transfer limits
router.post("/:walletId/limits", adminAuth, adminSetWalletLimits);

// View audit logs
router.get("/:walletId/audit-logs", adminAuth, adminViewWalletAuditLogs);


// edit transacion
router.put(
  "/:walletId/transactions/:transactionId",
  adminAuth,
  adminEditWalletTransactions
);

module.exports = router;
