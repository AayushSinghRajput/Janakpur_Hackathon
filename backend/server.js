// Load environment variables at the VERY BEGINNING
require('dotenv').config();

console.log('🚀 Starting server...');
console.log('Environment:', process.env.NODE_ENV || 'development');

const app = require('./app');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Backend is running ...");
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});