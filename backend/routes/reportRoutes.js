const express = require('express');
const router = express.Router();
const multer = require('multer');
const { 
    createReport, 
    getAllReports, 
    getReportById,
    updateReport,
    deleteReport,
    restoreReport,
    getDeletedReports,
    getReportStatistics
} = require('../controllers/reportController');
const protect = require('../middlewares/authMiddleware');
const verifyNGO = require('../middlewares/ngoVerificationMiddleware');

// Memory storage for direct Cloudinary upload
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 10 // Max 10 files
  },
  fileFilter: (req, file, cb) => {
    console.log(`File filter: ${file.originalname}, MIME: ${file.mimetype}`);
    
    // Accept images, videos, PDFs
    const allowedTypes = /jpeg|jpg|png|gif|pdf|mp4|mov|avi|mpeg|mpg/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      console.log(`✅ File accepted: ${file.originalname}`);
      return cb(null, true);
    } else {
      console.log(`❌ File rejected: ${file.originalname} (${file.mimetype})`);
      cb(new Error('File type not allowed. Only images, videos, and PDFs are accepted.'));
    }
  }
});

// Add middleware to log all requests
router.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  console.log('📋 Headers:', req.headers['content-type']);
  next();
});

// ==================== PUBLIC ROUTES ====================
// Anonymous report submission - no authentication required
router.post('/', upload.array('evidence'), (req, res, next) => {
  console.log('📤 Multer processed files:', req.files ? req.files.length : 0);
  console.log('📝 Request body after multer:', req.body);
  next();
}, createReport);

// ==================== PROTECTED NGO ROUTES ====================
// Get all reports (with filtering & pagination)
router.get('/', protect, verifyNGO, getAllReports);

// Get single report by ID
router.get('/:id', protect, verifyNGO, getReportById);

// Update report (status, assignment, notes)
router.patch('/:id', protect, verifyNGO, updateReport);
router.put('/:id', protect, verifyNGO, updateReport);

// Soft delete report
router.delete('/:id', protect, verifyNGO, deleteReport);

// Restore deleted report
router.post('/:id/restore', protect, verifyNGO, restoreReport);

// Get deleted reports (audit trail)
router.get('/deleted/all', protect, verifyNGO, getDeletedReports);

// Get report statistics
router.get('/statistics/overview', protect, verifyNGO, getReportStatistics);

module.exports = router;