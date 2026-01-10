const express = require("express");
const { setWithdrawPin } = require("../../controller/pinController/withdrawPinController");
const auth = require("../../auth/jwtAuth");

const router = express.Router();

// User sets or updates withdrawal PIN
router.post("/set-pin", auth, setWithdrawPin);

module.exports = router;
