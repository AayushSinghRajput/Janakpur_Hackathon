// Incident type mapping for display
export const incidentTypeLabels = {
  harassment: 'Harassment',
  domestic_violence: 'Domestic Violence',
  sexual_violence: 'Sexual Violence',
  cyber_violence: 'Cyber Violence',
  stalking_and_threats: 'Stalking & Threats',
  gender_discrimination: 'Gender Discrimination',
  General: 'General Incident'
};

// Color mapping for incident types
export const incidentTypeColors = {
  domestic_violence: 'bg-red-500',
  sexual_violence: 'bg-purple-500',
  cyber_violence: 'bg-blue-500',
  harassment: 'bg-amber-500',
  stalking_and_threats: 'bg-orange-500',
  gender_discrimination: 'bg-green-500',
  General: 'bg-gray-500'
};

// Fallback dummy NGOs (in case API fails)
export const fallbackNGOs = [
  {
    _id: '1',
    name: "Women's Safety Foundation Nepal",
    description: "Dedicated to supporting victims of domestic violence through counseling, legal aid, and safe shelters.",
    email: "contact@womensafety.org.np",
    phone: "+977-1-5551234",
    address: "Kathmandu, Nepal",
    website: "https://womensafety.org.np",
    logo: "",
    incidentTypes: ["domestic_violence", "gender_discrimination"],
    services: ["24/7 Helpline", "Legal Assistance", "Counseling", "Safe Shelter"],
    contactPerson: "Ms. Sunita Sharma",
    verified: true,
    rating: 4.8
  },
  {
    _id: '2',
    name: "Safe Space Nepal",
    description: "Specialized support for survivors of sexual violence with confidential counseling and legal guidance.",
    email: "support@safespace.org.np",
    phone: "+977-1-5559012",
    address: "Pokhara, Nepal",
    website: "https://safespace.org.np",
    logo: "",
    services: ["Crisis Intervention", "Medical Examination", "Legal Support", "Therapy"],
    contactPerson: "Dr. Anjali Shrestha",
    verified: true,
    rating: 4.9
  },
  {
    _id: '3',
    name: "Digital Rights Nepal",
    description: "Fighting cyber violence and online harassment through awareness, legal support, and digital safety training.",
    email: "info@digitalrights.org.np",
    phone: "+977-1-5553456",
    address: "Biratnagar, Nepal",
    website: "https://digitalrights.org.np",
    logo: "",
    services: ["Cyber Forensics", "Legal Aid", "Digital Safety Training", "Awareness Programs"],
    contactPerson: "Mr. Binod Poudel",
    verified: true,
    rating: 4.3
  },
  {
    _id: '4',
    name: "Human Rights Watch Nepal",
    description: "Comprehensive support for all types of violence and discrimination cases with extensive network.",
    email: "nepal@hrw.org",
    phone: "+977-1-5557890",
    address: "Kathmandu, Nepal",
    website: "https://hrw.org/nepal",
    logo: "",
    incidentTypes: ["harassment", "domestic_violence", "sexual_violence", "cyber_violence", "gender_discrimination", "stalking_and_threats"],
    services: ["Legal Support", "Crisis Intervention", "Advocacy", "Awareness", "Training"],
    contactPerson: "Ms. Priya Basnet",
    verified: true,
    rating: 4.7
  }
];

// Safety tips data
export const safetyTips = [
  {
    id: 1,
    icon: 'Shield',
    title: 'Stay Safe',
    description: 'Your safety is the top priority. If you are in immediate danger, call emergency services first.',
    color: 'blue'
  },
  {
    id: 2,
    icon: 'Users',
    title: 'Confidential Support',
    description: 'All NGOs listed provide confidential support. Your privacy is protected.',
    color: 'green'
  },
  {
    id: 3,
    icon: 'ExternalLink',
    title: 'Multiple Options',
    description: 'You can contact multiple organizations to find the best support for your needs.',
    color: 'purple'
  },
  {
    id: 4,
    icon: 'Clock',
    title: '24/7 Availability',
    description: 'Many organizations offer 24/7 helplines for immediate assistance.',
    color: 'orange'
  }
];

// Utility functions
export const getIncidentLabel = (type) => {
  return incidentTypeLabels[type] || type;
};

export const getIncidentColor = (type) => {
  return incidentTypeColors[type] || 'bg-gray-500';
};

export const formatPhoneNumber = (phone) => {
  // Format phone number for display
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
};