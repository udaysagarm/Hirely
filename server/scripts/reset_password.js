
const pool = require('../db');
const bcrypt = require('bcryptjs');

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
    console.error('Usage: node reset_password.js <email> <newParameters>');
    process.exit(1);
}

async function resetPassword() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const res = await pool.query(
            'UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING id, email',
            [hash, email]
        );

        if (res.rows.length === 0) {
            console.log(`User with email ${email} not found.`);
        } else {
            console.log(`Password for ${email} has been updated successfully.`);
        }
    } catch (err) {
        console.error('Error updating password:', err);
    } finally {
        pool.end();
    }
}

resetPassword();
