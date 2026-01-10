
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import {
    LayoutDashboard,
    Users,
    FileWarning,
    LogOut,
    Home,
    Briefcase
} from "lucide-react";

export default function AdminLayout() {
    const { currentUser, logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoggedIn || (currentUser && currentUser.role !== 'admin')) {
            // Redirect to home if not admin
            navigate("/");
        }
    }, [isLoggedIn, currentUser, navigate]);

    if (!currentUser || currentUser.role !== 'admin') {
        return null; // Or a loading spinner while redirecting
    }

    const navItems = [
        { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/users", label: "User Management", icon: Users },
        { path: "/admin/jobs", label: "Job Management", icon: Briefcase },
        { path: "/admin/reports", label: "Reports & Feedback", icon: FileWarning },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 items-center justify-center flex flex-col">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Hirely Admin
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Administrator Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path; // Exact match for simplicity, or startsWith for sub-routes
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        <Home size={20} />
                        Back to App
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
