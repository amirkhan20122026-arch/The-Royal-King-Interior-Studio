const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({
    success: true,
    message: "Login Successful",
    token,
  });
});

module.exports = router;