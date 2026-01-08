import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import OfflinePage from './components/OfflinePage';
import Loader from './components/Loader';
import { supabase } from './supabaseClient'; // Ensure this file is inside /src

// --- COMPONENT: StatusBadge (Purely for Display) ---
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

  // Status state controlled by Supabase
  const [statuses, setStatuses] = useState({
    day1: 'upcoming',
    day2: 'upcoming',
    day3: 'upcoming'
  });

  useEffect(() => {
    // 1. Function to fetch statuses from Supabase
    const fetchAllStatuses = async () => {
      const { data, error } = await supabase
        .from('programmes')
        .select('id, status');
      
      if (data) {
        const statusMap = {};
        data.forEach(item => {
          statusMap[item.id] = item.status;
        });
        setStatuses(prev => ({ ...prev, ...statusMap }));
      }
      if (error) console.error("Error fetching statuses:", error);
    };

    // 2. Initial Fetch
    fetchAllStatuses();

    // 3. Realtime Listener: Updates home page badges instantly when Admin clicks a button
    const channel = supabase
      .channel('public-status-updates')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'programmes' }, 
        () => fetchAllStatuses() 
      )
      .subscribe();

    // 4. Page Load & Online/Offline Logic
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
      supabase.removeChannel(channel);
    };
  }, []);
const getDay2OverallStatus = () => {
  const m = statuses.day2morning;
  const e = statuses.day2evening;

  if (m === 'live' || e === 'live') return 'live';
  if (m === 'completed' && e === 'completed') return 'completed';
  return 'upcoming';
};
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
        {/* Day 1 */}
        <a href="/live-day-1-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 1 | Friday, 23 January 2026</span>
            <StatusBadge status={statuses.day1} /> 
          </div>
        </a>

        {/* Day 2 */}
        <a href="/live-day-2-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 2 | Saturday, 24 January 2026</span>
            {/* This now uses the smart logic */}
            <StatusBadge status={getDay2OverallStatus()} /> 
          </div>
        </a>

        {/* Day 3 */}
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