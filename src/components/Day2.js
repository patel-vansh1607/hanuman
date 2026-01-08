import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Make sure this path is correct
import '../App.css';
import Footer from '../components/Footer';
import Mainbar from '../components/Mainbar';
import Navbar from '../components/Navbar';
import NewsTicker from '../components/NewsTicker';

const StatusBadge = ({ status }) => {
  if (status === 'live') {
    return (
      <div className="status-badge live">
        <span className="dot pulse"></span> LIVE NOW
      </div>
    );
  }
  if (status === 'completed') {
    return <div className="status-badge done">✓ COMPLETED</div>;
  }
  return <div className="status-badge upcoming">UPCOMING</div>;
};

const Day2 = () => {
  const [statuses, setStatuses] = useState({
    day2morning: 'upcoming',
    day2evening: 'upcoming'
  });

  useEffect(() => {
    // 1. Fetch current status from Supabase
    const fetchStatuses = async () => {
      const { data } = await supabase
        .from('programmes')
        .select('id, status')
        .in('id', ['day2morning', 'day2evening']);
      
      if (data) {
        const statusMap = {};
        data.forEach(item => statusMap[item.id] = item.status);
        setStatuses(statusMap);
      }
    };

    fetchStatuses();

    // 2. Realtime Listener: Updates badges if you flip the switch in Admin
    const channel = supabase.channel('day2-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'programmes' }, 
      () => fetchStatuses())
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="App">
      <Mainbar />
      <NewsTicker />
      <Navbar />
      <p className='ttt'>Please Select Day or Evening Programme</p> 

      <div className="all">
        {/* MORNING LINK */}
        <a href="/live-day-2-hanuman-murti-inaugration/morning-program" className="btn-text">
          <StatusBadge status={statuses.day2morning} />
          <div className="btn-content">
            <span>Morning Programme</span>
          </div>
        </a>

        {/* EVENING LINK */}
        <a href="/live-day-2-hanuman-murti-inaugration/evening-program" className="btn-text">
          <StatusBadge status={statuses.day2evening} />
          <div className="btn-content">
            <span>Evening Programme</span>
          </div>
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default Day2;