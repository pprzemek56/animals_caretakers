import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <header className="App-header" />
    </div>
  );
}

export default App;
