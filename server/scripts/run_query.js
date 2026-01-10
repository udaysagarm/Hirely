
const pool = require('../db');

async function runQuery() {
    try {
        // Example query: Fetch all users
        const query = 'SELECT id, name, email, role FROM users LIMIT 5;';

        console.log(`Running query: ${query}`);
        const res = await pool.query(query);

        console.log('Results:');
        console.table(res.rows);

    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        await pool.end();
    }
}

runQuery();
