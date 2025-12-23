import './App.css';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <NewsTicker />
      <Navbar />
      <div className='img'>
        <img className = "image1"src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1766478216/MainBanner_ocytkz.png" alt="Main_Banner" />
      </div>  
      <p className='ttt'>Please Select the day you want to view</p> 
      <div className="all">
      <a
        href="/live-day-1-hanuman-murti-inaugration"
        className="btn-text"
      >
        Day 1 | Friday, 23<sup>rd</sup> January 2026
      </a>
      <br />

      <a
        href="/live-day-2-hanuman-murti-inaugration"
        className="btn-text"
      >
        Day 2 | Friday, 24<sup>th</sup> January 2026
      </a>
      <br />

      <a
        href="/live-day-3-hanuman-murti-inaugration"
        className="btn-text"
      >
        Day 3 | Friday, 25<sup>th</sup> January 2026
      </a>
    </div>

    </div>
  );
}

export default App;
