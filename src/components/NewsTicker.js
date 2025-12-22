import React from 'react';
import './Ticker.css';

const NewsTicker = () => {
  const newsItems = [
    "✨ Hanuman Murti Anniversary Celebration ✨",
    "🙏 Join us for the Grand Puja and Aarti at 6:00 PM 🙏",
    "🚩 Special Guest Speaker arriving at 10:00 AM 🚩",
    "🕉️ Happy Anniversary to the Temple Community 🕉️",
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