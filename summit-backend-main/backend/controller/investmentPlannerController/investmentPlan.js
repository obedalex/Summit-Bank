const InvestmentPlan = require("../../models/InvestmentPlan");

// Create a new investment plan
const createPlan = async (req, res) => {
  try {
    const { title, description, minAmount, maxAmount, interestRate, durationDays } = req.body;

    const plan = await InvestmentPlan.create({
      title,
      description,
      minAmount,
      maxAmount,
      interestRate,
      durationDays,
      isActive: true,
    });

    return res.status(201).json({
      message: "Investment plan created successfully",
      plan,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all plans
const getPlans = async (req, res) => {
  try {
    const plans = await InvestmentPlan.find({ isActive: true });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPlan, getPlans };
