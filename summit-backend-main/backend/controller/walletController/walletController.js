const Wallet = require("../../models/Wallet");
const calculateFee = require("../../utils/calculateFee/calculateFee");

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
CREATE MAIN WALLET 
===================
*/
 
const createWallet = async (req, res) => {
  try {
    const { balance,cardholder,cvvHash,userId} = req.body;

    const wallet = await Wallet.create({
      userId: userId,
      balance,
      cardholder,
      expMonth:generateExpMonth(),
      expYear:generateExpYear(),
      walletNumber: generateWalletNumber(),
    });

    res.json({ message: "Summit Wallet is Created successfully", wallet });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const creditWallet = async (userId, amount, reference, type) => {
 const feeTiers = [
  { max: 99, fee: 0.5 },
  { max: 199, fee: 1 },
  { max: 499, fee: 2 },
  { max: 999, fee: 3.5 },
];
// Default fee for amounts over 1000
const percentageFee = 0.005; // 0.5%

const fee = await calculateFee(feeTiers,amount,percentageFee) 

  let wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    wallet = await Wallet.create({ userId, balance: 0 });
  }

  wallet.balance += amount;
  wallet.ledger.push({ type, amount, reference,fee });
  await wallet.save();
};

const debitWallet = async (userId, amount, reference, type) => {
  const feeTiers = [
  { max: 99, fee: 0.5 },
  { max: 199, fee: 1 },
  { max: 499, fee: 2 },
  { max: 999, fee: 3.5 },
  { max: 1099, fee: 4.5 },
  { max: 1199, fee: 5.5 },
  { max: 1499, fee: 6.5 },
];
// Default fee for amounts over 1000
const percentageFee = 0.005; // 0.5%

const fee = await calculateFee(feeTiers,amount,percentageFee) 

  const wallet = await Wallet.findOne({ userId });
  if (!wallet || wallet.balance < amount) throw new Error("Insufficient balance");

  wallet.balance -= amount;
  wallet.ledger.push({ type, amount, reference,fee });
  await wallet.save();
};


module.exports = {getWallet,creditWallet,debitWallet,createWallet}