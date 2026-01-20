import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './StaticTicker.css';

const StaticTicker = () => {
  // We define the content once to keep it DRY (Don't Repeat Yourself)
  const TickerContent = () => (
    <div className="ticker-item">
      <div className="mini-badge">MAIN YAJMAN</div>
      <span className="yajman-text">
        Late Sushilaben Ratilal Shah & Parivar 
        <span className="org-pill"> (Ruby Hardware Ltd.)</span>
        <FontAwesomeIcon icon={faCircle} className="dot-sep" />
        <span className="secondary-name">Shailesh Sheth & Ilesh Patel Parivar</span>
      </span>
    </div>
  );

  return (
    <div className="premium-ticker-row">
      <div className="ticker-scroll-container">
        <div className="ticker-track">
          {/* Duplicate the content to create a seamless infinite loop */}
          <TickerContent />
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </div>
  );
};

export default StaticTicker;