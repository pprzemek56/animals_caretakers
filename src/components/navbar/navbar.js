import React, {useState} from 'react';
import './navbar.css';
import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";
import {useAuth} from "../../AuthContext";

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const { isLoggedIn } = useAuth();
    const handleShowLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
      };

      const handleShowRegister = () => {
          setShowLogin(false);
          setShowRegister(true);
      };

      const handleClose = () => {
          setShowLogin(false);
          setShowRegister(false);
      };

    return (
        <>
            {showLogin && <LoginForm onClose={handleClose} onSignUp={handleShowRegister} />}
            {showRegister && <RegisterForm onClose={handleClose} onLogIn={handleShowLogin} />}
            <nav className="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a onClick={handleShowLogin} className="button">Log in</a></li>
                    {isLoggedIn && <li><a href="/profile" className="button">Profile</a></li>}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
