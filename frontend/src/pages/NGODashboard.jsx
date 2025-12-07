import { useEffect, useState } from "react";
import {
  BarChart3,
  Filter,
  Search,
  Shield,
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Users,
  TrendingUp,
  FileImage,
  FileVideo,
  File,
  X,
  Play,
  Maximize2,
  ChevronDown,
  AlertOctagon,
  Check,
} from "lucide-react";
import reportService from "../services/reportService";
import ReportCard from "../components/ReportCard";
import Loader from "../components/Loader";
import Button from "../components/Button";
import {
  generatePDFReport,
  generateHTMLReport,
  downloadTextReport,
} from "../utils/reportDownloader";
import { useNavigate } from 'react-router-dom';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [selectedEvidenceIndex, setSelectedEvidenceIndex] = useState(null);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    under_review: 0,
    action_taken: 0,
    resolved: 0,
    emergency: 0,
    normal: 0,
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        const data = await reportService.getReports();

        // Backend returns { success, reports: [...] }
        const reportList = Array.isArray(data?.reports) ? data.reports : [];

        // Save reports
        setReports(reportList);
        setFilteredReports(reportList);

        // Calculate statistics safely
        const total = reportList.length;
        const pending = reportList.filter((r) => r.status === "pending").length;
        const under_review = reportList.filter(
          (r) => r.status === "under_review"
        ).length;
        const action_taken = reportList.filter(
          (r) => r.status === "action_taken" || r.status === "resolved"
        ).length;
        const resolved = reportList.filter(
          (r) => r.status === "resolved"
        ).length;
        const emergency = reportList.filter(
          (r) => r.urgencyLevel === "Emergency"
        ).length;
        const normal = reportList.filter(
          (r) => r.urgencyLevel === "Normal"
        ).length;

        setStats({
          total,
          pending,
          under_review,
          action_taken,
          resolved,
          emergency,
          normal,
        });
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    // Ensure reports is always an array
    if (!Array.isArray(reports)) {
      setFilteredReports([]);
      return;
    }

    let filtered = [...reports];

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (report) =>
          (report.incidentTitle || "").toLowerCase().includes(lower) ||
          (report.description || "").toLowerCase().includes(lower) ||
          (report.location || "").toLowerCase().includes(lower) ||
          (report.incidentType || "").toLowerCase().includes(lower)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    // Apply urgency filter
    if (urgencyFilter !== "all") {
      filtered = filtered.filter(
        (report) => report.urgencyLevel === urgencyFilter
      );
    }

    setFilteredReports(filtered);
  }, [searchTerm, statusFilter, urgencyFilter, reports]);

  const handleViewReport = (report) => setSelectedReport(report);

  const handleMarkAsResolved = async () => {
    if (!selectedReport) return;

    try {
      setUpdatingStatus(true);

      // Use the existing updateReport API with PATCH method
      const result = await reportService.updateReport(selectedReport.reportId, {
        status: "resolved",
      });

      // Update the reports state
      const updatedReportsList = reports.map((report) =>
        report.reportId === selectedReport.reportId
          ? {
              ...report,
              status: "resolved",
              updatedAt: new Date().toISOString(),
            }
          : report
      );

      setReports(updatedReportsList);

      // Update the selected report in state
      setSelectedReport((prev) => ({
        ...prev,
        status: "resolved",
        updatedAt: new Date().toISOString(),
      }));

      // Calculate updated statistics
      const total = updatedReportsList.length;
      const pending = updatedReportsList.filter(
        (r) => r.status === "pending"
      ).length;
      const under_review = updatedReportsList.filter(
        (r) => r.status === "under_review"
      ).length;
      const action_taken = updatedReportsList.filter(
        (r) => r.status === "action_taken" || r.status === "resolved"
      ).length;
      const resolved = updatedReportsList.filter(
        (r) => r.status === "resolved"
      ).length;
      const emergency = updatedReportsList.filter(
        (r) => r.urgencyLevel === "Emergency"
      ).length;
      const normal = updatedReportsList.filter(
        (r) => r.urgencyLevel === "Normal"
      ).length;

      setStats({
        total,
        pending,
        under_review,
        action_taken,
        resolved,
        emergency,
        normal,
      });

      console.log("Report marked as resolved successfully!");
    } catch (error) {
      console.error("Error updating report status:", error);
      alert(
        error.message || "Failed to update report status. Please try again."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDownloadReport = (report, format = "pdf") => {
    try {
      switch (format) {
        case "pdf":
          generatePDFReport(report);
          break;
        case "html":
          // Create HTML report and open in new window
          const htmlContent = generateHTMLReport(report);
          const win = window.open("", "_blank");
          win.document.write(htmlContent);
          win.document.close();
          break;
        case "text":
          downloadTextReport(report);
          break;
        default:
          generatePDFReport(report);
      }

      // Show success message (you could use a toast notification instead)
      console.log(
        `Report downloaded successfully in ${format.toUpperCase()} format!`
      );
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Please try again.");
    }
  };

  const getFileIcon = (url) => {
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return FileImage;
    } else if (["mp4", "mov", "avi", "webm", "mkv"].includes(extension)) {
      return FileVideo;
    } else if (["pdf"].includes(extension)) {
      return FileText;
    } else {
      return File;
    }
  };

  const getFileType = (url) => {
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return "image";
    } else if (["mp4", "mov", "avi", "webm", "mkv"].includes(extension)) {
      return "video";
    } else if (["pdf"].includes(extension)) {
      return "pdf";
    } else if (["doc", "docx"].includes(extension)) {
      return "document";
    } else {
      return "file";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-900/30 text-amber-400";
      case "under_review":
        return "bg-blue-900/30 text-blue-400";
      case "action_taken":
        return "bg-purple-900/30 text-purple-400";
      case "resolved":
        return "bg-green-900/30 text-green-400";
      case "archived":
        return "bg-gray-900/30 text-gray-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  const openEvidenceModal = (index) => {
    setSelectedEvidenceIndex(index);
    setEvidenceModalOpen(true);
  };

  const closeEvidenceModal = () => {
    setEvidenceModalOpen(false);
    setSelectedEvidenceIndex(null);
  };

  const navigateEvidence = (direction) => {
    if (!selectedReport || !selectedReport.evidenceUrls) return;

    const totalEvidence = selectedReport.evidenceUrls.length;
    let newIndex = selectedEvidenceIndex + direction;

    if (newIndex < 0) newIndex = totalEvidence - 1;
    if (newIndex >= totalEvidence) newIndex = 0;

    setSelectedEvidenceIndex(newIndex);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setUrgencyFilter("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                NGO{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-gray-400 mt-2">
                Monitor and manage anonymous incident reports
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" icon={Download}>
                Export Reports
              </Button>
              <Button icon={BarChart3} onClick={() => navigate('/analytics')} >
                Analytics
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Reports</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% this month</span>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Emergency Cases</p>
                  <p className="text-3xl font-bold text-red-400">
                    {stats.emergency}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                  <AlertOctagon className="h-6 w-6 text-red-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-gray-400">
                  Requires immediate attention
                </span>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Action Taken</p>
                  <p className="text-3xl font-bold text-purple-400">
                    {stats.action_taken}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{
                      width: `${
                        stats.total
                          ? (stats.action_taken / stats.total) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Review</p>
                  <p className="text-3xl font-bold text-amber-400">
                    {stats.pending}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{
                      width: `${
                        stats.total ? (stats.pending / stats.total) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports by title, description, location, or type..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Additional Filters Row */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Status Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-auto"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="action_taken">Action Taken</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Urgency Filter */}
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                  <select
                    className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-auto"
                    value={urgencyFilter}
                    onChange={(e) => setUrgencyFilter(e.target.value)}
                  >
                    <option value="all">All Urgency Levels</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="flex justify-end">
                <Button variant="ghost" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm ||
              statusFilter !== "all" ||
              urgencyFilter !== "all") && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm text-gray-400">Active filters:</span>

                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-700/30">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-2 text-blue-200 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  {statusFilter !== "all" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-900/30 text-amber-300 border border-amber-700/30">
                      Status: {statusFilter.replace("_", " ")}
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="ml-2 text-amber-200 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  {urgencyFilter !== "all" && (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        urgencyFilter === "Emergency"
                          ? "bg-red-900/30 text-red-300 border-red-700/30"
                          : "bg-blue-900/30 text-blue-300 border-blue-700/30"
                      }`}
                    >
                      Urgency: {urgencyFilter}
                      <button
                        onClick={() => setUrgencyFilter("all")}
                        className={`ml-2 ${
                          urgencyFilter === "Emergency"
                            ? "text-red-200 hover:text-white"
                            : "text-blue-200 hover:text-white"
                        }`}
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">
              Incident Reports ({filteredReports.length})
            </h2>
            <div className="text-sm text-gray-400">
              Showing {filteredReports.length} of {reports.length} reports
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No reports found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.reportId}
                  report={report}
                  onView={handleViewReport}
                />
              ))}
            </div>
          )}
        </div>

        {/* Security Footer */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm font-medium text-white">
                  All reports are encrypted and anonymized
                </p>
                <p className="text-xs text-gray-400">
                  Access is logged for security purposes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-400">Last sync: Just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedReport.urgencyLevel === "Emergency"
                        ? "bg-red-500 animate-pulse"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedReport.incidentTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Report ID */}
              <div className="bg-gray-900/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Report ID</p>
                    <p className="font-mono font-bold text-white">
                      {selectedReport.reportId}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded">
                        {selectedReport.incidentType
                          ? selectedReport.incidentType
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")
                          : "General"}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          selectedReport.urgencyLevel === "Emergency"
                            ? "bg-red-900/30 text-red-300"
                            : "bg-blue-900/30 text-blue-300"
                        }`}
                      >
                        {selectedReport.urgencyLevel}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span
                      className={`px-3 py-1 rounded-full ${getStatusColor(
                        selectedReport.status
                      )}`}
                    >
                      {selectedReport.status?.replace("_", " ") || "pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                      <span className="font-medium text-gray-300">
                        Date & Time
                      </span>
                    </div>
                    <p className="text-white">
                      {new Date(selectedReport.dateTime).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Reported on:{" "}
                      {new Date(selectedReport.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-5 w-5 text-red-400" />
                      <span className="font-medium text-gray-300">
                        Location
                      </span>
                    </div>
                    <p className="text-white">{selectedReport.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {selectedReport.PhoneNumber && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="h-5 w-5 text-green-400" />
                        <span className="font-medium text-gray-300">
                          Contact Number
                        </span>
                      </div>
                      <p className="text-white">{selectedReport.PhoneNumber}</p>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <span className="font-medium text-gray-300">
                        Consent Status
                      </span>
                    </div>
                    <p
                      className={`font-medium ${
                        selectedReport.consentToShareWithNGO
                          ? "text-green-400"
                          : "text-amber-400"
                      }`}
                    >
                      {selectedReport.consentToShareWithNGO
                        ? "Shared with NGOs ✓"
                        : "Anonymous only"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Incident Description
                </h4>
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <p className="text-gray-300 whitespace-pre-line">
                    {selectedReport.description}
                  </p>
                </div>
              </div>

              {/* Evidence Section - Full width image container */}
              {selectedReport.evidenceUrls &&
                selectedReport.evidenceUrls.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">
                        Evidence Files ({selectedReport.evidenceUrls.length})
                      </h4>
                      <div className="text-sm text-gray-400">
                        Click to view full size
                      </div>
                    </div>

                    {/* Full width evidence grid */}
                    <div className="w-full space-y-4">
                      {selectedReport.evidenceUrls.map((url, index) => {
                        const fileType = getFileType(url);
                        const IconComponent = getFileIcon(url);
                        const fileName =
                          url.split("/").pop() || `evidence-${index + 1}`;
                        const isImage = fileType === "image";
                        const isVideo = fileType === "video";

                        return (
                          <div
                            key={index}
                            className="w-full bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group cursor-pointer"
                            onClick={() => openEvidenceModal(index)}
                          >
                            {/* Preview Container - Full width */}
                            <div className="relative w-full bg-gray-800 overflow-hidden">
                              {isImage ? (
                                <>
                                  {/* Full width Image Preview */}
                                  <div className="relative w-full h-96">
                                    <img
                                      src={url}
                                      alt={`Evidence ${index + 1}`}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://via.placeholder.com/1200x400/1f2937/9ca3af?text=${encodeURIComponent(
                                          fileName
                                        )}`;
                                      }}
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                      <div className="flex items-center space-x-2 text-white">
                                        <Maximize2 className="h-5 w-5" />
                                        <span className="text-lg font-medium">
                                          Click to view fullscreen
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : isVideo ? (
                                <>
                                  {/* Full width Video Preview */}
                                  <div className="relative w-full h-64 flex flex-col items-center justify-center p-8">
                                    <div className="w-20 h-20 bg-blue-600/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-blue-600/70 transition-colors">
                                      <Play className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="mt-6 text-center px-4">
                                      <p className="text-xl text-white font-medium truncate w-full">
                                        {fileName}
                                      </p>
                                      <p className="text-gray-300 mt-2">
                                        Click to play video in fullscreen
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* Full width Document/File Preview */}
                                  <div className="relative w-full h-48 flex flex-col items-center justify-center p-8">
                                    <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-gray-700/70 transition-colors">
                                      <IconComponent className="h-12 w-12 text-blue-400" />
                                    </div>
                                    <div className="mt-6 text-center">
                                      <p className="text-xl text-white font-medium truncate w-full px-8">
                                        {fileName}
                                      </p>
                                      <p className="text-gray-300 mt-2">
                                        Click to download file
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* File Type Badge */}
                              <div className="absolute top-4 left-4">
                                <span className="text-sm px-3 py-1.5 bg-black/70 text-white rounded-lg">
                                  {fileType.toUpperCase()}
                                </span>
                              </div>

                              {/* Evidence Number */}
                              <div className="absolute top-4 right-4">
                                <span className="text-sm px-3 py-1.5 bg-black/70 text-white rounded-lg">
                                  Evidence #{index + 1}
                                </span>
                              </div>
                            </div>

                            {/* File Info */}
                            <div className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <IconComponent className="h-5 w-5 text-blue-400" />
                                  <div>
                                    <span className="text-lg font-medium text-white">
                                      {fileName}
                                    </span>
                                    <p className="text-sm text-gray-400 mt-1">
                                      {fileType.charAt(0).toUpperCase() +
                                        fileType.slice(1)}{" "}
                                      file • Click to preview
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(url, "_blank");
                                  }}
                                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-600/10"
                                >
                                  <Download className="h-4 w-4" />
                                  <span>Open Directly</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-700 mt-8">
                {/* Mark as Resolved Button - Only show if not already resolved */}
                {selectedReport.status !== "resolved" && (
                  <Button
                    variant="secondary"
                    icon={updatingStatus ? undefined : Check}
                    onClick={handleMarkAsResolved}
                    loading={updatingStatus}
                    disabled={
                      updatingStatus || selectedReport.status === "resolved"
                    }
                    className="min-w-[180px]"
                  >
                    {updatingStatus ? "Updating..." : "Mark as Resolved"}
                  </Button>
                )}

                {/* Already Resolved Indicator */}
                {selectedReport.status === "resolved" && (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-green-900/30 text-green-400 rounded-xl border border-green-700/30">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Already Resolved</span>
                  </div>
                )}

                {/* Download Button with Dropdown that appears ABOVE */}
                <div className="relative">
                  <Button
                    onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showDownloadOptions ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {showDownloadOptions && (
                    <div className="absolute bottom-full right-0 mb-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-10">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            handleDownloadReport(selectedReport, "pdf");
                            setShowDownloadOptions(false);
                          }}
                          className="w-full text-left px-4 py-4 text-sm text-white hover:bg-gray-700/50 rounded-lg flex items-center space-x-3 transition-colors"
                        >
                          <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-red-400" />
                          </div>
                          <div>
                            <div className="font-medium">Download as PDF</div>
                            <div className="text-xs text-gray-400 mt-1">
                              Standard report format
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            handleDownloadReport(selectedReport, "html");
                            setShowDownloadOptions(false);
                          }}
                          className="w-full text-left px-4 py-4 text-sm text-white hover:bg-gray-700/50 rounded-lg flex items-center space-x-3 transition-colors"
                        >
                          <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="h-5 w-5 text-blue-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">Open in Browser</div>
                            <div className="text-xs text-gray-400 mt-1">
                              View & print directly
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            handleDownloadReport(selectedReport, "text");
                            setShowDownloadOptions(false);
                          }}
                          className="w-full text-left px-4 py-4 text-sm text-white hover:bg-gray-700/50 rounded-lg flex items-center space-x-3 transition-colors"
                        >
                          <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="h-5 w-5 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">Download as Text</div>
                            <div className="text-xs text-gray-400 mt-1">
                              Plain text format
                            </div>
                          </div>
                        </button>
                      </div>
                      {/* Arrow pointing to button */}
                      <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gray-800 transform rotate-45 border-r border-b border-gray-700"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Success Message */}
              {selectedReport.status === "resolved" && (
                <div className="mt-6 p-4 bg-green-900/20 border border-green-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-green-300 font-medium">
                        This report has been marked as resolved
                      </p>
                      <p className="text-green-400/70 text-sm mt-1">
                        Last updated:{" "}
                        {new Date(
                          selectedReport.updatedAt || selectedReport.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Evidence Modal */}
      {evidenceModalOpen &&
        selectedReport &&
        selectedReport.evidenceUrls &&
        selectedEvidenceIndex !== null && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center">
            <div className="relative w-full h-full flex flex-col">
              {/* Close Button */}
              <button
                onClick={closeEvidenceModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateEvidence(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white"
              >
                ←
              </button>
              <button
                onClick={() => navigateEvidence(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white"
              >
                →
              </button>

              {/* Evidence Counter */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-4 py-2 bg-black/70 rounded-full text-white text-sm">
                  {selectedEvidenceIndex + 1} /{" "}
                  {selectedReport.evidenceUrls.length}
                </div>
              </div>

              {/* Evidence Content */}
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-6xl max-h-full w-full">
                  {getFileType(
                    selectedReport.evidenceUrls[selectedEvidenceIndex]
                  ) === "image" ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={selectedReport.evidenceUrls[selectedEvidenceIndex]}
                        alt={`Evidence ${selectedEvidenceIndex + 1}`}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/1200x800/1f2937/9ca3af?text=Image+not+available`;
                        }}
                      />
                    </div>
                  ) : getFileType(
                      selectedReport.evidenceUrls[selectedEvidenceIndex]
                    ) === "video" ? (
                    <div className="w-full max-w-4xl mx-auto">
                      <div className="relative pt-[56.25%]">
                        {" "}
                        {/* 16:9 Aspect Ratio */}
                        <video
                          src={
                            selectedReport.evidenceUrls[selectedEvidenceIndex]
                          }
                          controls
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            const errorDiv = document.createElement("div");
                            errorDiv.className =
                              "absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-lg";
                            errorDiv.innerHTML = `
                            <div class="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                              <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <p class="text-white text-xl font-medium mb-2">Video not available</p>
                            <p class="text-gray-400">Try downloading the file directly</p>
                          `;
                            e.target.parentNode.appendChild(errorDiv);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700 max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                          <FileText className="h-12 w-12 text-blue-400" />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-4">
                          {selectedReport.evidenceUrls[selectedEvidenceIndex]
                            .split("/")
                            .pop()}
                        </h4>
                        <p className="text-gray-400 text-lg mb-8">
                          This file type cannot be previewed. Please download it
                          to view.
                        </p>
                        <button
                          onClick={() =>
                            window.open(
                              selectedReport.evidenceUrls[
                                selectedEvidenceIndex
                              ],
                              "_blank"
                            )
                          }
                          className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium mx-auto transition-colors"
                        >
                          <Download className="h-5 w-5" />
                          <span className="text-lg">Download File</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* File Info */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-6 py-3 bg-black/70 backdrop-blur-sm rounded-xl text-white text-center">
                  <p className="font-medium text-lg truncate max-w-2xl">
                    {selectedReport.evidenceUrls[selectedEvidenceIndex]
                      .split("/")
                      .pop()}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    {getFileType(
                      selectedReport.evidenceUrls[selectedEvidenceIndex]
                    ).toUpperCase()}{" "}
                    • Evidence #{selectedEvidenceIndex + 1} • Report ID:{" "}
                    {selectedReport.reportId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default NGODashboard;
