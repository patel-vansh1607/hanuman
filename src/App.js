import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import OfflinePage from './components/OfflinePage';
import Loader from './components/Loader';

// Update these 3 IDs for the 3 days:
const IDS = {
  day1: "sPuylb6aR4Y", // Day 1 ID
  day2: "ID_FOR_DAY_2", // Replace with Day 2 ID
  day3: "ID_FOR_DAY_3"  // Replace with Day 3 ID
};

const StatusBadge = ({ status }) => {
  if (status === 'live') {
    return <div className="status-badge live"><span className="dot pulse"></span> LIVE</div>;
  }
  return <div className="status-badge upcoming">UPCOMING</div>;
};

function App() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);
  
  // Track status for all three days
  const [statuses, setStatuses] = useState({ day1: 'upcoming', day2: 'upcoming', day3: 'upcoming' });

  useEffect(() => {
    const checkAllLives = async () => {
      const newStatuses = { ...statuses };
      
      for (const [day, id] of Object.entries(IDS)) {
        if (!id || id.includes("ID_FOR_DAY")) continue; // Skip if ID isn't set yet
        try {
          const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`);
          const data = await res.json();
          if (data.contents.includes('{"style":"LIVE","label":"LIVE"}')) {
            newStatuses[day] = 'live';
          } else {
            newStatuses[day] = 'upcoming';
          }
        } catch (e) { console.log(`Checking ${day}...`); }
      }
      setStatuses(newStatuses);
    };

    checkAllLives();
    const interval = setInterval(checkAllLives, 30000); // Check every 30 seconds

    const handleLoad = () => setIsLoading(false);
    window.addEventListener('load', handleLoad);
    return () => {
        window.removeEventListener('load', handleLoad);
        clearInterval(interval);
    };
  }, []);

  if (isLoading) return <Loader />;
  if (!isOnline) return <OfflinePage />;

  return (
    <div className="App">
      <Mainbar /><NewsTicker /><Navbar />
      <div className='img'>
        <img className="image1" src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1767181929/Hanuman_Dada_Poster-02_nqctwx.jpg" alt="Banner" />
      </div>  
      <p className='ttt'>Please Select the day you want to view</p> 
      <div className="all">
        <a href="/live-day-1-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 1 | Friday, 23 Jan</span>
            <StatusBadge status={statuses.day1} /> 
          </div>
        </a>
        <a href="/live-day-2-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 2 | Saturday, 24 Jan</span>
            <StatusBadge status={statuses.day2} />
          </div>
        </a>
        <a href="/live-day-3-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 3 | Sunday, 25 Jan</span>
            <StatusBadge status={statuses.day3} />
          </div>
        </a>
      </div>
      <Footer />
    </div>
  );
}
export default App;