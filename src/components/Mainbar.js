import React from 'react'
import '../styles/Mainbar.css'

const Mainbar = ({ day, date, url, status }) => {
  const getBadgeText = () => {
    if (status === 'live') return "Live Now";
    if (status === 'upcoming') return "Starts Soon";
    if (status === 'completed') return "Stream Completed";
    return "";
  };

  return (
    <div className='maindiv1'>
      <p className='selection-text'>Please select the live stream you wish to watch</p>
      
      <a 
        href={url} 
        className={`stream-btn ${status}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <span className="status-badge">{getBadgeText()}</span>
        {status === 'live' && <span className="live-pulse"></span>}
        <span className="btn-text">Day {day} | {date}</span>
      </a>
    </div>
  )
}

export default Mainbar