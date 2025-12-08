import { Shield, Heart, Lock, Globe, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10  text-headings border-t border-borders">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-accent rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent">
                  AIRE Vault
                </h3>
                <p className="text-xs text-secondary-text">Secure Anonymous Reporting</p>
              </div>
            </div>
            <p className="text-sm text-secondary-text leading-relaxed">
              A trusted platform for anonymous incident reporting and secure evidence preservation. 
              Your safety and privacy are our highest priorities.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <Lock className="h-4 w-4 text-success" />
              <span className="text-xs text-secondary-text">End-to-End Encrypted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-headings mb-4 pb-2 border-b border-borders">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/report" className="flex items-center space-x-2 text-sm text-secondary-text hover:text-primary-accent hover:font-medium transition-all duration-200 group">
                  <span className="w-1 h-1 bg-primary-accent rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span>Submit Report</span>
                </a>
              </li>
              <li>
                <a href="/login" className="flex items-center space-x-2 text-sm text-secondary-text hover:text-primary-accent hover:font-medium transition-all duration-200 group">
                  <span className="w-1 h-1 bg-primary-accent rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span>NGO Login</span>
                </a>
              </li>
              <li>
                <a href="/register" className="flex items-center space-x-2 text-sm text-secondary-text hover:text-primary-accent hover:font-medium transition-all duration-200 group">
                  <span className="w-1 h-1 bg-primary-accent rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span>NGO Registration</span>
                </a>
              </li>
              <li>
                <a href="/privacy" className="flex items-center space-x-2 text-sm text-secondary-text hover:text-primary-accent hover:font-medium transition-all duration-200 group">
                  <span className="w-1 h-1 bg-primary-accent rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Security Features */}
          <div>
            <h4 className="text-lg font-semibold text-headings mb-4 pb-2 border-b border-borders">Security Features</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-primary-accent/10 rounded-lg flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors">
                  <ShieldCheck className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm text-secondary-text group-hover:text-headings">Military-Grade Encryption</span>
              </li>
              <li className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-primary-accent/10 rounded-lg flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors">
                  <Lock className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm text-secondary-text group-hover:text-headings">Zero-Knowledge Architecture</span>
              </li>
              <li className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-primary-accent/10 rounded-lg flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors">
                  <Globe className="h-4 w-4 text-primary-accent" />
                </div>
                <span className="text-sm text-secondary-text group-hover:text-headings">No IP Tracking</span>
              </li>
              <li className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-primary-accent/10 rounded-lg flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors">
                  <Heart className="h-4 w-4 text-error" />
                </div>
                <span className="text-sm text-secondary-text group-hover:text-headings">Strict Anonymity Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact/Support */}
          <div>
            <h4 className="text-lg font-semibold text-headings mb-4 pb-2 border-b border-borders">Support</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-8 h-8 bg-primary-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-headings">Technical Support</p>
                  <a href="mailto:support@airevault.org" className="text-sm text-secondary-text hover:text-primary-accent transition-colors">
                    support@airevault.org
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm text-secondary-text mb-3">Available 24/7 for emergency reports</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-accent/10 border border-primary-accent/30">
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium text-secondary-text">System Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-borders">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-10 h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center border border-primary-accent/30">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-xs font-medium text-headings">GDPR Compliant</p>
                  <p className="text-xs text-secondary-text">Data Protection</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-10 h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center border border-primary-accent/30">
                  <Lock className="h-5 w-5 text-primary-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-headings">256-bit SSL</p>
                  <p className="text-xs text-secondary-text">Secure Connection</p>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-secondary-text">
                Committed to making communities safer through technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white/80 backdrop-blur-sm py-6 border-t border-borders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-error" />
              <p className="text-sm text-secondary-text">
                &copy; {currentYear} Anonymous Incident Reporting & Evidence Vault.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/cookie-terms" className="text-xs text-secondary-text hover:text-primary-accent hover:font-medium transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-xs text-secondary-text hover:text-primary-accent hover:font-medium transition-colors">
                Privacy Policy
              </a>
              <a href="/cookie-terms" className="text-xs text-secondary-text hover:text-primary-accent hover:font-medium transition-colors">
                Cookie Policy
              </a>
              <a href="/security" className="text-xs text-secondary-text hover:text-primary-accent hover:font-medium transition-colors">
                Security Standards
              </a>
            </div>
            
            <p className="text-xs text-secondary-text">
              All reports are treated with utmost confidentiality
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;