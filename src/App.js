import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Maintenance from './components/Maintainance';
import OfflinePage from './components/OfflinePage';
import Loader from './components/Loader';

const IS_MAINTENANCE = false; 

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

  useEffect(() => {
    // REAL LOAD CHECK: Triggers when the whole window (images, CSS) is ready
    const handleWindowLoad = () => {
      setIsLoading(false);
    };

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
    };
  }, []);

  if (isLoading) return <Loader />;
  if (!isOnline) return <OfflinePage />;
  if (IS_MAINTENANCE) return <Maintenance />;

  return (
    <div className="App">
      <Mainbar />
      <NewsTicker />
      <Navbar />
      
      <div className='img'>
        {/* Added onLoad here as a backup for the main banner */}
        <img 
          className="image1" 
          src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1767181929/Hanuman_Dada_Poster-02_nqctwx.jpg" 
          alt="Main_Banner" 
          onLoad={() => setIsLoading(false)} 
        />
      </div>  

      <p className='ttt'>Please Select the day you want to view</p> 

      <div className="all">
        <a href="/live-day-1-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 1 | Friday, 23 January 2026</span>
            <StatusBadge status="upcoming" /> 
          </div>
        </a>

        <a href="/live-day-2-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 2 | Saturday, 24 January 2026</span>
            <StatusBadge status="upcoming" />
          </div>
        </a>

        <a href="/live-day-3-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 3 | Sunday, 25 January 2026</span>
            <StatusBadge status="upcoming" />
          </div>
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default App;