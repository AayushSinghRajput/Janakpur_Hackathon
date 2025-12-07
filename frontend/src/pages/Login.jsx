import { useState } from "react";
import { Shield, Lock, Mail, Eye, EyeOff, Building, LogIn } from "lucide-react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ngoService from "../services/ngoService";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await ngoService.login(form);
      loginUser(res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-blue-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-blue-500/30 mb-6">
            <Shield className="h-10 w-10 text-blue-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white">
              NGO{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Portal
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Secure Access to Reports Dashboard
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-center space-x-3">
            <Lock className="h-5 w-5 text-green-400" />
            <span className="text-sm text-gray-300">
              Multi-factor authentication ready
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8">
          {/* Form Header */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Building className="h-6 w-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">
              Organization Login
            </h3>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center">
                  <Lock className="h-4 w-4 text-red-400" />
                </div>
                <p className="text-red-300 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>Organization Email</span>
                </div>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <InputField
                  label=""
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@your-ngo.org"
                  className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 pl-12"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-blue-400" />
                  <span>Password</span>
                </div>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <InputField
                  label=""
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-6 w-6" />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>

            {/* Demo Note */}
            <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400 text-center">
                <span className="text-blue-400 font-medium">Demo Access:</span>{" "}
                Use your registered NGO credentials
              </p>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="text-center space-y-3">
              <p className="text-gray-400">
                Don't have an organization account?
              </p>
              <Link to="/register">
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-600">
                  <Building className="h-5 w-5" />
                  <span>Register Your NGO</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Security Footer */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-xs text-gray-400">Encrypted</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-xs text-gray-400">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="text-xs text-gray-400">Verified</p>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By accessing the portal, you agree to our{" "}
            <a href="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-600">
            <Shield className="h-3 w-3" />
            <span>All access is logged for security purposes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;