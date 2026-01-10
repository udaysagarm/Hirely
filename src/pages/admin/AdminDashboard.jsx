
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Users, Briefcase, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
    const { token } = useAuth();
    const [stats, setStats] = useState({ users: 0, jobs: 0, pendingReports: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    setStats(await response.json());
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            }
        };
        fetchStats();
    }, [token]);

    const StatCard = ({ title, value, icon, color }) => {
        const IconComponent = icon;
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <div className={`p-4 rounded-full ${color} text-white`}>
                    <IconComponent size={24} />
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={Users}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Total Jobs"
                    value={stats.jobs}
                    icon={Briefcase}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Pending Reports"
                    value={stats.pendingReports}
                    icon={AlertTriangle}
                    color="bg-amber-500"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4">Welcome, Admin</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Use the sidebar to manage users, review reports, and oversee platform settings.
                </p>
            </div>
        </div>
    );
}
