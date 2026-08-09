const express = require("express");
const router = express.Router();
const { registerUser, registerManager, registerAdmin, login } = require("../controllers/authController");

// These routes will be at /api/auth/register-user, /api/auth/login, etc.
router.post("/register-user", registerUser);
router.post("/register-manager", registerManager);
router.post("/register-admin", registerAdmin);
router.post("/login", login);

module.exports = router;