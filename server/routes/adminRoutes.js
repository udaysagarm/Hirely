
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyAdmin } = require('../middleware/auth');

// GET /api/admin/stats
router.get('/stats', verifyAdmin, async (req, res) => {
    try {
        const userCount = await pool.query('SELECT COUNT(*) FROM users');
        // Count active (non-deleted) jobs for stats
        const jobCount = await pool.query('SELECT COUNT(*) FROM jobs WHERE deleted_at IS NULL');
        const reportCount = await pool.query('SELECT COUNT(*) FROM user_reports WHERE status = \'pending\'');

        res.json({
            users: parseInt(userCount.rows[0].count),
            jobs: parseInt(jobCount.rows[0].count),
            pendingReports: parseInt(reportCount.rows[0].count)
        });
    } catch (err) {
        console.error('Error fetching admin stats:', err);
        res.status(500).json({ message: 'Server error fetching stats' });
    }
});

// GET /api/admin/users
router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const users = await pool.query(`
            SELECT id, name, email, role, location, is_suspended, created_at,
            (SELECT COUNT(*) FROM user_reports WHERE reported_user_id = users.id) as report_count
            FROM users 
            ORDER BY created_at DESC
        `);
        res.json(users.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error fetching users' });
    }
});

// PUT /api/admin/users/:id/suspend
router.put('/users/:id/suspend', verifyAdmin, async (req, res) => {
    const { isSuspended } = req.body;
    try {
        await pool.query('UPDATE users SET is_suspended = $1 WHERE id = $2', [isSuspended, req.params.id]);
        res.json({ message: `User ${isSuspended ? 'suspended' : 'activated'} successfully` });
    } catch (err) {
        console.error('Error updating user suspension:', err);
        res.status(500).json({ message: 'Server error updating user' });
    }
});

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', verifyAdmin, async (req, res) => {
    const { role } = req.body;
    if (!['job_seeker', 'employer', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }
    try {
        await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, req.params.id]);
        res.json({ message: 'User role updated successfully' });
    } catch (err) {
        console.error('Error updating user role:', err);
        res.status(500).json({ message: 'Server error updating role' });
    }
});

// GET /api/admin/reports
router.get('/reports', verifyAdmin, async (req, res) => {
    try {
        const reports = await pool.query(`
            SELECT r.*, 
            u1.name as reported_name, u1.email as reported_email,
            u2.name as reporter_name, u2.email as reporter_email
            FROM user_reports r
            JOIN users u1 ON r.reported_user_id = u1.id
            JOIN users u2 ON r.reporter_user_id = u2.id
            ORDER BY r.created_at DESC
        `);
        res.json(reports.rows);
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).json({ message: 'Server error fetching reports' });
    }
});

// GET /api/admin/jobs
router.get('/jobs', verifyAdmin, async (req, res) => {
    try {
        const jobs = await pool.query(`
            SELECT j.id, j.title, j.description, j.status, j.created_at, j.deleted_at,
            u.name as posted_by_name, u.email as posted_by_email
            FROM jobs j
            JOIN users u ON j.posted_by_user_id = u.id
            ORDER BY j.created_at DESC
        `);
        res.json(jobs.rows);
    } catch (err) {
        console.error('Error fetching admin jobs:', err);
        res.status(500).json({ message: 'Server error fetching jobs' });
    }
});

// DELETE /api/admin/jobs/:id
router.delete('/jobs/:id', verifyAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            'UPDATE jobs SET deleted_at = NOW() WHERE id = $1 RETURNING id',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting job:', err);
        res.status(500).json({ message: 'Server error deleting job' });
    }
});

module.exports = router;
