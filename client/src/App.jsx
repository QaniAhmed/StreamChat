import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [onlineUsers] = useState([
    { id: 1, name: 'Ahmed Ali' },
    { id: 2, name: 'Sara Smith' },
    { id: 3, name: 'John Doe' },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Ahmed Ali', text: 'Hey there!', time: '10:00 AM' },
    { id: 2, sender: 'You', text: 'Hello! How is the project going?', time: '10:01 AM' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo-area">
          <div className="logo-icon">SC</div>
          <h1 className="logo-text">StreamChat</h1>
        </div>
        <div className="status-indicator">
          <span className="dot"></span>
          <span>Online</span>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Online Users</h3>
          </div>
          <div className="user-list">
            {onlineUsers.map(user => (
              <div key={user.id} className="user-item">
                <div className="avatar">
                  {user.name.charAt(0)}
                  <span className="online-badge"></span>
                </div>
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="chat-window">
          <div className="messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.sender === 'You' ? 'sent-wrapper' : ''}`}>
                <div className="msg-info" style={{ textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
                  <strong>{msg.sender}</strong> • {msg.time}
                </div>
                <div className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="input-area">
            <form className="input-form" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="send-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;