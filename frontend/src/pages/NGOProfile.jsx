import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowLeft, 
  CheckCircle,
  AlertTriangle,
  Users,
  ExternalLink,
  Clock
} from 'lucide-react';
import ngoService from '../services/ngoService';
import { 
  incidentTypeLabels, 
  incidentTypeColors, 
  fallbackNGOs, 
  safetyTips,
  getIncidentLabel,
  getIncidentColor 
} from '../data/ngoData';
import NGOCard from '../components/NGOCard';

const NGOProfilesPage = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { incidentType: paramType } = useParams();

  useEffect(() => {
    fetchNGOs();
  }, [paramType, location.state]);

  const fetchNGOs = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Determine incident type to fetch
      let typeToFetch = paramType || (location.state?.incidentType) || 'General';
      setIncidentType(typeToFetch);
      
      console.log(`Fetching NGOs for: ${typeToFetch}`);
      
      const result = await ngoService.getNGOsByIncidentType(typeToFetch);
      
      if (result.success) {
        setNgos(result.data);
      } else {
        setError(result.message || 'Failed to fetch NGOs');
        // Fallback to dummy data filtered by incident type
        const filteredNGOs = fallbackNGOs.filter(ngo => 
          ngo.incidentTypes.includes(typeToFetch) || typeToFetch === 'General'
        );
        setNgos(filteredNGOs);
      }
    } catch (err) {
      console.error('Error in fetchNGOs:', err);
      setError('Unable to load NGO profiles. Please try again.');
      // Fallback to dummy data
      setNgos(fallbackNGOs);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchNGOs();
  };

  const handleShowGeneralNGOs = () => {
    setIncidentType('General');
    fetchNGOs();
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? 'text-amber-500 fill-amber-500'
                : 'text-borders'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-secondary-text">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const iconComponents = {
    Shield: Shield,
    Users: Users,
    ExternalLink: ExternalLink,
    Clock: Clock,
    AlertTriangle: AlertTriangle
  };

  const getIcon = (iconName) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-primary-accent/10 text-primary-accent',
      green: 'bg-success/10 text-success',
      purple: 'bg-secondary-accent/10 text-secondary-accent',
      orange: 'bg-amber-500/10 text-amber-600',
      red: 'bg-error/10 text-error',
      amber: 'bg-amber-500/10 text-amber-600'
    };
    return colorMap[color] || 'bg-borders text-secondary-text';
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-accent hover:text-secondary-accent mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Report
          </button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-headings mb-2">
              Recommended Support Organizations
            </h1>
            <p className="text-secondary-text max-w-2xl mx-auto">
              Based on your report type, here are verified NGOs that specialize in helping with{' '}
              <span className="font-semibold text-primary-accent">
                {getIncidentLabel(incidentType)}
              </span>
            </p>
          </div>
          
          {/* Incident Type Badge & Stats */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <div className={`px-6 py-3 rounded-full text-white font-medium ${getIncidentColor(incidentType)}`}>
              {getIncidentLabel(incidentType)}
            </div>
            
            {!loading && ngos.length > 0 && (
              <div className="bg-primary-accent/10 px-4 py-2 rounded-lg">
                <span className="text-primary-accent font-medium">
                  {ngos.length} Verified Organization{ngos.length !== 1 ? 's' : ''} Found
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-accent mb-4"></div>
            <p className="text-secondary-text">Finding relevant support organizations...</p>
            <p className="text-sm text-secondary-text mt-2">Matching your incident type: {incidentType}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-error/10 border border-error/20 rounded-xl p-6 text-center mb-8">
            <p className="text-error mb-4">{error}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-error/20 text-error rounded-lg hover:bg-error/30"
              >
                Try Again
              </button>
              <button
                onClick={handleShowGeneralNGOs}
                className="px-4 py-2 bg-primary-accent/20 text-primary-accent rounded-lg hover:bg-primary-accent/30"
              >
                Show General NGOs
              </button>
            </div>
          </div>
        )}

        {/* No NGOs Found */}
        {!loading && !error && ngos.length === 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-8 text-center mb-8">
            <Shield className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-headings mb-2">No Specific NGOs Found</h3>
            <p className="text-secondary-text mb-4">
              We couldn't find NGOs specifically for {getIncidentLabel(incidentType)}. 
              Showing general support organizations instead.
            </p>
            <button
              onClick={handleShowGeneralNGOs}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium"
            >
              Show General Support NGOs
            </button>
          </div>
        )}

        {/* NGO Grid */}
        {!loading && ngos.length > 0 && (
          <>
            <div className="mb-8">
              <div className="bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 rounded-2xl p-6 border border-borders">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-headings mb-1">
                      {ngos.length} Verified Organizations Found
                    </h3>
                    <p className="text-secondary-text">
                      All organizations are verified and ready to help you
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-text mt-2 md:mt-0">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>All organizations are verified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {ngos.map((ngo) => (
                <NGOCard key={ngo._id} ngo={ngo} incidentType={incidentType} />
              ))}
            </div>
          </>
        )}

        {/* Safety Tips */}
        {!loading && (
          <div className="mt-12 bg-borders/30 rounded-2xl p-8 border border-borders">
            <h3 className="text-2xl font-bold text-headings mb-6">Important Safety Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyTips.map((tip) => (
                <div key={tip.id} className="bg-background p-6 rounded-xl border border-borders shadow-sm">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${getColorClasses(tip.color)}`}>
                    {getIcon(tip.icon)}
                  </div>
                  <h4 className="font-semibold text-headings mb-2">{tip.title}</h4>
                  <p className="text-secondary-text text-sm">{tip.description}</p>
                </div>
              ))}
            </div>
            
            {/* Emergency Contact Section */}
            <div className="mt-8 pt-6 border-t border-borders">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h4 className="font-bold text-headings mb-1">Need Immediate Help?</h4>
                  <p className="text-secondary-text">Emergency services are available 24/7</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <a
                    href="tel:100"
                    className="px-6 py-3 bg-error text-white rounded-lg hover:bg-error/90 font-medium flex items-center gap-2"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    Emergency: 100
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        {!loading && (
          <div className="mt-8 text-center text-secondary-text text-sm">
            <p>
              Need help choosing? You can contact multiple organizations to find the best fit for your needs.
            </p>
            <p className="mt-1">
              All communications are confidential and your privacy is protected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOProfilesPage;