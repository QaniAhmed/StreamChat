import React, { useRef, useState } from 'react'

function RecordeBtn() {
    const [isRecording,setisRecording]=useState(false)
    const StateRef= useRef(false)
    const RecorderRef=useRef(null)
    const audioChunksRef=useRef([])
    async function StartRecoding(){
        try{

            const stream = await navigator.mediaDevices.getUserMedia({audio:true})
            console.log("Audio work successfully")

            const Recorder = new MediaRecorder(stream);

            Recorder.ondataavailable= (event)=>{
                if (event.data.size>0){
                    audioChunksRef.current.push(event.data)
                }
            }

            Recorder.start();
            //to called later in stop function
            RecorderRef.current= Recorder;


            setisRecording(true)
            console.log("Recording started...")
        }
        catch(err){console.log("Error accessing microphone:"+err)}

    }

    function StopRecording(){
        //check if it's recording 
        if(RecorderRef.current && isRecording){
            RecorderRef.current.stop();

            RecorderRef.current.onstop=()=>{
                const audioBlob= new Blob(audioChunksRef.current,{ type: 'audio/webm' })
                console.log("Audio Size:"+audioBlob.size)
            }

            //turn off in browser
            if (RecorderRef.current.stream) {
                RecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
            setisRecording(false);

            
        }
    }


    function handleClick(){
        if(!isRecording)
            StartRecoding()
        else
            StopRecording()


    }
    
  return (
    <button 
  type="button" 
  className={`mic-button ${isRecording ? 'recording' : ''}`}
  title="Record Voice"
  onClick={handleClick}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
</button>
  )
}

export default RecordeBtn
