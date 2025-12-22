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
        <img className = "image1"src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1766427003/Main_Banner_ni3q4d.jpg" alt="Main_Banner" />
      </div>
    </div>
  );
}

export default App;
