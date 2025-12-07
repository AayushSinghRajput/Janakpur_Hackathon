import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Lock, Upload, ArrowRight, Users, MessageSquare, Bot } from 'lucide-react';
import ServiceContentTable from '../components/ServiceContentTable';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] via-[#f8f5fa]/95 to-[#f8f5fa]/90 text-[#2a2a3c]">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content - Same as before */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e5e0eb] shadow-sm">
              <div className="w-8 h-8 bg-[#7c3aed] rounded-full flex items-center justify-center animate-pulse">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-[#4a3366]">Secure & Anonymous Reporting</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Anonymous Incident
              <span className="block mt-2 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent">
                Reporting & Evidence Vault
              </span>
            </h1>
            
            <p className="text-lg text-[#4a3366] max-w-2xl">
              A secure platform for reporting incidents anonymously while preserving crucial evidence. 
              Your identity remains protected while your report makes a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/report" className="group">
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#7c3aed] hover:bg-[#5b21b6] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#7c3aed]/20 animate-bounce-subtle">
                  <Upload className="h-5 w-5" />
                  <span>Submit Anonymous Report</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>
              
              <Link to="/login">
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white hover:bg-[#f8f5fa] text-[#2a2a3c] px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-[#e5e0eb] hover:border-[#7c3aed]/50 shadow-sm hover:shadow-md">
                  <Users className="h-5 w-5" />
                  <span>NGO Portal Access</span>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Content - Animated Project Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg animate-float">
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] rounded-2xl blur-xl opacity-20 animate-pulse-slow"></div>
              
              {/* Rotating gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#7c3aed] rounded-2xl blur-md opacity-30 animate-spin-slow"></div>
              
              {/* Main image container with shimmer effect */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#e5e0eb] shadow-2xl shadow-[#7c3aed]/20 backdrop-blur-sm group hover:border-[#7c3aed]/70 transition-all duration-500">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer"></div>
                
                <img 
                  src="/assets/5.jpg" 
                  alt="Anonymous Incident Reporting Platform - Secure and Confidential" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a3c]/80 via-[#2a2a3c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating security badge */}
                <div className="absolute top-4 right-4 animate-bounce-slow">
                  <div className="bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white p-3 rounded-full shadow-2xl shadow-[#7c3aed]/50 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Lock className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Animated text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-3 animate-fade-in-up">
                    <div className="w-12 h-12 bg-[#7c3aed]/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#7c3aed]/30 animate-pulse">
                      <Shield className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white animate-slide-in-right">Secure Evidence Vault</h3>
                      <p className="text-white/90 text-sm animate-slide-in-right-delay">Military-grade encryption • Zero-knowledge architecture</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating particles/animated elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16">
                <div className="absolute inset-0 bg-[#7c3aed]/30 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-2 bg-[#8b5cf6]/40 rounded-full animate-pulse"></div>
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-20 h-20">
                <div className="absolute inset-0 bg-[#5b21b6]/20 rounded-full animate-ping-slower"></div>
                <div className="absolute inset-3 bg-[#7c3aed]/30 rounded-full animate-pulse-delay"></div>
              </div>
              
              {/* Animated lines/connections */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 border-2 border-[#7c3aed]/30 rounded-full animate-ping-border"></div>
                <div className="absolute inset-4 border-2 border-[#8b5cf6]/20 rounded-full animate-ping-border-delay"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards Section - Below the hero content */}
        <div className="mt-20 lg:mt-24">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2a2a3c]">Why Choose Our Platform</h2>
            <p className="text-[#4a3366] text-lg max-w-3xl mx-auto">
              We provide a comprehensive suite of tools for secure incident reporting and evidence preservation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Lock className="h-6 w-6 text-[#7c3aed]" />,
                bg: "bg-[#7c3aed]/20",
                border: "hover:border-[#7c3aed]/50",
                title: "100% Anonymous",
                desc: "Advanced encryption and zero-knowledge architecture protect your identity completely.",
                delay: "100"
              },
              {
                icon: <Shield className="h-6 w-6 text-[#5b21b6]" />,
                bg: "bg-[#5b21b6]/20",
                border: "hover:border-[#5b21b6]/50",
                title: "Secure Vault",
                desc: "Military-grade encrypted storage with multi-layer security protocols for evidence.",
                delay: "200"
              },
              {
                icon: <AlertTriangle className="h-6 w-6 text-[#059669]" />,
                bg: "bg-[#059669]/20",
                border: "hover:border-[#059669]/50",
                title: "Timely Reporting",
                desc: "Critical incidents are immediately flagged and forwarded to relevant authorities.",
                delay: "300"
              },
              {
                icon: <Users className="h-6 w-6 text-[#4a3366]" />,
                bg: "bg-[#4a3366]/20",
                border: "hover:border-[#4a3366]/50",
                title: "NGO Collaboration",
                desc: "Trusted NGOs access reports to provide support and initiate investigations.",
                delay: "400"
              },
              {
                icon: <Bot className="h-6 w-6 text-[#dc2626]" />,
                bg: "bg-gradient-to-br from-[#dc2626]/20 to-[#4a3366]/20",
                border: "hover:border-[#dc2626]/50",
                title: "AI Legal Chatbot",
                desc: "Get instant guidance on legal procedures and rights with our AI assistant.",
                delay: "500",
                button: true
              }
            ].map((card, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-[#e5e0eb] ${card.border} transition-all duration-300 hover:transform hover:-translate-y-2 animate-fade-in-up shadow-sm hover:shadow-md`}
                style={{ animationDelay: `${card.delay}ms` }}
              >
                <div className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center mb-4 animate-bounce-subtle`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#2a2a3c]">{card.title}</h3>
                <p className="text-[#4a3366] text-sm mb-4">{card.desc}</p>
                {card.button && (
                  <Link to="/chat" className="inline-block">
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-[#dc2626]/10 to-[#4a3366]/10 hover:from-[#dc2626]/20 hover:to-[#4a3366]/20 text-[#dc2626] hover:text-[#b91c1c] px-4 py-2 rounded-lg transition-all duration-300 border border-[#dc2626]/30 hover:border-[#dc2626]/50 text-sm hover:scale-105">
                      <MessageSquare className="h-4 w-4" />
                      <span>Try Chatbot</span>
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
    {/* Stats Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#e5e0eb] animate-fade-in shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10K+", label: "Reports Filed" },
            { value: "100%", label: "Anonymity Rate" },
            { value: "50+", label: "Partner NGOs" },
            { value: "24/7", label: "Monitoring" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center transform hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent animate-count-up">
                {stat.value}
              </div>
              <div className="text-[#4a3366] mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* ServiceContentTable Section */}
    <ServiceContentTable />
    
    {/* CTA Section */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 rounded-2xl p-12 border border-[#e5e0eb] animate-pulse-glow shadow-sm">
        <h2 className="text-3xl font-bold mb-6 animate-fade-in text-[#2a2a3c]">Ready to Make a Difference?</h2>
        <p className="text-[#4a3366] text-lg mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
          Your anonymous report could be the key to justice. Every piece of evidence matters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/report" className="animate-bounce-subtle" style={{ animationDelay: "400ms" }}>
            <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#7c3aed]/30">
              <Upload className="h-6 w-6" />
              <span>Report An Incident Now</span>
            </button>
          </Link>
          <span className="text-[#6b7280] hidden sm:block animate-pulse">or</span>
          <Link to="/chatbot" className="animate-bounce-subtle" style={{ animationDelay: "600ms" }}>
            <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#dc2626] to-[#4a3366] hover:from-[#ef4444] hover:to-[#5a3366] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#dc2626]/30">
              <Bot className="h-6 w-6" />
              <span>Ask AI Legal Assistant</span>
            </button>
          </Link>
        </div>
        <p className="text-[#6b7280] text-sm mt-4 animate-fade-in" style={{ animationDelay: "800ms" }}>
          Completely anonymous • Encrypted end-to-end • No tracking
        </p>
      </div>
    </div>
    
    {/* Footer Note */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-[#e5e0eb]">
      <p className="text-[#6b7280] animate-fade-in">
        <span className="text-[#7c3aed] animate-pulse-slow">AIRE Vault</span> — Protecting voices, preserving evidence, promoting justice
      </p>
      <p className="text-[#6b7280] text-sm mt-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
        Now featuring AI-powered legal guidance and support
      </p>
    </div>
    
    {/* Add custom animation styles */}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.3; }
      }
      
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0) rotate(12deg); }
        50% { transform: translateY(-10px) rotate(12deg); }
      }
      
      @keyframes bounce-subtle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      
      @keyframes ping-slow {
        75%, 100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      @keyframes ping-slower {
        75%, 100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }
      
      @keyframes ping-border {
        0%, 100% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.1); opacity: 0.5; }
      }
      
      @keyframes ping-border-delay {
        0%, 100% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.05); opacity: 0.4; }
      }
      
      @keyframes pulse-delay {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.5; }
      }
      
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slide-in-right {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slide-in-right-delay {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes count-up {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.1); }
        50% { box-shadow: 0 0 30px rgba(124, 58, 237, 0.2); }
      }
      
      @keyframes shimmer {
        100% { transform: translateX(100%); }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
      }
      
      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }
      
      .animate-bounce-slow {
        animation: bounce-slow 3s ease-in-out infinite;
      }
      
      .animate-bounce-subtle {
        animation: bounce-subtle 2s ease-in-out infinite;
      }
      
      .animate-ping-slow {
        animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      
      .animate-ping-slower {
        animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      
      .animate-ping-border {
        animation: ping-border 3s ease-in-out infinite;
      }
      
      .animate-ping-border-delay {
        animation: ping-border-delay 4s ease-in-out infinite;
        animation-delay: 1s;
      }
      
      .animate-pulse-delay {
        animation: pulse-delay 4s ease-in-out infinite;
        animation-delay: 2s;
      }
      
      .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out forwards;
        opacity: 0;
      }
      
      .animate-slide-in-right {
        animation: slide-in-right 0.5s ease-out 0.3s forwards;
        opacity: 0;
      }
      
      .animate-slide-in-right-delay {
        animation: slide-in-right-delay 0.5s ease-out 0.5s forwards;
        opacity: 0;
      }
      
      .animate-count-up {
        animation: count-up 0.8s ease-out forwards;
        opacity: 0;
      }
      
      .animate-pulse-glow {
        animation: pulse-glow 3s ease-in-out infinite;
      }
      
      .shimmer {
        animation: shimmer 2s infinite;
      }
    `}</style>
  </div>
);

export default Home;