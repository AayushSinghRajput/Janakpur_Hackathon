import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Shield,
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  FileText,
  CheckCircle,
  Lock,
  AlertCircle,
} from "lucide-react";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import reportService from "../services/reportService";

const ReportForm = () => {
  const [form, setForm] = useState({
    incidentTitle: "",
    description: "",
    dateTime: "",
    location: "",
    PhoneNumber: "",
    urgencyLevel: "Normal", 
    consentToShareWithNGO: false,
  });
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setEvidenceFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      // Create FormData with proper field names
      const formData = new FormData();

      // Append text fields
      formData.append("incidentTitle", form.incidentTitle);
      formData.append("description", form.description);
      formData.append("dateTime", form.dateTime);
      formData.append("location", form.location);
      formData.append("PhoneNumber", form.PhoneNumber);
      formData.append("urgencyLevel", form.urgencyLevel); 
      formData.append(
        "consentToShareWithNGO",
        form.consentToShareWithNGO.toString()
      );

      console.log("📤 FormData being sent:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Append files
      if (evidenceFiles.length > 0) {
        console.log(`📎 Appending ${evidenceFiles.length} file(s)...`);
        Array.from(evidenceFiles).forEach((file, index) => {
          formData.append("evidence", file);
          console.log(
            `File ${index}: ${file.name} (${file.type}, ${file.size} bytes)`
          );
        });
      } else {
        console.log("📎 No files to append");
      }

      console.log("🚀 Sending request to backend...");

      const res = await reportService.submitReport(formData);
      console.log("✅ Response received:", res);

      setMessage(`Report submitted successfully! Report ID: ${res.reportId}`);
      setMessageType("success");

      // NEW: Navigate to NGO profiles page after successful submission
      if (res.incidentType && form.consentToShareWithNGO) {
        // Wait 2 seconds to show success message, then redirect
        setTimeout(() => {
          navigate('/ngo-profiles', {
            state: {
              incidentType: res.incidentType,
              reportId: res.reportId,
              urgencyLevel: res.urgencyLevel
            }
          });
        }, 2000);
      } else if (form.consentToShareWithNGO && !res.incidentType) {
        // If no incident type but consent given, show general NGOs
        setTimeout(() => {
          navigate('/ngo-profiles', {
            state: {
              incidentType: 'General',
              reportId: res.reportId,
              urgencyLevel: res.urgencyLevel
            }
          });
        }, 2000);
      }

      // Reset form (only if not redirecting)
      if (!form.consentToShareWithNGO) {
        setForm({
          incidentTitle: "",
          description: "",
          dateTime: "",
          location: "",
          PhoneNumber: "",
          urgencyLevel: "Normal",
          consentToShareWithNGO: false,
        });
        setEvidenceFiles([]);
      }
    } catch (err) {
      console.error("❌ Error details:", err);
      console.error("❌ Full error:", err);
      setMessage(err.message || "Error submitting report.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4 border border-blue-500/30">
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Submit{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Anonymous Report
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your identity is completely protected. All information is encrypted
            and stored securely.
          </p>
        </div>

        {/* Updated Security Assurance with NGO note */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">
                End-to-end encrypted • No IP tracking • Zero-knowledge architecture
              </span>
            </div>
            {form.consentToShareWithNGO && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-900/30 rounded-lg border border-blue-700/30">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-300">
                  NGO support enabled
                </span>
              </div>
            )}
          </div>
          
          {/* NGO Redirection Notice */}
          {form.consentToShareWithNGO && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-sm text-gray-300">
                ✓ After submission, you'll be directed to relevant NGOs based on your report type
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                {/* Incident Title */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <label className="block text-lg font-semibold text-white">
                      Incident Title *
                    </label>
                  </div>
                  <InputField
                    label=""
                    name="incidentTitle"
                    value={form.incidentTitle}
                    onChange={handleChange}
                    required
                    placeholder="Title of the incident"
                    className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <label className="block text-lg font-semibold text-white">
                      Detailed Description *
                    </label>
                  </div>
                  <TextArea
                    label=""
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    placeholder="Please provide as much detail as possible about what happened"
                    rows={4}
                    className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                {/* DateTime and Location Row */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                      <label className="block text-lg font-semibold text-white">
                        Date & Time *
                      </label>
                    </div>
                    <InputField
                      label=""
                      type="datetime-local"
                      name="dateTime"
                      value={form.dateTime}
                      onChange={handleChange}
                      required
                      className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-5 w-5 text-orange-400" />
                      <label className="block text-lg font-semibold text-white">
                        Location *
                      </label>
                    </div>
                    <InputField
                      label=""
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                      placeholder="City, Street, or Specific Address"
                      className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Phone className="h-5 w-5 text-green-400" />
                    <label className="block text-lg font-semibold text-white">
                      Phone Number
                    </label>
                  </div>
                  <InputField
                    label=""
                    type="tel"
                    name="PhoneNumber"
                    value={form.PhoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Your Phone No."
                    className="bg-gray-900/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                {/* Urgency Level Dropdown */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <label className="block text-lg font-semibold text-white">
                      Urgency Level *
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      name="urgencyLevel"
                      value={form.urgencyLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="Normal" className="bg-gray-800 text-white">
                        Normal
                      </option>
                      <option
                        value="Emergency"
                        className="bg-gray-800 text-white"
                      >
                        Emergency
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Urgency Level Description */}
                  {form.urgencyLevel === "Emergency" && (
                    <div className="mt-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-300 mb-1">
                            Emergency reports are prioritized
                          </p>
                          <p className="text-xs text-red-400">
                            Emergency reports will be reviewed immediately and
                            forwarded to relevant authorities if needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {form.urgencyLevel === "Normal" && (
                    <div className="mt-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-300 mb-1">
                            Normal priority
                          </p>
                          <p className="text-xs text-blue-400">
                            Normal reports will be reviewed within 24-48 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* File Upload */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <Upload className="h-5 w-5 text-purple-400" />
                    <label className="block text-lg font-semibold text-white">
                      Evidence Files
                    </label>
                  </div>
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors duration-300 bg-gray-900/30">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <Upload className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            Upload photos, videos, or documents
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            Max 10 files • PNG, JPG, PDF, MP4 • 50MB total
                          </p>
                        </div>
                        <span className="text-blue-400 text-sm font-medium">
                          Choose files
                        </span>
                      </div>
                    </label>
                    {evidenceFiles.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-300 mb-2">
                          Selected files ({evidenceFiles.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(evidenceFiles).map((file, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300"
                            >
                              {file.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="mb-8">
                  <label className="flex items-start space-x-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentToShareWithNGO"
                      checked={form.consentToShareWithNGO}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500/20"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="font-semibold text-white">
                          Share with Verified NGOs
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        I consent to share this anonymized report with verified
                        NGOs who can provide support and assistance. Your
                        personal identity remains completely hidden.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className={`w-full py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                    form.urgencyLevel === "Emergency"
                      ? "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting Report...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      {form.urgencyLevel === "Emergency" ? (
                        <AlertCircle className="h-5 w-5" />
                      ) : (
                        <Shield className="h-5 w-5" />
                      )}
                      <div className="flex flex-col items-center">
                        <span>
                          Submit {form.urgencyLevel === "Emergency" ? "Emergency" : "Anonymous"} Report
                        </span>
                        {form.consentToShareWithNGO && (
                          <span className="text-xs text-white/70 mt-1">
                            → You'll see relevant NGOs after submission
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {/* Message Display */}
            {message && (
              <div
                className={`mt-6 p-4 rounded-xl border ${
                  messageType === "success"
                    ? "bg-green-900/20 border-green-700"
                    : "bg-red-900/20 border-red-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {messageType === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`${
                        messageType === "success"
                          ? "text-green-300"
                          : "text-red-300"
                      }`}
                    >
                      {message}
                    </p>
                    
                    {/* Show NGO redirect notice */}
                    {messageType === "success" && form.consentToShareWithNGO && (
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="animate-pulse">
                          <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <span className="text-sm text-blue-300">
                          Redirecting to relevant NGOs in 2 seconds...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* NGO Benefits Card */}
            {form.consentToShareWithNGO && (
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>NGO Support Benefits</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-300">
                      Get matched with verified NGOs specialized for your incident type
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-300">
                      Direct contact information for immediate support
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-300">
                      Access to specialized services like counseling and legal aid
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-300">
                      Your privacy remains protected - NGOs see only anonymized reports
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Lock className="h-5 w-5 text-green-400" />
                <span>Your Privacy</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-300">
                    No personal information is stored
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-300">
                    Reports are end-to-end encrypted
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-300">
                    No IP addresses or location tracking
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-300">
                    Anonymous report ID provided for follow-up
                  </span>
                </li>
              </ul>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30">
              <h3 className="text-xl font-bold text-white mb-4">
                📝 Reporting Guidelines
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-300">1</span>
                  </div>
                  <span className="text-sm text-gray-300">
                    Be specific about dates, times, and locations
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-300">2</span>
                  </div>
                  <span className="text-sm text-gray-300">
                    Include all relevant evidence files
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-300">3</span>
                  </div>
                  <span className="text-sm text-gray-300">
                    Save your report ID for future reference
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-300">4</span>
                  </div>
                  <span className="text-sm text-gray-300">
                    Select appropriate urgency level
                  </span>
                </li>
              </ul>
            </div>

            {/* Emergency Note */}
            <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-700/30">
              <h3 className="text-xl font-bold text-white mb-3">
                🚨 Emergency?
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                If you or someone else is in immediate danger:
              </p>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-sm font-semibold text-white">
                  Call Emergency Services:
                </p>
                <p className="text-lg font-bold text-red-400 mt-1">
                  911 or 112
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            <Lock className="h-4 w-4 inline mr-1" />
            All reports are handled with utmost confidentiality and security.
            {form.consentToShareWithNGO && (
              <span className="ml-2 text-blue-300">
                ✓ NGO support enabled
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;