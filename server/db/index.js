// hirely/server/db/index.js

// Load environment variables (needed here as well for DB credentials)
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test database connection on startup
pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection error:', err);
        return console.error('Error acquiring client from pool', err.stack);
    }
    console.log('Connected to PostgreSQL database!');
    client.release(); // Release the client back to the pool
});

// Export the pool instance so it can be imported and used in other files
module.exports = pool;