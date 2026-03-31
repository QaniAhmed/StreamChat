import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './VoiceWave.css'

const VoiceWave = ({ audioSrc }) => {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#d1d1d1',      
      progressColor: '#037cfd',  
      cursorColor: 'transparent', 
      barWidth: 1,               
      barGap: 3,                 
      barRadius: 3,              
      height: 40,                
      responsive: true,

      fillParent: true,       
  minPxPerSec: 0,         
  normalize: true,        
    });

    waveSurferRef.current.load(audioSrc);

    waveSurferRef.current.on('play', () => setIsPlaying(true));
    waveSurferRef.current.on('pause', () => setIsPlaying(false));

    return () => waveSurferRef.current.destroy();
  }, [audioSrc]);

  const handleTogglePlay = () => {
    waveSurferRef.current.playPause();
  };

  return (
    <div className="waveform-container">
      <button onClick={handleTogglePlay} className="play-btn-circle">
        {isPlaying ? '⏸' : '▶'} 
      </button>
      <div ref={containerRef} className="wave-div" />
    </div>
  );
};

export default VoiceWave;