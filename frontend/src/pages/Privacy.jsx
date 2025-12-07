import { Shield, Lock, Eye, FileText, Users, Globe, Download, Mail, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] via-[#f8f5fa]/95 to-[#f8f5fa]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 border-b border-[#e5e0eb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#7c3aed]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-[#7c3aed]/30 mb-6">
              <Shield className="h-10 w-10 text-[#7c3aed]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2a2a3c] mb-4">
              Privacy <span className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-[#4a3366] text-lg max-w-3xl">
              Your privacy and security are fundamental to our mission. This policy explains how we protect your anonymity and handle data.
            </p>
            <div className="mt-6 flex items-center space-x-2 text-sm text-[#6b7280]">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#2a2a3c] mb-4">Policy Sections</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'data-collection', label: 'Data Collection' },
                    { id: 'anonymity', label: 'Anonymity Guarantee' },
                    { id: 'data-usage', label: 'Data Usage' },
                    { id: 'ngo-sharing', label: 'NGO Sharing' },
                    { id: 'security', label: 'Security Measures' },
                    { id: 'your-rights', label: 'Your Rights' },
                    { id: 'changes', label: 'Policy Changes' },
                  ].map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block py-2 px-3 text-[#4a3366] hover:text-[#2a2a3c] hover:bg-[#e5e0eb] rounded-lg transition-colors"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-[#e5e0eb]">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="h-5 w-5 text-[#059669]" />
                    <div>
                      <p className="text-sm font-medium text-[#2a2a3c]">GDPR Compliant</p>
                      <p className="text-xs text-[#6b7280]">EU Data Protection</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-6 bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 backdrop-blur-sm rounded-2xl border border-[#7c3aed]/30 p-6 shadow-sm">
                <h4 className="text-lg font-bold text-[#2a2a3c] mb-3">Quick Actions</h4>
                <div className="space-y-3">
                  <Link 
                    to="/report"
                    className="flex items-center space-x-2 text-[#7c3aed] hover:text-[#5b21b6] transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Submit Anonymous Report</span>
                  </Link>
                  <button className="flex items-center space-x-2 text-[#4a3366] hover:text-[#2a2a3c] transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download Full Policy (PDF)</span>
                  </button>
                  <Link 
                    to="/contact"
                    className="flex items-center space-x-2 text-[#4a3366] hover:text-[#2a2a3c] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Privacy Team</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#7c3aed]/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#7c3aed]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">Overview</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#4a3366] mb-4">
                    <strong>AIRE Vault</strong> ("we," "our," or "us") is committed to protecting your privacy and anonymity. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
                    our anonymous incident reporting platform.
                  </p>
                  <p className="text-[#4a3366]">
                    Our platform is designed with <strong>zero-knowledge architecture</strong>, meaning we intentionally 
                    avoid collecting personally identifiable information. We cannot identify you, even if compelled by law.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section id="data-collection" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#5b21b6]/20 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-[#5b21b6]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">What We Collect</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                    <h3 className="text-lg font-bold text-[#2a2a3c] mb-3">Incident Reports</h3>
                    <ul className="space-y-2 text-[#4a3366]">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full mt-2"></div>
                        <span>Incident description and details</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full mt-2"></div>
                        <span>Date, time, and location of incident</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full mt-2"></div>
                        <span>Uploaded evidence (photos, videos, documents)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full mt-2"></div>
                        <span>Consent preference for NGO sharing</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                    <h3 className="text-lg font-bold text-[#2a2a3c] mb-3">What We <span className="text-[#dc2626]">Don't</span> Collect</h3>
                    <ul className="space-y-2 text-[#4a3366]">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mt-2"></div>
                        <span>Your name or personal identity</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mt-2"></div>
                        <span>IP addresses or device identifiers</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mt-2"></div>
                        <span>Location data from your device</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mt-2"></div>
                        <span>Contact information (unless voluntarily provided)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 rounded-xl p-6 border border-[#7c3aed]/30 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-6 w-6 text-[#7c3aed] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">Important Note</h4>
                      <p className="text-[#4a3366]">
                        Phone numbers provided in reports are stored separately and encrypted. 
                        They are only accessible to verified NGOs if explicit consent is given.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Anonymity Guarantee */}
            <section id="anonymity" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#059669]/20 rounded-lg flex items-center justify-center">
                    <Lock className="h-6 w-6 text-[#059669]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">Anonymity Guarantee</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#f8f5fa] to-white/50 rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                    <h3 className="text-xl font-bold text-[#2a2a3c] mb-4">How We Protect Your Identity</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-[#2a2a3c] mb-2">Technical Measures</h4>
                        <ul className="space-y-2 text-[#4a3366]">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
                            <span>End-to-end encryption for all data</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
                            <span>No IP address logging or tracking</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
                            <span>Automatic metadata stripping from files</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2a2a3c] mb-2">Operational Measures</h4>
                        <ul className="space-y-2 text-[#4a3366]">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
                            <span>No personal information required</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
                            <span>Limited data retention periods</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
                            <span>Regular security audits and testing</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#059669]/10 to-[#047857]/10 rounded-xl p-6 border border-[#059669]/30 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="h-8 w-8 text-[#059669]" />
                      <div>
                        <h4 className="text-xl font-bold text-[#2a2a3c]">Legal Protection</h4>
                        <p className="text-[#4a3366] mt-2">
                          We are structured so that we <strong>physically cannot identify reporters</strong>. 
                          Even if served with legal requests, we cannot provide information that doesn't exist in our systems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section id="data-usage" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#4a3366]/20 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-[#4a3366]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">How We Use Data</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { title: 'Incident Analysis', desc: 'Identify patterns and trends for community safety' },
                    { title: 'NGO Coordination', desc: 'Share with verified NGOs for assistance (with consent)' },
                    { title: 'Legal Evidence', desc: 'Preserve evidence for potential legal proceedings' },
                    { title: 'Platform Improvement', desc: 'Enhance our services and security measures' },
                    { title: 'Research', desc: 'Anonymized statistical analysis for academic research' },
                    { title: 'Safety Alerts', desc: 'Generate community safety warnings when necessary' },
                  ].map((use, index) => (
                    <div key={index} className="bg-[#f8f5fa] rounded-xl p-4 border border-[#e5e0eb] shadow-sm">
                      <h4 className="font-bold text-[#2a2a3c] mb-2">{use.title}</h4>
                      <p className="text-sm text-[#4a3366]">{use.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                  <h4 className="text-lg font-bold text-[#2a2a3c] mb-3">Data Retention</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#7c3aed]">7 Years</div>
                      <div className="text-sm text-[#6b7280]">Reports with evidence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#5b21b6]">2 Years</div>
                      <div className="text-sm text-[#6b7280]">Statistical data only</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#059669]">Immediate</div>
                      <div className="text-sm text-[#6b7280]">No-log browsing data</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* NGO Sharing */}
            <section id="ngo-sharing" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#4a3366]/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#4a3366]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">NGO & Third-Party Sharing</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#4a3366]/10 to-[#2a2a3c]/10 rounded-xl p-6 border border-[#4a3366]/30 shadow-sm">
                    <h3 className="text-xl font-bold text-[#2a2a3c] mb-4">Consent-Based Sharing</h3>
                    <p className="text-[#4a3366] mb-4">
                      We only share reports with verified NGOs when you explicitly give consent. 
                      NGOs undergo rigorous verification and agree to strict confidentiality terms.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#f8f5fa] rounded-lg p-4 shadow-sm">
                        <h4 className="font-bold text-[#059669] mb-2">With Consent</h4>
                        <ul className="space-y-1 text-sm text-[#4a3366]">
                          <li>• Full anonymized report shared</li>
                          <li>• Encrypted contact details (if provided)</li>
                          <li>• Evidence files for investigation</li>
                        </ul>
                      </div>
                      <div className="bg-[#f8f5fa] rounded-lg p-4 shadow-sm">
                        <h4 className="font-bold text-[#dc2626] mb-2">Without Consent</h4>
                        <ul className="space-y-1 text-sm text-[#4a3366]">
                          <li>• Complete anonymity maintained</li>
                          <li>• No information shared with NGOs</li>
                          <li>• Used for statistical purposes only</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                    <h4 className="text-lg font-bold text-[#2a2a3c] mb-3">NGO Verification Process</h4>
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                      {['Document Review', 'Background Check', 'Agreement to Terms', 'Security Audit', 'Ongoing Monitoring'].map((step, index) => (
                        <div key={index} className="flex-shrink-0 w-48 bg-white/80 rounded-lg p-4 shadow-sm">
                          <div className="w-8 h-8 bg-[#7c3aed]/20 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-[#7c3aed] font-bold">{index + 1}</span>
                          </div>
                          <p className="text-[#2a2a3c] font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Measures */}
            <section id="security" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#dc2626]/20 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-[#dc2626]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">Security Measures</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#2a2a3c] mb-4">Technical Security</h3>
                    <ul className="space-y-3">
                      {[
                        'AES-256 end-to-end encryption',
                        'Zero-knowledge architecture',
                        'Regular security penetration testing',
                        'Multi-factor authentication for NGOs',
                        'Automatic security updates',
                        'DDoS protection and monitoring',
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#dc2626] rounded-full"></div>
                          <span className="text-[#4a3366]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2a2a3c] mb-4">Organizational Security</h3>
                    <ul className="space-y-3">
                      {[
                        'Limited employee data access',
                        'Regular privacy training',
                        'Strict confidentiality agreements',
                        'Incident response protocols',
                        'Independent security audits',
                        'Data breach notification policy',
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#7c3aed] rounded-full"></div>
                          <span className="text-[#4a3366]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#dc2626]/10 to-[#b91c1c]/10 rounded-xl p-6 border border-[#dc2626]/30 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-8 w-8 text-[#dc2626]" />
                    <div>
                      <h4 className="text-xl font-bold text-[#2a2a3c]">Data Breach Protocol</h4>
                      <p className="text-[#4a3366] mt-2">
                        In the unlikely event of a data breach, we will notify affected parties within 72 hours 
                        and take immediate steps to contain and mitigate the breach.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#059669]/20 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[#059669]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">Your Rights</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Right to Anonymity',
                      description: 'Your identity is protected by design. We cannot identify you even upon request.',
                      icon: '👤'
                    },
                    {
                      title: 'Right to Report',
                      description: 'You can submit reports without providing personal information.',
                      icon: '📝'
                    },
                    {
                      title: 'Right to Consent',
                      description: 'Control whether your report is shared with NGOs.',
                      icon: '✅'
                    },
                    {
                      title: 'Right to Information',
                      description: 'Access this privacy policy and understand how your data is used.',
                      icon: 'ℹ️'
                    },
                    {
                      title: 'Right to Withdraw',
                      description: 'Request deletion of your report (subject to legal requirements).',
                      icon: '🗑️'
                    },
                    {
                      title: 'Right to Complain',
                      description: 'Contact our privacy team with concerns or complaints.',
                      icon: '📧'
                    },
                  ].map((right, index) => (
                    <div key={index} className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                      <div className="flex items-start space-x-4">
                        <span className="text-2xl">{right.icon}</span>
                        <div>
                          <h4 className="text-lg font-bold text-[#2a2a3c] mb-2">{right.title}</h4>
                          <p className="text-[#4a3366]">{right.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 rounded-xl p-6 border border-[#7c3aed]/30 shadow-sm">
                  <h4 className="text-lg font-bold text-[#2a2a3c] mb-3">Exercise Your Rights</h4>
                  <p className="text-[#4a3366] mb-4">
                    To exercise any of these rights or if you have privacy concerns, contact our Privacy Officer at:
                  </p>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#7c3aed]" />
                    <a href="mailto:privacy@airevault.org" className="text-[#7c3aed] hover:text-[#5b21b6]">
                      privacy@airevault.org
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Policy Changes */}
            <section id="changes" className="scroll-mt-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] p-8 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-[#4a3366]/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-[#4a3366]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#2a2a3c]">Policy Changes</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#4a3366] mb-4">
                    We may update this Privacy Policy from time to time. We will notify users of any material changes by:
                  </p>
                  
                  <ul className="text-[#4a3366] space-y-2 mb-6">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#4a3366] rounded-full mt-2"></div>
                      <span>Posting a notice on our website</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#4a3366] rounded-full mt-2"></div>
                      <span>Updating the "Last updated" date at the top of this policy</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#4a3366] rounded-full mt-2"></div>
                      <span>Notifying registered NGOs of significant changes</span>
                    </li>
                  </ul>
                  
                  <div className="bg-[#f8f5fa] rounded-xl p-6 border border-[#e5e0eb] shadow-sm">
                    <h4 className="text-lg font-bold text-[#2a2a3c] mb-3">Contact Information</h4>
                    <p className="text-[#4a3366]">
                      For questions about this Privacy Policy or our privacy practices, contact us:
                    </p>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-[#2a2a3c]">Privacy Officer</p>
                        <p className="text-[#4a3366]">AIRE Vault Privacy Team</p>
                        <p className="text-[#4a3366]">privacy@airevault.org</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#2a2a3c]">Data Protection Officer</p>
                        <p className="text-[#4a3366]">dpo@airevault.org</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;