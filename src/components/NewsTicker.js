import React from 'react';
import './Ticker.css';

const NewsTicker = () => {
  const newsItems = [
    "Live Stream for Day 1 to begin at 7:00pm",
    "Don't miss the special cultural performances!",
    "Join us for the grand inauguration of the Hanuman Murti.",
    "Stay tuned for live updates throughout the event.",
    "Visit our website for more details and schedule.",
  ];

  return (
    <div className="ticker-container">
      <div className="ticker-scroll">
        {/* First copy of items */}
        <div className="ticker-item-list">
          {newsItems.map((item, index) => (
            <span key={index} className="ticker-text">{item}</span>
          ))}
        </div>
        {/* Second identical copy for seamless looping */}
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