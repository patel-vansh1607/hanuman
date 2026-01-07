import React from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Mainbar from '../components/Mainbar';
import Navbar from '../components/Navbar';
import NewsTicker from '../components/NewsTicker';
import Maintenance from '../components/Maintainance';


// --- The StatusBadge Component ---
const StatusBadge = ({ status }) => {
  if (status === 'live') {
    return (
      <div className="status-badge live">
        <span className="dot pulse"></span> LIVE NOW
      </div>
    );
  }
  if (status === 'completed') {
    return <div className="status-badge done">COMPLETED</div>;
  }
  return <div className="status-badge upcoming">UPCOMING</div>;
};

const Day2 = () => {

  return (
    <div className="App">
      <Mainbar />
      <NewsTicker />
      <Navbar />
      <p className='ttt'>Please Select Day or Evening Programme</p> 

      <div className="all">
        <a href="/live-day-2-hanuman-murti-inaugration/morning-program" className="btn-text">
          <StatusBadge status="upcoming" />
          <div className="btn-content">
            <span>Morning Programme</span>
          </div>
        </a>
        <a href="/live-day-2-hanuman-murti-inaugration/evening-program" className="btn-text">
          <StatusBadge status="upcoming" />
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