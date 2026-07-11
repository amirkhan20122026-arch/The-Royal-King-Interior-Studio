exports.getMessages = async (req, res) => {

    try {

        const messages = await Contact.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            messages
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};