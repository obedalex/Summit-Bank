const router = require("express").Router();
const auth = require("../../auth/jwtAuth");

const {
  totalUserCardSummary,
  createCard,
  cardDeposit,
  cardWithdraw,
  cardToWallet,
  getUserCards,
  getCardTransactions,
  getCardById,
  deleteCard,
  freezeCard,
  unfreezeCard,
  setDefaultCard,
  transferBetweenCardsOrWallet
} = require("../../controller/cardController/CardController");


// =======================
// CARD ROUTES
// =======================

// get the summary from the cards
router.get("/summary",auth,totalUserCardSummary)

// Create a new card
router.post("/create", auth, createCard);

// Get all cards of logged-in user
router.get("/my-cards", auth, getUserCards);

// Get specific card details
router.get("/:cardId", auth, getCardById);

// Delete card
router.delete("/:cardId", auth, deleteCard);

// Freeze card
router.put("/:cardId/freeze", auth, freezeCard);

// Unfreeze card
router.put("/:cardId/unfreeze", auth, unfreezeCard);

// Make card default
router.put("/:cardId/default", auth, setDefaultCard);


// =======================
// MONEY OPERATIONS
// =======================

// Deposit to card
router.post("/:cardId/deposit", auth, cardDeposit);

// Withdraw from card
router.post("/:cardId/withdraw", auth, cardWithdraw);

// Transfer between card & wallet
router.post("/transfer", auth, transferBetweenCardsOrWallet);


// =======================
// TRANSACTION HISTORY
// =======================

// Get card transactions
router.get("/:cardId/transactions", auth, getCardTransactions);


module.exports = router;
