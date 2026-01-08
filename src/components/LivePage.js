import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import NewsTicker from './NewsTicker';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Days.css';

const LivePage = ({ programmeId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInitial = async () => {
      const { data: item } = await supabase.from('programmes').select('*').eq('id', programmeId).single();
      if (item) setData(item);
    };
    fetchInitial();

    // REALTIME LISTENER
    const channel = supabase.channel(`live-${programmeId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'programmes', filter: `id=eq.${programmeId}` }, 
      (payload) => setData(payload.new)).subscribe();

    return () => supabase.removeChannel(channel);
  }, [programmeId]);

  if (!data) return null;

  return (
    <div className='main-divv'>
      <NewsTicker />
      <Navbar />
      
      {/* YOUR DESIGN ALWAYS SHOWS */}
      <div className="content-container">
        <h1 className='p1'>{data.title} | Hanuman Dada Murti Inauguration</h1>
        
        <div className="video-wrapper">
          {/* ONLY SHOW IFRAME IF STATUS IS LIVE OR COMPLETED */}
          {(data.status === 'live' || data.status === 'completed') ? (
            <iframe width="560" height="315" 
              src={`https://www.youtube.com/embed/${data.video_id}`} 
              frameBorder="0" allowFullScreen>
            </iframe>
          ) : (
            /* IF UPCOMING, SHOW YOUR "NOT READY" BOX */
            <div className="not-ready-box">
               <div className="temple-icon">🕉️</div>
               <h2>Live Stream Not Available</h2>
               <p>The spiritual proceedings for {data.title} are being prepared.</p>
               <div className="status-indicator"><span className="dot"></span> Monitoring...</div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
export default LivePage;