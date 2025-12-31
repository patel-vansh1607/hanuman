import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Maintenance from './components/Maintainance';

const IS_MAINTENANCE = false; 

// --- Helper Component for the Badges ---
const StatusBadge = ({ status }) => {
  if (status === 'live') {
    return (
      <div className="status-badge live">
        <span className="dot pulse"></span> LIVE
      </div>
    );
  }
  if (status === 'completed') {
    return <div className="status-badge done">✓ COMPLETED</div>;
  }
  return <div className="status-badge upcoming">UPCOMING</div>;
};

function App() {
  if (IS_MAINTENANCE) {
    return <Maintenance />;
  }

  return (
    <div className="App">
      <Mainbar />
      <NewsTicker />
      <Navbar />
      
      <div className='img'>
        <img className="image1" src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1767181929/Hanuman_Dada_Poster-02_nqctwx.jpg" alt="Main_Banner" />
      </div>  

      <p className='ttt'>Please Select the day you want to view</p> 

      <div className="all">
        {/* Day 1 */}
        <a href="/live-day-1-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 1 | Friday, 23 January 2026</span>
            <StatusBadge status="upcoming" /> 
          </div>
        </a>

        {/* Day 2 */}
        <a href="/live-day-2-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 2 | Saturday, 24 January 2026</span>
            <StatusBadge status="upcoming" />
          </div>
        </a>

        {/* Day 3 */}
        <a href="/live-day-3-hanuman-murti-inaugration" className="btn-text">
          <div className="btn-content">
            <span>Day 3 | Sunday, 25 January 2026</span>
            <StatusBadge status="upcoming" />
          </div>
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default App;