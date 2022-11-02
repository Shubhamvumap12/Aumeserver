const { login, register, sendOtp, verifyOtp } = require("../controllers/AuthController");
const express = require("express")
const router = express.Router();

router.post("/login", login);
router.post("/register", register)
router.post("/otp", sendOtp)
router.post("/verifyOtp", verifyOtp)

module.exports = router;
