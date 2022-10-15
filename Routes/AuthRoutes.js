const { login, register } = require("../controllers/AuthController");
const express = require("express")
const router = express.Router();

router.post("/login", login);
router.post("/register", register)

module.exports = router;
