
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Search, Ban, CheckCircle, Shield, MoreVertical } from "lucide-react";

export default function UserManagement() {
    const { token, currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                setUsers(await response.json());
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSuspend = async (userId, currentStatus) => {
        if (!window.confirm(`Are you sure you want to ${currentStatus ? 'activate' : 'suspend'} this user?`)) return;

        try {
            const response = await fetch(`/api/admin/users/${userId}/suspend`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isSuspended: !currentStatus })
            });

            if (response.ok) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_suspended: !currentStatus } : u));
            }
        } catch (error) {
            console.error("Failed to update suspension", error);
        }
    };

    const toggleAdmin = async (userId, currentRole) => {
        if (userId === currentUser.id) return alert("You cannot change your own role.");
        const newRole = currentRole === 'admin' ? 'job_seeker' : 'admin';
        if (!window.confirm(`Are you sure you want to make this user ${newRole === 'admin' ? 'an Admin' : 'a regular user'}?`)) return;

        try {
            const response = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            }
        } catch (error) {
            console.error("Failed to update role", error);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {isLoading && <p className="text-center text-gray-500">Loading users...</p>}


            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                <td className="p-4 font-medium">{user.name}</td>
                                <td className="p-4 text-gray-500">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.is_suspended
                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        }`}>
                                        {user.is_suspended ? 'Suspended' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => toggleAdmin(user.id, user.role)}
                                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                        title={user.role === 'admin' ? "Remove Admin" : "Make Admin"}
                                    >
                                        <Shield size={18} className={user.role === 'admin' ? "fill-current" : ""} />
                                    </button>
                                    <button
                                        onClick={() => toggleSuspend(user.id, user.is_suspended)}
                                        className={`p-2 rounded-lg transition-colors ${user.is_suspended
                                            ? "text-green-600 hover:bg-green-50"
                                            : "text-red-500 hover:bg-red-50"
                                            }`}
                                        title={user.is_suspended ? "Activate User" : "Suspend User"}
                                    >
                                        {user.is_suspended ? <CheckCircle size={18} /> : <Ban size={18} />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No users found.</div>
                )}
            </div>
        </div>
    );
}
