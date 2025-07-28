import React from 'react';
import '../styles/BackgroundVideo.css';
import vaporwaveVideo from '../assets/LoginScreen-vaporwave.mp4';


export const BackgroundVideo = () => {

  return (
    <div className="background-video-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src={vaporwaveVideo} type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
    </div>
  );
};