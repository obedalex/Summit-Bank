const Investment = require("../../models/Investment.js")

const InvestmentPlan = require("../../models/InvestmentPlan.js")
const { debitWallet, creditWallet } = require("../walletController/walletController");
const uuid = require("uuid").v4;

const createInvestment = async (req, res) => {
  try {
    const { planId, amount } = req.body;

    const plan = await InvestmentPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    if (amount < plan.minAmount || amount > plan.maxAmount)
      return res.status(400).json({ message: "Amount out of range" });

    const reference = uuid();
    await debitWallet(req.user.id, amount, reference, "investment");

    const expectedReturn = amount + (amount * plan.interestRate) / 100;

    const invest = await Investment.create({
      userId: req.user.id,
      planId,
      amount,
      expectedReturn,
      startDate: Date.now(),
      endDate: new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000),
    });

    res.json({ message: "Investment created", invest });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyInvestments = async (req, res) => {
  try {
    const inv = await Investment.find({ userId: req.user.id }).populate("planId");
    res.json(inv);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {createInvestment,getMyInvestments}