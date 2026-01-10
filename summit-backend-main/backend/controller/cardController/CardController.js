const Card = require("../../models/Cards");
const CardTransaction = require("../../models/CardTransaction");
const crypto = require("crypto");

// Money engine
const {
  creditWallet,
  debitWallet,
  creditCard,
  debitCard,
  debitBankAccount,
  creditBankAccount,
} = require("../../utils/EngineMoneyController/EngineMoney");

// Generate Card Number
const generateCardNumber = () => {
  return (
    "5043" +
    Math.floor(Math.random() * 1e12)
      .toString()
      .padStart(12, "0")
  );
};

/* ============================================================
   TOTAL AMOUNT IN CARDS (SUMMARY)
============================================================ */
const totalUserCardSummary = async (req, res) => {
  try {
    // Fetch only needed fields for better performance
    const accounts = await Card.find(
      { userId: req.user.id },
      { balance: 1 }
    ).lean();

    const totalCards = accounts.length;

    // Sum all balances safely
    const totalBalance = accounts.reduce(
      (sum, acc) => sum + (Number(acc.balance) || 0),
      0
    );

    const formattedBalance = totalBalance.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return res.json({
      message: "Card summary fetched",
      totalCards,
      totalBalance,
      formattedBalance,
      currency: "USD",
    });

  } catch (err) {
    console.error("Card summary error:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};


/* ============================================================
   CREATE CARD
============================================================ */
const createCard = async (req, res) => {
  try {
    const { cardName, cardType, color } = req.body;

    const card = await Card.create({
      userId: req.user.id,
      cardName,
      cardType,
      color,
      cardNumber: generateCardNumber(),
    });

    res.json({ message: "Card created successfully", card });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

/* ============================================================
   GET USER CARDS
============================================================ */
const getUserCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   GET CARD BY ID
============================================================ */
const getCardById = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.cardId,
      userId: req.user.id,
    });

    if (!card) return res.status(404).json({ message: "Card not found" });

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   DELETE CARD
============================================================ */
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({
      _id: req.params.cardId,
      userId: req.user.id,
    });

    if (!card) return res.status(404).json({ message: "Card not found" });

    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   FREEZE CARD
============================================================ */
const freezeCard = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.cardId,
      userId: req.user.id,
    });

    if (!card) return res.status(404).json({ message: "Card not found" });

    card.isFrozen = true;
    await card.save();

    res.json({ message: "Card frozen successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   UNFREEZE CARD
============================================================ */
const unfreezeCard = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.cardId,
      userId: req.user.id,
    });

    if (!card) return res.status(404).json({ message: "Card not found" });

    card.isFrozen = false;
    await card.save();

    res.json({ message: "Card unfrozen successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   SET DEFAULT CARD
============================================================ */
const setDefaultCard = async (req, res) => {
  try {
    await Card.updateMany({ userId: req.user.id }, { isDefault: false });

    const card = await Card.findOneAndUpdate(
      { _id: req.params.cardId, userId: req.user.id },
      { isDefault: true },
      { new: true }
    );

    if (!card) return res.status(404).json({ message: "Card not found" });

    res.json({ message: "Card set as default", card });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   DEPOSIT INTO CARD
============================================================ */
const cardDeposit = async (req, res) => {
  try {
    const { cardId, amount } = req.body;

    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (card.isFrozen)
      return res.status(403).json({ message: "Card is frozen" });

    card.balance += amount;
    await card.save();

    await CardTransaction.create({
      userId: req.user.id,
      cardId,
      type: "deposit",
      amount,
      reference: crypto.randomUUID(),
    });

    res.json({ message: "Deposit successful", balance: card.balance });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   WITHDRAW FROM CARD
============================================================ */
const cardWithdraw = async (req, res) => {
  try {
    const { cardId, amount } = req.body;

    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (card.isFrozen)
      return res.status(403).json({ message: "Card is frozen" });

    if (card.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    card.balance -= amount;
    await card.save();

    await CardTransaction.create({
      userId: req.user.id,
      cardId,
      type: "withdraw",
      amount,
      reference: crypto.randomUUID(),
    });

    res.json({ message: "Withdrawal successful", balance: card.balance });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ============================================================
   🔥🔥 MASTER TRANSFER CONTROLLER 🔥🔥
============================================================ */

const transferBetweenCardsOrWallet = async (req, res) => {
  try {
    const {
      direction,
      amount,

      fromCardId,
      toCardId,

      fromBankId,
      toBankId,
    } = req.body;

    const userId = req.user.id;

    if (!direction || !amount)
      return res.status(400).json({ message: "Direction and amount required" });

    if (amount <= 0)
      return res.status(400).json({ message: "Amount must be greater than 0" });

    /* ============================================================
       CARD → WALLET
    ============================================================= */
    if (direction === "card-to-wallet") {
      if (!fromCardId)
        return res.status(400).json({ message: "fromCardId required" });

      await debitCard(fromCardId, userId, amount, "transfer-out", "WALLET");
      await creditWallet(userId, amount, "transfer-in", "CARD");

      return res.json({ message: "Card to wallet transfer successful" });
    }

    /* ============================================================
       WALLET → CARD
    ============================================================= */
    if (direction === "wallet-to-card") {
      if (!toCardId)
        return res.status(400).json({ message: "toCardId required" });

      await debitWallet(userId, amount, "transfer-out", "CARD");
      await creditCard(toCardId, userId, amount, "transfer-in", "WALLET");

      return res.json({ message: "Wallet to card transfer successful" });
    }

    /* ============================================================
       CARD → CARD
    ============================================================= */
    if (direction === "card-to-card") {
      if (!fromCardId || !toCardId)
        return res.status(400).json({
          message: "fromCardId and toCardId required",
        });

      await debitCard(fromCardId, userId, amount, "transfer-out", "CARD");
      await creditCard(toCardId, userId, amount, "transfer-in", "CARD");

      return res.json({ message: "Card to card transfer successful" });
    }

    /* ============================================================
       CARD → BANK
    ============================================================= */
    if (direction === "card-to-bank") {
      if (!fromCardId || !toBankId)
        return res.status(400).json({
          message: "fromCardId and toBankId required",
        });

      await debitCard(fromCardId, userId, amount, "transfer-out", "BANK");
      await creditBankAccount(toBankId, userId, amount, "transfer-in", "CARD");

      return res.json({ message: "Card to bank transfer successful" });
    }

    /* ============================================================
       BANK → CARD
    ============================================================= */
    if (direction === "bank-to-card") {
      if (!fromBankId || !toCardId)
        return res.status(400).json({
          message: "fromBankId and toCardId required",
        });

      await debitBankAccount(fromBankId, userId, amount, "transfer-out", "CARD");
      await creditCard(toCardId, userId, amount, "transfer-in", "BANK");

      return res.json({ message: "Bank to card transfer successful" });
    }

    /* ============================================================
       BANK → WALLET
    ============================================================= */
    if (direction === "bank-to-wallet") {
      if (!fromBankId)
        return res.status(400).json({ message: "fromBankId required" });

      await debitBankAccount(fromBankId, userId, amount, "transfer-out", "WALLET");
      await creditWallet(userId, amount, "transfer-in", "BANK");

      return res.json({ message: "Bank to wallet transfer successful" });
    }

    /* ============================================================
       WALLET → BANK
    ============================================================= */
    if (direction === "wallet-to-bank") {
      if (!toBankId)
        return res.status(400).json({ message: "toBankId required" });

      await debitWallet(userId, amount, "transfer-out", "BANK");
      await creditBankAccount(toBankId, userId, amount, "transfer-in", "WALLET");

      return res.json({ message: "Wallet to bank transfer successful" });
    }

    /* ============================================================
       BANK → BANK
    ============================================================= */
    if (direction === "bank-to-bank") {
      if (!fromBankId || !toBankId)
        return res.status(400).json({
          message: "fromBankId and toBankId required",
        });

      await debitBankAccount(fromBankId, userId, amount, "transfer-out", "BANK");
      await creditBankAccount(toBankId, userId, amount, "transfer-in", "BANK");

      return res.json({ message: "Bank to bank transfer successful" });
    }

    return res
      .status(400)
      .json({ message: "Invalid transfer direction specified" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   GET CARD TRANSACTIONS
============================================================ */
const getCardTransactions = async (req, res) => {
  try {
    const transactions = await CardTransaction.find({
      cardId: req.params.cardId,
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  totalUserCardSummary,
  createCard,
  getUserCards,
  getCardById,
  deleteCard,
  freezeCard,
  unfreezeCard,
  setDefaultCard,
  cardDeposit,
  cardWithdraw,
  transferBetweenCardsOrWallet,
  getCardTransactions,
};
