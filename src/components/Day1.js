import React, { useState, useEffect } from 'react';
import NewsTicker from './NewsTicker';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Days.css';

const Day1 = () => {
  const [isLive, setIsLive] = useState(false);
  const [checking, setChecking] = useState(true);
  const VIDEO_ID = "sPuylb6aR4Y"; 

  useEffect(() => {
    document.title = 'Day 1 | Hanuman Dada Murti Inauguration';

    const checkYouTube = async () => {
      // Try Proxy 1: AllOrigins
      try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${VIDEO_ID}`)}&t=${Date.now()}`);
        const data = await res.json();
        if (data.contents.includes('LIVE') || data.contents.includes('isLiveNow')) {
          setIsLive(true);
          setChecking(false);
          return;
        }
      } catch (e) { console.log("Proxy 1 failed"); }

      // Try Proxy 2: FactCheck (Alternative)
      try {
        const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`https://www.youtube.com/watch?v=${VIDEO_ID}`)}`);
        const text = await res.text();
        if (text.includes('LIVE') || text.includes('isLiveNow')) {
          setIsLive(true);
        }
      } catch (e) { console.log("Proxy 2 failed"); }
      
      setChecking(false);
    };

    checkYouTube();
    const interval = setInterval(checkYouTube, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='main-divv'>
      <NewsTicker /><Navbar />
      <div className="content-container">
        <h1 className='p1'>Day 1 | Hanuman Dada Murti Inauguration</h1>
        <div className="video-wrapper">
          {/* If the automatic check is failing, we show the player ANYWAY if it's the day of the event */}
          {isLive || !checking ? (
            <iframe 
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=0`} 
              title="Live" 
              frameBorder="0" 
              allowFullScreen>
            </iframe>
          ) : (
            <div className="not-ready-box">
               <div className="temple-icon">🕉️</div>
               <h2>Checking Stream...</h2>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Day1;