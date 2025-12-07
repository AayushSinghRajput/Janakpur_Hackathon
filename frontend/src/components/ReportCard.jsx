import { AlertTriangle, Calendar, MapPin, Eye, FileText, Clock, Shield, Users, CheckCircle } from 'lucide-react';

const ReportCard = ({ report, onView }) => {
  // Determine urgency colors and icons for Normal and Emergency only
  const urgencyConfig = {
    emergency: { 
      color: 'bg-error/20 text-error border-error/30', 
      icon: AlertTriangle, 
      label: 'Emergency' 
    },
    normal: { 
      color: 'bg-primary-accent/20 text-primary-accent border-primary-accent/30', 
      icon: Shield, 
      label: 'Normal' 
    },
  };

  // Determine status colors
  const statusConfig = {
    pending: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
    under_review: 'bg-primary-accent/30 text-primary-accent border-primary-accent/30',
    action_taken: 'bg-secondary-accent/30 text-secondary-accent border-secondary-accent/30',
    resolved: 'bg-success-500/20 text-success border-success-500/20',
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
    <div className="bg-background rounded-2xl border border-borders p-6 mb-4 hover:border-primary-accent/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Left Section - Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-headings group-hover:text-primary-accent transition-colors truncate">
                {report.incidentTitle}
              </h3>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                {/* Urgency Badge */}
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${urgencyStyle.color} border shrink-0`}>
                  <UrgencyIcon className="h-3 w-3" />
                  <span>{urgencyStyle.label}</span>
                  {urgencyLevel === 'emergency' && (
                    <div className="w-2 h-2 bg-error rounded-full animate-pulse ml-1"></div>
                  )}
                </span>
                
                {/* Status Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyle} border shrink-0`}>
                  {statusLabel}
                </span>
                
                {/* Incident Type - Convert snake_case to Title Case */}
                {report.incidentType && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-borders text-secondary-text border border-borders shrink-0">
                    {report.incidentType
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Report ID */}
            <div className="text-right shrink-0 mt-2 sm:mt-0">
              <p className="text-xs text-secondary-text font-mono">ID: {report.reportId?.substring(0, 8)}...</p>
            </div>
          </div>

          {/* Description Preview */}
          {truncatedDescription && (
            <div className="mb-4">
              <p className="text-primary-text/80 text-sm line-clamp-2">{truncatedDescription}</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {/* Date & Time */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-secondary-accent flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-secondary-text">Reported</p>
                <p className="text-sm text-primary-text truncate">
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
                <MapPin className="h-4 w-4 text-primary-accent flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-secondary-text">Location</p>
                  <p className="text-sm text-primary-text truncate">{report.location}</p>
                </div>
              </div>
            )}

            {/* Evidence Count */}
            {evidenceCount > 0 && (
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-secondary-accent flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-secondary-text">Evidence</p>
                  <p className="text-sm text-primary-text">{evidenceCount} file{evidenceCount !== 1 ? 's' : ''}</p>
                </div>
              </div>
            )}

            {/* Consent Status */}
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-success flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-secondary-text">Consent</p>
                <p className={`text-sm font-medium ${report.consentToShareWithNGO ? 'text-success' : 'text-amber-500'}`}>
                  {report.consentToShareWithNGO ? 'NGO Shared' : 'Anonymous Only'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Action Button */}
        <div className="lg:w-48 flex flex-col justify-between gap-4">
          <div className="flex flex-col items-end gap-3">
            {/* Last Updated */}
            <div className="flex items-center space-x-1 text-xs text-secondary-text justify-end">
              <Clock className="h-3 w-3" />
              <span>Updated: {new Date(report.updatedAt || report.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>

            {/* View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(report);
              }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-accent hover:bg-secondary-accent text-black rounded-xl font-medium transition-all duration-300 hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary-accent/20 w-full lg:w-auto min-w-[120px]"
            >
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </button>
          </div>

          {/* Additional Info */}
          {report.PhoneNumber && report.consentToShareWithNGO && (
            <div className="mt-2 flex items-center justify-end">
              <div className="flex items-center space-x-1 text-xs text-secondary-text">
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
          <div className="flex items-center justify-between text-xs text-secondary-text mb-1">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-3 w-3 text-error" />
              <span>Emergency case - Requires immediate attention</span>
            </div>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse mr-1"></div>
              Emergency Priority
            </span>
          </div>
          <div className="h-1 bg-borders rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-error via-error/80 to-error w-1/2 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Resolved indicator for resolved status */}
      {report.status === 'resolved' && (
        <div className="mt-4 flex items-center space-x-2 text-success bg-success/20 rounded-lg p-2 border border-success/30">
          <CheckCircle className="h-4 w-4" />
          <span className="text-xs font-medium">This case has been resolved successfully</span>
        </div>
      )}
    </div>
  );
};

export default ReportCard;