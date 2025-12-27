import './App.css';
import Footer from './components/Footer';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Maintenance from './components/Maintainance';

const IS_MAINTENANCE = false; // Toggle to true for Maintenance mode

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
        <img className="image1" src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1766427632/Untitled-1-01_bl5svr.jpg" alt="Main_Banner" />
      </div>  

      <p className='ttt'>Please Select the day you want to view</p> 

      <div className="all">
        <a href="/live-day-1-hanuman-murti-inaugration" className="btn-text">
          Day 1 | Friday, 23<sup>rd</sup> January 2026
        </a>

        <a href="/live-day-2-hanuman-murti-inaugration" className="btn-text">
          Day 2 | Friday, 24<sup>th</sup> January 2026
        </a>

        <a href="/live-day-3-hanuman-murti-inaugration" className="btn-text">
          Day 3 | Friday, 25<sup>th</sup> January 2026
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default App;