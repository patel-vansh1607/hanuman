import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Ticker.css';

const NewsTicker = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchTicker = async () => {
      const { data } = await supabase.from('ticker_messages').select('content');
      if (data) setNewsItems(data.map(item => item.content));
    };
    fetchTicker();
  }, []);

  if (newsItems.length === 0) return null;

  return (
    <div className="ticker-container">
      <div className="ticker-scroll">
        <div className="ticker-item-list">
          {newsItems.map((item, index) => (
            <span key={index} className="ticker-text">{item}</span>
          ))}
        </div>
        <div className="ticker-item-list" aria-hidden="true">
          {newsItems.map((item, index) => (
            <span key={`dup-${index}`} className="ticker-text">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;