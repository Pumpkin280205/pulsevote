const User = require("../models/User");
const { validationResult } = require("express-validator");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      email,
      password,
      roles: [{ organisationId: null, role: "user" }]
    });

    return res.status(201).json({
      message: "User registered",
      token: generateToken(user)
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.registerManager = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const managerUser = await User.create({
      email,
      password,
      roles: [{ organisationId: null, role: "manager" }]
    });

    // The token belongs to the new manager. The frontend must not replace
    // the currently logged-in admin token with this token.
    return res.status(201).json({
      message: "Manager registered",
      token: generateToken(managerUser)
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const adminExists = await User.exists({ "roles.role": "admin" });

    // Activity 08 keeps first-admin creation as a Postman-only bootstrap step.
    // Once an admin exists, this public bootstrap endpoint is disabled.
    if (adminExists) {
      return res.status(403).json({ message: "The first admin has already been created" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const adminUser = await User.create({
      email,
      password,
      roles: [{ organisationId: null, role: "admin" }]
    });

    return res.status(201).json({
      message: "Admin registered",
      token: generateToken(adminUser)
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({ token: generateToken(user) });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};