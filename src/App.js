import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './AuthContext'; // adjust the import path as needed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Profile from './components/profile/Profile.js';
import PrivateRoute from "./PrivateRoute";
import LoginForm from './components/login/LoginForm';
import Cards from './components/card/card';
import Footer from './footer/footer';

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
      <div className='card-container'>
        <Cards /> 
      </div>
      <Footer />
    </Router>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);