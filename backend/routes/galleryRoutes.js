const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    uploadImage,
    getImages,
    deleteImage
} = require("../controllers/galleryController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/gallery", upload.single("image"), uploadImage);
router.get("/gallery", getImages);
router.delete("/gallery/:id", deleteImage);

module.exports = router;