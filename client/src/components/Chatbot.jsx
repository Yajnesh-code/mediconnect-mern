import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/chat.css";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: userMsg.text,
      });

      // ---- Format bot reply ----
      const formatted = res.data.reply
        .replace(/\n\n/g, "<br/><br/>")  // paragraph breaks
        .replace(/\n/g, "<br/>")        // line breaks
        .replace(/\*/g, "• ");          // bullets

      const botMsg = { sender: "bot", text: formatted };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg = { sender: "bot", text: "⚠️ Error. Please try again." };
      setMessages((prev) => [...prev, botMsg]);
    }

    setIsTyping(false);
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chat-header">
        <span>🩺 MediConnect Assistant</span>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      {/* Chat Body */}
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-bubble ${msg.sender}`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          ></div>
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask anything about health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
