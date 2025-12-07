import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Users,
  Star,
  CheckCircle,
  Globe
} from 'lucide-react';
import { getIncidentLabel, getIncidentColor } from '../data/ngoData';

const NGOCard = ({ ngo, incidentType }) => {
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* NGO Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-800">{ngo.ngoName}</h3>
              {ngo.verified && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{ngo.description}</p>
            
            {/* Rating */}
            {renderStars(ngo.rating)}
          </div>
          
          {/* Incident Type Badge */}
          <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getIncidentColor(incidentType)}`}>
            {getIncidentLabel(incidentType)}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium text-gray-800">{ngo.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800 truncate">{ngo.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-800">{ngo.address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Contact Person</p>
              <p className="font-medium text-gray-800">{ngo.contactPerson}</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Services Offered:</h4>
          <div className="flex flex-wrap gap-2">
            {ngo.services.map((service, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`tel:${ngo.phone}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-xl font-medium text-center hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Phone className="h-5 w-5" />
            Call Now
          </a>
          
          <a
            href={`mailto:${ngo.email}`}
            className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-xl font-medium text-center hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Send Email
          </a>
          
          {ngo.website && (
            <a
              href={ngo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium text-center hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Globe className="h-5 w-5" />
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOCard;