import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import OfflinePage from './components/OfflinePage';
import Loader from './components/Loader';

// --- UPDATE YOUR YOUTUBE IDs HERE ---
const IDS = {
  day1: "sPuylb6aR4Y", // Your current test ID
  day2: "REPLACE_WITH_DAY_2_ID",
  day3: "REPLACE_WITH_DAY_3_ID"
};

const StatusBadge = ({ status }) => {
  if (status === 'live') {
    return (
      <div className="status-badge live">
        <span className="dot pulse"></span> LIVE
      </div>
    );
  }
  if (status === 'completed') {
    return <div className="status-badge done">✓ COMPLETED</div>;
  }
  return <div className="status-badge upcoming">UPCOMING</div>;
};

function App() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  // Automation State
  const [statuses, setStatuses] = useState({
    day1: 'upcoming',
    day2: 'upcoming',
    day3: 'upcoming'
  });

  useEffect(() => {
    const checkAllStatuses = async () => {
      const updatedStatuses = { ...statuses };

      for (const [day, id] of Object.entries(IDS)) {
        if (!id || id.includes("REPLACE")) continue;

        try {
          // Using AllOrigins with a timestamp to force fresh data (Avoids Caching)
          const response = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
              `https://www.youtube.com/watch?v=${id}`
            )}&timestamp=${Date.now()}`
          );
          const data = await response.json();
          const html = data.contents;

          // Detect if currently Live
          const isLive = 
            html.includes('{"style":"LIVE","label":"LIVE"}') || 
            html.includes('"isLive":true') || 
            html.includes('isLiveNow":true');

          updatedStatuses[day] = isLive ? 'live' : 'upcoming';
        } catch (error) {
          console.error(`Error checking ${day}:`, error);
        }
      }
      setStatuses(updatedStatuses);
    };

    // Run check immediately
    checkAllStatuses();

    // Re-check every 30 seconds
    const interval = setInterval(checkAllStatuses, 30000);

    // Existing Load logic
    const handleWindowLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    const handleStatus = () => setIsOnline(window.navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) return <Loader />;
  if (!isOnline) return <OfflinePage />;

  return (
    <div className="App">
      <Mainbar />
      <NewsTicker />
      <Navbar />
      
      <div className='img'>
        <img 
          className="image1" 
          src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1767181929/Hanuman_Dada_Poster-02_nqctwx.jpg" 
          alt="Main_Banner" 
        />
      </div>  

      <p className='ttt'>Please Select the day you want to view</p> 

      <div className="all">
        <a href="/live-day-1-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 1 | Friday, 23 January 2026</span>
            <StatusBadge status={statuses.day1} /> 
          </div>
        </a>

        <a href="/live-day-2-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 2 | Saturday, 24 January 2026</span>
            <StatusBadge status={statuses.day2} />
          </div>
        </a>

        <a href="/live-day-3-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 3 | Sunday, 25 January 2026</span>
            <StatusBadge status={statuses.day3} />
          </div>
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default App;