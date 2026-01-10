
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { AlertCircle, User, Mail, Calendar } from "lucide-react";

export default function Reports() {
    const { token } = useAuth();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('/api/admin/reports', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    setReports(await response.json());
                }
            } catch (error) {
                console.error("Failed to fetch reports", error);
            }
        };
        fetchReports();
    }, [token]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Reports & Feedback</h1>

            <div className="grid grid-cols-1 gap-4">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${report.status === 'pending'
                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {report.status.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(report.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <AlertCircle size={20} className="text-red-500" />
                                {report.reason}
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 p-3 rounded-lg">
                                {report.details || "No additional details provided."}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
                            <div className="flex-1">
                                <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Reported User</span>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{report.reported_name}</p>
                                        <p className="text-gray-500">{report.reported_email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">Reporter</span>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{report.reporter_name}</p>
                                        <p className="text-gray-500">{report.reporter_email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {reports.length === 0 && (
                    <div className="p-8 text-center text-gray-500 bg-white dark:bg-gray-800 rounded-xl">No reports found.</div>
                )}
            </div>
        </div>
    );
}
