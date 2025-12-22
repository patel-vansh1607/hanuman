import './App.css';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';

function App() {
  return (
    <div className="App">
      <NewsTicker />
      <Navbar />
    </div>
  );
}

export default App;
