// src/components/Chatbot.jsx
import React, { useState } from 'react';
import '../styles/chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I assist you with your medical query today?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: input }]);
    // You can replace this with an API call to your chatbot backend
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: input },
      { sender: 'bot', text: "I'm a demo bot. Please integrate AI/chat API." }
    ]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">🩺 MediBot</div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;
