const express = require('express');
const router = express.Router();
const {
  registerNGO,
  loginNGO,
  getNGOsByIncidentType,
  getAllNGOs,
  createNGOProfile,
  updateNGOProfile,
  getNGOProfileById,
  getNGOProfileByNGOId
} = require('../controllers/ngoController');
const protect = require('../middlewares/authMiddleware');
const verifyNGO = require('../middlewares/ngoVerificationMiddleware');

// Public routes
router.get('/incident/:incidentType', getNGOsByIncidentType);
router.get('/profiles', getAllNGOs);
router.get('/profiles/:id', getNGOProfileById);
router.get('/profiles/ngo/:ngoId', getNGOProfileByNGOId);

// Authentication routes (keep existing)
router.post('/register', registerNGO);
router.post('/login', loginNGO);

// Profile management routes (add auth middleware if needed)
router.post('/profiles',protect, verifyNGO, createNGOProfile);
router.put('/profiles/:id', updateNGOProfile);

module.exports = router;