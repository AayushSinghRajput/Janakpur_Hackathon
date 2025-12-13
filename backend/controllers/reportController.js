const Report = require("../models/Report");
const mlService = require("../utils/mlService");
const { encrypt, decrypt, testEncryption } = require("../utils/encryption");
const { uploadBufferToCloudinary } = require("../utils/cloudinary");
const { v4: uuidv4 } = require("uuid");

// ==================== CREATE ====================
exports.createReport = async (req, res) => {
  try {
    const encryptionWorking = testEncryption();
    if (!encryptionWorking) {
      console.error("Encryption system is not working");
      return res.status(500).json({
        success: false,
        message: "Security system error. Please contact administrator.",
      });
    }

    // ✅ Get ALL expected fields from request (matching frontend form)
    const {
      incidentTitle,
      description,
      dateTime,
      location,
      PhoneNumber = "", // ✅ Keep as PhoneNumber (from frontend)
      urgencyLevel = "Normal", // ✅ Get from frontend dropdown
      consentToShareWithNGO = "false",
    } = req.body;

    // Validate required fields
    if (!incidentTitle || !description || !dateTime || !location) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: Title, Description, Date/Time, and Location are required.",
      });
    }

    // Encrypt required fields
    const encryptedIncidentTitle = encrypt(incidentTitle);
    const encryptedDescription = encrypt(description);
    const encryptedLocation = encrypt(location);
    const encryptedDateTime = encrypt(dateTime);

    // Validate that encryption worked for required fields
    if (
      !encryptedIncidentTitle ||
      !encryptedDescription ||
      !encryptedLocation ||
      !encryptedDateTime
    ) {
      console.error("❌ Encryption failed for required fields");
      return res.status(500).json({
        success: false,
        message: "Failed to secure report data. Please try again.",
      });
    }

    // Handle optional phone number - only encrypt if provided
    let encryptedPhoneNumber = ""; // 🔧 Changed variable name
    if (PhoneNumber && PhoneNumber.trim() !== "") {
      encryptedPhoneNumber = encrypt(PhoneNumber.trim());
    }

    // 2. Process and upload files (encrypt URLs)
    let encryptedEvidenceUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadBufferToCloudinary(
            file.buffer,
            file.originalname
          );
          const fileUrl = result.secure_url || result.url;
          const encryptedUrl = encrypt(fileUrl);

          if (encryptedUrl) {
            encryptedEvidenceUrls.push(encryptedUrl);
            console.log(`✅ Uploaded & encrypted: ${file.originalname}`);
          } else {
            console.warn(`⚠️ Could not encrypt URL for: ${file.originalname}`);
          }
        } catch (uploadError) {
          console.error(
            `❌ Error uploading ${file.originalname}:`,
            uploadError.message
          );
          // Continue with other files
        }
      }
    } else {
      console.log("📁 No files uploaded");
    }

    // 3. ML Classification using mlService
    let incidentType = "General"; // Default
    try {
      const reportText = `${incidentTitle} ${description} ${location}`;
      // Call mlService directly (no separate classifyReport function needed)
      const mlResult = await mlService.classifyReport(reportText);
      incidentType = mlResult.incidentType || "General";
    } catch (mlError) {
      console.warn("⚠️ ML classification failed:", mlError.message);
    }

    // 4. Create the encrypted report in database

    const reportData = {
      encryptedIncidentTitle,
      encryptedDescription,
      encryptedLocation,
      encryptedDateTime,
      encryptedPhoneNumber, // 🔧 Changed field name to match model
      encryptedEvidenceUrls,
      consentToShareWithNGO:
        consentToShareWithNGO === "true" || consentToShareWithNGO === true,
      incidentType: incidentType, // From ML (optional)
      urgencyLevel: urgencyLevel, // ✅ Directly from frontend user choice
      reportId: uuidv4(),
    };

    const report = await Report.create(reportData);

    // 5. Return success
    res.status(201).json({
      success: true,
      message: "Report submitted successfully. All data is securely encrypted.",
      reportId: report.reportId,
      note: "Save this report ID for future reference",
      urgencyLevel: report.urgencyLevel, // Send back for confirmation
      incidentType: incidentType, // Also send ML classification result
    });
  } catch (err) {
    console.error("❌ Error creating encrypted report:", err);

    if (err.name === "ValidationError") {
      console.error("Validation error details:", err.errors);
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${messages.join(", ")}`,
      });
    }

    if (err.code === 11000) {
      // Retry with new UUID
      console.log("⚠️ Duplicate report ID, retrying...");
      return res.status(201).json({
        success: true,
        message: "Report submitted successfully",
        reportId: uuidv4(),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit report. Please try again.",
    });
  }
};

// ==================== READ (All) ====================
exports.getAllReports = async (req, res) => {
  try {
    // Get query parameters
    const {
      status,
      incidentType,
      urgencyLevel,
      startDate,
      endDate,
      page = 1,
      limit = 20,
    } = req.query;

    // Build filter - only non-deleted reports shared with NGOs
    const filter = {
      consentToShareWithNGO: true,
      isDeleted: false,
    };

    // Add optional filters
    if (status) filter.status = status;
    if (incidentType) filter.incidentType = incidentType;
    if (urgencyLevel) filter.urgencyLevel = urgencyLevel;

    // Date range filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count for pagination info
    const totalCount = await Report.countDocuments(filter);

    // Get reports with pagination
    const reports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("assignedTo", "ngoName email");

    // DECRYPT all sensitive data for NGO viewing
    const decryptedReports = reports
      .map((report) => {
        try {
          return {
            reportId: report.reportId,

            // Decrypt all sensitive fields
            incidentTitle: decrypt(report.encryptedIncidentTitle),
            description: decrypt(report.encryptedDescription),
            location: decrypt(report.encryptedLocation),
            dateTime: decrypt(report.encryptedDateTime),
            // 🔧 UPDATED: Use encryptedPhoneNumber instead of encryptedVictimPhoneNumber
            PhoneNumber: report.encryptedPhoneNumber
              ? decrypt(report.encryptedPhoneNumber)
              : "",

            // Decrypt evidence URLs
            evidenceUrls: report.encryptedEvidenceUrls
              .map((url) => {
                const decrypted = decrypt(url);
                return decrypted || "";
              })
              .filter((url) => url !== ""),

            // Non-encrypted fields
            consentToShareWithNGO: report.consentToShareWithNGO,
            incidentType: report.incidentType,
            urgencyLevel: report.urgencyLevel,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
            status: report.status,
            assignedTo: report.assignedTo,
            notes: report.notes,
          };
        } catch (decryptError) {
          console.error(
            `❌ Error decrypting report ${report.reportId}:`,
            decryptError
          );
          return null;
        }
      })
      .filter((report) => report !== null);

    res.json({
      success: true,
      count: decryptedReports.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      reports: decryptedReports,
    });
  } catch (err) {
    console.error("❌ Error fetching reports:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports.",
    });
  }
};

// ==================== READ (Single) ====================
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({
      reportId: req.params.id,
      isDeleted: false,
    }).populate("assignedTo", "ngoName email");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Check if NGO can access this report
    if (!report.consentToShareWithNGO) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Report not shared with NGOs.",
      });
    }

    // DECRYPT all sensitive data
    const decryptedReport = {
      reportId: report.reportId,

      // Decrypt all sensitive fields
      incidentTitle: decrypt(report.encryptedIncidentTitle),
      description: decrypt(report.encryptedDescription),
      location: decrypt(report.encryptedLocation),
      dateTime: decrypt(report.encryptedDateTime),
      // 🔧 UPDATED: Use encryptedPhoneNumber instead of encryptedVictimPhoneNumber
      PhoneNumber: report.encryptedPhoneNumber
        ? decrypt(report.encryptedPhoneNumber)
        : "",

      // Decrypt evidence URLs
      evidenceUrls: report.encryptedEvidenceUrls
        .map((url) => {
          const decrypted = decrypt(url);
          return decrypted || "";
        })
        .filter((url) => url !== ""),

      // Non-encrypted fields
      consentToShareWithNGO: report.consentToShareWithNGO,
      incidentType: report.incidentType,
      urgencyLevel: report.urgencyLevel,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
      status: report.status,
      assignedTo: report.assignedTo,
      notes: report.notes,
    };

    res.json({
      success: true,
      report: decryptedReport,
    });
  } catch (err) {
    console.error("❌ Error fetching report:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch report.",
    });
  }
};

// ==================== UPDATE ====================
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, notes, urgencyLevel, incidentType } = req.body;

    // Find report (non-deleted only)
    const report = await Report.findOne({
      reportId: id,
      isDeleted: false,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Check if NGO can access this report
    if (!report.consentToShareWithNGO) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Report not shared with NGOs.",
      });
    }

    // Update fields
    const updates = {};
    if (
      status &&
      [
        "pending",
        "under_review",
        "action_taken",
        "resolved",
        "archived",
      ].includes(status)
    ) {
      updates.status = status;
    }
    if (assignedTo) updates.assignedTo = assignedTo;
    if (notes !== undefined) updates.notes = notes;
    if (urgencyLevel) updates.urgencyLevel = urgencyLevel;
    if (incidentType) updates.incidentType = incidentType;

    // Update the report
    const updatedReport = await Report.findOneAndUpdate(
      { reportId: id },
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("assignedTo", "ngoName email");

    res.json({
      success: true,
      message: "Report updated successfully",
      report: {
        reportId: updatedReport.reportId,
        status: updatedReport.status,
        assignedTo: updatedReport.assignedTo,
        notes: updatedReport.notes,
        urgencyLevel: updatedReport.urgencyLevel,
        incidentType: updatedReport.incidentType,
        updatedAt: updatedReport.updatedAt,
      },
    });
  } catch (err) {
    console.error("❌ Error updating report:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update report.",
    });
  }
};

// ==================== SOFT DELETE ====================
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const ngoId = req.ngo._id; // From auth middleware

    // Find report (non-deleted only)
    const report = await Report.findOne({
      reportId: id,
      isDeleted: false,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Check if NGO can access this report
    if (!report.consentToShareWithNGO) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Report not shared with NGOs.",
      });
    }

    // Soft delete (mark as deleted instead of actually removing)
    const deletedReport = await Report.findOneAndUpdate(
      { reportId: id },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: ngoId,
          status: "archived",
        },
      },
      { new: true }
    );


    res.json({
      success: true,
      message: "Report deleted successfully",
      reportId: deletedReport.reportId,
      deletedAt: deletedReport.deletedAt,
    });
  } catch (err) {
    console.error("❌ Error deleting report:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete report.",
    });
  }
};

// ==================== RESTORE DELETED REPORT ====================
exports.restoreReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Find deleted report
    const report = await Report.findOne({
      reportId: id,
      isDeleted: true,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Deleted report not found",
      });
    }

    // Restore the report
    const restoredReport = await Report.findOneAndUpdate(
      { reportId: id },
      {
        $set: {
          isDeleted: false,
          deletedAt: null,
          deletedBy: null,
          status: "pending",
        },
      },
      { new: true }
    );



    res.json({
      success: true,
      message: "Report restored successfully",
      reportId: restoredReport.reportId,
      status: restoredReport.status,
    });
  } catch (err) {
    console.error("❌ Error restoring report:", err);
    res.status(500).json({
      success: false,
      message: "Failed to restore report.",
    });
  }
};

// ==================== GET DELETED REPORTS ====================
exports.getDeletedReports = async (req, res) => {
  try {
    // Get deleted reports (admin/audit function)
    const deletedReports = await Report.find({
      isDeleted: true,
      consentToShareWithNGO: true,
    })
      .sort({ deletedAt: -1 })
      .populate("deletedBy", "ngoName email")
      .populate("assignedTo", "ngoName email");

    // Return minimal info (no decryption for deleted reports)
    const reports = deletedReports.map((report) => ({
      reportId: report.reportId,
      incidentType: report.incidentType,
      urgencyLevel: report.urgencyLevel,
      status: report.status,
      createdAt: report.createdAt,
      deletedAt: report.deletedAt,
      deletedBy: report.deletedBy,
      assignedTo: report.assignedTo,
      notes: report.notes,
    }));

    res.json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (err) {
    console.error("❌ Error fetching deleted reports:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted reports.",
    });
  }
};

// ==================== GET REPORT STATISTICS ====================
exports.getReportStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {
      consentToShareWithNGO: true,
      isDeleted: false,
    };

    // Date range filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Get statistics
    const totalReports = await Report.countDocuments(filter);

    const statusStats = await Report.aggregate([
      { $match: filter },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const typeStats = await Report.aggregate([
      { $match: filter },
      { $group: { _id: "$incidentType", count: { $sum: 1 } } },
    ]);

    const urgencyStats = await Report.aggregate([
      { $match: filter },
      { $group: { _id: "$urgencyLevel", count: { $sum: 1 } } },
    ]);

    // Monthly report count
    const monthlyStats = await Report.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 },
    ]);

    res.json({
      success: true,
      statistics: {
        totalReports,
        statusStats: statusStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        typeStats: typeStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        urgencyStats: urgencyStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        monthlyStats,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching statistics:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics.",
    });
  }
};
