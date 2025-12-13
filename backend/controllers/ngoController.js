const NGO = require("../models/NGO");
const NGOProfile = require("../models/ngoProfile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// Register NGO (Keep your existing logic)
exports.registerNGO = async (req, res) => {
  try {
    const { ngoName, email, password, confirmPassword } = req.body;

    // Input validation
    if (!ngoName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Check if NGO already exists
    const ngoExists = await NGO.findOne({ email: email.toLowerCase().trim() });
    if (ngoExists) {
      return res.status(400).json({
        success: false,
        message: "An organization with this email already exists",
      });
    }


    // Hash password manually before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    

    // Create NGO with hashed password
    const ngo = await NGO.create({
      ngoName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      verificationStatus: false,
      role: "ngo",
    });

    // Also create an NGO profile with basic info
    await NGOProfile.create({
      ngoId: ngo._id,
      ngoName: ngo.ngoName,
      email: ngo.email,
      description: `${ngo.ngoName} - Registered organization`,
      phone: "Not provided",
      address: "Not provided",
      contactPerson: "Administrator",
      incidentTypes: ["General"],
      services: ["General Support"],
      verified: false,
    });


    // Generate token for immediate login
    const token = generateToken(ngo._id);

    res.status(201).json({
      success: true,
      message:
        "Organization registered successfully. Account pending verification.",
      token,
      ngo: {
        id: ngo._id,
        ngoName: ngo.ngoName,
        email: ngo.email,
        verificationStatus: ngo.verificationStatus,
        role: ngo.role,
        createdAt: ngo.createdAt,
      },
    });
  } catch (err) {
    console.error("Registration error details:", {
      name: err.name,
      message: err.message,
      code: err.code,
    });

    // Handle specific Mongoose errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// Login NGO 
exports.loginNGO = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find NGO by email (case insensitive)
    const ngo = await NGO.findOne({ email: email.toLowerCase().trim() });

    if (!ngo) {
      console.log("No NGO found with this email");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if password matches using bcrypt directly
    const isPasswordValid = await bcrypt.compare(password, ngo.password);

    if (!isPasswordValid) {
      console.log("Password is incorrect");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(ngo._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      ngo: {
        id: ngo._id,
        ngoName: ngo.ngoName,
        email: ngo.email,
        verificationStatus: ngo.verificationStatus,
        role: ngo.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

// Get NGOs by incident type 
exports.getNGOsByIncidentType = async (req, res) => {
  try {
    const { incidentType } = req.params;

    console.log(`🔍 Fetching NGOs for incident type: ${incidentType}`);

    // Validate incident type
    const validTypes = [
      "harassment",
      "domestic_violence",
      "sexual_violence",
      "cyber_violence",
      "stalking_and_threats",
      "gender_discrimination",
      "General",
    ];

    if (!validTypes.includes(incidentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid incident type",
      });
    }

    // Find NGO profiles that handle this incident type
    const ngoProfiles = await NGOProfile.find({
      incidentTypes: incidentType,
      verified: true,
    })
      .select("-__v")
      .sort({ rating: -1 });


    res.status(200).json({
      success: true,
      count: ngoProfiles.length,
      data: ngoProfiles,
    });
  } catch (error) {
    console.error("❌ Error fetching NGOs:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching NGOs",
    });
  }
};

// Get all NGO profiles
exports.getAllNGOs = async (req, res) => {
  try {
    const ngoProfiles = await NGOProfile.find()
      .select("-__v")
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: ngoProfiles.length,
      data: ngoProfiles,
    });
  } catch (error) {
    console.error("❌ Error fetching all NGOs:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Create NGO profile (for admin or after registration)
exports.createNGOProfile = async (req, res) => {
  try {
    const { ngoId, ...profileData } = req.body;

    // Check if NGO exists
    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: "NGO not found",
      });
    }

    // Check if profile already exists
    const existingProfile = await NGOProfile.findOne({ ngoId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this NGO",
      });
    }

    // Create profile
    const ngoProfile = await NGOProfile.create({
      ngoId,
      ngoName: ngo.ngoName,
      email: ngo.email,
      ...profileData,
    });

    res.status(201).json({
      success: true,
      message: "NGO profile created successfully",
      data: ngoProfile,
    });
  } catch (error) {
    console.error("❌ Error creating NGO profile:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages.join(", ")}`,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Profile for this NGO already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create NGO profile",
    });
  }
};

// Update NGO profile
exports.updateNGOProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove ngoId and email from updates (these shouldn't be changed)
    delete updates.ngoId;
    delete updates.email;

    const ngoProfile = await NGOProfile.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!ngoProfile) {
      return res.status(404).json({
        success: false,
        message: "NGO profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "NGO profile updated successfully",
      data: ngoProfile,
    });
  } catch (error) {
    console.error("❌ Error updating NGO profile:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages.join(", ")}`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update NGO profile",
    });
  }
};

// Get NGO profile by ID
exports.getNGOProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const ngoProfile = await NGOProfile.findById(id).select("-__v");

    if (!ngoProfile) {
      return res.status(404).json({
        success: false,
        message: "NGO profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ngoProfile,
    });
  } catch (error) {
    console.error("❌ Error fetching NGO profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get NGO profile by NGO ID
exports.getNGOProfileByNGOId = async (req, res) => {
  try {
    const { ngoId } = req.params;

    const ngoProfile = await NGOProfile.findOne({ ngoId }).select("-__v");

    if (!ngoProfile) {
      return res.status(404).json({
        success: false,
        message: "NGO profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ngoProfile,
    });
  } catch (error) {
    console.error("❌ Error fetching NGO profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
