import React from 'react';
import './JoinScreen.css';

const JoinScreen = () => {
    return (
        <div className="join-container">
            <div className="join-card">
                <div className="join-header">
                    <div className="logo-icon">💬</div>
                    <h1>StreamChat</h1>
                    <p>Welcome! Choose a nickname to start</p>
                </div>
                
                <form className="join-form">
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" placeholder="e.g., John, Sarah..." required />
                    </div>
                    <button type="submit" className="join-button">Join Chat</button>
                </form>
                
                <div className="join-footer">
                    <span>Online now: 15 users</span>
                </div>
            </div>
        </div>
    );
};

export default JoinScreen;