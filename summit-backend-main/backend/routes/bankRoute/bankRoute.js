const router = require("express").Router();
const auth = require("../../auth/jwtAuth");

const {
  addBankAccount,
  getUserBankAccounts,
  deleteBankAccount,
  setDefaultBank,
  getAllBankList,
  totalUserBankSummary
} = require("../../controller/bankController/bankController");

router.post("/add", auth, addBankAccount);
router.delete("/:id", auth, deleteBankAccount);
router.get("/allbanks", auth, getAllBankList);
router.get("/userbanks", auth, getUserBankAccounts);
router.put("/default/:id", auth,  setDefaultBank);
router.get("/summary", auth, totalUserBankSummary);


module.exports = router;
