import { useState } from "react";
import { PaperClipIcon, PhotoIcon, MicrophoneIcon, UserIcon } from "@heroicons/react/24/outline";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const quickOptions = [
    "Report harassment",
    "Share anonymously",
    "Need emergency help?"
  ];

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages([...messages, { from: "user", text }]);
    setInput("");
    setIsTyping(true);
    setShowQuickReplies(false);

    setTimeout(() => {
      setMessages([...messages, { from: "user", text }, { from: "bot", text: "Thank you for sharing. Stay safe. 🤝" }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const fileName = e.target.files[0]?.name;
    if (fileName) sendMessage(`Uploaded file: ${fileName}`);
  };

  // Chat message component
  const ChatMessage = ({ from, text }) => (
    <div className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-end gap-2 ${from === "user" ? "flex-row-reverse" : ""}`}>
        {/* Person icon as profile */}
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center shadow-md hover:scale-105 transition">
          <UserIcon className="h-5 w-5 text-white" />
        </div>
        {/* Message bubble */}
        <div className={`p-3 rounded-xl max-w-xs shadow-md text-gray-900 ${from === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
          {text}
        </div>
      </div>
    </div>
  );

  // Quick replies component
  const QuickReplies = ({ options, onClick }) => (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => onClick(opt)}
          className="px-3 py-1 bg-gray-200 rounded-full hover:bg-blue-200 text-sm transition"
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="flex flex-col w-full max-w-md h-full bg-white rounded-2xl shadow-2xl overflow-hidden border">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold p-4 text-lg flex items-center">
          <span className="ml-2">SafeChat Assistant</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} from={msg.from} text={msg.text} />
          ))}

          {isTyping && (
            <div className="flex justify-start mt-2">
              <div className="flex items-center gap-1 p-2 bg-purple-100 rounded-xl w-12">
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Replies */}
        {showQuickReplies && (
          <div className="p-3 border-t bg-gray-50">
            <QuickReplies options={quickOptions} onClick={sendMessage} />
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 border-t bg-gray-50 flex items-center gap-2">
          {/* Image Upload */}
          <label htmlFor="image-upload" className="cursor-pointer">
            <PhotoIcon className="h-6 w-6 text-gray-500 hover:text-blue-500 transition" />
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* File Upload */}
          <label htmlFor="file-upload" className="cursor-pointer">
            <PaperClipIcon className="h-6 w-6 text-gray-500 hover:text-blue-500 transition" />
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Voice/Audio */}
          <button className="p-1 bg-gray-200 rounded-full hover:bg-blue-200 transition">
            <MicrophoneIcon className="h-6 w-6 text-gray-600" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-xl bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />

          {/* Send Button */}
          <button
            onClick={() => sendMessage(input)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
