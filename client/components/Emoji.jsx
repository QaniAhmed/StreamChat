import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';


function Emoji(props) {
  const [visibility,setvisibility]=useState(false)

  function handleClick(){
    setvisibility(prev => !prev);
  }
  function handleEmojiClick(emojiObject){
    // console.log(emojiObject.emoji)
    props.onaction(emojiObject.emoji)
    setvisibility(prev => !prev);
    
  }
  return (
    <div className="emoji-wrapper">
       {visibility && (
      <div className="emoji-picker-container">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
    )}

    <button type="button" className="emoji-button" title="Add Emoji" onClick={handleClick}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
            </button>
    
    </div>
   

  )
}

export default Emoji
