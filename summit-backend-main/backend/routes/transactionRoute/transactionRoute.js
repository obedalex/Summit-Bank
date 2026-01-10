const express = require("express");
const {
  deposit,
  withdraw,
  getTransactions,
} = require("../../controller/transactionController/transactionController");
// const rateLimit = require("rate-limit")

const auth = require("../../auth/jwtAuth");

const router = express.Router();

router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);
router.get("/", auth, getTransactions);

module.exports = router;
