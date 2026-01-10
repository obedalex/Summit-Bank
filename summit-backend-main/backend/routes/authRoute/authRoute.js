const router = require("express").Router()
const { register, login } = require("../../controller/authController/RegisterUser");


router.post("/register", register);
router.post("/login", login);

module.exports = router
