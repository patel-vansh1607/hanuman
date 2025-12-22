import './App.css';
import Mainbar from './components/Mainbar';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';

function App() {
  return (
    <div className="App">
      {/* <NewsTicker /> */}
      <Navbar />
      <Mainbar />
      <div className='img'>
        <img className = "image1"src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1766427632/Untitled-1-01_bl5svr.jpg" alt="Main_Banner" />
      </div>
    </div>
  );
}

export default App;
