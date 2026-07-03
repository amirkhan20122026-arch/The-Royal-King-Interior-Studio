const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const transporter = require("../config/mailer");

router.post("/contact", async (req, res) => {

    try {

        const { name, email, phone, message } = req.body;

        // MongoDB me Save

        const newContact = new Contact({

            name,
            email,
            phone,
            message

        });

        await newContact.save();

        // Gmail par Email Send

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: "📩 New Contact Form Submission",

            html: `

                <h2>New Contact Form</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>

            `

        });

        res.json({

            success: true,
            message: "Message Sent Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

});

module.exports = router;