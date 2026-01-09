import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import OfflinePage from './components/OfflinePage';
import Loader from './components/Loader';
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faXmark, faBell, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

// --- COMPONENT: StatusBadge ---
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
  const [statuses, setStatuses] = useState({ day1: 'upcoming', day2: 'upcoming', day3: 'upcoming' });
  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  // PRE-LOAD PREMIUM SOUNDS
  const softClick = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'); 
  const announcementSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
  
  // Set volume (0.0 to 1.0)
  softClick.volume = 0.4; 
  announcementSound.volume = 0.5;

  useEffect(() => {
    // GLOBAL CLICK LISTENER
    const handleGlobalClick = (e) => {
      // Plays sound if user clicks a button, a link, or anything with a pointer cursor
      const target = e.target.closest('button, a, .btn-text');
      if (target) {
        softClick.currentTime = 0; // Reset to start if clicked rapidly
        softClick.play().catch(() => {}); // Catch prevents errors if browser blocks audio
      }
    };

    window.addEventListener('click', handleGlobalClick);

    // SUPABASE LOGIC
    const fetchAllStatuses = async () => {
      const { data } = await supabase.from('programmes').select('id, status');
      if (data) {
        const statusMap = {};
        data.forEach(item => { statusMap[item.id] = item.status; });
        setStatuses(prev => ({ ...prev, ...statusMap }));
      }
    };

    const fetchAnnouncements = async () => {
      const { data } = await supabase.from('ticker_messages').select('*').order('created_at', { ascending: false });
      if (data) setAnnouncements(data);
    };

    fetchAllStatuses();
    fetchAnnouncements();

    const channel = supabase.channel('public-site-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'programmes' }, () => fetchAllStatuses())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ticker_messages' }, () => {
        fetchAnnouncements();
        setHasNew(true);
      })
      .subscribe();

    const handleWindowLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') setIsLoading(false);
    else window.addEventListener('load', handleWindowLoad);

    const handleStatus = () => setIsOnline(window.navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
      supabase.removeChannel(channel);
    };
  }, []);

  const openAnnouncements = () => {
    announcementSound.play().catch(() => {});
    setShowAnnouncements(true);
    setHasNew(false);
  };

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
        <img className="image1" src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1767181929/Hanuman_Dada_Poster-02_nqctwx.jpg" alt="Main_Banner" />
      </div>  

      <p className='ttt'>Please Select the day you want to view</p> 

      <div className="all">
        {/* BUTTONS WILL AUTOMATICALLY TRIGGER SOUND */}
        <a href="/live-day-1-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 1 | Friday, 23 January 2026</span>
            <StatusBadge status={statuses.day1} /> 
          </div>
        </a>

        <a href="/live-day-2-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 2 | Saturday, 24 January 2026</span>
            <StatusBadge status={getDay2OverallStatus()} /> 
          </div>
        </a>

        <a href="/live-day-3-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 3 | Sunday, 25 January 2026</span>
            <StatusBadge status={statuses.day3} />
          </div>
        </a>
      </div>

      <div className="fab-wrapper">
        <button className={`fab-btn ${hasNew ? 'pulse-border' : ''}`} onClick={openAnnouncements}>
          <FontAwesomeIcon icon={faBullhorn} />
          {hasNew && <span className="notification-dot"></span>}
        </button>
      </div>

      <AnimatePresence>
        {showAnnouncements && (
          <motion.div className="announcement-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="announcement-card" initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.9 }}>
              <div className="ann-header">
                <h3><FontAwesomeIcon icon={faBell} /> Broadcasts</h3>
                <button onClick={() => setShowAnnouncements(false)} className="close-ann"><FontAwesomeIcon icon={faXmark} /></button>
              </div>
              <div className="ann-body">
                {announcements.map((ann) => (
                  <div key={ann.id} className="ann-item">
                    <p>{ann.content}</p>
                    <div className="ann-meta">
                      <span><FontAwesomeIcon icon={faCalendarDays} style={{marginRight: '5px'}} /> 
                        {new Date(ann.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span>{new Date(ann.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;