import React, {useState} from 'react';
import './navbar.css';
import LoginForm from "../login/LoginForm";

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
      };

      const handleClose = () => {
        setShowLogin(false);
      };

      const handleSignUp = () => {
        // Logic to handle sign up goes here
        alert('Redirect to sign up page or open sign up form');
      };

    return (
        <>
          {showLogin && <LoginForm onClose={handleClose} onSignUp={handleSignUp} />}
          <nav className="navbar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a onClick={handleLoginClick} className="button">Log in</a></li>
              <li><a href="/profile" className="button">Profile</a></li>
            </ul>
          </nav>
        </>
    );
}

export default Navbar;
