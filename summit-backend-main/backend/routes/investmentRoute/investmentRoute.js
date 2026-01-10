const express = require("express");
const {
  createInvestment,
  getMyInvestments,
} = require("../../controller/investmentController/investmentController");

const auth = require("../../auth/jwtAuth");

const router = express.Router();

router.post("/create", auth, createInvestment);
router.get("/me", auth, getMyInvestments);

module.exports = router;
