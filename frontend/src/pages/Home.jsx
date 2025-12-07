import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Lock, Upload, ArrowRight, Users, MessageSquare, Bot } from 'lucide-react';
import ServiceContentTable from '../components/ServiceContentTable';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 text-white">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-cyan-900/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content - Same as before */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-300">Secure & Anonymous Reporting</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Anonymous Incident
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Reporting & Evidence Vault
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl">
              A secure platform for reporting incidents anonymously while preserving crucial evidence. 
              Your identity remains protected while your report makes a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/report" className="group">
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/20 animate-bounce-subtle">
                  <Upload className="h-5 w-5" />
                  <span>Submit Anonymous Report</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>
              
              <Link to="/login">
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-600">
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-20 animate-pulse-slow"></div>
              
              {/* Rotating gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-2xl blur-md opacity-30 animate-spin-slow"></div>
              
              {/* Main image container with shimmer effect */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-700/50 shadow-2xl shadow-blue-900/50 backdrop-blur-sm group hover:border-cyan-400/70 transition-all duration-500">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer"></div>
                
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
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating security badge */}
                <div className="absolute top-4 right-4 animate-bounce-slow">
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-3 rounded-full shadow-2xl shadow-blue-500/50 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                    <Lock className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Animated text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-3 animate-fade-in-up">
                    <div className="w-12 h-12 bg-blue-600/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg shadow-blue-500/30 animate-pulse">
                      <Shield className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white animate-slide-in-right">Secure Evidence Vault</h3>
                      <p className="text-gray-200 text-sm animate-slide-in-right-delay">Military-grade encryption • Zero-knowledge architecture</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating particles/animated elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-2 bg-cyan-400/40 rounded-full animate-pulse"></div>
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-20 h-20">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping-slower"></div>
                <div className="absolute inset-3 bg-blue-400/30 rounded-full animate-pulse-delay"></div>
              </div>
              
              {/* Animated lines/connections */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping-border"></div>
                <div className="absolute inset-4 border-2 border-cyan-400/20 rounded-full animate-ping-border-delay"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards Section - Below the hero content */}
        <div className="mt-20 lg:mt-24">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We provide a comprehensive suite of tools for secure incident reporting and evidence preservation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Lock className="h-6 w-6 text-blue-400" />,
                bg: "bg-blue-600/20",
                border: "hover:border-blue-500/50",
                title: "100% Anonymous",
                desc: "Advanced encryption and zero-knowledge architecture protect your identity completely.",
                delay: "100"
              },
              {
                icon: <Shield className="h-6 w-6 text-cyan-400" />,
                bg: "bg-cyan-600/20",
                border: "hover:border-cyan-500/50",
                title: "Secure Vault",
                desc: "Military-grade encrypted storage with multi-layer security protocols for evidence.",
                delay: "200"
              },
              {
                icon: <AlertTriangle className="h-6 w-6 text-green-400" />,
                bg: "bg-green-600/20",
                border: "hover:border-green-500/50",
                title: "Timely Reporting",
                desc: "Critical incidents are immediately flagged and forwarded to relevant authorities.",
                delay: "300"
              },
              {
                icon: <Users className="h-6 w-6 text-purple-400" />,
                bg: "bg-purple-600/20",
                border: "hover:border-purple-500/50",
                title: "NGO Collaboration",
                desc: "Trusted NGOs access reports to provide support and initiate investigations.",
                delay: "400"
              },
              {
                icon: <Bot className="h-6 w-6 text-pink-400" />,
                bg: "bg-gradient-to-br from-pink-600/20 to-purple-600/20",
                border: "hover:border-pink-500/50",
                title: "AI Legal Chatbot",
                desc: "Get instant guidance on legal procedures and rights with our AI assistant.",
                delay: "500",
                button: true
              }
            ].map((card, index) => (
              <div 
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 ${card.border} transition-all duration-300 hover:transform hover:-translate-y-2 animate-fade-in-up`}
                style={{ animationDelay: `${card.delay}ms` }}
              >
                <div className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center mb-4 animate-bounce-subtle`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{card.desc}</p>
                {card.button && (
                  <Link to="/chat" className="inline-block">
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 text-pink-300 hover:text-pink-200 px-4 py-2 rounded-lg transition-all duration-300 border border-pink-600/30 hover:border-pink-500/50 text-sm hover:scale-105">
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
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 animate-fade-in">
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
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-count-up">
                {stat.value}
              </div>
              <div className="text-gray-300 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* ServiceContentTable Section */}
    <ServiceContentTable />
    
    {/* CTA Section */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-2xl p-12 border border-gray-700 animate-pulse-glow">
        <h2 className="text-3xl font-bold mb-6 animate-fade-in">Ready to Make a Difference?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
          Your anonymous report could be the key to justice. Every piece of evidence matters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/report" className="animate-bounce-subtle" style={{ animationDelay: "400ms" }}>
            <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30">
              <Upload className="h-6 w-6" />
              <span>Report An Incident Now</span>
            </button>
          </Link>
          <span className="text-gray-400 hidden sm:block animate-pulse">or</span>
          <Link to="/chatbot" className="animate-bounce-subtle" style={{ animationDelay: "600ms" }}>
            <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-600/30">
              <Bot className="h-6 w-6" />
              <span>Ask AI Legal Assistant</span>
            </button>
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-4 animate-fade-in" style={{ animationDelay: "800ms" }}>
          Completely anonymous • Encrypted end-to-end • No tracking
        </p>
      </div>
    </div>
    
    {/* Footer Note */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-gray-800">
      <p className="text-gray-400 animate-fade-in">
        <span className="text-blue-400 animate-pulse-slow">AIRE Vault</span> — Protecting voices, preserving evidence, promoting justice
      </p>
      <p className="text-gray-500 text-sm mt-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
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
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
        50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.2); }
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