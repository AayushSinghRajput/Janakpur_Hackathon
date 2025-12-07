import { 
  Shield, 
  Lock, 
  Key, 
  Server, 
  FileLock, 
  Globe, 
  Users, 
  Cpu, 
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Network,
  EyeOff,
  FileCheck,
  Fingerprint,
  HardDrive,
  Bell,
  RefreshCw,
  Zap,
  ShieldOff,
  BadgeCheck
} from 'lucide-react';

const SecurityStandards = () => {
  const securityLevels = [
    {
      level: "Level 1",
      name: "Basic Protection",
      description: "Standard web application security",
      color: "from-[#6b7280] to-[#9ca3af]",
      features: ["SSL/TLS Encryption", "Password Hashing", "Firewall Protection"]
    },
    {
      level: "Level 2",
      name: "Enhanced Security",
      description: "Advanced security measures",
      color: "from-[#7c3aed] to-[#5b21b6]",
      features: ["Multi-factor Auth", "Regular Audits", "Intrusion Detection"]
    },
    {
      level: "Level 3",
      name: "Military Grade",
      description: "Maximum security implementation",
      color: "from-[#4a3366] to-[#2a2a3c]",
      features: ["Zero-Knowledge Architecture", "End-to-End Encryption", "No-Log Policy"]
    }
  ];

  const encryptionStandards = [
    {
      name: "AES-256 Encryption",
      strength: "256-bit",
      rating: "Military Grade",
      icon: <Lock className="h-6 w-6" />,
      color: "text-[#059669]",
      description: "Advanced Encryption Standard used by governments worldwide"
    },
    {
      name: "TLS 1.3 Protocol",
      strength: "Latest Standard",
      rating: "Industry Leading",
      icon: <Globe className="h-6 w-6" />,
      color: "text-[#7c3aed]",
      description: "Most secure transport layer security protocol"
    },
    {
      name: "Argon2 Hashing",
      strength: "Memory-hard",
      rating: "Password Winner",
      icon: <Key className="h-6 w-6" />,
      color: "text-[#4a3366]",
      description: "Winner of Password Hashing Competition, resistant to GPU attacks"
    }
  ];

  const securityControls = [
    {
      category: "Physical Security",
      items: [
        { name: "Tier IV Data Centers", status: "verified", icon: <Server className="h-5 w-5" /> },
        { name: "Biometric Access", status: "verified", icon: <Fingerprint className="h-5 w-5" /> },
        { name: "24/7 Surveillance", status: "verified", icon: <EyeOff className="h-5 w-5" /> }
      ]
    },
    {
      category: "Technical Security",
      items: [
        { name: "Zero-Knowledge Architecture", status: "verified", icon: <ShieldOff className="h-5 w-5" /> },
        { name: "End-to-End Encryption", status: "verified", icon: <FileLock className="h-5 w-5" /> },
        { name: "No IP Logging", status: "verified", icon: <Network className="h-5 w-5" /> },
        { name: "Metadata Stripping", status: "verified", icon: <FileCheck className="h-5 w-5" /> }
      ]
    },
    {
      category: "Operational Security",
      items: [
        { name: "Regular Penetration Testing", status: "verified", icon: <Zap className="h-5 w-5" /> },
        { name: "Third-Party Audits", status: "verified", icon: <BadgeCheck className="h-5 w-5" /> },
        { name: "Incident Response Team", status: "verified", icon: <Bell className="h-5 w-5" /> },
        { name: "Security Training", status: "verified", icon: <Users className="h-5 w-5" /> }
      ]
    }
  ];

  const complianceStandards = [
    { name: "GDPR", region: "European Union", status: "Fully Compliant", icon: "🇪🇺" },
    { name: "CCPA", region: "California, USA", status: "Fully Compliant", icon: "🇺🇸" },
    { name: "HIPAA", region: "Healthcare", status: "Compliant", icon: "🏥" },
    { name: "SOC 2 Type II", region: "Security Audit", status: "Certified", icon: "🛡️" },
    { name: "ISO 27001", region: "International", status: "Certified", icon: "🌍" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] via-[#f8f5fa]/95 to-[#f8f5fa]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/10 via-[#4a3366]/10 to-[#5b21b6]/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4a3366]/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5b21b6]/10 rounded-full translate-y-32 -translate-x-32 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#7c3aed] to-[#4a3366] rounded-2xl mb-8 shadow-2xl">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#2a2a3c] mb-6">
              Security <span className="bg-gradient-to-r from-[#7c3aed] via-[#4a3366] to-[#5b21b6] bg-clip-text text-transparent">Standards</span>
            </h1>
            <p className="text-xl text-[#4a3366] max-w-3xl mx-auto mb-8">
              Military-grade security, zero-knowledge architecture, and complete anonymity protection
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e5e0eb] shadow-sm">
              <div className="w-2 h-2 bg-[#059669] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#4a3366]">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Level Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 backdrop-blur-sm rounded-2xl border border-[#7c3aed]/30 p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-[#059669] rounded-full animate-pulse"></div>
                <span className="text-[#059669] font-bold">MAXIMUM SECURITY</span>
              </div>
              <h2 className="text-3xl font-bold text-[#2a2a3c] mb-2">Level 3 Military Grade Security</h2>
              <p className="text-[#4a3366]">The highest standard of protection for anonymous reporting</p>
            </div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((level) => (
                <div key={level} className="relative">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    level === 3 
                      ? 'bg-gradient-to-r from-[#4a3366] to-[#2a2a3c] shadow-lg shadow-[#4a3366]/30' 
                      : 'bg-[#e5e0eb]'
                  }`}>
                    <span className="text-2xl font-bold text-white">{level}</span>
                  </div>
                  {level === 3 && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-[#059669] rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Core Security Principles */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#7c3aed]/20 rounded-2xl mb-4 border border-[#7c3aed]/30">
              <Shield className="h-8 w-8 text-[#7c3aed]" />
            </div>
            <h2 className="text-3xl font-bold text-[#2a2a3c] mb-4">Core Security Principles</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Built on fundamental principles that guarantee your anonymity and data protection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Zero-Knowledge Architecture",
                description: "We cannot access your data. All encryption keys are generated and stored on your device.",
                icon: <ShieldOff className="h-8 w-8" />,
                color: "from-[#4a3366] to-[#2a2a3c]"
              },
              {
                title: "End-to-End Encryption",
                description: "All data is encrypted before it leaves your device and only decrypted by authorized recipients.",
                icon: <Lock className="h-8 w-8" />,
                color: "from-[#7c3aed] to-[#5b21b6]"
              },
              {
                title: "No-Log Policy",
                description: "We do not log IP addresses, browsing activity, or any identifying information.",
                icon: <EyeOff className="h-8 w-8" />,
                color: "from-[#059669] to-[#047857]"
              }
            ].map((principle, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 hover:border-[#7c3aed]/50 transition-all duration-300 shadow-sm">
                <div className={`w-14 h-14 bg-gradient-to-r ${principle.color} rounded-xl flex items-center justify-center mb-6`}>
                  <div className="text-white">
                    {principle.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2a2a3c] mb-3">{principle.title}</h3>
                <p className="text-[#4a3366]">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Encryption Standards */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2a3c] mb-4">Encryption Standards</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Industry-leading encryption technologies that protect your data
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {encryptionStandards.map((standard, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 bg-[#f8f5fa] rounded-lg flex items-center justify-center ${standard.color}`}>
                    {standard.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#2a2a3c]">{standard.strength}</div>
                    <div className="text-sm text-[#6b7280]">Strength</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2a2a3c] mb-2">{standard.name}</h3>
                <div className="inline-flex items-center px-3 py-1 bg-[#f8f5fa] rounded-full text-sm font-medium text-[#059669] mb-4">
                  {standard.rating}
                </div>
                <p className="text-[#4a3366]">{standard.description}</p>
              </div>
            ))}
          </div>

          {/* Encryption Visualization */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#2a2a3c] mb-8 text-center">End-to-End Encryption Flow</h3>
            <div className="flex flex-col md:flex-row items-center justify-between">
              {['Your Device', 'Encrypted Transmission', 'Secure Vault'].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] rounded-full flex items-center justify-center mb-4 shadow-md">
                    {index === 0 && <HardDrive className="h-8 w-8 text-white" />}
                    {index === 1 && <Network className="h-8 w-8 text-white" />}
                    {index === 2 && <Database className="h-8 w-8 text-white" />}
                  </div>
                  <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">{step}</h4>
                  <p className="text-sm text-[#6b7280] max-w-xs">
                    {index === 0 && "Data encrypted locally before transmission"}
                    {index === 1 && "Encrypted via TLS 1.3 across secure channels"}
                    {index === 2 && "Stored in encrypted vault with zero-knowledge access"}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden md:flex items-center justify-center mt-8 space-x-4">
              <div className="h-1 w-32 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6]"></div>
              <div className="h-1 w-32 bg-gradient-to-r from-[#5b21b6] to-[#4a3366]"></div>
            </div>
          </div>
        </section>

        {/* Security Controls Matrix */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4a3366]/20 rounded-2xl mb-4 border border-[#4a3366]/30">
              <Cpu className="h-8 w-8 text-[#4a3366]" />
            </div>
            <h2 className="text-3xl font-bold text-[#2a2a3c] mb-4">Security Controls Matrix</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Comprehensive security measures across all layers of protection
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {securityControls.map((control, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#2a2a3c] mb-6">{control.category}</h3>
                <div className="space-y-4">
                  {control.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-4 bg-[#f8f5fa] rounded-xl border border-[#e5e0eb] shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="text-[#7c3aed]">
                          {item.icon}
                        </div>
                        <span className="text-[#2a2a3c] font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-[#059669]" />
                        <span className="text-sm text-[#6b7280]">Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Standards */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2a3c] mb-4">Compliance & Certifications</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Meeting and exceeding global security and privacy standards
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] hover:border-[#7c3aed]/50 transition-colors shadow-sm">
                  <div className="text-3xl mb-3">{standard.icon}</div>
                  <h4 className="font-bold text-[#2a2a3c] mb-1">{standard.name}</h4>
                  <p className="text-sm text-[#6b7280] mb-2">{standard.region}</p>
                  <div className="inline-flex items-center px-2 py-1 bg-[#059669]/10 rounded text-xs font-medium text-[#059669]">
                    {standard.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 rounded-xl p-6 border border-[#7c3aed]/30 shadow-sm">
                <h4 className="text-lg font-bold text-[#2a2a3c] mb-3">Independent Audits</h4>
                <p className="text-[#4a3366] mb-4">
                  Quarterly security audits conducted by independent third-party firms
                </p>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 text-[#7c3aed]" />
                  <span className="text-sm text-[#6b7280]">Last audit: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#4a3366]/10 to-[#2a2a3c]/10 rounded-xl p-6 border border-[#4a3366]/30 shadow-sm">
                <h4 className="text-lg font-bold text-[#2a2a3c] mb-3">Bug Bounty Program</h4>
                <p className="text-[#4a3366] mb-4">
                  Rewards up to $50,000 for responsibly disclosed security vulnerabilities
                </p>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-[#4a3366]" />
                  <span className="text-sm text-[#6b7280]">Active program with 100+ researchers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Incident Response */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#dc2626]/20 rounded-2xl mb-4 border border-[#dc2626]/30">
              <Bell className="h-8 w-8 text-[#dc2626]" />
            </div>
            <h2 className="text-3xl font-bold text-[#2a2a3c] mb-4">Incident Response Protocol</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Prepared for any security event with a robust response framework
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { step: "Detection", time: "Within 5 minutes", icon: "🔍", color: "text-[#7c3aed]" },
                { step: "Containment", time: "Within 15 minutes", icon: "🚫", color: "text-[#4a3366]" },
                { step: "Eradication", time: "Within 2 hours", icon: "⚡", color: "text-[#dc2626]" },
                { step: "Recovery", time: "Within 4 hours", icon: "🔄", color: "text-[#059669]" },
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl mb-2 ${phase.color}`}>{phase.icon}</div>
                  <h4 className="font-bold text-[#2a2a3c] mb-1">{phase.step}</h4>
                  <p className="text-sm text-[#6b7280]">{phase.time}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
              <h4 className="text-lg font-bold text-[#2a2a3c] mb-4">Response Team</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-[#2a2a3c] mb-2">24/7 Security Operations</h5>
                  <p className="text-sm text-[#6b7280]">Dedicated team monitoring all systems</p>
                </div>
                <div>
                  <h5 className="font-medium text-[#2a2a3c] mb-2">Legal & Compliance</h5>
                  <p className="text-sm text-[#6b7280]">Immediate regulatory response coordination</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Timeline */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a2a3c] mb-4">Security Evolution</h2>
            <p className="text-[#6b7280] max-w-2xl mx-auto">
              Continuous improvement and adaptation to emerging threats
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#7c3aed] via-[#4a3366] to-[#5b21b6]"></div>
              
              {[
                { 
                  date: "Q1 2024", 
                  milestone: "Zero-Knowledge Architecture Implemented",
                  description: "Complete transition to client-side encryption",
                  side: "left"
                },
                { 
                  date: "Q4 2023", 
                  milestone: "Military-Grade Encryption Upgrade",
                  description: "Upgraded to AES-256 and Argon2 hashing",
                  side: "right"
                },
                { 
                  date: "Q2 2023", 
                  milestone: "ISO 27001 Certification",
                  description: "Achieved international security standard",
                  side: "left"
                },
                { 
                  date: "Q1 2023", 
                  milestone: "Bug Bounty Program Launch",
                  description: "Invited security researchers to test systems",
                  side: "right"
                }
              ].map((item, index) => (
                <div key={index} className={`relative mb-8 ${item.side === 'left' ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'} max-w-md`}>
                  <div className={`absolute top-4 ${item.side === 'left' ? 'right-0 md:right-auto md:left-full ml-4' : 'left-0 md:left-auto md:right-full mr-4'} w-4 h-4 bg-gradient-to-r from-[#7c3aed] to-[#4a3366] rounded-full border-4 border-[#f8f5fa]`}></div>
                  <div className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                    <div className="text-sm font-medium text-[#7c3aed] mb-2">{item.date}</div>
                    <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">{item.milestone}</h4>
                    <p className="text-[#4a3366]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 rounded-2xl p-12 border border-[#7c3aed]/30 shadow-sm">
            <h3 className="text-3xl font-bold text-[#2a2a3c] mb-6">Questions About Security?</h3>
            <p className="text-[#4a3366] mb-8 max-w-2xl mx-auto">
              Our security team is available to answer technical questions and provide additional documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] text-white rounded-xl font-semibold hover:from-[#8b5cf6] hover:to-[#6d28d9] transition-all shadow-lg hover:shadow-xl hover:shadow-[#7c3aed]/20">
                Request Security Whitepaper
              </button>
              <button className="px-8 py-3 bg-white text-[#2a2a3c] rounded-xl font-semibold border border-[#e5e0eb] hover:bg-[#f8f5fa] transition-colors shadow-sm hover:shadow-md">
                Contact Security Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityStandards;