// Main entry point for the backend server

// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require ('cors');

// Import the database query routes
const reportRoutes = require('./routes/reports')

// Initialize the Express application
const app = express();
const port = 3001; // Using port 3001 to avoid conflicts with a frontend server

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from your frontend
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- API Routes ---
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Use the report routes for any URL starting with /api/reports
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - must be last middleware
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// --- Start the Server ---
// Listen for incoming connections on the specified port
app.listen(port, () => {
    console.log(`✅ Backend server is running and listening at http://localhost:${port}`);
});
