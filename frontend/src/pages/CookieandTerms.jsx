import { 
  Cookie, 
  FileText, 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Calendar,
  Download,
  Mail,
  Globe,
  Users,
  Server,
  Clock,
  BookOpen,
  Scale
} from 'lucide-react';
import { useState } from 'react';

const CookieAndTerms = () => {
  const [activeTab, setActiveTab] = useState('cookies');

  const cookieCategories = [
    {
      name: "Essential Cookies",
      description: "Required for basic site functionality",
      necessary: true,
      duration: "Session",
      purpose: "Authentication, security, and core features",
      examples: ["Session management", "Security tokens", "CSRF protection"]
    },
    {
      name: "Analytics Cookies",
      description: "Help us improve the platform",
      necessary: false,
      duration: "2 years",
      purpose: "Anonymous usage statistics and performance monitoring",
      examples: ["Page views", "Feature usage", "Error tracking"]
    },
    {
      name: "Preference Cookies",
      description: "Remember your settings",
      necessary: false,
      duration: "1 year",
      purpose: "Remember your preferences and settings",
      examples: ["Language preference", "Theme settings", "Display options"]
    }
  ];

  const consentSettings = [
    { id: 'essential', label: 'Essential Cookies', description: 'Required for the site to function', defaultChecked: true, disabled: true },
    { id: 'analytics', label: 'Analytics Cookies', description: 'Help us improve the platform', defaultChecked: false },
    { id: 'preferences', label: 'Preference Cookies', description: 'Remember your settings', defaultChecked: false }
  ];

  const termsSections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using AIRE Vault, you accept and agree to be bound by these Terms of Service."
    },
    {
      title: "Anonymous Reporting",
      content: "Users may submit incident reports anonymously. We do not collect or store personally identifiable information."
    },
    {
      title: "NGO Access",
      content: "Verified NGOs may access reports with explicit user consent. NGOs must maintain confidentiality."
    },
    {
      title: "Prohibited Conduct",
      content: "Users may not submit false reports, harass others, or use the platform for illegal purposes."
    },
    {
      title: "Intellectual Property",
      content: "All platform content, excluding user-submitted reports, is the property of AIRE Vault."
    },
    {
      title: "Limitation of Liability",
      content: "AIRE Vault is not liable for any damages arising from use of the platform."
    },
    {
      title: "Termination",
      content: "We reserve the right to suspend or terminate access for violations of these terms."
    },
    {
      title: "Governing Law",
      content: "These terms are governed by international data protection laws and regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] via-[#f8f5fa]/95 to-[#f8f5fa]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 border-b border-[#e5e0eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-[#7c3aed]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-[#7c3aed]/30">
                <Cookie className="h-8 w-8 text-[#7c3aed]" />
              </div>
              <div className="w-16 h-16 bg-[#5b21b6]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-[#5b21b6]/30">
                <FileText className="h-8 w-8 text-[#5b21b6]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2a2a3c] mb-4">
              Cookie Policy & <span className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent">Terms of Service</span>
            </h1>
            <p className="text-[#4a3366] text-lg max-w-3xl mx-auto">
              Understand how we use cookies and the terms governing your use of our anonymous reporting platform.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row border-b border-[#e5e0eb] mb-8">
          <button
            onClick={() => setActiveTab('cookies')}
            className={`flex-1 py-4 px-6 text-lg font-medium rounded-t-lg transition-colors ${
              activeTab === 'cookies'
                ? 'bg-white/80 text-[#2a2a3c] border-b-2 border-[#7c3aed] shadow-sm'
                : 'text-[#6b7280] hover:text-[#2a2a3c] hover:bg-white/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Cookie className="h-5 w-5" />
              <span>Cookie Policy</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-4 px-6 text-lg font-medium rounded-t-lg transition-colors ${
              activeTab === 'terms'
                ? 'bg-white/80 text-[#2a2a3c] border-b-2 border-[#5b21b6] shadow-sm'
                : 'text-[#6b7280] hover:text-[#2a2a3c] hover:bg-white/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <FileText className="h-5 w-5" />
              <span>Terms of Service</span>
            </div>
          </button>
        </div>

        {/* Cookie Policy Content */}
        {activeTab === 'cookies' && (
          <div className="space-y-8">
            {/* Cookie Consent Banner */}
            <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 backdrop-blur-sm rounded-2xl border border-[#7c3aed]/30 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Cookie className="h-8 w-8 text-[#7c3aed]" />
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">Cookie Consent Preferences</h2>
                </div>
                <div className="text-sm px-3 py-1 bg-[#7c3aed]/10 text-[#5b21b6] rounded-full font-medium">
                  Last updated: Today
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-[#4a3366] mb-4">
                  We use cookies to enhance your experience on our platform. You can manage your preferences below.
                  <strong className="text-[#7c3aed]"> Essential cookies cannot be disabled</strong> as they are required for basic functionality.
                </p>
                
                <div className="bg-white/80 rounded-xl p-4 border border-[#e5e0eb] mb-4 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-[#059669]" />
                    <span className="text-sm text-[#4a3366]">No tracking cookies • No advertising cookies • No third-party cookies</span>
                  </div>
                </div>
              </div>

              {/* Cookie Settings */}
              <div className="space-y-4 mb-8">
                {consentSettings.map((setting) => (
                  <div key={setting.id} className="bg-white/80 rounded-xl p-4 border border-[#e5e0eb] shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <input
                            type="checkbox"
                            id={setting.id}
                            defaultChecked={setting.defaultChecked}
                            disabled={setting.disabled}
                            className="w-5 h-5 text-[#7c3aed] bg-white border-[#e5e0eb] rounded focus:ring-[#7c3aed]/20"
                          />
                          <div>
                            <label htmlFor={setting.id} className="font-medium text-[#2a2a3c]">
                              {setting.label}
                            </label>
                            <p className="text-sm text-[#6b7280]">{setting.description}</p>
                          </div>
                        </div>
                      </div>
                      {setting.disabled && (
                        <span className="text-xs px-2 py-1 bg-[#e5e0eb] text-[#4a3366] rounded font-medium">Required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] text-white rounded-xl font-semibold hover:from-[#8b5cf6] hover:to-[#6d28d9] transition-all shadow-lg hover:shadow-xl hover:shadow-[#7c3aed]/20">
                  Save Preferences
                </button>
                <button className="flex-1 py-3 bg-white text-[#2a2a3c] rounded-xl font-semibold border border-[#e5e0eb] hover:bg-[#f8f5fa] transition-colors shadow-sm hover:shadow-md">
                  Accept All Cookies
                </button>
                <button className="flex-1 py-3 bg-white text-[#2a2a3c] rounded-xl font-semibold border border-[#e5e0eb] hover:bg-[#f8f5fa] transition-colors shadow-sm hover:shadow-md">
                  Reject All Optional
                </button>
              </div>
            </div>

            {/* Cookie Details */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {cookieCategories.map((category, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-[#2a2a3c]">{category.name}</h3>
                        {category.necessary && (
                          <span className="text-xs px-2 py-1 bg-[#059669]/10 text-[#059669] rounded font-medium">Required</span>
                        )}
                      </div>
                      <p className="text-[#6b7280] text-sm">{category.description}</p>
                    </div>
                    {category.necessary ? (
                      <CheckCircle className="h-6 w-6 text-[#059669]" />
                    ) : (
                      <UserCheck className="h-6 w-6 text-[#7c3aed]" />
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-[#6b7280] mb-1">
                        <Clock className="h-4 w-4" />
                        <span>Duration: <strong className="text-[#2a2a3c]">{category.duration}</strong></span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-[#6b7280]">
                        <Eye className="h-4 w-4" />
                        <span>Purpose: <span className="text-[#4a3366]">{category.purpose}</span></span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-[#4a3366] mb-2">Examples:</p>
                      <ul className="space-y-1">
                        {category.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-[#6b7280]">
                            <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full"></div>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Cookie Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#2a2a3c] mb-6">Additional Information</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Server className="h-6 w-6 text-[#7c3aed] mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">Cookie Storage</h4>
                      <p className="text-[#4a3366]">
                        Cookies are stored locally on your device. You can clear them at any time through your browser settings.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Globe className="h-6 w-6 text-[#5b21b6] mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">Global Privacy Control</h4>
                      <p className="text-[#4a3366]">
                        We respect Global Privacy Control (GPC) signals from your browser to automatically reject non-essential cookies.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-[#059669] mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">Third-Party Cookies</h4>
                      <p className="text-[#4a3366]">
                        We do not use third-party advertising or tracking cookies. All cookies are first-party and platform-specific.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-6 w-6 text-[#4a3366] mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">Cookie Review</h4>
                      <p className="text-[#4a3366]">
                        This policy is reviewed quarterly and updated as needed to reflect changes in our practices or regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#e5e0eb]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#7c3aed]" />
                    <div>
                      <p className="text-sm text-[#4a3366]">Questions about cookies?</p>
                      <a href="mailto:privacy@airevault.org" className="text-[#7c3aed] hover:text-[#5b21b6] font-medium">
                        privacy@airevault.org
                      </a>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white text-[#2a2a3c] rounded-lg border border-[#e5e0eb] hover:bg-[#f8f5fa] transition-colors shadow-sm hover:shadow-md">
                    <Download className="h-4 w-4" />
                    <span>Download Full Cookie Policy (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terms of Service Content */}
        {activeTab === 'terms' && (
          <div className="space-y-8">
            {/* Terms Header */}
            <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 backdrop-blur-sm rounded-2xl border border-[#7c3aed]/30 p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#5b21b6]/20 rounded-xl flex items-center justify-center border border-[#5b21b6]/30">
                    <Scale className="h-6 w-6 text-[#5b21b6]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#2a2a3c]">Terms of Service</h2>
                    <p className="text-[#6b7280]">Effective: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="text-center px-4 py-2 bg-white/80 rounded-lg border border-[#e5e0eb] shadow-sm">
                    <div className="text-2xl font-bold text-[#2a2a3c]">100%</div>
                    <div className="text-xs text-[#6b7280]">Anonymous</div>
                  </div>
                  <div className="text-center px-4 py-2 bg-white/80 rounded-lg border border-[#e5e0eb] shadow-sm">
                    <div className="text-2xl font-bold text-[#2a2a3c]">Zero</div>
                    <div className="text-xs text-[#6b7280]">Personal Data</div>
                  </div>
                  <div className="text-center px-4 py-2 bg-white/80 rounded-lg border border-[#e5e0eb] shadow-sm">
                    <div className="text-2xl font-bold text-[#2a2a3c]">GDPR</div>
                    <div className="text-xs text-[#6b7280]">Compliant</div>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-[#4a3366] mb-4">
                  Welcome to <strong className="text-[#7c3aed]">AIRE Vault</strong>. These Terms of Service govern your use of our anonymous incident reporting platform. 
                  By accessing or using our services, you agree to these terms.
                </p>
                
                <div className="bg-white/80 rounded-xl p-6 border border-[#e5e0eb] mb-6 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-6 w-6 text-[#4a3366] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">Important Notice</h4>
                      <p className="text-[#4a3366]">
                        These terms include limitations of liability and important disclaimers. 
                        <strong className="text-[#4a3366]"> Please read them carefully.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {termsSections.map((section, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-6 hover:border-[#7c3aed]/30 transition-colors shadow-sm">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#7c3aed]/20 to-[#5b21b6]/20 rounded-lg flex items-center justify-center">
                      <span className="text-[#7c3aed] font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#2a2a3c]">{section.title}</h3>
                  </div>
                  <p className="text-[#4a3366]">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Detailed Terms */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#2a2a3c] mb-6">Detailed Terms & Conditions</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-[#2a2a3c] flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-[#7c3aed]" />
                    <span>User Responsibilities</span>
                  </h4>
                  <div className="bg-[#f8f5fa] rounded-xl p-4 border border-[#e5e0eb] shadow-sm">
                    <ul className="space-y-3 text-[#4a3366]">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-[#059669] flex-shrink-0 mt-0.5" />
                        <span>Provide accurate and truthful incident reports</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-[#059669] flex-shrink-0 mt-0.5" />
                        <span>Respect the anonymity of others using the platform</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-[#059669] flex-shrink-0 mt-0.5" />
                        <span>Use the platform only for legitimate incident reporting</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <XCircle className="h-5 w-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
                        <span>Do not submit false or malicious reports</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <XCircle className="h-5 w-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
                        <span>Do not attempt to identify other users</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-[#2a2a3c] flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#5b21b6]" />
                    <span>Platform Security</span>
                  </h4>
                  <div className="bg-[#f8f5fa] rounded-xl p-4 border border-[#e5e0eb] shadow-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-[#4a3366] mb-2">We Provide:</p>
                        <ul className="space-y-2 text-sm text-[#6b7280]">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#059669] rounded-full"></div>
                            <span>End-to-end encryption</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#059669] rounded-full"></div>
                            <span>Zero-knowledge architecture</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#059669] rounded-full"></div>
                            <span>Regular security audits</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#4a3366] mb-2">You Should:</p>
                        <ul className="space-y-2 text-sm text-[#6b7280]">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full"></div>
                            <span>Keep your report ID confidential</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full"></div>
                            <span>Use secure internet connections</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full"></div>
                            <span>Report security concerns immediately</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-[#2a2a3c] flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#4a3366]" />
                    <span>NGO Agreements</span>
                  </h4>
                  <div className="bg-[#f8f5fa] rounded-xl p-4 border border-[#e5e0eb] shadow-sm">
                    <p className="text-[#4a3366] mb-3">
                      Verified NGOs accessing reports agree to:
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        "Maintain strict confidentiality",
                        "Use reports only for intended purposes",
                        "Protect victim anonymity",
                        "Secure data storage",
                        "Regular compliance audits",
                        "Immediate breach reporting"
                      ].map((agreement, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <Lock className="h-4 w-4 text-[#4a3366]" />
                          <span className="text-[#4a3366]">{agreement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 rounded-xl p-6 border border-[#7c3aed]/30 shadow-sm">
                  <h5 className="font-bold text-[#2a2a3c] mb-2">Updates to Terms</h5>
                  <p className="text-sm text-[#4a3366]">
                    We may update these terms. Continued use after updates constitutes acceptance.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#5b21b6]/10 to-[#4a3366]/10 rounded-xl p-6 border border-[#5b21b6]/30 shadow-sm">
                  <h5 className="font-bold text-[#2a2a3c] mb-2">Termination Rights</h5>
                  <p className="text-sm text-[#4a3366]">
                    We reserve the right to terminate access for violations of these terms.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#4a3366]/10 to-[#2a2a3c]/10 rounded-xl p-6 border border-[#4a3366]/30 shadow-sm">
                  <h5 className="font-bold text-[#2a2a3c] mb-2">Contact for Questions</h5>
                  <p className="text-sm text-[#4a3366]">
                    Questions about these terms? Contact legal@airevault.org
                  </p>
                </div>
              </div>
            </div>

            {/* Acceptance Section */}
            <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 backdrop-blur-sm rounded-2xl border border-[#7c3aed]/30 p-8 shadow-sm">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#2a2a3c] mb-4">Acceptance of Terms</h3>
                <p className="text-[#4a3366] mb-6 max-w-2xl mx-auto">
                  By using AIRE Vault, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] text-white rounded-xl font-semibold hover:from-[#8b5cf6] hover:to-[#6d28d9] transition-all shadow-lg hover:shadow-xl hover:shadow-[#7c3aed]/20">
                    I Accept Terms
                  </button>
                  <button className="px-8 py-3 bg-white text-[#2a2a3c] rounded-xl font-semibold border border-[#e5e0eb] hover:bg-[#f8f5fa] transition-colors shadow-sm hover:shadow-md">
                    Download Full Terms (PDF)
                  </button>
                </div>
                
                <p className="text-sm text-[#6b7280] mt-6">
                  Last revised: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | Version 2.1
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-[#e5e0eb]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-[#6b7280] text-sm">
                Need help understanding these policies?
              </p>
              <a href="mailto:legal@airevault.org" className="text-[#7c3aed] hover:text-[#5b21b6] font-medium">
                legal@airevault.org
              </a>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-[#6b7280] hover:text-[#2a2a3c] transition-colors"
              >
                Back to Top
              </button>
              <a href="/privacy" className="text-sm text-[#6b7280] hover:text-[#2a2a3c] transition-colors">
                Privacy Policy
              </a>
              <a href="/security" className="text-sm text-[#6b7280] hover:text-[#2a2a3c] transition-colors">
                Security Standards
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieAndTerms;