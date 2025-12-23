import React from 'react'
import '../styles/Mainbar.css'

const Mainbar = ({ day, date, url, status }) => {
  const getBadgeText = () => {
    if (status === 'live') return "Live Now";
    if (status === 'upcoming') return "Starts Soon";
    if (status === 'completed') return "Stream Completed";
    return "";
  };

  // Prevent rendering if props are missing
  if (!day) return null;

  return (
    <div className='maindiv1'>      
      <a 
        href={status === 'upcoming' ? undefined : url} 
        className={`stream-btn ${status}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {/* The Absolute Positioned Badge */}
        <span className="status-badge">{getBadgeText()}</span>
        
        {/* Pulse icon only shows when live */}
        {status === 'live' && <span className="live-pulse"></span>}
        
        <span className="btn-text">Day {day} | {date}</span>
      </a>
    </div>
  )
}

export default Mainbar