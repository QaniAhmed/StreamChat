import React, { useEffect, useState, useRef} from 'react';
import './App.css';
import Header from '../components/Header';
import Emoji from '../components/Emoji';


function App() {
  // const [onlineUsers] = useState([
  //   { id: 1, name: 'Ahmed Ali' },
  //   { id: 2, name: 'Sara Smith' },
  //   { id: 3, name: 'John Doe' },
  // ]);
  const [Online_users , setOnline_users]=useState([])
  const [messages,setmessages]=useState([])
  const [userMsg,setuserMsg] = useState("")
  const [isTyping,setisTyping]=useState(false)
  const [typingUser,settypingUser]=useState("")
  const typingTimeoutRef = useRef(null)

  let WsRef = useRef(null)
useEffect(() => {
  const ws = new WebSocket("ws://localhost:3000");
  WsRef.current=ws;

  

  ws.onopen = () => {
    console.log("Connected ✅");
    ws.send(JSON.stringify({
      type: "join",
      username: "React"
    }));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log(data)

    if(data.type==="online users"){
      setOnline_users(data.users)
    }

    if(data.type ==="start"){ console.log(data.value)}

    if(data.type==="message"){
      console.log(data.text)
      setmessages(prev=>[...prev,data])
      console.log(messages)
    }

    if(data.type==="user_typing"){
      settypingUser(data.username) 
      setisTyping(true)

      //distroy,if old timer work 
      if(typingTimeoutRef.current){
        clearTimeout(typingTimeoutRef.current);
      }
      //start new one 
      typingTimeoutRef.current = setTimeout(() => {
        setisTyping(false)
        
      }, 3000);
    }
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

function handlechange(e){
  const {name,value} = e.target;
  console.log(name+"  "+value)
   setuserMsg(value)
   console.log("usermsg"+userMsg)
}

function handleSumbimt(e){

  e.preventDefault()
  console.log(userMsg)
  if(WsRef.current && WsRef.current.readyState===WebSocket.OPEN)
    WsRef.current.send(JSON.stringify({
      type: "message",
      text: userMsg
    }));

    //save in messages array
    const data = {
            type: "message",
              text: userMsg,
              sender: "You",
    }
    setmessages(prev=>[...prev,data])

    //clear the input feild ()
    setuserMsg("")


}

function TrackEmoji(value){
  setuserMsg((prev)=>{return prev+value})
  console.log(value)
  
}


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
            {Online_users.map(user => (
              <div  className="user-item">
                <div className="avatar">
                  {user.charAt(0)}
                  <span className="online-badge"></span>
                </div>
                <span>{user}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="chat-window">
          <div className="messages-container">
            {messages.map((msg) => (
              <div  className={`message-wrapper ${msg.sender === 'You' ? 'sent-wrapper' : ''}`}>
                <div className="msg-info" style={{ textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
                  <strong>{msg.sender}</strong> • {msg.time}
                </div>
                <div className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>


          {/* typing-indicator  */}

          {isTyping && (
    <div className="typing-indicator">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="typing-text">{typingUser} is typing...</span>
    </div>
  )}

          {/* Input */}
          <div className="input-area">
            <form className="input-form" onSubmit={handleSumbimt} >

              {/* emoji-button  */}
              <Emoji onaction={TrackEmoji}/>

              
              <input 
                type="text" 
                placeholder="Type a message..." 
                onChange={handlechange}
                value={userMsg}
              />
              <button type="submit" className="send-button" >
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