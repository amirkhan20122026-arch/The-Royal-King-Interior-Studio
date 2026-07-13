const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  addProject,
  getProjects,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, "-");

    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/projects", upload.single("image"), addProject);
router.get("/projects", getProjects);
router.delete("/projects/:id", deleteProject);

module.exports = router;