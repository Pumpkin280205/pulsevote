const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// These routes will be at /api/auth/register, /api/auth/login, etc.
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;