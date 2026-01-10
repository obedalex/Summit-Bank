const User = require("../../models/User");
const Transaction = require("../../models/Transaction");
const Investment = require("../../models/Investment");
const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ---------------------------
// Helper: Create Token
// ---------------------------
const createToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET_ADMIN,
    { expiresIn: "1d" }
  );
};

// ==================================================================
// ADMIN SIGNUP (CREATE ADMIN ACCOUNT)
// ==================================================================
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if exists
    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPass,
      role: role || "support",
    });

    const token = createToken(admin);

    res.status(201).json({
      msg: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// ADMIN LOGIN
// ==================================================================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    // ❗ FIXED: Compare plaintext vs hashed password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    // Create token
    const token = createToken(admin);

    return res.json({
      msg: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
// ==================================================================
// USER MANAGEMENT
// ==================================================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
    res.json(updated);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ==================================================================
// TRANSACTIONS
// ==================================================================

const getAllTransactions = async (req, res) => {
  try {
    const txns = await Transaction.find().populate("userId", "fullname email");
    res.json(txns);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const txn = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!txn) return res.status(404).json({ msg: "Transaction not found" });

    res.json(txn);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ==================================================================
// INVESTMENTS
// ==================================================================

const getAllInvestments = async (req, res) => {
  try {
    const investments = await Investment.find().populate("userId", "fullname email");
    res.json(investments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateInvestmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const inv = await Investment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inv) return res.status(404).json({ msg: "Investment not found" });

    res.json(inv);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ==================================================================
// DASHBOARD ANALYTICS
// ==================================================================

const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const transactions = await Transaction.countDocuments();
    const investments = await Investment.countDocuments();

    const totalDeposits = await Transaction.aggregate([
      { $match: { type: "deposit", status: "approved" } },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);

    const totalInvested = await Investment.aggregate([
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);

    res.json({
      totalUsers: users,
      totalTransactions: transactions,
      totalInvestments: investments,
      totalDeposits: totalDeposits[0]?.sum || 0,
      totalInvested: totalInvested[0]?.sum || 0,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createAdmin,
  createToken,
  loginAdmin,
  getDashboardStats,
  updateTransactionStatus,
  getAllInvestments,
  getAllTransactions,
  updateInvestmentStatus,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
