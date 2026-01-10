const express = require("express");
const {
  submitKYC,
  getKYCStatus,
} = require("../../controller/KYC/Kyc");
const auth = require("../../auth/jwtAuth");
const { uploadImages } = require("../../multer/upload");


const router = express.Router();

router.post(
  "/submit",
  auth,
  uploadImages.fields([
    { name: "idFrontImage", maxCount: 1 },
    { name: "idBackImage", maxCount: 1 },
    { name: "selfieImage", maxCount: 1 }
  ]),
  submitKYC
);

router.get("/status", auth, getKYCStatus);

module.exports = router;

