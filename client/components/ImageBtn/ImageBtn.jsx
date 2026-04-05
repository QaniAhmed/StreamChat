import React from 'react'
import './ImageBtn.css'

function ImageBtn(props) {

    function handleImageChange(e){
        const {files}= e.target

        //read the image 
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload=()=>{
          const Imageb64 = reader.result
          console.log(Imageb64.substring(0,50))
          
          //send the msg
          props.ws.current.send(JSON.stringify({
          type:"image",
            image:Imageb64,
            sender_id:localStorage.getItem("userId")
        }))
        }
        

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
