
const {
  creditWallet,
  debitWallet,
} = require("../../utils/EngineMoneyController/EngineMoney");
const mongoose = require("mongoose")

const Wallet = require("../../models/Wallet");
const User = require("../../models/User");


//generate Main Wallet Number
const generateWalletNumber = () =>{
  return (
    "4961" + 
    Math.floor(Math.random() * 1e12)
    .toString()
    .padStart(18,"0")
  )
} 

const generateExpMonth = () => {
  return Math.floor(Math.random() * 12) + 1; // returns 1 to 12
};

const generateExpYear = () => {
  return `20${Math.floor(Math.random() * (50 - 25 + 1)) + 27}`; // returns 27 to 35
};


/*
========================
GET ALL USERS 
===================
*/
const getAllUsers = async (req, res) => {
  try {
    const db = mongoose.connection.db;

    const users = await db
      .collection("users")       // 👈 DIRECT DB CALL
      .aggregate([
        {
          $project: {
            password: 0,
            withdrawPin: 0,
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();                // Required when using raw collection
// console.log("all users",users)

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};



/*
========================
CREATE MAIN WALLET 
===================
*/
 
const createWallet = async (req, res) => {
  try {
    const { balance,cardholder,userId,cvvHash } = req.body;

    const wallet = await Wallet.create({
      userId,
      balance,
      cardholder,
      cvvHash,
      expMonth:generateExpMonth(),
      expYear:generateExpYear(),
      walletNumber: generateWalletNumber(),
    });

    res.json({ message: "Summit Wallet is Created successfully", wallet });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



/* ============================================================
   1. GET ALL WALLETS (Paginated + Search)
============================================================ */
const adminGetAllWallets = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;

    const query = search
      ? {
          $or: [
            { walletName: { $regex: search, $options: "i" } },
            { walletNumber: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const wallets = await Wallet.find(query)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Wallet.countDocuments(query);

    return res.json({
      wallets,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   2. GET SINGLE WALLET + USER
============================================================ */
const adminGetSingleWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.walletId);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const user = await User.findById(wallet.userId).select("-password");

    return res.json({ wallet, user });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   3. ADMIN CREDIT WALLET
============================================================ */
const adminCreditWallet = async (req, res) => {
  try {
    const { amount, memo } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const walletId = req.params.walletId;

    const updatedWallet = await creditWallet(
      walletId,
      Number(amount),
      "transfer-in",
      "ADMIN"
    );

    return res.json({
      message: "Wallet credited successfully",
      wallet: updatedWallet,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   4. ADMIN DEBIT WALLET
============================================================ */
const adminDebitWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const walletId = req.params.walletId;

    const updatedWallet = await debitWallet(
      walletId,
      Number(amount),
      "withdraw",
      "ADMIN"
    );

    return res.json({
      message: "Wallet debited successfully",
      wallet: updatedWallet,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   5. FREEZE WALLET
============================================================ */
const adminFreezeWallet = async (req, res) => {
  try {
    await Wallet.findByIdAndUpdate(req.params.walletId, {
      status: "frozen",
    });

    return res.json({ message: "Wallet frozen successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   6. UNFREEZE WALLET
============================================================ */
const adminUnfreezeWallet = async (req, res) => {
  try {
    await Wallet.findByIdAndUpdate(req.params.walletId, {
      status: "active",
    });

    return res.json({ message: "Wallet unfrozen successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   7. UPDATE WALLET DETAILS
============================================================ */
const adminUpdateWallet = async (req, res) => {
  try {
    const walletId = req.params.walletId;
    const updates = req.body;

    // Check if wallet exists first
    const existing = await Wallet.findById(walletId);

    if (!existing) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Perform safe update
    const updatedWallet = await Wallet.findByIdAndUpdate(
      walletId,
      updates,
      { new: true }
    );

    return res.json({
      message: "Wallet updated successfully",
      wallet: updatedWallet,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


/* ============================================================
   8. SOFT DELETE WALLET
============================================================ */
const adminDeleteWallet = async (req, res) => {
  try {
    await Wallet.findByIdAndUpdate(req.params.walletId, {
      deleted: true,
    });

    return res.json({ message: "Wallet deleted successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   9. VIEW WALLET TRANSACTIONS (LEDGER)
============================================================ */
const adminViewWalletTransactions = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.walletId);

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    return res.json(wallet.ledger || []);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   EDIT WALLET TRANSACTION
============================================================ */

const adminEditWalletTransactions = async (req, res) => {
  try {
    const { memo, createdAt, reference } = req.body;
    const { walletId, transactionId } = req.params;

    // FIND WALLET
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // FIND THE TRANSACTION IN LEDGER
    const tx = wallet.ledger.id(transactionId);
    if (!tx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // UPDATE ALLOWED FIELDS
    if (memo !== undefined) tx.memo = memo;
    if (reference !== undefined) tx.reference = reference;
    if (createdAt !== undefined) tx.createdAt = new Date(createdAt);

    // SAVE WALLET
    await wallet.save();
 
    return res.json({
      message: "Transaction updated successfully",
      updatedTransaction: tx,
    });

  } catch (err) {
    console.log("error",err.message)
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   10. REVERSE TRANSACTION
============================================================ */
const adminReverseTransaction = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.walletId);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const transaction = wallet.ledger.id(req.params.transactionId);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.reversed)
      return res.status(400).json({ message: "Transaction already reversed" });

    const amount = transaction.amount;

    // Calculate new balance
    wallet.balance =
      transaction.type === "credit"
        ? wallet.balance - amount
        : wallet.balance + amount;

    // Add new ledger entry
    wallet.ledger.push({
      type:
        transaction.type === "credit" ? "reverse-credit" : "reverse-debit",
      amount,
      memo: `Reversal of transaction ${transaction._id}`,
      date: new Date(),
      adminId: req.admin.id,
    });

    // Mark original as reversed
    transaction.reversed = true;

    await wallet.save();

    return res.json({ message: "Transaction reversed successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
  
/* ============================================================
   11. SET WALLET LIMITS
============================================================ */
const adminSetWalletLimits = async (req, res) => {
  try {
    const { maxDailyTransfer, maxSingleTransfer } = req.body;

    await Wallet.findByIdAndUpdate(req.params.walletId, {
      "limits.maxDailyTransfer": maxDailyTransfer,
      "limits.maxSingleTransfer": maxSingleTransfer,
    });

    return res.json({ message: "Wallet limits updated successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   12. VIEW WALLET AUDIT LOGS
============================================================ */
const adminViewWalletAuditLogs = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.walletId);

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    return res.json(wallet.auditLogs || []);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createWallet,
  getAllUsers,
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
};
