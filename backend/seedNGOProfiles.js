const mongoose = require('mongoose');
const NGOProfile = require('./models/ngoProfile');
require('dotenv').config();

const dummyNGOProfiles = [
  // ==================== DOMESTIC VIOLENCE ====================
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Women's Safety Foundation Nepal",
    email: "contact@womensafety.org.np",
    description: "Dedicated to supporting victims of domestic violence through counseling, legal aid, and safe shelters. We provide 24/7 emergency response and legal assistance for women facing domestic abuse.",
    phone: "+977-1-5551234",
    address: "Baluwatar, Kathmandu, Nepal",
    website: "https://womensafety.org.np",
    logo: "https://example.com/wsf-logo.png",
    incidentTypes: ["domestic_violence", "gender_discrimination"],
    services: ["24/7 Helpline", "Legal Assistance", "Counseling", "Safe Shelter", "Emergency Response", "Legal Advocacy"],
    contactPerson: "Ms. Sunita Sharma",
    verified: true,
    rating: 4.8
  },
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Hami Daju Vai",
    email: "info@hamidajuvai.org.np",
    description: "Community-based organization providing support for domestic violence victims with focus on male victims and family counseling. We believe in peaceful family relationships.",
    phone: "+977-1-4445678",
    address: "Putalisadak, Kathmandu, Nepal",
    website: "https://hamidajuvai.org.np",
    logo: "https://example.com/hami-logo.png",
    incidentTypes: ["domestic_violence", "harassment"],
    services: ["Family Counseling", "Mediation", "Legal Guidance", "Support Groups", "Community Workshops"],
    contactPerson: "Mr. Rajesh Kumar",
    verified: true,
    rating: 4.5
  },

  // ==================== SEXUAL VIOLENCE ====================
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Safe Space Nepal",
    email: "support@safespace.org.np",
    description: "Specialized support for survivors of sexual violence with confidential counseling, medical examination, and legal guidance. We have trained female counselors available 24/7.",
    phone: "+977-1-5559012",
    address: "Lakeside, Pokhara, Nepal",
    website: "https://safespace.org.np",
    logo: "https://example.com/safespace-logo.png",
    incidentTypes: ["sexual_violence", "stalking_and_threats"],
    services: ["Crisis Intervention", "Medical Examination", "Legal Support", "Therapy", "Forensic Services", "Support Groups"],
    contactPerson: "Dr. Anjali Shrestha",
    verified: true,
    rating: 4.9
  },
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "People in Need Nepal",
    email: "pin@peopleinneed.cz",
    description: "International NGO providing comprehensive support for sexual violence survivors including medical, psychological, and legal assistance. Part of the global People in Need network.",
    phone: "+977-1-4781234",
    address: "Sanepa, Lalitpur, Nepal",
    website: "https://www.peopleinneed.net/country/nepal",
    logo: "https://example.com/pin-logo.png",
    incidentTypes: ["sexual_violence", "gender_discrimination"],
    services: ["Medical Care", "Psychological Counseling", "Legal Aid", "Rehabilitation", "Awareness Programs", "Emergency Shelter"],
    contactPerson: "Ms. Sabina Shrestha",
    verified: true,
    rating: 4.7
  },

  // ==================== CYBER VIOLENCE ====================
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Digital Rights Nepal",
    email: "info@digitalrights.org.np",
    description: "Fighting cyber violence and online harassment through awareness, legal support, and digital safety training. We help victims of online bullying, doxxing, and cyber stalking.",
    phone: "+977-1-5553456",
    address: "Biratnagar, Province 1, Nepal",
    website: "https://digitalrights.org.np",
    logo: "https://example.com/digitalrights-logo.png",
    incidentTypes: ["cyber_violence", "harassment"],
    services: ["Cyber Forensics", "Legal Aid", "Digital Safety Training", "Awareness Programs", "Online Support", "Data Protection"],
    contactPerson: "Mr. Binod Poudel",
    verified: true,
    rating: 4.3
  },
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Cyber Safe Nepal",
    email: "help@cybersafenepal.org",
    description: "Specialized organization dealing with cyber crimes, online harassment, and digital safety. We provide technical assistance to track cyber criminals.",
    phone: "+977-1-5112233",
    address: "New Baneshwor, Kathmandu, Nepal",
    website: "https://cybersafenepal.org",
    logo: "https://example.com/cybersafe-logo.png",
    incidentTypes: ["cyber_violence", "stalking_and_threats"],
    services: ["Cyber Investigation", "Digital Evidence Collection", "Legal Support", "Technical Assistance", "Online Safety Workshops"],
    contactPerson: "Ms. Priya Adhikari",
    verified: true,
    rating: 4.4
  },

  // ==================== HARASSMENT ====================
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Human Rights Watch Nepal",
    email: "nepal@hrw.org",
    description: "Comprehensive support for all types of violence and discrimination cases with extensive network. We document human rights abuses and advocate for victims.",
    phone: "+977-1-5557890",
    address: "Thamel, Kathmandu, Nepal",
    website: "https://hrw.org/nepal",
    logo: "https://example.com/hrw-logo.png",
    incidentTypes: ["harassment", "domestic_violence", "sexual_violence", "cyber_violence", "gender_discrimination", "stalking_and_threats"],
    services: ["Legal Support", "Crisis Intervention", "Advocacy", "Awareness", "Training", "Documentation"],
    contactPerson: "Ms. Priya Basnet",
    verified: true,
    rating: 4.7
  },
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Stop Harassment Nepal",
    email: "contact@stopharassment.org.np",
    description: "Focused on workplace and public space harassment. We provide mediation, legal support, and awareness programs to create harassment-free environments.",
    phone: "+977-1-4335566",
    address: "Maitighar, Kathmandu, Nepal",
    website: "https://stopharassment.org.np",
    logo: "https://example.com/stopharassment-logo.png",
    incidentTypes: ["harassment", "gender_discrimination"],
    services: ["Workplace Mediation", "Legal Counseling", "Awareness Workshops", "Support Groups", "Policy Development"],
    contactPerson: "Mr. Santosh Thapa",
    verified: true,
    rating: 4.2
  },

  // ==================== STALKING & THREATS ====================
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Safety First Nepal",
    email: "safety@safetyfirst.org.np",
    description: "Specialized in handling stalking, threats, and security concerns with rapid response teams. We work closely with police to ensure victim safety.",
    phone: "+977-1-5556789",
    address: "Chitwan, Nepal",
    website: "https://safetyfirst.org.np",
    logo: "https://example.com/safetyfirst-logo.png",
    incidentTypes: ["stalking_and_threats", "harassment"],
    services: ["Security Assessment", "Emergency Response", "Legal Protection", "Safety Planning", "Escort Services", "Threat Analysis"],
    contactPerson: "Mr. Deepak KC",
    verified: true,
    rating: 4.6
  },
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Protect Nepal",
    email: "help@protectnepal.org",
    description: "Providing protection and legal support for victims of stalking and threats. We offer personal safety devices and 24/7 monitoring services.",
    phone: "+977-1-4889900",
    address: "Bharatpur, Chitwan, Nepal",
    website: "https://protectnepal.org",
    logo: "https://example.com/protect-logo.png",
    incidentTypes: ["stalking_and_threats", "cyber_violence"],
    services: ["Personal Protection", "Legal Support", "Safety Devices", "24/7 Monitoring", "Risk Assessment", "Court Accompaniment"],
    contactPerson: "Ms. Rina Tamang",
    verified: true,
    rating: 4.3
  },

  // ==================== GENDER DISCRIMINATION ====================
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Equal Rights Initiative",
    email: "equality@eri.org.np",
    description: "Focusing on gender equality and fighting discrimination in workplace and society. We provide legal advocacy and support for equal opportunity cases.",
    phone: "+977-1-5552345",
    address: "Bhaktapur, Nepal",
    website: "https://eri.org.np",
    logo: "https://example.com/eri-logo.png",
    incidentTypes: ["gender_discrimination", "harassment"],
    services: ["Legal Advocacy", "Career Counseling", "Workshops", "Support Groups", "Policy Review", "Mediation"],
    contactPerson: "Ms. Rita Gurung",
    verified: true,
    rating: 4.4
  },
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Gender Justice Nepal",
    email: "info@genderjusticenepal.org",
    description: "Working towards gender equality through legal reform, awareness, and support for discrimination victims. We focus on systemic change.",
    phone: "+977-1-4223344",
    address: "Koteshwor, Kathmandu, Nepal",
    website: "https://genderjusticenepal.org",
    logo: "https://example.com/genderjustice-logo.png",
    incidentTypes: ["gender_discrimination", "sexual_violence"],
    services: ["Legal Reform Advocacy", "Discrimination Cases", "Research", "Public Awareness", "Training Programs", "Policy Development"],
    contactPerson: "Dr. Sita Rai",
    verified: true,
    rating: 4.5
  },

  // ==================== GENERAL (Multi-category) ====================
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Nepal Red Cross Society",
    email: "info@nrcs.org",
    description: "Largest humanitarian organization in Nepal providing comprehensive support for all types of violence and emergencies.",
    phone: "+977-1-4271196",
    address: "Red Cross Marg, Kathmandu, Nepal",
    website: "https://www.nrcs.org",
    logo: "https://example.com/redcross-logo.png",
    incidentTypes: ["harassment", "domestic_violence", "sexual_violence", "General"],
    services: ["Emergency Response", "Medical Services", "Counseling", "Legal Aid", "Shelter", "Rehabilitation"],
    contactPerson: "Mr. Dev Ratna Dhakhwa",
    verified: true,
    rating: 4.9
  },
  {
    ngoId: new mongoose.Types.ObjectId(),
    ngoName: "Saathi Nepal",
    email: "saathi@saathi.org.np",
    description: "Long-standing organization working on women's rights, violence prevention, and support services for all types of gender-based violence.",
    phone: "+977-1-5522415",
    address: "Sanepa, Lalitpur, Nepal",
    website: "https://saathi.org.np",
    logo: "https://example.com/saathi-logo.png",
    incidentTypes: ["domestic_violence", "sexual_violence", "harassment", "gender_discrimination", "General"],
    services: ["Counseling", "Legal Support", "Shelter Home", "Rehabilitation", "Awareness", "Training"],
    contactPerson: "Ms. Bandana Rana",
    verified: true,
    rating: 4.8
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing profiles
    const deleteResult = await NGOProfile.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing NGO profiles`);
    
    // Insert dummy data
    const insertResult = await NGOProfile.insertMany(dummyNGOProfiles);
    console.log(`✅ Successfully seeded ${insertResult.length} NGO profiles`);
    
    // Display summary by category
    const categories = {};
    dummyNGOProfiles.forEach(profile => {
      profile.incidentTypes.forEach(type => {
        categories[type] = (categories[type] || 0) + 1;
      });
    });
    
    console.log('\n📊 NGO Distribution by Category:');
    console.log('=============================');
    for (const [category, count] of Object.entries(categories)) {
      console.log(`${category}: ${count} NGOs`);
    }
    
    console.log('\n📋 Total NGOs per category (some NGOs handle multiple categories)');
    
    // Exit successfully
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();