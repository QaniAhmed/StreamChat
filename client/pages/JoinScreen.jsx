import React, { useEffect, useState } from 'react';
import './JoinScreen.css';
import axios from "axios"
import { useNavigate } from 'react-router';

const JoinScreen = () => {
    useEffect(()=>{ if(localStorage.getItem('name'))
        Navigate('/')},[])
    const [username,setusername]= useState("")
    const [loading, setLoading] = useState(false); 
    const Navigate = useNavigate()
    
    function handleChange(e){
        const {name,value}= e.target
        console.log(name, " ",value)
        setusername(value)

    }
    async function handleSubmit(e) {
    e.preventDefault();
   
    
    if (!username.trim()) return alert("Please enter a name"); 

    setLoading(true); 
    try {
        const response = await axios.post("http://localhost:3000/join", {
            user_name: username 
        });

        console.log("Success:", response.data);
        
        localStorage.setItem("name", response.data.username);
        localStorage.setItem("userId", response.data.id);
        Navigate("/")
        
    } catch (error) {
        if (error.response && error.response.status === 409) {
            alert("This name is already taken!");
        } else {
            console.error("Connection Error:", error);
        }
    } finally {
        setLoading(false); 
    }
}
    
    return (
        <div className="join-container">
            <div className="join-card">
                <div className="join-header">
                    <div className="logo-icon">💬</div>
                    <h1>StreamChat</h1>
                    <p>Welcome! Choose a nickname to start</p>
                </div>
                
                <form className="join-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" placeholder="e.g., John, Sarah..." onChange={handleChange} required />
                    </div>
                    <button type="submit" className="join-button" >Join Chat</button>
                </form>
                
                <div className="join-footer">
                    <span>Online now: 15 users</span>
                </div>
            </div>
        </div>
    );
};

export default JoinScreen;