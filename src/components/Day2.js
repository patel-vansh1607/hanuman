import React, { useState, useEffect } from 'react';
import NewsTicker from './NewsTicker';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Days.css';
const Day2 = () => {
  const [isLive, setIsLive] = useState(false); // ONE CHANGE

  useEffect(() => {
    document.title = 'Day 2 | Hanuman Murti Inauguration';
    const checkYouTube = async () => {
      try {
        const response = await fetch(`https://www.youtube.com/watch?v=NTfirXY3sww`);
        const text = await response.text();
        
        if (text.includes('"isLiveNow":true')) {
          setIsLive(true);
        } else {
          setIsLive(false);
        }
      } catch (error) {
        console.error("Connection busy... retrying.");
      }
    }
    checkYouTube();
    const interval = setInterval(checkYouTube, 5000); 
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='main-divv'>
      <NewsTicker />
      <Navbar />
      
      <div className="content-container">
        <h1 className='p1'>Day 2 | Hanuman Murti Inauguration</h1>
        
        <div className="video-wrapper">
          {isLive ? (
                <iframe //PUT LINK HERE 
                src="https://www.youtube.com/embed/Nh7oLI0438A?autoplay=1&mute=1&playsinline=1&rel=0"
                title="Hanuman Murti Live"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
          ) : (
            <div className="not-ready-box">
               <div className="temple-icon">🕉️</div>
               <h2>Darshan Starts Soon</h2>
               <p>The spiritual proceedings for Day 3 are being prepared.</p>
               <div className="status-indicator">
                 <span className="dot"></span>
                 Monitoring Live Stream
               </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
export default Day2;