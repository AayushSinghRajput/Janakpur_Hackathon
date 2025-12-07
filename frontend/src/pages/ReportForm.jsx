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
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] via-[#f8f5fa]/95 to-[#f8f5fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#7c3aed]/20 rounded-full mb-4 border border-[#7c3aed]/30">
            <Shield className="h-8 w-8 text-[#7c3aed]" />
          </div>
          <h1 className="text-4xl font-bold text-[#2a2a3c] mb-4">
            Submit{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent">
              Anonymous Report
            </span>
          </h1>
          <p className="text-[#4a3366] text-lg max-w-2xl mx-auto">
            Your identity is completely protected. All information is encrypted
            and stored securely.
          </p>
        </div>

        {/* Updated Security Assurance with NGO note */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#e5e0eb] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-[#059669]" />
              <span className="text-sm text-[#4a3366]">
                End-to-end encrypted • No IP tracking • Zero-knowledge architecture
              </span>
            </div>
            {form.consentToShareWithNGO && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-[#7c3aed]/20 rounded-lg border border-[#7c3aed]/30">
                <CheckCircle className="h-4 w-4 text-[#7c3aed]" />
                <span className="text-sm text-[#5b21b6] font-medium">
                  NGO support enabled
                </span>
              </div>
            )}
          </div>
          
          {/* NGO Redirection Notice */}
          {form.consentToShareWithNGO && (
            <div className="mt-3 pt-3 border-t border-[#e5e0eb]">
              <p className="text-sm text-[#4a3366]">
                ✓ After submission, you'll be directed to relevant NGOs based on your report type
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#e5e0eb] shadow-sm">
                {/* Incident Title */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-[#dc2626]" />
                    <label className="block text-lg font-semibold text-[#2a2a3c]">
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
                    className="bg-[#f8f5fa] border-[#e5e0eb] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 text-[#2a2a3c]"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-[#7c3aed]" />
                    <label className="block text-lg font-semibold text-[#2a2a3c]">
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
                    className="bg-[#f8f5fa] border-[#e5e0eb] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 text-[#2a2a3c]"
                  />
                </div>

                {/* DateTime and Location Row */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="h-5 w-5 text-[#5b21b6]" />
                      <label className="block text-lg font-semibold text-[#2a2a3c]">
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
                      className="bg-[#f8f5fa] border-[#e5e0eb] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 text-[#2a2a3c]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-5 w-5 text-[#4a3366]" />
                      <label className="block text-lg font-semibold text-[#2a2a3c]">
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
                      className="bg-[#f8f5fa] border-[#e5e0eb] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 text-[#2a2a3c]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Phone className="h-5 w-5 text-[#059669]" />
                    <label className="block text-lg font-semibold text-[#2a2a3c]">
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
                    className="bg-[#f8f5fa] border-[#e5e0eb] focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 text-[#2a2a3c]"
                  />
                </div>

                {/* Urgency Level Dropdown */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-[#4a3366]" />
                    <label className="block text-lg font-semibold text-[#2a2a3c]">
                      Urgency Level *
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      name="urgencyLevel"
                      value={form.urgencyLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#f8f5fa] border border-[#e5e0eb] rounded-xl text-[#2a2a3c] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="Normal" className="bg-white text-[#2a2a3c]">
                        Normal
                      </option>
                      <option
                        value="Emergency"
                        className="bg-white text-[#2a2a3c]"
                      >
                        Emergency
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6b7280]">
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
                    <div className="mt-3 p-3 bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[#dc2626] mb-1">
                            Emergency reports are prioritized
                          </p>
                          <p className="text-xs text-[#b91c1c]">
                            Emergency reports will be reviewed immediately and
                            forwarded to relevant authorities if needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {form.urgencyLevel === "Normal" && (
                    <div className="mt-3 p-3 bg-[#7c3aed]/10 border border-[#7c3aed]/30 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Shield className="h-5 w-5 text-[#7c3aed] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[#5b21b6] mb-1">
                            Normal priority
                          </p>
                          <p className="text-xs text-[#4a3366]">
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
                    <Upload className="h-5 w-5 text-[#4a3366]" />
                    <label className="block text-lg font-semibold text-[#2a2a3c]">
                      Evidence Files
                    </label>
                  </div>
                  <div className="border-2 border-dashed border-[#e5e0eb] rounded-xl p-6 text-center hover:border-[#7c3aed]/50 transition-colors duration-300 bg-[#f8f5fa]">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 bg-[#7c3aed]/20 rounded-full flex items-center justify-center">
                          <Upload className="h-6 w-6 text-[#7c3aed]" />
                        </div>
                        <div>
                          <p className="text-[#2a2a3c] font-medium">
                            Upload photos, videos, or documents
                          </p>
                          <p className="text-[#6b7280] text-sm mt-1">
                            Max 10 files • PNG, JPG, PDF, MP4 • 50MB total
                          </p>
                        </div>
                        <span className="text-[#7c3aed] text-sm font-medium">
                          Choose files
                        </span>
                      </div>
                    </label>
                    {evidenceFiles.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#e5e0eb]">
                        <p className="text-sm text-[#4a3366] mb-2">
                          Selected files ({evidenceFiles.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(evidenceFiles).map((file, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-[#e5e0eb] rounded-lg text-sm text-[#4a3366]"
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
                  <label className="flex items-start space-x-3 p-4 bg-[#f8f5fa] rounded-xl border border-[#e5e0eb] hover:border-[#7c3aed]/50 transition-colors duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentToShareWithNGO"
                      checked={form.consentToShareWithNGO}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-[#7c3aed] bg-white border-[#e5e0eb] rounded focus:ring-[#7c3aed]/20"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-[#059669]" />
                        <span className="font-semibold text-[#2a2a3c]">
                          Share with Verified NGOs
                        </span>
                      </div>
                      <p className="text-[#4a3366] text-sm">
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
                      ? "bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626]"
                      : "bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] hover:from-[#8b5cf6] hover:to-[#6d28d9]"
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
                    ? "bg-[#059669]/10 border-[#059669]/30"
                    : "bg-[#dc2626]/10 border-[#dc2626]/30"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {messageType === "success" ? (
                    <CheckCircle className="h-5 w-5 text-[#059669]" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-[#dc2626]" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`${
                        messageType === "success"
                          ? "text-[#059669]"
                          : "text-[#dc2626]"
                      }`}
                    >
                      {message}
                    </p>
                    
                    {/* Show NGO redirect notice */}
                    {messageType === "success" && form.consentToShareWithNGO && (
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="animate-pulse">
                          <svg className="h-4 w-4 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <span className="text-sm text-[#5b21b6] font-medium">
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
              <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#7c3aed]/30 shadow-sm">
                <h3 className="text-xl font-bold text-[#2a2a3c] mb-4 flex items-center space-x-2">
                  <svg className="h-5 w-5 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>NGO Support Benefits</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                    <span className="text-sm text-[#4a3366]">
                      Get matched with verified NGOs specialized for your incident type
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                    <span className="text-sm text-[#4a3366]">
                      Direct contact information for immediate support
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                    <span className="text-sm text-[#4a3366]">
                      Access to specialized services like counseling and legal aid
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                    <span className="text-sm text-[#4a3366]">
                      Your privacy remains protected - NGOs see only anonymized reports
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#e5e0eb] shadow-sm">
              <h3 className="text-xl font-bold text-[#2a2a3c] mb-4 flex items-center space-x-2">
                <Lock className="h-5 w-5 text-[#059669]" />
                <span>Your Privacy</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                  <span className="text-sm text-[#4a3366]">
                    No personal information is stored
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                  <span className="text-sm text-[#4a3366]">
                    Reports are end-to-end encrypted
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                  <span className="text-sm text-[#4a3366]">
                    No IP addresses or location tracking
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#7c3aed] rounded-full mt-2"></div>
                  <span className="text-sm text-[#4a3366]">
                    Anonymous report ID provided for follow-up
                  </span>
                </li>
              </ul>
            </div>

            {/* Guidelines */}
            <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#7c3aed]/30 shadow-sm">
              <h3 className="text-xl font-bold text-[#2a2a3c] mb-4">
                📝 Reporting Guidelines
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#7c3aed]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#5b21b6]">1</span>
                  </div>
                  <span className="text-sm text-[#4a3366]">
                    Be specific about dates, times, and locations
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#7c3aed]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#5b21b6]">2</span>
                  </div>
                  <span className="text-sm text-[#4a3366]">
                    Include all relevant evidence files
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#7c3aed]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#5b21b6]">3</span>
                  </div>
                  <span className="text-sm text-[#4a3366]">
                    Save your report ID for future reference
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#7c3aed]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#5b21b6]">4</span>
                  </div>
                  <span className="text-sm text-[#4a3366]">
                    Select appropriate urgency level
                  </span>
                </li>
              </ul>
            </div>

            {/* Emergency Note */}
            <div className="bg-gradient-to-r from-[#dc2626]/10 to-[#b91c1c]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#dc2626]/30 shadow-sm">
              <h3 className="text-xl font-bold text-[#2a2a3c] mb-3">
                🚨 Emergency?
              </h3>
              <p className="text-sm text-[#4a3366] mb-3">
                If you or someone else is in immediate danger:
              </p>
              <div className="bg-[#f8f5fa] rounded-lg p-3">
                <p className="text-sm font-semibold text-[#2a2a3c]">
                  Call Emergency Services:
                </p>
                <p className="text-lg font-bold text-[#dc2626] mt-1">
                  911 or 112
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-[#6b7280] text-sm">
            <Lock className="h-4 w-4 inline mr-1" />
            All reports are handled with utmost confidentiality and security.
            {form.consentToShareWithNGO && (
              <span className="ml-2 text-[#5b21b6] font-medium">
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