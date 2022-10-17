const { login, register, sendOtp } = require("../controllers/AuthController");
const express = require("express")
const router = express.Router();

router.post("/login", login);
router.post("/register", register)
router.post("/otp", sendOtp)

module.exports = router;
