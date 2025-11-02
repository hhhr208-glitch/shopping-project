"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.content || `HTTP ${res.status}`);
      }

      const botMessage: Message = { 
        sender: "bot", 
        text: data.content || "Sorry, I didn't understand that." 
      };
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (err: any) {
      console.error("Chatbot error:", err);
      
      const errorMessage: Message = { 
        sender: "bot", 
        text: err.message || "Something went wrong. Please try again." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 flex flex-col max-h-96">
      {/* Chat header */}
      <div className="border-b border-gray-100 pb-2 mb-2">
        <h3 className="font-semibold text-gray-800 text-center">Shopping Assistant</h3>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto mb-3 space-y-3 min-h-48">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-4">
            <p>👋 Hello! Ask me about products, shipping, or returns!</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.text}
              </p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <input
          className="flex-grow border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about products, shipping, etc..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-sm font-medium transition-colors"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}