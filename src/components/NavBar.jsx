// src/components/NavBar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { Sun, Moon, LogOut } from 'lucide-react'; // Import icons

export default function NavBar({ theme, setTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { name: "Home", path: "/user/home" },
    { name: "Profile", path: "/profile" },
    { name: "Post a Job", path: "/post-job" },
    { name: "My Jobs", path: "/my-jobs" },
    { name: "Messages", path: "/messages" },
  ];

  // This function is still used for regular links
  const navLinkClass = (path, danger = false) => {
    const isActive = location.pathname === path;
    return `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
        ? "bg-primary-600 text-white shadow-md shadow-primary-500/30"
        : danger
          ? "text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          : "text-gray-600 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
      }`;
  };

  const handleLogout = () => {
    logout(); // Use context logout
    navigate("/"); // redirect to public home page
  };

  return (
    <nav className="glass glass-dark px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/user/home"
          className="text-3xl font-extrabold tracking-tight"
        >
          <span className="gradient-text">Hirely</span>
        </Link>

        {/* Search Bar (Placeholder) */}
        <div className="flex-1 w-full max-w-md md:mx-6 group">
          <input
            type="text"
            placeholder="Search jobs, users, messages..."
            className="w-full px-5 py-2.5 rounded-full text-sm bg-gray-100/50 border border-transparent focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-100 dark:bg-gray-800/50 dark:text-gray-100 dark:focus:bg-gray-800 dark:focus:border-primary-700 dark:focus:ring-primary-900 transition-all duration-300 outline-none"
          />
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className={navLinkClass(item.path)}>
              {item.name}
            </Link>
          ))}

          {/* Settings Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300">
              Settings ▼
            </button>
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right scale-95 group-hover:scale-100 z-20">
              <Link to="/settings" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800/50 transition-colors">
                General
              </Link>
              <Link to="/settings/deleted-posts" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800/50 transition-colors">
                Deleted Posts
              </Link>
              <button
                onClick={toggleTheme}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800/50 flex items-center gap-2 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Toggle Theme
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4 inline-block mr-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}