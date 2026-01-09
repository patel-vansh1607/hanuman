import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsPraying, faCircle } from '@fortawesome/free-solid-svg-icons';
import './StaticTicker.css';

const StaticTicker = () => {
  return (
    <div className="premium-ticker-row">
      <div className="ticker-wrapper">
        
        <div className="ticker-section centered-yajman">
          {/* Decorative Badge */}
          <div className="mini-badge">MAIN YAJMAN</div>
          
          {/* The Content from your image */}
          <span className="yajman-text">
            Late Sushilaben Ratilal Shah & Parivar 
            <span className="org-pill"> (Ruby Hardware Ltd.)</span>
            
            <FontAwesomeIcon icon={faCircle} className="dot-sep" />
            
            <span className="secondary-name">Shailesh Sheth & Ilesh Patel Parivar</span>
          </span>
          
          <div className="mini-badge">MAIN YAJMAN</div>
        </div>

      </div>
    </div>
  );
};

export default StaticTicker;