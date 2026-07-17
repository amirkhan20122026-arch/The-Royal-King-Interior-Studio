const Gallery = require("../models/Gallery");

// Upload Image

exports.uploadImage = async (req, res) => {

    try {

        const newImage = new Gallery({

            title: req.body.title,

            image: req.file.filename

        });

        await newImage.save();

        res.json({

            success: true,

            message: "Image Uploaded Successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};


// Get Images

exports.getImages = async (req, res) => {

    try {

        const images = await Gallery.find().sort({ createdAt: -1 });

        res.json({

            success: true,

            images

        });

    } catch (err) {

        console.log(err);

    }

};


// Delete Image

exports.deleteImage = async (req, res) => {

    try {

        await Gallery.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Image Deleted"

        });

    } catch (err) {

        console.log(err);

    }

};