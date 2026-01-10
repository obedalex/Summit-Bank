const BankAccount = require("../../models/BankAccount");
const BankList = require("../../models/BanksList"); // Optional: for validating bank names


// ===========================
// get all bank list
// ===========================

const getAllBankList = async(req,res)=>{
  try{
    const banks = await BankList.find().lean()

    res.status(201).json({message:"all banks", data:banks})
  }catch(err){
        res.status(500).json({ message: "Server Error", error: err.message });
  }
}

// ===========================
// ADD BANK ACCOUNT
// ===========================

const addBankAccount = async (req, res) => {
  try {
    const { bankName, accountName, accountNumber, swiftCode, country } = req.body;

    if (!bankName || !accountName || !accountNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optional: Check if bank exists in your bank list
    const bankExists = await BankList.findOne({ bankName });
    if (!bankExists) {
      return res.status(400).json({ message: "Invalid bank selected" });
    }

    const existingAccount = await BankAccount.findOne({
      userId: req.user.id,
      accountNumber,
    });

    if (existingAccount) {
      return res.status(400).json({ message: "This bank account already exists" });
    }

    const bankAccount = await BankAccount.create({
      userId: req.user.id,
      bankName,
      accountName,
      accountNumber,
      swiftCode,
      country,
      bankLogo:bankExists.bankLogo,
      isDefault: false,
    });

    res.json({ message: "Bank account added", bankAccount });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ===========================
// GET USER BANK ACCOUNTS
// ===========================
const getUserBankAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ===========================
// DELETE BANK ACCOUNT
// ===========================
const deleteBankAccount = async (req, res) => {
  try {
    const account = await BankAccount.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!account) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    res.json({ message: "Bank account removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ===========================
// SET DEFAULT BANK ACCOUNT
// ===========================
const setDefaultBank = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove default from all user accounts
    await BankAccount.updateMany({ userId: req.user.id }, { isDefault: false });

    // Set selected account as default
    const updated = await BankAccount.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isDefault: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    res.json({ message: "Default bank account set", account: updated });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ===========================
// USER BANK SUMMARY
// ===========================
const totalUserBankSummary = async (req, res) => {
  try {
    // Fetch only necessary fields for performance
    const accounts = await BankAccount.find(
      { userId: req.user.id },
      { balance: 1 }
    );

    const totalBanks = accounts.length;

    // sum all balances
    const totalBalance = accounts.reduce(
      (sum, acc) => sum + (acc.balance || 0),
      0
    );

    const formattedBalance = totalBalance.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    res.json({
      message: "Bank summary fetched",
      totalBanks,
      totalBalance,
      formattedBalance,
      currency: "USD",
    });

  } catch (err) {
    console.log("Bank summary error:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};



module.exports = {
  addBankAccount,
  getUserBankAccounts,
  deleteBankAccount,
  setDefaultBank,
  getAllBankList,
  totalUserBankSummary
};
