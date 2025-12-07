const mongoose = require('mongoose');

const NGOProfileSchema = new mongoose.Schema({
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true,
    unique: true
  },
  ngoName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  logo: {
    type: String,
    default: ''
  },
  // Array of incident types this NGO handles
  incidentTypes: [{
    type: String,
    enum: [
      'harassment',
      'domestic_violence', 
      'sexual_violence',
      'cyber_violence',
      'stalking_and_threats',
      'gender_discrimination',
      'General'
    ],
    required: true,
    default: ['General']
  }],
  services: [{
    type: String,
    trim: true
  }],
  contactPerson: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
NGOProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('NGOProfile', NGOProfileSchema);