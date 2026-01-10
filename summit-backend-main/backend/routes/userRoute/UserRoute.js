const express = require("express");
const auth = require("../../auth/jwtAuth");
// const multer = require("multer");
// const upload = multer(); // handles form-data file uploads

const {
  getProfile,
  updateProfile,
  changePassword,
  updateProfileImage
} = require("../../controller/getandEditUser/UserProfile");
const {uploadImages} = require("../../multer/upload")

const router = express.Router();

// GET PROFILE
router.get("/profile", auth, getProfile);

// UPDATE NAME, PHONE
router.put("/profile/update", auth, uploadImages.single("userimage"), updateProfile);

// CHANGE PASSWORD
router.put("/change-password", auth, changePassword);

// UPDATE PROFILE PICTURE
router.put("/image", auth, uploadImages.single("userimage"), updateProfileImage);

module.exports = router;
