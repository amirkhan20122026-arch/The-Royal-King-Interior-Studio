const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");

// Add Project
exports.addProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project description is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a project image",
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      image: req.file.filename,
    });

    return res.status(201).json({
      success: true,
      message: "Project Added Successfully",
      project,
    });
  } catch (error) {
    console.error("Add project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const imagePath = path.join(
      __dirname,
      "../uploads",
      project.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return res.json({
      success: true,
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};