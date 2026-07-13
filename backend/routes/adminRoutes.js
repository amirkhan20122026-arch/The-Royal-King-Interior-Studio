const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

// Admin Login
router.post("/admin/login", async (req, res) => {

    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {

        const token = jwt.sign(
            { id: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            success: true,
            message: "Login Successful",
            token
        });

    }

    return res.status(401).json({
        success: false,
        message: "Invalid Email or Password"
    });

});

module.exports = router;