const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const transporter = require("../config/mailer");

router.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // MongoDB me save
        const newContact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        // Email alag try/catch me
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: "New Contact Form Submission",
                html: `
                    <h2>New Contact Form</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong> ${message}</p>
                `
            });
        } catch (emailError) {
            console.error("Email sending error:", emailError.message);
        }

        return res.status(201).json({
            success: true,
            message: "Message Sent Successfully",
            contact: newContact
        });

    } catch (error) {
        console.error("Contact form error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
});

router.get("/messages", async (req, res) => {
    try {
        const messages = await Contact.find().sort({
            createdAt: -1
        });

        return res.json({
            success: true,
            messages
        });

    } catch (error) {
        console.error("Get messages error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

router.delete("/messages/:id", async (req, res) => {
    try {
        const message = await Contact.findByIdAndDelete(
            req.params.id
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        return res.json({
            success: true,
            message: "Message Deleted Successfully"
        });

    } catch (error) {
        console.error("Delete message error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

module.exports = router;