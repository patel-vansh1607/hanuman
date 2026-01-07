import React, { useState, useEffect } from 'react';
import NewsTicker from './NewsTicker';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Days.css';

const Day1 = () => {
  const [isLive, setIsLive] = useState(false);
  const VIDEO_ID = "sPuylb6aR4Y"; // JUST CHANGE THIS ID FOR DAY 2/3

  useEffect(() => {
    document.title = 'Day 1 | Hanuman Dada Murti Inauguration';
    const checkYouTube = async () => {
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${VIDEO_ID}`)}`);
        const data = await response.json();
        // This checks if the "LIVE" badge text exists in the YouTube page HTML
        const isCurrentlyLive = data.contents.includes('{"style":"LIVE","label":"LIVE"}') || data.contents.includes('"isLive":true');
        setIsLive(isCurrentlyLive);
      } catch (error) {
        console.error("Checking status...");
      }
    };

    checkYouTube();
    const interval = setInterval(checkYouTube, 15000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='main-divv'>
      <NewsTicker /><Navbar />
      <div className="content-container">
        <h1 className='p1'>Day 1 | Hanuman Dada Murti Inauguration</h1>
        <div className="video-wrapper">
          {isLive ? (
            <iframe 
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=0&playsinline=1&rel=0`}
              title="Live Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
          ) : (
            <div className="not-ready-box">
               <div className="temple-icon">🕉️</div>
               <h2>Live Stream Not Available</h2>
               <p>The spiritual proceedings are being prepared. Please stay tuned.</p>
               <div className="status-indicator"><span className="dot"></span> Waiting for Live...</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Day1;  