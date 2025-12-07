import { AlertTriangle, Calendar, MapPin, Eye, FileText, Clock, Shield, Users, CheckCircle } from 'lucide-react';

const ReportCard = ({ report, onView }) => {
  // Determine urgency colors and icons for Normal and Emergency only
  const urgencyConfig = {
    emergency: { 
      color: 'bg-red-900/20 text-red-400 border-red-700/30', 
      icon: AlertTriangle, 
      label: 'Emergency' 
    },
    normal: { 
      color: 'bg-blue-900/20 text-blue-400 border-blue-700/30', 
      icon: Shield, 
      label: 'Normal' 
    },
  };

  // Determine status colors
  const statusConfig = {
    pending: 'bg-amber-900/30 text-amber-400 border-amber-700/30',
    under_review: 'bg-blue-900/30 text-blue-400 border-blue-700/30',
    action_taken: 'bg-purple-900/30 text-purple-400 border-purple-700/30',
    resolved: 'bg-green-900/30 text-green-400 border-green-700/30',
    archived: 'bg-gray-900/30 text-gray-400 border-gray-700/30',
  };

  // Convert urgencyLevel to lowercase for matching
  const urgencyLevel = report.urgencyLevel?.toLowerCase() || 'normal';
  const UrgencyIcon = urgencyConfig[urgencyLevel]?.icon || Shield;
  const urgencyStyle = urgencyConfig[urgencyLevel] || urgencyConfig.normal;
  
  const statusStyle = statusConfig[report.status] || statusConfig.pending;
  const statusLabel = report.status 
    ? report.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Pending';

  // Truncate description
  const truncatedDescription = report.description?.length > 120 
    ? report.description.substring(0, 120) + '...' 
    : report.description;

  // Count evidence files
  const evidenceCount = report.evidenceUrls?.length || 0;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-4 hover:border-blue-500/30 hover:bg-gray-800/70 transition-all duration-300 group cursor-pointer">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Left Section - Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {report.incidentTitle}
              </h3>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                {/* Urgency Badge */}
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${urgencyStyle.color} border`}>
                  <UrgencyIcon className="h-3 w-3" />
                  <span>{urgencyStyle.label}</span>
                  {urgencyLevel === 'emergency' && (
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-1"></div>
                  )}
                </span>
                
                {/* Status Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyle} border`}>
                  {statusLabel}
                </span>
                
                {/* Incident Type - Convert snake_case to Title Case */}
                {report.incidentType && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900/50 text-gray-300 border border-gray-700">
                    {report.incidentType
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Report ID */}
            <div className="text-right">
              <p className="text-xs text-gray-500 font-mono">ID: {report.reportId?.substring(0, 8)}...</p>
            </div>
          </div>

          {/* Description Preview */}
          {truncatedDescription && (
            <div className="mb-4">
              <p className="text-gray-300 text-sm line-clamp-2">{truncatedDescription}</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {/* Date & Time */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Reported</p>
                <p className="text-sm text-white">
                  {new Date(report.createdAt || report.dateTime).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Location */}
            {report.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm text-white truncate">{report.location}</p>
                </div>
              </div>
            )}

            {/* Evidence Count */}
            {evidenceCount > 0 && (
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Evidence</p>
                  <p className="text-sm text-white">{evidenceCount} file{evidenceCount !== 1 ? 's' : ''}</p>
                </div>
              </div>
            )}

            {/* Consent Status */}
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Consent</p>
                <p className={`text-sm font-medium ${report.consentToShareWithNGO ? 'text-green-400' : 'text-amber-400'}`}>
                  {report.consentToShareWithNGO ? 'NGO Shared' : 'Anonymous Only'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Action Button */}
        <div className="lg:w-48 flex flex-col justify-between">
          <div className="flex lg:flex-col items-center lg:items-end gap-3">
            {/* Last Updated */}
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Updated: {new Date(report.updatedAt || report.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>

            {/* View Button */}
            <button
              onClick={() => onView(report)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-600/20 w-full lg:w-auto"
            >
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </button>
          </div>

          {/* Additional Info */}
          {report.PhoneNumber && report.consentToShareWithNGO && (
            <div className="mt-3 lg:mt-4 flex items-center justify-center lg:justify-end">
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Users className="h-3 w-3" />
                <span>Contact available</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency indicator for Emergency priority */}
      {urgencyLevel === 'emergency' && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-3 w-3 text-red-400" />
              <span>Emergency case - Requires immediate attention</span>
            </div>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
              Emergency Priority
            </span>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 w-1/2 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Resolved indicator for resolved status */}
      {report.status === 'resolved' && (
        <div className="mt-4 flex items-center space-x-2 text-green-400 bg-green-900/20 rounded-lg p-2 border border-green-700/30">
          <CheckCircle className="h-4 w-4" />
          <span className="text-xs font-medium">This case has been resolved successfully</span>
        </div>
      )}
    </div>
  );
};

export default ReportCard;