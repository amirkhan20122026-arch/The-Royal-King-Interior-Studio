const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

/*
   Register Admin
   Is route ko sirf ek baar use karna hai.
*/

router.post("/admin/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {

            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });

        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(

            { id: admin._id },

            "mysecretkey",

            { expiresIn: "1d" }

        );

        res.json({

            success: true,

            message: "Login Successful",

            token

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

});

module.exports = router;  