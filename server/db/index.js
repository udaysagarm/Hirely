// hirely/server/db/index.js

// Load environment variables (needed here as well for DB credentials)
require('dotenv').config();

const { Pool } = require('pg');

const poolConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Required for most cloud hosted DBs to work with node-postgres
        }
    }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE || process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
        ssl: {
            rejectUnauthorized: false
        }
    };

const pool = new Pool(poolConfig);

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