const Wallet = require("../../models/Wallet");
const Card = require("../../models/Cards");
const bankAccount = require("../../models/BankAccount");
const crypto = require("crypto");
const { validateWalletLimits,updateDailySpent } = require("../limitValidator/limitValidator");

// Format timestamp
const formatDate = () => {
  const now = new Date();
  return now.toISOString().replace("T", " ").slice(0, 19);
};

// Generate readable transaction reference
const generateRef = (type, source, destination) => {
  return `${type.toUpperCase()} | ${source} → ${destination} | ${formatDate()}`;
};

/* ============================================
   WALLET CREDIT
============================================ */
async function creditWallet(_id, amount, type = "deposit", source = "UNKNOWN") {
  let wallet = await Wallet.findOne({ _id });
  if (!wallet) wallet = await Wallet.create({ userId, balance: 0 });

  await validateWalletLimits(_id, amount);

  wallet.balance += amount;

  wallet.ledger.push({
    type,
    amount,
    reference: generateRef(type, source, "WALLET")
  });

    await updateDailySpent(_id,amount)

  await wallet.save();
  return wallet;
}

/* ============================================
   WALLET DEBIT
============================================ */
async function debitWallet(_id, amount, type = "withdraw", destination = "UNKNOWN") {
  const wallet = await Wallet.findOne({ _id});
  // console.log("the current balance is",wallet.balance)
  // console.log("the current amount is",amount)

    await validateWalletLimits(_id, amount);


  if (!wallet || wallet.balance < amount) {
    throw new Error("Insufficient wallet balance");
  }

  wallet.balance -= amount;

  wallet.ledger.push({
    type,
    amount,
    reference: generateRef(type, "WALLET", destination)
  });

  await updateDailySpent(_id,amount)

  await wallet.save();
  return wallet;
}

/* ============================================
   CARD CREDIT
============================================ */
async function creditCard(cardId, userId, amount, type = "deposit", source = "UNKNOWN") {
  const card = await Card.findOne({ _id: cardId, userId });
  if (!card) throw new Error("Card not found");
  if (card.isFrozen) throw new Error("Card is frozen");

  card.balance += amount;

  card.ledger.push({
    type,
    amount,
    reference: generateRef(type, source, "CARD")
  });

  await card.save();
  return card;
}

/* ============================================
   CARD DEBIT
============================================ */
async function debitCard(cardId, userId, amount, type = "withdraw", destination = "UNKNOWN") {
  const card = await Card.findOne({ _id: cardId, userId });
  if (!card) throw new Error("Card not found");
  if (card.isFrozen) throw new Error("Card is frozen");
  if (card.balance < amount) throw new Error("Insufficient card balance");

  card.balance -= amount;

  card.ledger.push({
    type,
    amount,
    reference: generateRef(type, "CARD", destination)
  });

  await card.save();
  return card;
}

/* ============================================
   BANK CREDIT
============================================ */
async function creditBankAccount(bankId, userId, amount, type = "deposit", source = "UNKNOWN") {
  const bank = await bankAccount.findOne({ _id: bankId, userId });
  if (!bank) throw new Error("Bank account not found");

  bank.balance = (bank.balance || 0) + amount;

  bank.ledger.push({
    type,
    amount,
    reference: generateRef(type, source, "BANK")
  });

  await bank.save();
  return bank;
}

/* ============================================
   BANK DEBIT
============================================ */
async function debitBankAccount(bankId, userId, amount, type = "withdraw", destination = "UNKNOWN") {
  const bank = await bankAccount.findOne({ _id: bankId, userId });
  if (!bank) throw new Error("Bank account not found");

  if ((bank.balance || 0) < amount) {
    throw new Error("Insufficient bank balance");
  }

  bank.balance -= amount;

  bank.ledger.push({
    type,
    amount,
    reference: generateRef(type, "BANK", destination)
  });

  await bank.save();
  return bank;
}

module.exports = {
  creditWallet,
  debitWallet,
  creditCard,
  debitCard,
  creditBankAccount,
  debitBankAccount,
};
