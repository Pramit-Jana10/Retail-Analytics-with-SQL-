const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the database connection
pool.connect()
    .then(client => {
        console.log('PostgreSQL Database connected successfully');
        client.release();
    })
    .catch(err => {
        console.error('PostgreSQL Database connection failed:', err.message);
    });

// Export the pool to be used by other files (like the routes)
module.exports = pool;
