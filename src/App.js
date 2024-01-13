import './App.css';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Profile from "./components/profile/Profile";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            {/* Define other routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
