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
        return "bg-amber-500/20 text-amber-600 border-amber-500/30";
      case "under_review":
        return "bg-primary-accent/20 text-primary-accent border-primary-accent/30";
      case "action_taken":
        return "bg-secondary-accent/20 text-secondary-accent border-secondary-accent/30";
      case "resolved":
        return "bg-success/20 text-success border-success/30";
      case "archived":
        return "bg-borders text-secondary-text border-borders";
      default:
        return "bg-borders text-secondary-text border-borders";
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-headings">
                NGO{" "}
                <span className="bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-secondary-text mt-2">
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
            <div className="bg-background rounded-2xl p-6 border border-borders shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm">Total Reports</p>
                  <p className="text-3xl font-bold text-headings">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary-accent/10 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary-accent" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-secondary-text">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% this month</span>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-borders shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm">Emergency Cases</p>
                  <p className="text-3xl font-bold text-error">
                    {stats.emergency}
                  </p>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                  <AlertOctagon className="h-6 w-6 text-error" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="w-2 h-2 bg-error rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-secondary-text">
                  Requires immediate attention
                </span>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-borders shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm">Action Taken</p>
                  <p className="text-3xl font-bold text-secondary-accent">
                    {stats.action_taken}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-secondary-accent" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-borders rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary-accent"
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

            <div className="bg-background rounded-2xl p-6 border border-borders shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-text text-sm">Pending Review</p>
                  <p className="text-3xl font-bold text-amber-500">
                    {stats.pending}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-borders rounded-full overflow-hidden">
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
          <div className="bg-background rounded-2xl p-6 border border-borders shadow-lg mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-text" />
                  <input
                    type="text"
                    placeholder="Search reports by title, description, location, or type..."
                    className="w-full pl-12 pr-4 py-3 bg-background border border-borders rounded-xl text-primary-text placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent"
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
                  <Filter className="h-5 w-5 text-secondary-text" />
                  <select
                    className="bg-background border border-borders rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent w-full md:w-auto"
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
                  <AlertTriangle className="h-5 w-5 text-secondary-text" />
                  <select
                    className="bg-background border border-borders rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent w-full md:w-auto"
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
              <div className="mt-4 pt-4 border-t border-borders">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm text-secondary-text">Active filters:</span>

                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-accent/10 text-primary-accent border border-primary-accent/30">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-2 text-primary-accent hover:text-secondary-accent"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  {statusFilter !== "all" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/30">
                      Status: {statusFilter.replace("_", " ")}
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="ml-2 text-amber-600 hover:text-amber-700"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  {urgencyFilter !== "all" && (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        urgencyFilter === "Emergency"
                          ? "bg-error/10 text-error border-error/30"
                          : "bg-primary-accent/10 text-primary-accent border-primary-accent/30"
                      }`}
                    >
                      Urgency: {urgencyFilter}
                      <button
                        onClick={() => setUrgencyFilter("all")}
                        className={`ml-2 ${
                          urgencyFilter === "Emergency"
                            ? "text-error hover:text-error/80"
                            : "text-primary-accent hover:text-secondary-accent"
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
            <h2 className="text-xl font-bold text-headings">
              Incident Reports ({filteredReports.length})
            </h2>
            <div className="text-sm text-secondary-text">
              Showing {filteredReports.length} of {reports.length} reports
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="bg-background rounded-2xl p-12 border border-borders shadow-lg text-center">
              <div className="w-16 h-16 bg-borders rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-secondary-text" />
              </div>
              <h3 className="text-xl font-bold text-headings mb-2">
                No reports found
              </h3>
              <p className="text-secondary-text">
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
        <div className="bg-background rounded-2xl p-6 border border-borders shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm font-medium text-headings">
                  All reports are encrypted and anonymized
                </p>
                <p className="text-xs text-secondary-text">
                  Access is logged for security purposes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary-accent" />
              <span className="text-sm text-secondary-text">Last sync: Just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal - UPDATED WITH #F9F5FA BACKGROUND */}
      {selectedReport && (
        <div className="fixed inset-0 bg-headings/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#F9F5FA] rounded-2xl border-2 border-primary-accent/30 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-borders/40 bg-gradient-to-r from-borders/20 to-[#F9F5FA] rounded-t-xl p-6 -m-8 mb-8">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      selectedReport.urgencyLevel === "Emergency"
                        ? "bg-error animate-pulse"
                        : "bg-primary-accent"
                    }`}
                  ></div>
                  <div>
                    <h3 className="text-2xl font-bold text-headings leading-tight">
                      {selectedReport.incidentTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-secondary-text">
                        Report ID: {selectedReport.reportId}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 text-secondary-text hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Report Info Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-8 bg-borders/10 p-4 rounded-xl">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedReport.urgencyLevel === "Emergency"
                      ? "bg-error/20 text-error border border-error/30"
                      : "bg-primary-accent/20 text-primary-accent border border-primary-accent/30"
                  }`}
                >
                  {selectedReport.urgencyLevel}
                </span>
                
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-secondary-accent/20 text-secondary-accent border border-secondary-accent/30">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                    selectedReport.status
                  )}`}
                >
                  {selectedReport.status?.replace("_", " ") || "Pending"}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  {/* Date & Time */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-borders/40">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-secondary-accent/20 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-secondary-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-headings">Date & Time</h4>
                        <p className="text-headings font-medium">
                          {new Date(selectedReport.dateTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-text pl-13">
                      Reported on: {new Date(selectedReport.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-borders/40">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-headings">Location</h4>
                        <p className="text-headings font-medium">
                          {selectedReport.location || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contact Number */}
                  {selectedReport.PhoneNumber && (
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-borders/40">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                          <Phone className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-headings">Contact Number</h4>
                          <p className="text-headings font-medium">
                            {selectedReport.PhoneNumber}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-secondary-text pl-13">
                        Provided for NGO contact
                      </p>
                    </div>
                  )}

                  {/* Consent Status */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-borders/40">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-headings">Consent Status</h4>
                        <p className={`font-medium ${
                          selectedReport.consentToShareWithNGO
                            ? "text-success"
                            : "text-amber-500"
                        }`}>
                          {selectedReport.consentToShareWithNGO
                            ? "✓ Shared with NGOs"
                            : "Anonymous only"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-primary-accent rounded-full"></div>
                  <h4 className="text-lg font-semibold text-headings">
                    Incident Description
                  </h4>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-borders/40">
                  <p className="text-headings leading-relaxed whitespace-pre-line">
                    {selectedReport.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Evidence Section */}
              {selectedReport.evidenceUrls &&
                selectedReport.evidenceUrls.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-6 bg-borders/10 p-4 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-8 bg-secondary-accent rounded-full"></div>
                        <h4 className="text-lg font-semibold text-headings">
                          Evidence Files ({selectedReport.evidenceUrls.length})
                        </h4>
                      </div>
                      <div className="text-sm text-secondary-text">
                        Click to preview
                      </div>
                    </div>

                    <div className="w-full space-y-6">
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
                            className="w-full bg-white/50 backdrop-blur-sm rounded-xl border-2 border-borders/40 hover:border-primary-accent transition-all duration-300 overflow-hidden group cursor-pointer"
                            onClick={() => openEvidenceModal(index)}
                          >
                            {/* Preview Container */}
                            <div className="relative w-full bg-gradient-to-br from-borders/20 to-borders/5 overflow-hidden">
                              {isImage ? (
                                <div className="relative w-full h-80">
                                  <img
                                    src={url}
                                    alt={`Evidence ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://via.placeholder.com/1200x400/f8f5fa/7c3aed?text=${encodeURIComponent(
                                        fileName
                                      )}`;
                                    }}
                                  />
                                  {/* Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-headings/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="flex items-center space-x-2 text-white">
                                      <Maximize2 className="h-5 w-5" />
                                      <span className="text-lg font-medium">
                                        Click to view fullscreen
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : isVideo ? (
                                <div className="relative w-full h-64 flex flex-col items-center justify-center p-8">
                                  <div className="w-20 h-20 bg-primary-accent/60 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-primary-accent/80 transition-colors">
                                    <Play className="h-10 w-10 text-white" />
                                  </div>
                                  <div className="mt-6 text-center px-4">
                                    <p className="text-xl text-headings font-medium truncate w-full">
                                      {fileName}
                                    </p>
                                    <p className="text-secondary-text mt-2">
                                      Click to play video in fullscreen
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative w-full h-48 flex flex-col items-center justify-center p-8">
                                  <div className="w-20 h-20 bg-borders/40 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-borders/60 transition-colors">
                                    <IconComponent className="h-12 w-12 text-primary-accent" />
                                  </div>
                                  <div className="mt-6 text-center">
                                    <p className="text-xl text-headings font-medium truncate w-full px-8">
                                      {fileName}
                                    </p>
                                    <p className="text-secondary-text mt-2">
                                      Click to download file
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* File Type Badge */}
                              <div className="absolute top-4 left-4">
                                <span className="text-sm px-3 py-1.5 bg-headings/80 text-white rounded-lg">
                                  {fileType.toUpperCase()}
                                </span>
                              </div>

                              {/* Evidence Number */}
                              <div className="absolute top-4 right-4">
                                <span className="text-sm px-3 py-1.5 bg-headings/80 text-white rounded-lg">
                                  Evidence #{index + 1}
                                </span>
                              </div>
                            </div>

                            {/* File Info */}
                            <div className="p-6 bg-white/30">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <IconComponent className="h-5 w-5 text-primary-accent" />
                                  <div>
                                    <span className="text-lg font-medium text-headings">
                                      {fileName}
                                    </span>
                                    <p className="text-sm text-secondary-text mt-1">
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
                                  className="flex items-center space-x-2 text-primary-accent hover:text-secondary-accent transition-colors px-4 py-2 rounded-lg hover:bg-primary-accent/10"
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
              <div className="pt-8 border-t border-borders/40 bg-white/30 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Mark as Resolved Button */}
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
                      <div className="flex items-center space-x-2 px-4 py-3 bg-success/10 text-success rounded-xl border border-success/30">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Already Resolved</span>
                      </div>
                    )}
                  </div>

                  {/* Download Button with enhanced dropdown */}
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
                      <div className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-borders/40 rounded-xl shadow-2xl z-10 overflow-hidden">
                        <div className="p-2">
                          <button
                            onClick={() => {
                              handleDownloadReport(selectedReport, "pdf");
                              setShowDownloadOptions(false);
                            }}
                            className="w-full text-left px-4 py-4 text-sm text-headings hover:bg-primary-accent/10 rounded-lg flex items-center space-x-3 transition-colors"
                          >
                            <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-error" />
                            </div>
                            <div>
                              <div className="font-medium text-headings">Download as PDF</div>
                              <div className="text-xs text-secondary-text mt-1">
                                Standard report format
                              </div>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              handleDownloadReport(selectedReport, "html");
                              setShowDownloadOptions(false);
                            }}
                            className="w-full text-left px-4 py-4 text-sm text-headings hover:bg-primary-accent/10 rounded-lg flex items-center space-x-3 transition-colors"
                          >
                            <div className="w-10 h-10 bg-primary-accent/20 rounded-lg flex items-center justify-center">
                              <svg
                                className="h-5 w-5 text-primary-accent"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-headings">Open in Browser</div>
                              <div className="text-xs text-secondary-text mt-1">
                                View & print directly
                              </div>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              handleDownloadReport(selectedReport, "text");
                              setShowDownloadOptions(false);
                            }}
                            className="w-full text-left px-4 py-4 text-sm text-headings hover:bg-primary-accent/10 rounded-lg flex items-center space-x-3 transition-colors"
                          >
                            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                              <svg
                                className="h-5 w-5 text-success"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-headings">Download as Text</div>
                              <div className="text-xs text-secondary-text mt-1">
                                Plain text format
                              </div>
                            </div>
                          </button>
                        </div>
                        {/* Arrow pointing to button */}
                        <div className="absolute -bottom-1 right-4 w-3 h-3 bg-white transform rotate-45 border-r border-b border-borders/40"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Success Message */}
                {selectedReport.status === "resolved" && (
                  <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-success font-medium">
                          This report has been marked as resolved
                        </p>
                        <p className="text-success/70 text-sm mt-1">
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
        </div>
      )}

      {/* Fullscreen Evidence Modal */}
      {evidenceModalOpen &&
        selectedReport &&
        selectedReport.evidenceUrls &&
        selectedEvidenceIndex !== null && (
          <div className="fixed inset-0 bg-headings/95 backdrop-blur-sm z-[60] flex items-center justify-center">
            <div className="relative w-full h-full flex flex-col">
              {/* Close Button */}
              <button
                onClick={closeEvidenceModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-headings/70 hover:bg-headings/90 rounded-full flex items-center justify-center text-white"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateEvidence(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-headings/70 hover:bg-headings/90 rounded-full flex items-center justify-center text-white"
              >
                ←
              </button>
              <button
                onClick={() => navigateEvidence(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-headings/70 hover:bg-headings/90 rounded-full flex items-center justify-center text-white"
              >
                →
              </button>

              {/* Evidence Counter */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-4 py-2 bg-headings/70 rounded-full text-white text-sm">
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
                          e.target.src = `https://via.placeholder.com/1200x800/f8f5fa/7c3aed?text=Image+not+available`;
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
                              "absolute inset-0 flex flex-col items-center justify-center bg-primary-accent/20 rounded-lg";
                            errorDiv.innerHTML = `
                            <div class="w-20 h-20 bg-borders rounded-full flex items-center justify-center mb-6">
                              <svg class="h-10 w-10 text-secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <p class="text-headings text-xl font-medium mb-2">Video not available</p>
                            <p class="text-secondary-text">Try downloading the file directly</p>
                          `;
                            e.target.parentNode.appendChild(errorDiv);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white backdrop-blur-sm rounded-xl p-12 border border-borders max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                          <FileText className="h-12 w-12 text-primary-accent" />
                        </div>
                        <h4 className="text-2xl font-bold text-headings mb-4">
                          {selectedReport.evidenceUrls[selectedEvidenceIndex]
                            .split("/")
                            .pop()}
                        </h4>
                        <p className="text-secondary-text text-lg mb-8">
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
                          className="flex items-center space-x-3 bg-primary-accent hover:bg-secondary-accent text-white px-8 py-4 rounded-xl font-medium mx-auto transition-colors"
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
                <div className="px-6 py-3 bg-headings/70 backdrop-blur-sm rounded-xl text-white text-center">
                  <p className="font-medium text-lg truncate max-w-2xl">
                    {selectedReport.evidenceUrls[selectedEvidenceIndex]
                      .split("/")
                      .pop()}
                  </p>
                  <p className="text-borders text-sm mt-1">
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