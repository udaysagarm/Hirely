
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Search, Trash2, Calendar, User, Eye, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminJobs() {
    const { token } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/admin/jobs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                setJobs(await response.json());
            }
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) return;

        try {
            const response = await fetch(`/api/admin/jobs/${jobId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                setJobs(prev => prev.filter(job => job.id !== jobId));
            } else {
                alert("Failed to delete job.");
            }
        } catch (error) {
            console.error("Failed to delete job", error);
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase()) ||
        job.posted_by_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Management</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading jobs...</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                            <tr>
                                <th className="p-4">Job Title</th>
                                <th className="p-4">Posted By</th>
                                <th className="p-4">Posted Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredJobs.map(job => (
                                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                    <td className="p-4">
                                        <Link to={`/jobs/${job.id}`} className="font-medium text-blue-600 hover:underline">
                                            {job.title}
                                        </Link>
                                        <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{job.description}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{job.posted_by_name}</p>
                                                <p className="text-xs text-gray-400">{job.posted_by_email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {job.deleted_at ? (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"> Deleted </span>
                                        ) : (
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'open'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                                }`}>
                                                {job.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <Link
                                            to={`/jobs/${job.id}`}
                                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Job"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        {!job.deleted_at && (
                                            <button
                                                onClick={() => handleDelete(job.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Job"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredJobs.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500">
                            <Briefcase size={48} className="text-gray-300 mb-4" />
                            <p className="text-lg font-medium">No jobs found.</p>
                            <p className="text-sm">Try adjusting your search terms.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
