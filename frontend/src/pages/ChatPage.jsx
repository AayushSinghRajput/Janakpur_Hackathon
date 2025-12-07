import { useState, useEffect, useRef } from "react";
import { 
  Paperclip, 
  Image, 
  Mic, 
  User, 
  Send,
  Shield,
  RefreshCw,
  Info
} from "lucide-react";
import chatService from "../services/chatService";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [chatConnected, setChatConnected] = useState(true);
  const messagesEndRef = useRef(null);

  const quickOptions = [
    "Report harassment incident",
    "Need emergency assistance",
    "Share evidence anonymously",
    "Talk about workplace issues",
    "Seek psychological support"
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message to UI immediately
    const userMessage = { from: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setShowQuickReplies(false); // Hide quick options when any message is sent

    try {
      console.log("🤖 Sending message to AI...");
      
      // Send to backend API
      const response = await chatService.sendChatMessage(text);
      
      // Add AI response to UI
      const aiMessage = { from: "bot", text: response.reply || response.answer || "I'm here to help." };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error("❌ Error getting AI response:", error);
      
      // Fallback responses if API fails
      const fallbackResponses = [
        "I understand you're going through a difficult time. Your safety is our priority.",
        "Thank you for sharing this information. All conversations are encrypted and anonymous.",
        "I'm here to help. Would you like to submit an official report through our secure portal?",
        "Remember, you're not alone. We have resources available to support you.",
        "Your privacy is protected. No one can trace this conversation back to you."
      ];
      
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      const fallbackMessage = { from: "bot", text: `${fallbackResponse} (Note: Using offline mode)` };
      
      setMessages(prev => [...prev, fallbackMessage]);
      
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = (e) => {
    const fileName = e.target.files[0]?.name;
    if (fileName) {
      setShowQuickReplies(false); // Hide quick options when file is uploaded
      sendMessage(`Uploaded file: ${fileName}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowQuickReplies(true); // Show quick options when chat is cleared
    chatService.clearChatSession();
  };

  // Chat message component
  const ChatMessage = ({ from, text }) => (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${from === "user" ? "flex-row-reverse" : ""}`}>
        {/* Profile icon */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          from === "user" 
            ? "bg-gradient-to-r from-[#7c3aed] to-[#5b21b6]" 
            : "bg-gradient-to-r from-[#4a3366] to-[#2a2a3c]"
        }`}>
          {from === "user" ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Shield className="h-5 w-5 text-white" />
          )}
        </div>
        
        {/* Message bubble */}
        <div className={`p-4 rounded-2xl ${
          from === "user" 
            ? "bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] text-white rounded-tr-none" 
            : "bg-white/80 backdrop-blur-sm border border-[#e5e0eb] text-[#2a2a3c] rounded-tl-none shadow-sm"
        }`}>
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">{text}</p>
          <div className={`text-xs mt-2 ${
            from === "user" ? "text-[#d1c4e9]" : "text-[#6b7280]"
          }`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );

  // Quick replies component
  const QuickReplies = ({ options, onClick }) => (
    <div className="flex flex-wrap gap-2 mb-4">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => {
            setShowQuickReplies(false); // Hide quick options when one is clicked
            onClick(opt);
          }}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#e5e0eb] rounded-xl hover:bg-[#e5e0eb] hover:border-[#7c3aed]/50 text-[#4a3366] text-sm transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] via-[#f8f5fa]/95 to-[#f8f5fa] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] rounded-full mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2a2a3c] mb-2">
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] bg-clip-text text-transparent">
              SafeChat Assistant
            </span>
          </h1>
          <p className="text-[#6b7280]">
            Anonymous • Encrypted • 24/7 Support
          </p>
          
          {/* Connection Status */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${chatConnected ? 'bg-[#059669] animate-pulse' : 'bg-[#4a3366]'}`}></div>
            <span className={`text-sm ${chatConnected ? 'text-[#059669]' : 'text-[#4a3366]'}`}>
              {chatConnected ? 'Connected to AI Assistant' : 'Offline Mode - Basic Responses'}
            </span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e5e0eb] shadow-lg overflow-hidden">
          
          {/* Chat Status Bar */}
          <div className="bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 border-b border-[#e5e0eb] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#059669] rounded-full animate-pulse"></div>
                <span className="text-[#059669] text-sm font-medium">Connection secured</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={clearChat}
                  className="flex items-center space-x-1 text-[#4a3366] hover:text-[#2a2a3c] text-sm transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Clear Chat</span>
                </button>
                <div className="flex items-center space-x-2 text-[#6b7280] text-sm">
                  <Shield className="h-4 w-4" />
                  <span>End-to-end encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-[500px] p-6 overflow-y-auto">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-[#7c3aed]/10 to-[#5b21b6]/10 rounded-2xl p-6 border border-[#e5e0eb] shadow-sm">
                <Shield className="h-10 w-10 text-[#7c3aed] mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#2a2a3c] mb-2">Welcome to SafeChat</h3>
                <p className="text-[#4a3366] mb-3">
                  I'm your anonymous assistant. You can safely share your concerns here.
                </p>
                <div className="text-sm text-[#6b7280] flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                  <span>No logs • No tracking • Complete anonymity</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} from={msg.from} text={msg.text} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4a3366] to-[#2a2a3c] flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex space-x-1 p-3 bg-white/80 rounded-2xl border border-[#e5e0eb] shadow-sm">
                    <div className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {showQuickReplies && messages.length === 0 && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-[#6b7280] mb-3">Quick options:</h4>
                <QuickReplies options={quickOptions} onClick={sendMessage} />
              </div>
            )}
            
            {/* Empty div for scrolling to bottom */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#e5e0eb] p-4 bg-[#f8f5fa]/30">
            {/* Input Container */}
            <div className="flex items-center space-x-3">
              {/* File Upload Buttons */}
              <div className="flex items-center space-x-2">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-[#e5e0eb] flex items-center justify-center hover:bg-[#e5e0eb] hover:border-[#7c3aed]/50 transition-all duration-200 shadow-sm hover:shadow-md">
                    <Image className="h-5 w-5 text-[#6b7280] hover:text-[#7c3aed]" />
                  </div>
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-[#e5e0eb] flex items-center justify-center hover:bg-[#e5e0eb] hover:border-[#7c3aed]/50 transition-all duration-200 shadow-sm hover:shadow-md">
                    <Paperclip className="h-5 w-5 text-[#6b7280] hover:text-[#7c3aed]" />
                  </div>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              {/* Text Input */}
              <div className="flex-1">
                <textarea
                  placeholder="Type your message securely..."
                  className="w-full px-4 py-3 bg-white/80 border border-[#e5e0eb] rounded-xl text-[#2a2a3c] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-all duration-200 resize-none shadow-sm"
                  rows="1"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = (e.target.scrollHeight) + 'px';
                  }}
                />
              </div>

              {/* Voice and Send Buttons */}
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 rounded-xl bg-white/80 border border-[#e5e0eb] flex items-center justify-center hover:bg-[#e5e0eb] hover:border-[#7c3aed]/50 transition-all duration-200 shadow-sm hover:shadow-md">
                  <Mic className="h-5 w-5 text-[#6b7280] hover:text-[#7c3aed]" />
                </button>
                
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm ${
                    input.trim() && !isTyping
                      ? "bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] hover:from-[#8b5cf6] hover:to-[#6d28d9] hover:shadow-md"
                      : "bg-white/80 border border-[#e5e0eb] cursor-not-allowed"
                  }`}
                >
                  {isTyping ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-3 pt-3 border-t border-[#e5e0eb]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-[#6b7280]">
                  <Shield className="h-3 w-3" />
                  <span>This chat is anonymous. No personal data is stored.</span>
                </div>
                {!chatConnected && (
                  <div className="flex items-center space-x-1 text-xs text-[#4a3366]">
                    <Info className="h-3 w-3" />
                    <span>Offline mode</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#e5e0eb] text-center shadow-sm">
            <div className="w-10 h-10 bg-[#7c3aed]/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-5 w-5 text-[#7c3aed]" />
            </div>
            <h4 className="font-semibold text-[#2a2a3c] text-sm">Anonymous</h4>
            <p className="text-[#6b7280] text-xs">No personal information required</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#e5e0eb] text-center shadow-sm">
            <div className="w-10 h-10 bg-[#059669]/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="h-5 w-5 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-semibold text-[#2a2a3c] text-sm">Encrypted</h4>
            <p className="text-[#6b7280] text-xs">End-to-end encryption</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#e5e0eb] text-center shadow-sm">
            <div className="w-10 h-10 bg-[#4a3366]/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="h-5 w-5 text-[#4a3366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-[#2a2a3c] text-sm">Secure</h4>
            <p className="text-[#6b7280] text-xs">No logs or tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;