import { Shield, Heart, Lock, Globe, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  AIRE Vault
                </h3>
                <p className="text-xs text-gray-400">Secure Anonymous Reporting</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A trusted platform for anonymous incident reporting and secure evidence preservation. 
              Your safety and privacy are our highest priorities.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <Lock className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">End-to-End Encrypted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/report" className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  <span>Submit Report</span>
                </a>
              </li>
              <li>
                <a href="/login" className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  <span>NGO Login</span>
                </a>
              </li>
              <li>
                <a href="/register" className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  <span>NGO Registration</span>
                </a>
              </li>
              <li>
                <a href="/privacy" className="flex items-center space-x-2 text-sm hover:text-blue-400 transition-colors duration-200">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Security Features */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Security Features</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span className="text-sm">Military-Grade Encryption</span>
              </li>
              <li className="flex items-center space-x-3">
                <Lock className="h-4 w-4 text-green-400" />
                <span className="text-sm">Zero-Knowledge Architecture</span>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="text-sm">No IP Tracking</span>
              </li>
              <li className="flex items-center space-x-3">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm">Strict Anonymity Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact/Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Support</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Technical Support</p>
                  <a href="mailto:support@airevault.org" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    support@airevault.org
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-3">Available 24/7 for emergency reports</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 border border-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium">System Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-medium">GDPR Compliant</p>
                  <p className="text-xs text-gray-400">Data Protection</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-medium">256-bit SSL</p>
                  <p className="text-xs text-gray-400">Secure Connection</p>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                Committed to making communities safer through technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-400" />
              <p className="text-sm">
                &copy; {currentYear} Anonymous Incident Reporting & Evidence Vault.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/cookie-terms" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/cookie-terms" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
              <a href="/security" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">
                Security Standards
              </a>
            </div>
            
            <p className="text-xs text-gray-500">
              All reports are treated with utmost confidentiality
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;