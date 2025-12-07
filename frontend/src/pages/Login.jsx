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
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] via-[#f8f5fa]/95 to-[#f8f5fa] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-[#7c3aed]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-[#7c3aed]/30 mb-6">
            <Shield className="h-10 w-10 text-[#7c3aed]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-[#2a2a3c]">
              NGO{" "}
              <span className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent">
                Portal
              </span>
            </h2>
            <p className="text-[#6b7280] text-lg">
              Secure Access to Reports Dashboard
            </p>
          </div>
        </div>

        {/* Security Badge */}
        {/* <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#e5e0eb] shadow-sm">
          <div className="flex items-center justify-center space-x-3">
            <Lock className="h-5 w-5 text-[#059669]" />
            <span className="text-sm text-[#4a3366]">
              Multi-factor authentication ready
            </span>
          </div>
        </div> */}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e5e0eb] p-8">
          {/* Form Header */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Building className="h-6 w-6 text-[#7c3aed]" />
            <h3 className="text-2xl font-bold text-[#2a2a3c]">
              Organization Login
            </h3>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#dc2626]/20 rounded-full flex items-center justify-center">
                  <Lock className="h-4 w-4 text-[#dc2626]" />
                </div>
                <p className="text-[#dc2626] text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#4a3366] mb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#7c3aed]" />
                  <span>Organization Email</span>
                </div>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="h-5 w-5 text-[#6b7280]" />
                </div>
                <InputField
                  label=""
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@your-ngo.org"
                  className="bg-[#f8f5fa] border-[#e5e0eb] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 pl-12 text-[#2a2a3c]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#4a3366] mb-2">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-[#7c3aed]" />
                  <span>Password</span>
                </div>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="h-5 w-5 text-[#6b7280]" />
                </div>
                <InputField
                  label=""
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="bg-[#f8f5fa] border-[#e5e0eb] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 pl-12 pr-12 text-[#2a2a3c]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6b7280] hover:text-[#7c3aed]"
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
                  className="text-sm text-[#7c3aed] hover:text-[#5b21b6] transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] hover:from-[#8b5cf6] hover:to-[#6d28d9] disabled:from-[#e5e0eb] disabled:to-[#d1c4e9] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed mt-6 shadow-lg hover:shadow-xl hover:shadow-[#7c3aed]/20"
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
            <div className="mt-6 p-4 bg-[#f8f5fa] rounded-xl border border-[#e5e0eb] shadow-sm">
              <p className="text-sm text-[#4a3366] text-center">
                <span className="text-[#7c3aed] font-medium">Demo Access:</span>{" "}
                Use your registered NGO credentials
              </p>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-8 pt-6 border-t border-[#e5e0eb]">
            <div className="text-center space-y-3">
              <p className="text-[#6b7280]">
                Don't have an organization account?
              </p>
              <Link to="/register">
                <button className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-[#f8f5fa] text-[#2a2a3c] px-8 py-3 rounded-xl font-semibold transition-all duration-300 border border-[#e5e0eb] hover:border-[#7c3aed]/50 shadow-sm hover:shadow-md">
                  <Building className="h-5 w-5" />
                  <span>Register Your NGO</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Security Footer */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-[#f8f5fa] rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Shield className="h-5 w-5 text-[#059669]" />
              </div>
              <p className="text-xs text-[#6b7280]">Encrypted</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-[#f8f5fa] rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Lock className="h-5 w-5 text-[#7c3aed]" />
              </div>
              <p className="text-xs text-[#6b7280]">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-[#f8f5fa] rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Building className="h-5 w-5 text-[#4a3366]" />
              </div>
              <p className="text-xs text-[#6b7280]">Verified</p>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#6b7280]">
            By accessing the portal, you agree to our{" "}
            <a href="/terms" className="text-[#7c3aed] hover:text-[#5b21b6] font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#7c3aed] hover:text-[#5b21b6] font-medium">
              Privacy Policy
            </a>
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-[#6b7280]">
            <Shield className="h-3 w-3" />
            <span>All access is logged for security purposes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;