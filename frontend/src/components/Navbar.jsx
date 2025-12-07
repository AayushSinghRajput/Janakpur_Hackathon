import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/tokenHandler";
import {
  Shield,
  LogOut,
  Home,
  FileText,
  LogIn,
  UserPlus,
  LayoutDashboard,
  MessageSquare
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <nav className="bg-[#f8f5fa] text-[#2a2a3c] shadow-lg border-b border-[#e5e0eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-[#7c3aed] rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent hover:from-[#8b5cf6] hover:to-[#6d28d9] transition-all duration-300"
            >
              AIRE Vault
              <span className="block text-xs font-normal text-[#6b7280] mt-[-2px]">
                Anonymous Incident Reporting & Evidence
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200 group"
            >
              <Home className="h-4 w-4 group-hover:text-[#7c3aed]" />
              <span>Home</span>
            </Link>

            <Link
              to="/report"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200 group"
            >
              <FileText className="h-4 w-4 group-hover:text-[#7c3aed]" />
              <span>Report</span>
            </Link>

            <Link
              to="/chat"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Chat</span>
            </Link>

            {/* Dashboard Link - Only show if token exists */}
            {token && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#e5e0eb] hover:text-[#059669] transition-colors duration-200 group"
              >
                <LayoutDashboard className="h-4 w-4 group-hover:text-[#059669]" />
                <span>Dashboard</span>
              </Link>
            )}

            {/* Conditional Auth Links */}
            <div className="flex items-center space-x-1 ml-2 pl-4 border-l border-[#e5e0eb]">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200 group"
                  >
                    <LogIn className="h-4 w-4 group-hover:text-[#7c3aed]" />
                    <span>NGO Login</span>
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center space-x-2 px-4 py-2 bg-[#7c3aed] hover:bg-[#5b21b6] text-white rounded-lg transition-colors duration-200 group ml-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#e5e0eb] hover:text-[#dc2626] transition-colors duration-200 group"
                >
                  <LogOut className="h-4 w-4 group-hover:text-[#dc2626]" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-[#6b7280] hover:text-[#4a3366] p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 border-t border-[#e5e0eb]">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/report"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200"
            >
              <FileText className="h-5 w-5" />
              <span>Report</span>
            </Link>

            <Link
              to="/chat"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Chat</span>
            </Link>

            {/* Dashboard Link - Only show if token exists (Mobile) */}
            {token && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#e5e0eb] hover:text-[#059669] transition-colors duration-200"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            )}

            {!token ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#e5e0eb] hover:text-[#4a3366] transition-colors duration-200"
                >
                  <LogIn className="h-5 w-5" />
                  <span>NGO Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-3 px-4 py-3 bg-[#7c3aed] hover:bg-[#5b21b6] text-white rounded-lg transition-colors duration-200"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#e5e0eb] hover:text-[#dc2626] transition-colors duration-200 text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;