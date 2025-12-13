const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ngoRoutes = require('./routes/ngoRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables FIRST
dotenv.config();


const app = express();
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/ngo', ngoRoutes);
app.use('/api/report', reportRoutes);

app.use(errorHandler);

module.exports = app;