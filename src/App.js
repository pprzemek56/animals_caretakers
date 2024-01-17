import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './AuthContext'; // adjust the import path as needed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Profile from './components/profile/Profile.js';
import PrivateRoute from "./PrivateRoute";
import LoginForm from './components/login/LoginForm';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/profile" element={<LoginForm />} />
          )}
          {/* Define other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);