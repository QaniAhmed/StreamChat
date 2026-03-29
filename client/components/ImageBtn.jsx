import React from 'react'
import './ImageBtn.css'

function ImageBtn() {

    function handleImageChange(){
        console.log("Done")

    }
  return (
    <div>
<input 
  type="file" 
  id="image-upload" 
  accept="image/*" 
  onChange={handleImageChange} 
  style={{ display: 'none' }} 
/>

<label htmlFor="image-upload" className="image-upload-label">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
</label>
      
    </div>
  )
}

export default ImageBtn
