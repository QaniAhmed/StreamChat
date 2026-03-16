import React, { useEffect, useState} from 'react';
import './App.css';
import Header from '../components/Header';


function App() {
  const [onlineUsers] = useState([
    { id: 1, name: 'Ahmed Ali' },
    { id: 2, name: 'Sara Smith' },
    { id: 3, name: 'John Doe' },
  ]);

 useEffect(() => {
  const ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    console.log("Connected ✅");
    ws.send(JSON.stringify({
      type: "join",
      username: "React"
    }));
  };

  ws.onmessage = (event) => {
    console.log("Message:", event.data);
  };

  ws.onerror = (error) => {
    console.error("Error:", error);
  };

  ws.onclose = () => {
    console.log("Disconnected ❌");
  };

  return () => {
    ws.close();
  };
}, []);



  return (
    <div className="app-container">
      {/* Header */}
      <Header/>

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
            
          </div>

          {/* Input */}
          <div className="input-area">
            <form className="input-form" >
              <input 
                type="text" 
                placeholder="Type a message..." 
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