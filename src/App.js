import './App.css';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';

function App() {
  return (
    <div className="App">
      <NewsTicker />
      <Navbar />
      <Mainbar />
      <div>
      {/* CHANGE THE STATUS HERE */}
      <Mainbar 
        day="1" 
        date="23rd Jan 2026" 
        status="upcoming"  // Change this to "live" or "upcoming"
        url="https://youtube.com/..." 
      />

      <Mainbar 
        day="2" 
        date="24th Jan 2026" 
        status="live"       // Change this as the event happens
        url="https://youtube.com/..." 
      />
    </div>
    </div>
  );
}

export default App;
